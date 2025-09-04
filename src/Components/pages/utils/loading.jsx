import React from "react";

export function Loader({
  variant = "spinner",     // "spinner" | "dots"
  label = "Loading…",
  size = 80,               // px
  overlay = false,         // show dimmed overlay
  fullscreen = false,      // stretch overlay to full screen
  className = "",
}) {
  const Wrapper = ({ children }) => {
    if (overlay || fullscreen) {
      return (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`}
          role="dialog"
          aria-label="Loading"
        >
          {children}
        </div>
      );
    }
    return (
      <div
        className={`w-full h-full flex items-center justify-center ${className}`}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        {children}
      </div>
    );
  };

  const Spinner = () => (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {/* Soft glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-emerald-500 opacity-25 blur-lg" />
        {/* Base ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        {/* Animated arc */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400 border-r-fuchsia-400 animate-spin" />
        {/* Inner disc */}
        <div className="absolute inset-[18%] rounded-full bg-white/5 border border-white/10" />
      </div>
      {label ? <div className="text-sm text-gray-300">{label}</div> : <span className="sr-only">Loading</span>}
    </div>
  );

  const Dots = () => (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-end gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-white/70"
            style={{
              animation: "loader-bounce 1s ease-in-out infinite",
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
      {label ? <div className="text-sm text-gray-300">{label}</div> : <span className="sr-only">Loading</span>}
      {/* Keyframes for dots */}
      <style>
        {`@keyframes loader-bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: .7; }
            40% { transform: translateY(-6px); opacity: 1; }
          }`}
      </style>
    </div>
  );

  return (
    <Wrapper>
      {variant === "dots" ? <Dots /> : <Spinner />}
    </Wrapper>
  );
}

export default Loader;