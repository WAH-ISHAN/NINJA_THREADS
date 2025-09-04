import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiRotateCcw } from "react-icons/fi";

export function Counter({
  value,                 // optional controlled value
  defaultValue = 0,      // initial value if uncontrolled
  step = 1,              // increment step
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  onChange,              // (val) => void
  className = "",
  size = "md",           // sm | md | lg
  showReset = true,      // show reset button
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? Number(value) : internal;

  const setVal = (v) => {
    const clamped = Math.max(min, Math.min(max, Number(v)));
    if (!isControlled) setInternal(clamped);
    onChange?.(clamped);
  };

  // Repeat (hold) handling
  const repeatTimer = useRef(null);
  const actionRef = useRef(null); // 'inc' | 'dec'
  const speedRef = useRef(280);   // ms interval (accelerates)

  const change = (type, factor = 1) => {
    const delta = (type === "inc" ? 1 : -1) * step * factor;
    setVal(current + delta);
  };

  const startHold = (type) => {
    actionRef.current = type;
    change(type);
    speedRef.current = 280;
    const tick = () => {
      change(type);
      speedRef.current = Math.max(60, speedRef.current * 0.88); // accelerate
      repeatTimer.current = setTimeout(tick, speedRef.current);
    };
    repeatTimer.current = setTimeout(tick, speedRef.current);
  };

  const stopHold = () => {
    if (repeatTimer.current) clearTimeout(repeatTimer.current);
    repeatTimer.current = null;
    actionRef.current = null;
  };

  useEffect(() => stopHold, []);

  // Keyboard and wheel
  const containerRef = useRef(null);
  const onKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "+") {
      e.preventDefault();
      change("inc", e.shiftKey ? 5 : 1);
    } else if (e.key === "ArrowDown" || e.key === "-") {
      e.preventDefault();
      change("dec", e.shiftKey ? 5 : 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setVal(min);
    } else if (e.key === "End") {
      e.preventDefault();
      setVal(max);
    }
  };
  const onWheel = (e) => {
    if (document.activeElement !== containerRef.current) return;
    e.preventDefault();
    if (e.deltaY < 0) change("inc");
    else change("dec");
  };

  const sizeMap = {
    sm: { btn: "h-8 w-8 text-sm", num: "text-xl", ring: "h-14 w-14" },
    md: { btn: "h-10 w-10",       num: "text-2xl", ring: "h-16 w-16" },
    lg: { btn: "h-12 w-12 text-lg", num: "text-3xl", ring: "h-20 w-20" },
  };
  const sz = sizeMap[size] || sizeMap.md;

  const atMin = current <= min;
  const atMax = current >= max;

  const reset = () => setVal(defaultValue);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      className={`w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-4 flex flex-col items-center gap-4 select-none ${className}`}
      aria-label="Counter"
    >
      {/* Number in gradient ring */}
      <div className="relative">
        <div className={`rounded-full p-[2px] bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-500`}>
          <div className={`rounded-full bg-black/30 border border-white/10 ${sz.ring} flex items-center justify-center`}>
            <span className={`${sz.num} font-bold text-white`} aria-live="polite">
              {current}
            </span>
          </div>
        </div>
        {showReset && (
          <button
            onClick={reset}
            title="Reset"
            className="absolute -right-2 -top-2 p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
          >
            <FiRotateCcw />
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          aria-label="Decrease"
          disabled={atMin}
          onMouseDown={() => startHold("dec")}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={(e) => { e.preventDefault(); startHold("dec"); }}
          onTouchEnd={stopHold}
          onClick={() => change("dec")}
          className={`rounded-xl ${sz.btn} flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition disabled:opacity-40`}
        >
          <FaMinus />
        </button>

        <button
          aria-label="Increase"
          disabled={atMax}
          onMouseDown={() => startHold("inc")}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={(e) => { e.preventDefault(); startHold("inc"); }}
          onTouchEnd={stopHold}
          onClick={() => change("inc")}
          className={`rounded-xl ${sz.btn} flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-40`}
        >
          <FaPlus />
        </button>
      </div>

      <div className="text-[11px] text-gray-400">
        Tip: Hold buttons, use ↑/↓ or Shift for x5
      </div>
    </div>
  );
}

export default Counter;