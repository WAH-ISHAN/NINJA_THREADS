import React from "react";
import { Clock3, Percent, ShieldCheck, Truck } from "lucide-react";

const defaultItems = [
  {
    title: "Discount",
    description: "Every week new sales",
    icon: Percent,
    gradient: "from-rose-500 to-fuchsia-500",
  },
  {
    title: "Free Delivery",
    description: "100% Free for all orders",
    icon: Truck,
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    title: "Great Support 24/7",
    description: "We care about your experience",
    icon: Clock3,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Secure Payment",
    description: "100% Secure payment method",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function Wrapper({ items = defaultItems }) {
  return (
    <section className="lg:container mx-auto px-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {items.map((it, i) => (
            <FeatureCard key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, icon: Icon, gradient = "from-indigo-500 to-fuchsia-500", onClick }) {
  return (
    <div
      className={`group relative rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10`}
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => onClick && (e.key === "Enter" || e.key === " ") && onClick()}
    >
      {/* Accent glow */}
      <div className={`pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition`}>
        <div className={`absolute -inset-px rounded-xl bg-gradient-to-br ${gradient} opacity-[0.12] blur-lg`} />
      </div>

      <div className="flex items-start gap-3">
        {/* Icon badge with gradient ring */}
        <div className={`shrink-0 p-[2px] rounded-xl bg-gradient-to-br ${gradient}`}>
          <div className="h-12 w-12 rounded-[10px] bg-black/30 border border-white/10 flex items-center justify-center">
            <Icon className="text-white" size={22} aria-hidden="true" />
          </div>
        </div>

        {/* Text */}
        <div>
          <h4 className="text-white font-medium">{title}</h4>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;