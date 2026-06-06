import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import HeroMockup from "../components/HeroMockup";

const features = [
  {
    icon: "📊",
    title: "Visual Dashboard",
    desc: "Income, expenses, and balance at a glance with interactive charts.",
    glow: "group-hover:shadow-brand-500/30",
  },
  {
    icon: "💡",
    title: "Smart Insights",
    desc: "Automatic analysis of spending, savings rate, and month-over-month trends.",
    glow: "group-hover:shadow-amber-500/30",
  },
  {
    icon: "🎯",
    title: "Budget Tracking",
    desc: "Set monthly limits per category and get alerts before you overspend.",
    glow: "group-hover:shadow-green-500/30",
  },
  {
    icon: "🔍",
    title: "Search & Filter",
    desc: "Find any transaction instantly by category, method, note, or tag.",
    glow: "group-hover:shadow-blue-500/30",
  },
  {
    icon: "📈",
    title: "Monthly Trends",
    desc: "Track how your finances evolve over time with clear visuals.",
    glow: "group-hover:shadow-indigo-500/30",
  },
  {
    icon: "⬇️",
    title: "Export Data",
    desc: "Download filtered transactions as CSV anytime for your records.",
    glow: "group-hover:shadow-pink-500/30",
  },
];

const steps = [
  {
    num: "1",
    title: "Create an account",
    desc: "Sign up free in seconds — no card required.",
  },
  {
    num: "2",
    title: "Add transactions",
    desc: "Log income and expenses with categories and methods.",
  },
  {
    num: "3",
    title: "Get insights",
    desc: "Watch your dashboard reveal where your money goes.",
  },
];

const stats = [
  { end: 6, suffix: "+", label: "Features" },
  { end: 100, suffix: "%", label: "Free" },
  { end: 3, label: "Easy steps" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white font-bold shadow-lg shadow-brand-600/30">
              ₹
            </div>
            <span className="font-bold">ExpenseTracker</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:shadow-lg hover:shadow-brand-600/30 transition whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        {/* Animated blobs */}
        <div className="absolute top-0 -left-40 h-96 w-96 rounded-full bg-brand-400/20 dark:bg-brand-600/20 blur-3xl animate-blob" />
        <div
          className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-indigo-400/20 dark:bg-indigo-600/20 blur-3xl animate-blob"
          style={{ animationDelay: "4s" }}
        />
        {/* Grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_60%,transparent_100%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30 px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300 mb-6 animate-[slideUp_0.6s_ease-out]">
              💸 Take control of your money
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] animate-[slideUp_0.7s_ease-out]">
              Track expenses.
              <br />
              <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-brand-600 bg-[length:200%_auto] bg-clip-text text-transparent">
                Master your money.
              </span>
            </h1>
            <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-lg text-slate-500 dark:text-slate-400 animate-[slideUp_0.8s_ease-out]">
              A smart expense tracker with an analytics dashboard that turns
              your daily spending into clear, actionable insights.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 animate-[slideUp_0.9s_ease-out]">
              <Link
                to="/register"
                className="group w-full sm:w-auto rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 px-8 py-3.5 font-semibold text-white hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-600/20"
              >
                Start for free
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                  →
                </span>
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto rounded-xl border border-slate-200 dark:border-slate-700 px-8 py-3.5 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="animate-[slideUp_1s_ease-out]">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-6 py-10 sm:py-12 grid grid-cols-3 gap-3 sm:gap-8 text-center">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-br from-brand-600 to-indigo-500 bg-clip-text text-transparent">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-tight">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to manage money
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Powerful features wrapped in a simple, beautiful interface.
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div
                className={`group h-full rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:-translate-y-1.5 hover:shadow-2xl ${f.glow} transition-all duration-300`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative bg-slate-50 dark:bg-slate-900/30 py-24 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Get started in 3 steps
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              From signup to insights in under a minute.
            </p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-3 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-7 left-[16%] right-[16%] h-px bg-gradient-to-r from-brand-300 via-indigo-300 to-brand-300 dark:from-brand-800 dark:via-indigo-800 dark:to-brand-800" />
            {steps.map((s, i) => (
              <Reveal
                key={s.num}
                delay={i * 120}
                className="text-center relative"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-brand-600/30">
                  {s.num}
                </div>
                <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-600 px-8 py-16 text-center text-white shadow-2xl shadow-brand-600/30">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to take control?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-brand-100">
                Start understanding your spending today. It's completely free.
              </p>
              <Link
                to="/register"
                className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 font-semibold text-brand-700 hover:bg-brand-50 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Create your free account
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-indigo-600 text-white text-xs font-bold">
              ₹
            </div>
            <span>ExpenseTracker</span>
          </div>
          <p>Built as a final semester project · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
