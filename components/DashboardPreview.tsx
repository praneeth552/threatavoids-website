"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Smartphone,
    QrCode,
    ShieldCheck,
    BarChart3,
    Truck,
    RotateCcw,
    Clock,
    CheckCircle2,
    Package,
    FileText,
    Wifi,
    Battery,
    Signal,
} from "lucide-react";

/* ──────────────────────────────────────────────────────
   TYPES & DATA
   ────────────────────────────────────────────────────── */

type FlowMode = "delivery" | "return";

interface FlowStep {
    id: string;
    title: string;
    subtitle: string;
    icon: typeof Smartphone;
}

const DELIVERY_STEPS: FlowStep[] = [
    { id: "home", title: "Open the App", subtitle: "Tap the ThreatAvoids icon on your phone", icon: Smartphone },
    { id: "qr-scan", title: "Scan Cylinder QR", subtitle: "You scan the new cylinder's QR code to verify it", icon: QrCode },
    { id: "totp", title: "Enter Agent's TOTP", subtitle: "Ask the delivery agent for their 6-digit code", icon: Clock },
    { id: "verified", title: "Delivery Verified", subtitle: "Cylinder authenticated and registered to you", icon: CheckCircle2 },
    { id: "dashboard", title: "View Cylinder Stats", subtitle: "Real-time gas level, weight, and safety data", icon: BarChart3 },
];

const RETURN_STEPS: FlowStep[] = [
    { id: "home", title: "Open the App", subtitle: "Delivery agent opens the ThreatAvoids app", icon: Smartphone },
    { id: "return-qr", title: "Agent Scans Cylinder", subtitle: "Agent scans your empty cylinder's QR code", icon: QrCode },
    { id: "totp", title: "Agent Enters Your TOTP", subtitle: "You share your TOTP code with the agent", icon: Clock },
    { id: "returned", title: "Return Confirmed", subtitle: "Cylinder removed from your account", icon: CheckCircle2 },
    { id: "receipt", title: "Digital Receipt", subtitle: "Return logged with timestamp & proof of handover", icon: FileText },
];

/* StatusBar + Notch are now rendered persistently inside PhoneFrame */

/* ──────────────────────────────────────────────────────
   HOME SCREEN  — with realistic app grid
   ────────────────────────────────────────────────────── */

const dummyApps = [
    { name: "Phone", color: "#34C759", icon: "📞" },
    { name: "Messages", color: "#30D158", icon: "💬" },
    { name: "Camera", color: "#636366", icon: "📷" },
    { name: "Photos", color: "#FF9F0A", icon: "🖼️" },
    { name: "Settings", color: "#8E8E93", icon: "⚙️" },
    { name: "Maps", color: "#007AFF", icon: "🗺️" },
    { name: "Clock", color: "#1C1C1E", icon: "🕐" },
];

interface HomeScreenProps {
    onAppLaunch: () => void;
    isLaunching: boolean;
}

const HomeScreen = ({ onAppLaunch, isLaunching }: HomeScreenProps) => {
    return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col pt-8">

            {/* Time display */}
            <div className="text-center mt-4 mb-6">
                <div className="text-white text-[42px] font-extralight leading-none tracking-tight">
                    9:41
                </div>
                <div className="text-white/50 text-[11px] mt-1 font-medium">
                    Sunday, February 16
                </div>
            </div>

            {/* App grid */}
            <div className="flex-1 px-5">
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {dummyApps.map((app) => (
                        <div key={app.name} className="flex flex-col items-center gap-1">
                            <div
                                className="w-[50px] h-[50px] rounded-[12px] flex items-center justify-center text-xl shadow-lg"
                                style={{ backgroundColor: app.color }}
                            >
                                {app.icon}
                            </div>
                            <span className="text-white/80 text-[9px] font-medium">{app.name}</span>
                        </div>
                    ))}

                    {/* ThreatAvoids app icon — the interactive one */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="relative">
                            <motion.button
                                onClick={onAppLaunch}
                                disabled={isLaunching}
                                className="relative w-[50px] h-[50px] rounded-[12px] overflow-hidden shadow-lg cursor-pointer disabled:cursor-default"
                                whileTap={{ scale: 0.85 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {/* App icon background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/threatavoids-logo.png"
                                    alt="ThreatAvoids"
                                    className="relative w-8 h-8 object-contain mx-auto mt-[9px] drop-shadow"
                                />

                                {/* Tap ripple effect */}
                                {isLaunching && (
                                    <motion.div
                                        className="absolute inset-0 bg-white/30"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.4, 0] }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.button>

                            {/* Pulsing hint ring — scoped exactly to icon button */}
                            {!isLaunching && (
                                <motion.div
                                    className="absolute -inset-1.5 rounded-[14px] border-2 border-blue-400/50 pointer-events-none"
                                    animate={{
                                        scale: [1, 1.12, 1],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            )}
                        </div>
                        <span className="text-white/80 text-[9px] font-medium">ThreatAvoids</span>
                    </div>
                </div>
            </div>

            {/* Dock */}
            <div className="pb-4 pt-2 mx-4">
                <div className="flex justify-around bg-white/10 backdrop-blur-xl rounded-[20px] py-2 px-4">
                    {["📞", "✉️", "🧭", "🎵"].map((emoji, i) => (
                        <div key={i} className="w-[44px] h-[44px] rounded-[11px] bg-white/10 flex items-center justify-center text-lg">
                            {emoji}
                        </div>
                    ))}
                </div>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center pb-2">
                <div className="w-[100px] h-[4px] bg-white/30 rounded-full" />
            </div>
        </div>
    );
};

/* ──────────────────────────────────────────────────────
   APP LAUNCH OVERLAY — Android-style container transform
   Home screen scales back, app surface expands from icon
   ────────────────────────────────────────────────────── */

const AppLaunchOverlay = () => (
    <motion.div
        className="absolute inset-0 z-20 flex flex-col overflow-hidden"
        initial={{ scale: 0, borderRadius: "50%" }} // Start as a perfect circle
        animate={{ scale: 1, borderRadius: "0%" }}  // Animate to fill screen
        transition={{
            duration: 0.45,
            ease: [0.2, 0, 0, 1],
        }}
        style={{ transformOrigin: "82% 55%" }}
    >
        {/* App splash background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900" />

        {/* Splash content — fades in slightly after container expansion begins */}
        <motion.div
            className="relative flex-1 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/threatavoids-logo.png"
                alt="ThreatAvoids"
                className="w-20 h-20 object-contain drop-shadow-2xl mb-4"
            />
            <motion.h3
                className="text-white font-bold text-lg tracking-tight"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
            >
                ThreatAvoids
            </motion.h3>
            <motion.p
                className="text-blue-200 text-xs mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.25 }}
            >
                Smart Safety Platform
            </motion.p>

            {/* Loading bar */}
            <motion.div
                className="mt-6 w-32 h-1 bg-white/20 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                <motion.div
                    className="h-full bg-white/80 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                />
            </motion.div>
        </motion.div>
    </motion.div>
);

/* ──────────────────────────────────────────────────────
   QR SCAN SCREEN
   ────────────────────────────────────────────────────── */

const QrScanScreen = ({ mode }: { mode: FlowMode }) => {
    const title = mode === "delivery" ? "SCAN NEW CYLINDER" : "SCAN EMPTY CYLINDER";
    const subtitle = mode === "delivery"
        ? "Point your camera at the QR code on the new cylinder"
        : "Agent scanning the empty cylinder's QR tag";

    return (
        <div className="absolute inset-0 bg-[#0a0a1a] flex flex-col pt-8">
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <motion.p
                    className="text-white/70 text-[10px] font-bold tracking-[3px] mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {title}
                </motion.p>

                {/* QR viewfinder */}
                <motion.div
                    className="relative w-40 h-40 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
                >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />

                    {/* Scanning line */}
                    <motion.div
                        className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                        animate={{ top: ["10%", "90%", "10%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* QR code graphic */}
                    <div className="absolute inset-6 grid grid-cols-3 grid-rows-3 gap-1.5 opacity-40">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-sm ${[0, 2, 6].includes(i) ? "bg-white" : i % 2 === 0 ? "bg-white/60" : "bg-white/30"}`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Scanning indicator */}
                <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-blue-400"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="text-blue-400 text-xs font-semibold">Scanning...</span>
                </motion.div>

                <motion.p
                    className="text-white/40 text-[10px] text-center mt-3 leading-relaxed max-w-[180px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {subtitle}
                </motion.p>
            </div>
        </div>
    );
};

/* ──────────────────────────────────────────────────────
   TOTP SCREEN
   Delivery: User ENTERS the agent's TOTP
   Return: User SHOWS their TOTP to the agent
   ────────────────────────────────────────────────────── */

const TotpScreen = ({ mode }: { mode: FlowMode }) => {
    const [timeLeft, setTimeLeft] = useState(47);
    const [code] = useState(() => {
        const digits = Math.floor(100000 + Math.random() * 900000).toString();
        return digits;
    });

    useEffect(() => {
        const t = setInterval(() => setTimeLeft((p) => (p <= 1 ? 60 : p - 1)), 1000);
        return () => clearInterval(t);
    }, []);

    const title = mode === "delivery" ? "Enter Agent's Code" : "Share Your Code";
    const subtitle = mode === "delivery"
        ? "Ask the delivery agent for their verification code"
        : "Show this code to the agent to authorize return";

    const progress = timeLeft / 60;

    return (
        <div className="absolute inset-0 bg-[#0a0a1a] flex flex-col pt-8">
            <div className="flex-1 flex flex-col items-center justify-center px-3">
                <motion.div
                    className="w-14 h-14 rounded-full bg-blue-500/15 flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <ShieldCheck className="text-blue-400" size={26} />
                </motion.div>

                <motion.p
                    className="text-white/60 text-[10px] font-bold tracking-[2px] uppercase mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {title}
                </motion.p>
                <motion.p
                    className="text-white/30 text-[9px] mb-6 text-center max-w-[180px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    {subtitle}
                </motion.p>

                {/* TOTP code — stretched to use full width */}
                <motion.div
                    className="flex gap-1.5 mb-5 w-full"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                >
                    {code.split("").map((digit, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + i * 0.06 }}
                        >
                            <span className="text-white font-bold text-lg font-mono">{digit}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Timer ring */}
                <motion.div
                    className="relative w-12 h-12 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                        <circle
                            cx="18" cy="18" r="15" fill="none"
                            stroke={timeLeft > 15 ? "#3b82f6" : "#ef4444"}
                            strokeWidth="2"
                            strokeDasharray={`${progress * 94.2} 94.2`}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[11px] font-bold font-mono">
                        {timeLeft}s
                    </span>
                </motion.div>

                <motion.p
                    className="text-white/25 text-[9px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Code refreshes every 60 seconds
                </motion.p>
            </div>
        </div>
    );
};

/* ──────────────────────────────────────────────────────
   VERIFIED / RETURNED SCREEN
   ────────────────────────────────────────────────────── */

const VerifiedScreen = ({ mode }: { mode: FlowMode }) => {
    const isDelivery = mode === "delivery";
    const title = isDelivery ? "Delivered!" : "Returned!";
    const subtitle = isDelivery
        ? "New cylinder verified and registered to your account. View real-time stats below."
        : "Empty cylinder removed from your account. A digital receipt has been generated.";

    return (
        <div className="absolute inset-0 bg-[#0a0a1a] flex flex-col pt-8">
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                {/* Success animation */}
                <motion.div
                    className="relative mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                    {/* Ripple rings */}
                    <motion.div
                        className="absolute -inset-4 rounded-full border-2 border-emerald-400/20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ delay: 0.3, duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -inset-2 rounded-full border border-emerald-400/30"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ delay: 0.5, duration: 1, repeat: Infinity }}
                    />

                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <CheckCircle2 className="text-emerald-400" size={32} />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.h3
                    className="text-white font-bold text-xl mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {title}
                </motion.h3>
                <motion.p
                    className="text-white/40 text-[10px] text-center max-w-[200px] leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {subtitle}
                </motion.p>

                {/* Transaction ID */}
                <motion.div
                    className="mt-6 px-4 py-2 bg-white/5 rounded-lg border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-white/30 text-[8px] uppercase tracking-wider mb-0.5">Transaction ID</p>
                    <p className="text-white/80 text-[10px] font-mono">TA-2026-{isDelivery ? "DLV" : "RTN"}-00847</p>
                </motion.div>
            </div>
        </div>
    );
};

/* ──────────────────────────────────────────────────────
   DASHBOARD SCREEN (Delivery end state)
   ────────────────────────────────────────────────────── */

const DashboardScreen = () => {
    const stats = [
        { label: "Gas Level", value: "92%", color: "text-emerald-400", bar: 92 },
        { label: "Weight", value: "14.1 kg", color: "text-blue-400", bar: 94 },
        { label: "Pressure", value: "Normal", color: "text-emerald-400", bar: 78 },
        { label: "Temperature", value: "24°C", color: "text-amber-400", bar: 48 },
    ];

    return (
        <div className="absolute inset-0 bg-[#0a0a1a] flex flex-col pt-8">
            <div className="px-4 pt-1">
                <motion.div
                    className="flex items-center justify-between mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <p className="text-white/40 text-[9px] font-medium">Cylinder ID</p>
                        <p className="text-white font-bold text-sm">HP-14.2KG-#4829</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="bg-white/5 rounded-xl p-3 border border-white/5"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                        >
                            <p className="text-white/40 text-[8px] uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className={`${stat.color} font-bold text-sm mb-1.5`}>{stat.value}</p>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full bg-current"
                                    style={{ color: "currentColor" }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stat.bar}%` }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Safety status */}
                <motion.div
                    className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20 flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <ShieldCheck className="text-emerald-400" size={18} />
                    <div>
                        <p className="text-emerald-400 text-[10px] font-bold">All Systems Normal</p>
                        <p className="text-white/30 text-[8px]">Last checked: Just now</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

/* ──────────────────────────────────────────────────────
   RECEIPT SCREEN (Return end state)
   ────────────────────────────────────────────────────── */

const ReceiptScreen = () => (
    <div className="absolute inset-0 bg-[#0a0a1a] flex flex-col pt-8">
        <div className="flex-1 px-4 pt-1">
            <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <FileText className="text-blue-400" size={16} />
                <h3 className="text-white font-bold text-sm">Return Receipt</h3>
            </motion.div>

            <motion.div
                className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {[
                    { label: "Cylinder", value: "HP-14.2KG-#4829" },
                    { label: "Status", value: "Returned", highlight: true },
                    { label: "Date", value: "Feb 16, 2026" },
                    { label: "Time", value: "9:42 AM" },
                    { label: "Agent ID", value: "AGT-1247" },
                    { label: "Transaction", value: "TA-2026-RTN-00847" },
                ].map((row, i) => (
                    <motion.div
                        key={row.label}
                        className="flex items-center justify-between pb-2 border-b border-white/5 last:border-0 last:pb-0"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                    >
                        <span className="text-white/40 text-[9px]">{row.label}</span>
                        <span className={`text-[10px] font-semibold ${row.highlight ? "text-emerald-400" : "text-white/80"}`}>
                            {row.value}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Digital signature stamp */}
            <motion.div
                className="mt-4 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
            >
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-400/30 flex items-center justify-center">
                    <div className="text-center">
                        <CheckCircle2 className="text-emerald-400 mx-auto" size={20} />
                        <p className="text-emerald-400 text-[7px] font-bold mt-1">VERIFIED</p>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

/* ──────────────────────────────────────────────────────
   PHONE FRAME — realistic device shell
   ────────────────────────────────────────────────────── */

interface PhoneFrameProps {
    children: React.ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => (
    <div className="relative mx-auto" style={{ width: 260, height: 530 }}>
        {/* Outer phone shell */}
        <div
            className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-2xl"
            style={{
                boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset, 4px 0 8px rgba(0,0,0,0.3), -4px 0 8px rgba(0,0,0,0.3)",
            }}
        />
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[100px] w-[3px] h-[26px] bg-[#333] rounded-l-sm" />
        <div className="absolute -left-[2px] top-[140px] w-[3px] h-[42px] bg-[#333] rounded-l-sm" />
        <div className="absolute -left-[2px] top-[190px] w-[3px] h-[42px] bg-[#333] rounded-l-sm" />
        <div className="absolute -right-[2px] top-[150px] w-[3px] h-[55px] bg-[#333] rounded-r-sm" />

        {/* Screen bezel */}
        <div className="absolute inset-[4px] rounded-[32px] bg-black overflow-hidden">
            {/* Screen content */}
            {children}

            {/* Persistent status bar + notch — always on top */}
            <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
                <div className="flex items-center justify-between px-5 pt-2 pb-1 text-white text-[11px] font-medium">
                    <span>9:41</span>
                    <div className="absolute left-1/2 -translate-x-1/2 top-1 w-[80px] h-[22px] bg-black rounded-full" />
                    <div className="flex items-center gap-1">
                        <Signal size={12} />
                        <Wifi size={12} />
                        <Battery size={12} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

/* ──────────────────────────────────────────────────────
   MAIN DASHBOARD PREVIEW COMPONENT
   ────────────────────────────────────────────────────── */

export const DashboardPreview = () => {
    const [activeFlow, setActiveFlow] = useState<FlowMode>("delivery");
    const [currentStep, setCurrentStep] = useState(0);
    const [isLaunching, setIsLaunching] = useState(false);
    const [showSplash, setShowSplash] = useState(false);
    const [appOpen, setAppOpen] = useState(false);

    const steps = activeFlow === "delivery" ? DELIVERY_STEPS : RETURN_STEPS;

    const resetFlow = useCallback(() => {
        setCurrentStep(0);
        setIsLaunching(false);
        setShowSplash(false);
        setAppOpen(false);
    }, []);

    // Switch tab → reset
    useEffect(() => {
        resetFlow();
    }, [activeFlow, resetFlow]);

    // Auto-advance through the flow once app is open
    useEffect(() => {
        if (!appOpen) return;

        // Steps 1-4 auto-advance every 3 seconds
        if (currentStep >= 1 && currentStep < steps.length - 1) {
            const timer = setTimeout(() => setCurrentStep((s) => s + 1), 3000);
            return () => clearTimeout(timer);
        }

        // Final step stays for 5 seconds then loops back
        if (currentStep === steps.length - 1) {
            const timer = setTimeout(() => resetFlow(), 5000);
            return () => clearTimeout(timer);
        }
    }, [appOpen, currentStep, steps.length, resetFlow]);

    // Handle app icon tap → launch sequence
    const handleAppLaunch = () => {
        if (isLaunching) return;
        setIsLaunching(true);

        // Step 1: Show splash overlay after tap feedback
        setTimeout(() => setShowSplash(true), 150);

        // Step 2: Transition to first in-app screen
        setTimeout(() => {
            setAppOpen(true);
            setCurrentStep(1);
            // Significant delay (300ms) to ensure next screen is fully painted behind splash
            setTimeout(() => setShowSplash(false), 300);
        }, 1800);
    };

    // Render the current phone screen content
    const renderScreen = () => {
        if (!appOpen && !showSplash) {
            return <HomeScreen onAppLaunch={handleAppLaunch} isLaunching={isLaunching} />;
        }

        // In-app screens based on step
        const stepId = steps[currentStep]?.id;

        switch (stepId) {
            case "qr-scan":
            case "return-qr":
                return <QrScanScreen mode={activeFlow} />;
            case "totp":
                return <TotpScreen mode={activeFlow} />;
            case "verified":
            case "returned":
                return <VerifiedScreen mode={activeFlow} />;
            case "dashboard":
                return <DashboardScreen />;
            case "receipt":
                return <ReceiptScreen />;
            default:
                return <HomeScreen onAppLaunch={handleAppLaunch} isLaunching={isLaunching} />;
        }
    };

    return (
        <section
            id="app-prototype"
            className="relative py-24 md:py-32 bg-[#faf8f5] overflow-hidden"
        >
            {/* Subtle background texture */}
            <div className="absolute inset-0 blueprint-grid opacity-30" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-blue-200 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                        <Smartphone size={14} />
                        Proposed User Interface
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        The Consumer Experience
                    </h2>
                    <p className="text-slate-500 leading-relaxed">
                        Two distinct workflows — one for receiving a new cylinder, another for returning an empty one.
                        Each flow is secured with real-time QR verification and rotating TOTP codes.
                    </p>
                </motion.div>

                {/* Flow Tab Switcher */}
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200/80">
                        {([
                            { mode: "delivery" as FlowMode, label: "New Cylinder Delivery", icon: Truck },
                            { mode: "return" as FlowMode, label: "Empty Cylinder Return", icon: RotateCcw },
                        ]).map(({ mode, label, icon: Icon }) => (
                            <button
                                key={mode}
                                onClick={() => setActiveFlow(mode)}
                                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${activeFlow === mode
                                    ? "text-white"
                                    : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                {activeFlow === mode && (
                                    <motion.div
                                        layoutId="activeFlowTab"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <Icon size={16} />
                                    {label}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Content Grid: Steps + Phone */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Flow steps */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Flow description */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                {activeFlow === "delivery"
                                    ? "Secure Cylinder Delivery"
                                    : "Verified Cylinder Return"}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {activeFlow === "delivery"
                                    ? "When the delivery agent arrives with a new cylinder, you open the ThreatAvoids app and scan the cylinder's QR code. Then you ask the agent for their TOTP verification code, enter it in your app, and once verified — the cylinder is registered to your account with full real-time analytics."
                                    : "When returning an empty cylinder, the delivery agent scans the cylinder's QR code using their device and asks you for your TOTP code. Once the agent enters and verifies it, the cylinder is removed from your account and a tamper-proof digital receipt is generated."}
                            </p>
                        </div>

                        {/* Step cards */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFlow}
                                className="space-y-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {steps.map((step, i) => {
                                    const isActive = currentStep === i;
                                    const isDone = currentStep > i;
                                    const StepIcon = step.icon;

                                    return (
                                        <motion.div
                                            key={step.id}
                                            className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-300 ${isActive
                                                ? "bg-blue-50 border-blue-200 shadow-sm"
                                                : isDone
                                                    ? "bg-emerald-50/50 border-emerald-200/50"
                                                    : "bg-white/70 border-slate-200/60"
                                                }`}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                        >
                                            {/* Step number / check */}
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isActive
                                                ? "bg-blue-500 text-white"
                                                : isDone
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-slate-100 text-slate-400"
                                                }`}>
                                                {isDone ? (
                                                    <CheckCircle2 size={14} />
                                                ) : (
                                                    <StepIcon size={14} />
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <p className={`text-sm font-semibold ${isActive ? "text-blue-700" : isDone ? "text-emerald-700" : "text-slate-700"}`}>
                                                    {step.title}
                                                </p>
                                                <p className={`text-xs ${isActive ? "text-blue-500" : isDone ? "text-emerald-500" : "text-slate-400"}`}>
                                                    {step.subtitle}
                                                </p>
                                            </div>

                                            {/* Active pulse */}
                                            {isActive && (
                                                <motion.div
                                                    className="ml-auto flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"
                                                    animate={{ opacity: [1, 0.3, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>

                        {/* Tap hint */}
                        {currentStep === 0 && !isLaunching && (
                            <motion.p
                                className="mt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
                                Tap the ThreatAvoids icon on the phone to begin
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Right: Phone mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <PhoneFrame>
                            {/* Home screen layer — scales back during launch only */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    scale: (isLaunching && !appOpen) ? 0.92 : 1,
                                    opacity: (isLaunching && !appOpen) ? 0.5 : 1,
                                }}
                                transition={{
                                    duration: (isLaunching && !appOpen) ? 0.35 : 0,
                                    ease: [0.2, 0, 0, 1],
                                }}
                                style={{ transformOrigin: "center center" }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${activeFlow}-${currentStep}`} // Stable key: doesn't change when splash toggles
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {renderScreen()}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>

                            {/* App launch overlay — expands from icon position */}
                            <AnimatePresence>
                                {showSplash && <AppLaunchOverlay />}
                            </AnimatePresence>
                        </PhoneFrame>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
