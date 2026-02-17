"use client";

import { motion } from "motion/react";
import { QrCode, KeyRound, Gauge, Settings, ShieldCheck, Factory, Sparkles } from "lucide-react";

const features = [
    {
        icon: QrCode,
        color: "blue",
        title: "QR Identification",
        description:
            "Every cylinder is implanted with a unique, tamper-proof QR code that acts as its digital passport throughout the supply chain.",
    },
    {
        icon: KeyRound,
        color: "amber",
        title: "Dynamic TOTP",
        description:
            "Secure delivery confirmation using Time-based One-Time Passwords that refresh every 60 seconds, preventing unauthorized exchanges.",
    },
    {
        icon: Gauge,
        color: "emerald",
        title: "Smart Metrics",
        description:
            "Once connected, users access real-time data: exact gas weight (e.g., 14.2kg), pressure levels, and estimated days remaining.",
    },
    {
        icon: Factory,
        color: "violet",
        title: "Strategic Integration Roadmap",
        description:
            "Currently in the architectural planning phase, designed to be compatible with future manufacturing standards for seamless adoption.",
    },
    {
        icon: Settings,
        color: "cyan",
        title: "Predictive Refills",
        description:
            "Automated refill requests sent to your provider when gas levels drop below 15%, ensuring you never run out.",
    },
    {
        icon: ShieldCheck,
        color: "rose",
        title: "Return Authentication",
        description:
            "The secure handshake works both ways — verify the identity of the collection agent when returning your empty cylinder.",
    },
];

const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
    blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-500", accent: "from-blue-500 to-blue-400" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-500", accent: "from-amber-500 to-amber-400" },
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-500", accent: "from-emerald-500 to-emerald-400" },
    violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-500", accent: "from-violet-500 to-violet-400" },
    cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-500", accent: "from-cyan-500 to-cyan-400" },
    rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-500", accent: "from-rose-500 to-rose-400" },
};

export const Features = () => {
    return (
        <section id="features" className="relative py-24 md:py-32 bg-[#faf8f5] overflow-hidden">
            {/* Subtle Grid */}
            <div className="absolute inset-0 blueprint-grid opacity-40" />
            <div className="absolute bottom-0 right-0 w-[35%] h-[50%] bg-blue-300/[0.05] blur-[100px] rounded-full" />
            <div className="absolute top-0 left-0 w-[25%] h-[35%] bg-emerald-300/[0.04] blur-[80px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-blue-300 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} />
                        Core Technology
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Total Transparency from Plant to Kitchen
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        ThreatAvoids transforms dumb metal cylinders into smart, secure
                        assets using embedded IoT technology.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const colors = colorMap[feature.color];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                                className="relative p-7 rounded-2xl bg-white/70 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-white transition-all duration-300 group overflow-hidden"
                            >
                                {/* Top accent line */}
                                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div className={`w-12 h-12 ${colors.bg} ${colors.border} border rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-5 h-5 ${colors.text}`} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
