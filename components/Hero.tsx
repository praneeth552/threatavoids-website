"use client";

import { motion } from "motion/react";
import { Cpu, Lock, Lightbulb, ChevronRight } from "lucide-react";

export const Hero = () => {
    return (
        <section
            id="vision"
            className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 blueprint-grid" />

            {/* Gradient Overlays (warm cream tones) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] via-[#faf8f5]/95 to-[#f5f0eb]" />
            <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-blue-400/[0.06] blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-blue-300/[0.05] blur-[100px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Phase Badge */}
                        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                Development Phase: Prototype V1
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-800 leading-[1.1] mb-8">
                            Reinventing LPG Safety with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                                Embedded IoT
                            </span>{" "}
                            Intelligence
                        </h1>

                        <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
                            ThreatAvoids is a proposed smart-cylinder ecosystem designed for
                            direct OEM integration. Our goal: To implant autonomous safety
                            sensors and secure delivery protocols directly into the next
                            generation of cylinders from major energy providers.
                        </p>

                        <div className="flex items-center gap-4 mb-12">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
                            >
                                Contact Us
                                <ChevronRight size={18} />
                            </a>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                            {[
                                { icon: Cpu, label: "Smart Sensor Fusion" },
                                { icon: Lightbulb, label: "AI-Driven Analysis" },
                                { icon: Lock, label: "Hardware Level Security" },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center space-x-2">
                                    <Icon size={16} className="text-blue-500" />
                                    <span className="text-slate-500 font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Blueprint Schematic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="absolute -inset-8 bg-blue-400/[0.06] rounded-full blur-[80px]" />
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-200/50">
                            <div className="relative aspect-video overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://images.unsplash.com/photo-1727522974631-c8779e7de5d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlcHJpbnQlMjBzY2hlbWF0aWNzJTIwdGVjaG5pY2FsJTIwZHJhd2luZyUyMGFic3RyYWN0fGVufDF8fHx8MTc3MDcwMjE0MHww&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Technical Schematic"
                                    className="w-full h-full object-cover opacity-15"
                                />

                                {/* System Architecture Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                                    <div className="w-full h-full border border-dashed border-blue-400/25 rounded-xl relative p-4 md:p-6">
                                        <div className="absolute top-0 left-0 bg-white px-3 -mt-3 ml-4 text-blue-500 text-[10px] md:text-xs font-mono uppercase tracking-wider">
                                            System Architecture V1.2
                                        </div>

                                        <div className="h-full flex flex-col justify-between">
                                            <div className="flex justify-between items-center">
                                                <div className="bg-slate-50 border border-slate-200 p-2 md:p-3 rounded-lg w-24 md:w-32">
                                                    <div className="h-1.5 md:h-2 w-6 md:w-8 bg-emerald-500 rounded mb-1.5 md:mb-2" />
                                                    <div className="text-[8px] md:text-[10px] text-slate-500 font-mono">
                                                        Multi-Sensor Array
                                                    </div>
                                                </div>
                                                <div className="h-px bg-gradient-to-r from-blue-400/30 via-blue-300/15 to-blue-400/30 flex-1 mx-2 md:mx-3" />
                                                <div className="bg-blue-50 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-blue-200 text-center pulse-glow">
                                                    <Cpu
                                                        className="mx-auto text-blue-500 mb-1 md:mb-2"
                                                        size={20}
                                                    />
                                                    <div className="text-[9px] md:text-xs font-bold text-slate-700 font-mono">
                                                        AI Control Unit
                                                    </div>
                                                </div>
                                                <div className="h-px bg-gradient-to-r from-blue-400/30 via-blue-300/15 to-blue-400/30 flex-1 mx-2 md:mx-3" />
                                                <div className="bg-slate-50 border border-slate-200 p-2 md:p-3 rounded-lg w-24 md:w-32">
                                                    <div className="h-1.5 md:h-2 w-6 md:w-8 bg-red-500 rounded mb-1.5 md:mb-2" />
                                                    <div className="text-[8px] md:text-[10px] text-slate-500 font-mono">
                                                        Solenoid Valve
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-center">
                                                <div className="h-12 md:h-16 w-px bg-gradient-to-b from-blue-400/25 to-blue-400/5" />
                                            </div>

                                            <div className="bg-slate-50 border border-slate-200 p-2 md:p-3 rounded-lg mx-auto w-36 md:w-48 text-center">
                                                <div className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-wider mb-0.5 md:mb-1 font-mono">
                                                    Wireless Link
                                                </div>
                                                <div className="text-slate-700 font-mono text-xs md:text-sm font-semibold">
                                                    BLE 5.0 / NB-IoT
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-[10px] md:text-xs text-slate-400 mt-4 font-mono tracking-wide">
                            Figure 1.1 — Proposed Embedded Sensor Array
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
