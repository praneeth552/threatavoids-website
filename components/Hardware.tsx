"use client";

import { motion } from "motion/react";
import { Eye, Brain, Power, Shield, CheckCircle2, Cpu } from "lucide-react";

export const Hardware = () => {
    const specs = [
        {
            icon: Eye,
            color: "emerald",
            title: "Continuous Monitoring",
            description:
                "The system maintains a 24/7 vigil, constantly scanning the environment for anomalies using advanced sensor fusion technology.",
        },
        {
            icon: Brain,
            color: "blue",
            title: "AI Hazard Detection",
            description:
                "Proprietary AI algorithms process sensor data in real-time to distinguish between false positives and genuine safety threats instantly.",
        },
        {
            icon: Power,
            color: "red",
            title: "IoT Solenoid Valve",
            description:
                "An integrated electromechanical valve allows for automatic or manual cut-off. In the event of a detected leak, the system shuts down flow.",
        },
    ];

    const iconColors: Record<string, { bg: string; border: string; text: string }> = {
        emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-500" },
        blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-500" },
        red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-500" },
    };

    return (
        <section
            id="the-device"
            className="relative py-24 md:py-32 bg-[#f5f0eb] text-slate-800 overflow-hidden"
        >
            {/* Subtle Grid */}
            <div className="absolute inset-0 blueprint-grid opacity-40" />
            <div className="absolute top-0 left-0 w-[40%] h-[50%] bg-blue-300/[0.06] blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-emerald-300/[0.04] blur-[80px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-blue-300 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                        <Cpu size={14} />
                        Hardware Prototype
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        The &ldquo;Sentinel&rdquo; Module
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        A compact, tamper-proof IoT unit designed to be integrated onto the
                        cylinder collar during manufacturing. It combines AI-driven
                        environmental scanning with active control mechanisms.
                    </p>
                </motion.div>

                {/* Device + Specs Grid — balanced layout */}
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start mb-24 md:mb-32">
                    {/* Left — Conceptual Visualization (2 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-gradient-to-br from-white via-[#faf8f5] to-[#f5f0eb] p-8 md:p-10">
                            {/* Subtle glow behind logo */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-40 h-40 bg-blue-400/[0.06] rounded-full blur-[40px]" />
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/threatavoids-logo.png"
                                    alt="ThreatAvoids"
                                    className="w-24 h-24 md:w-28 md:h-28 object-contain mb-5 drop-shadow-lg"
                                />
                                <h3 className="text-slate-800 font-bold text-lg tracking-tight mb-2">
                                    Smart Monitoring &amp; Control
                                </h3>
                                <p className="text-slate-500 text-sm max-w-[220px] leading-relaxed mb-6">
                                    An embedded IoT ecosystem designed for safety-critical LPG infrastructure.
                                </p>

                                {/* Status indicators */}
                                <div className="flex items-center gap-4 text-[11px] font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-slate-400">Sensors Active</span>
                                    </div>
                                    <div className="w-px h-3 bg-slate-200" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse [animation-delay:500ms]" />
                                        <span className="text-slate-400">AI Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Sensor Specs (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        {specs.map((spec, i) => {
                            const colors = iconColors[spec.color];
                            const Icon = spec.icon;
                            return (
                                <motion.div
                                    key={spec.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12, duration: 0.5 }}
                                    className="flex gap-4 p-5 rounded-xl bg-white/80 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                                >
                                    <div className={`mt-0.5 ${colors.bg} ${colors.border} border p-3 rounded-xl h-fit group-hover:scale-105 transition-transform duration-300`}>
                                        <Icon className={colors.text} size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1.5">
                                            {spec.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {spec.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Remote Safety Feature ─── */}
                <div id="remote-safety" className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="rounded-3xl p-8 md:p-12 bg-white/80 border border-slate-200 shadow-lg relative overflow-hidden"
                    >
                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-300/[0.04] blur-[80px] pointer-events-none" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            {/* Left — Copy */}
                            <div>
                                <div className="inline-flex items-center gap-2 text-red-500 font-bold mb-4 text-sm">
                                    <Shield size={18} />
                                    <span>Remote Emergency Control</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 leading-tight">
                                    Turn Off Your Gas From Anywhere
                                </h3>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    Forgot to turn off the stove? The ThreatAvoids app connects
                                    directly to the IoT Solenoid Valve, giving you the power to
                                    cut the gas supply remotely with a single tap.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        {
                                            label: "Instant Response:",
                                            detail: "Low-latency signal processing (<500ms).",
                                        },
                                        {
                                            label: "Encrypted Command:",
                                            detail: "Secure end-to-end signal encryption.",
                                        },
                                        {
                                            label: "Action Confirmation:",
                                            detail:
                                                "The valve sends a physical verification signal back to the app, confirming it has successfully closed.",
                                        },
                                    ].map((item) => (
                                        <li
                                            key={item.label}
                                            className="flex items-start gap-3 text-slate-600"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                            <div>
                                                <span className="font-semibold text-slate-800 text-sm">
                                                    {item.label}
                                                </span>{" "}
                                                <span className="text-slate-500 text-sm">
                                                    {item.detail}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right — Phone Mockup */}
                            <div className="relative flex justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="w-60 md:w-64 bg-slate-950 rounded-[2.5rem] border-4 border-slate-800 p-3 shadow-2xl shadow-slate-400/20 relative"
                                >
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-b-xl z-20" />

                                    {/* Screen */}
                                    <div className="h-full bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center p-6 relative min-h-[340px]">
                                        {/* Status */}
                                        <div className="text-center mb-8">
                                            <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-1 font-mono">
                                                Status
                                            </div>
                                            <div className="text-emerald-400 font-bold text-base flex items-center justify-center gap-2">
                                                <CheckCircle2 size={14} />
                                                Valve Open
                                            </div>
                                        </div>

                                        {/* Emergency Button */}
                                        <motion.div
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0 0 rgba(239,68,68,0.3)",
                                                    "0 0 0 12px rgba(239,68,68,0)",
                                                    "0 0 0 0 rgba(239,68,68,0)",
                                                ],
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-red-500/30 flex items-center justify-center relative cursor-pointer hover:bg-red-500/10 transition-colors"
                                        >
                                            <Power size={44} className="text-red-500" />
                                        </motion.div>

                                        {/* Label */}
                                        <div className="mt-8 text-center">
                                            <p className="text-white font-bold text-sm">
                                                Emergency Cut-Off
                                            </p>
                                            <p className="text-slate-500 text-[10px] mt-1.5 font-mono">
                                                Tap to immediately close valve
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
