export default function HeroMockup() {
  const bars = [60, 85, 45, 95, 70, 55, 80];
  return (
    <div className="relative">
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-brand-500/30 to-indigo-500/20 blur-3xl rounded-full" />

      <div className="relative rounded-2xl border border-white/60 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-2xl p-5 animate-float">
        {/* Window dots */}
        <div className="flex gap-1.5 mb-4">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Income", value: "₹1.7L", c: "text-income" },
            { label: "Expense", value: "₹63K", c: "text-expense" },
            {
              label: "Balance",
              value: "₹1.0L",
              c: "text-brand-600 dark:text-brand-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3"
            >
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                {s.label}
              </p>
              <p className={`text-sm font-bold ${s.c}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-4">
          <div className="flex items-end justify-between gap-2 h-28">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className="rounded-t-md bg-gradient-to-t from-brand-600 to-indigo-400"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress rows */}
        <div className="mt-4 space-y-2.5">
          {[
            { label: "Food", w: 70, c: "from-green-400 to-emerald-500" },
            { label: "Shopping", w: 90, c: "from-amber-400 to-orange-500" },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mb-1">
                <span>{b.label}</span>
                <span>{b.w}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${b.c}`}
                  style={{ width: `${b.w}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating insight pill */}
      <div
        className="absolute -right-4 top-1/3 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 px-3 py-2 animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        <p className="text-[10px] text-slate-400">Savings Rate</p>
        <p className="text-sm font-bold text-income">↑ 64%</p>
      </div>
    </div>
  );
}
