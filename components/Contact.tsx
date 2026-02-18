"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Send,
    CheckCircle2,
    AlertCircle,
    Handshake,
    Lightbulb,
    HelpCircle,
    ArrowRight,
    ArrowLeft,
    Mail,
    User,
    MessageSquare,
    Sparkles,
} from "lucide-react";

const INQUIRY_TYPES = [
    {
        id: "partnership",
        icon: Handshake,
        label: "Partnership",
        description: "OEM integration & business",
        color: "blue",
    },
    {
        id: "investor",
        icon: Lightbulb,
        label: "Investment",
        description: "Funding & investor relations",
        color: "emerald",
    },
    {
        id: "general",
        icon: HelpCircle,
        label: "General",
        description: "Questions & feedback",
        color: "violet",
    },
];

const colorClasses: Record<string, { ring: string; bg: string; text: string; border: string; glow: string }> = {
    blue: { ring: "ring-blue-500", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-300", glow: "shadow-blue-500/20" },
    emerald: { ring: "ring-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-300", glow: "shadow-emerald-500/20" },
    violet: { ring: "ring-violet-500", bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-300", glow: "shadow-violet-500/20" },
};

export const Contact = () => {
    const [step, setStep] = useState(0); // 0 = type select, 1 = form, 2 = success
    const [inquiryType, setInquiryType] = useState<string | null>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const selectedType = INQUIRY_TYPES.find((t) => t.id === inquiryType);
    const selectedColor = selectedType ? colorClasses[selectedType.color] : colorClasses.blue;

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!formState.name.trim()) newErrors.name = "Please enter your name";
        if (!formState.email.trim()) newErrors.email = "Please enter your email";
        else if (!validateEmail(formState.email)) newErrors.email = "Please enter a valid email";
        if (!formState.message.trim()) newErrors.message = "Please enter your message";
        else if (formState.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep1()) return;

        setStatus("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    subject: `[${selectedType?.label || "General"}] Inquiry from ${formState.name}`,
                    message: formState.message,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong.");

            setStatus("success");
            setStep(2);
        } catch (err) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleReset = () => {
        setStep(0);
        setInquiryType(null);
        setFormState({ name: "", email: "", message: "" });
        setErrors({});
        setStatus("idle");
        setErrorMsg("");
    };

    return (
        <section id="contact" className="relative py-24 md:py-32 bg-[#faf8f5] overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-30" />
            <div className="absolute top-0 left-1/3 w-[30%] h-[40%] bg-blue-300/[0.05] blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-[25%] h-[35%] bg-violet-300/[0.04] blur-[80px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-blue-300 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                        <Mail size={14} />
                        Connect With Us
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Let&apos;s Build the Future of Safety
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Whether you&apos;re an energy company, investor, or just curious
                        — we&apos;d love to hear from you.
                    </p>
                </motion.div>

                {/* ─── Step Indicator ─── */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    {["Inquiry Type", "Your Details", "Done"].map((label, i) => (
                        <div key={label} className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${step > i
                                            ? "bg-emerald-500 text-white"
                                            : step === i
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                                : "bg-slate-200 text-slate-400"
                                        }`}
                                >
                                    {step > i ? <CheckCircle2 size={14} /> : i + 1}
                                </div>
                                <span
                                    className={`text-xs font-medium hidden sm:block transition-colors duration-300 ${step >= i ? "text-slate-700" : "text-slate-400"
                                        }`}
                                >
                                    {label}
                                </span>
                            </div>
                            {i < 2 && (
                                <div
                                    className={`w-8 sm:w-12 h-[2px] rounded-full transition-colors duration-500 ${step > i ? "bg-emerald-500" : "bg-slate-200"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* ─── Card Container ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto relative"
                >
                    {/* Gradient border glow */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-400/20 via-transparent to-violet-400/20 rounded-[1.1rem] pointer-events-none" />

                    <div className="relative bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl p-8 md:p-10 rounded-2xl overflow-hidden">
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-violet-50 to-transparent rounded-tr-full pointer-events-none" />

                        <AnimatePresence mode="wait">
                            {/* ─── Step 0: Inquiry Type ─── */}
                            {step === 0 && (
                                <motion.div
                                    key="step-0"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                                        What brings you here?
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-6">
                                        Select the type of inquiry so we can route you to the right team.
                                    </p>

                                    <div className="grid gap-3">
                                        {INQUIRY_TYPES.map((type) => {
                                            const Icon = type.icon;
                                            const colors = colorClasses[type.color];
                                            const isSelected = inquiryType === type.id;
                                            return (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setInquiryType(type.id)}
                                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-300 group ${isSelected
                                                            ? `${colors.border} ${colors.bg} shadow-lg ${colors.glow}`
                                                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${isSelected
                                                                ? `${colors.bg} ${colors.text}`
                                                                : "bg-slate-100 text-slate-400 group-hover:text-slate-500"
                                                            }`}
                                                    >
                                                        <Icon size={20} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className={`font-semibold text-sm ${isSelected ? "text-slate-800" : "text-slate-700"}`}>
                                                            {type.label}
                                                        </div>
                                                        <div className="text-xs text-slate-400">
                                                            {type.description}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected
                                                                ? `${colors.border} ${colors.bg}`
                                                                : "border-slate-300"
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className={`w-2.5 h-2.5 rounded-full ${type.color === "blue"
                                                                        ? "bg-blue-500"
                                                                        : type.color === "emerald"
                                                                            ? "bg-emerald-500"
                                                                            : "bg-violet-500"
                                                                    }`}
                                                            />
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => inquiryType && setStep(1)}
                                        disabled={!inquiryType}
                                        className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 disabled:shadow-none"
                                    >
                                        Continue
                                        <ArrowRight size={16} />
                                    </button>
                                </motion.div>
                            )}

                            {/* ─── Step 1: Form Fields ─── */}
                            {step === 1 && (
                                <motion.div
                                    key="step-1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Back + context */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <button
                                            onClick={() => setStep(0)}
                                            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all"
                                        >
                                            <ArrowLeft size={14} />
                                        </button>
                                        <div className="flex items-center gap-2">
                                            {selectedType && (
                                                <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${selectedColor.bg} ${selectedColor.text}`}>
                                                    {selectedType.label}
                                                </div>
                                            )}
                                            <span className="text-sm text-slate-400">inquiry</span>
                                        </div>
                                    </div>

                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                                        {/* Name */}
                                        <div>
                                            <div className={`relative flex items-center rounded-xl border-2 transition-all duration-300 bg-white ${errors.name ? "border-red-300" : "border-slate-200 focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-500/10"}`}>
                                                <div className="pl-4 text-slate-300">
                                                    <User size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formState.name}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-3.5 bg-transparent text-slate-800 placeholder:text-slate-400 outline-none text-sm"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            {errors.name && (
                                                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 mt-1.5 ml-1 flex items-center gap-1">
                                                    <AlertCircle size={12} /> {errors.name}
                                                </motion.p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <div className={`relative flex items-center rounded-xl border-2 transition-all duration-300 bg-white ${errors.email ? "border-red-300" : "border-slate-200 focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-500/10"}`}>
                                                <div className="pl-4 text-slate-300">
                                                    <Mail size={18} />
                                                </div>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formState.email}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-3.5 bg-transparent text-slate-800 placeholder:text-slate-400 outline-none text-sm"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                            {errors.email && (
                                                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 mt-1.5 ml-1 flex items-center gap-1">
                                                    <AlertCircle size={12} /> {errors.email}
                                                </motion.p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <div className={`relative rounded-xl border-2 transition-all duration-300 bg-white ${errors.message ? "border-red-300" : "border-slate-200 focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-500/10"}`}>
                                                <div className="absolute top-3.5 left-4 text-slate-300">
                                                    <MessageSquare size={18} />
                                                </div>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={4}
                                                    value={formState.message}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-slate-800 placeholder:text-slate-400 outline-none resize-none text-sm"
                                                    placeholder="Tell us how we can help you..."
                                                />
                                            </div>
                                            <div className="flex items-center justify-between mt-1.5 ml-1">
                                                {errors.message ? (
                                                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 flex items-center gap-1">
                                                        <AlertCircle size={12} /> {errors.message}
                                                    </motion.p>
                                                ) : (
                                                    <span className="text-[11px] text-slate-300">Min 10 characters</span>
                                                )}
                                                <span className={`text-[11px] ${formState.message.length >= 10 ? "text-emerald-500" : "text-slate-300"}`}>
                                                    {formState.message.length}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Error message */}
                                        {status === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-200"
                                            >
                                                <AlertCircle size={16} className="flex-shrink-0" />
                                                <p>{errorMsg || "Something went wrong. Please try again."}</p>
                                            </motion.div>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
                                        >
                                            {status === "submitting" ? (
                                                <span className="flex items-center gap-2">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <>
                                                    <Send size={16} />
                                                    Send Message
                                                </>
                                            )}
                                        </button>

                                        <p className="text-[11px] text-center text-slate-400">
                                            Your data is sent directly to our team via encrypted SMTP. We never share your information.
                                        </p>
                                    </form>
                                </motion.div>
                            )}

                            {/* ─── Step 2: Success ─── */}
                            {step === 2 && (
                                <motion.div
                                    key="step-2"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-center py-6"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
                                        className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-200 shadow-lg shadow-emerald-500/10"
                                    >
                                        <Sparkles size={28} />
                                    </motion.div>

                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                        We got your message!
                                    </h3>
                                    <p className="text-slate-500 mb-2 text-sm">
                                        Our team will get back to you within 24 hours via email.
                                    </p>
                                    <p className="text-xs text-slate-400 mb-8">
                                        Sent as: <span className="font-medium text-slate-500">{selectedType?.label}</span> inquiry
                                    </p>

                                    <button
                                        onClick={handleReset}
                                        className="text-sm text-blue-600 hover:text-blue-500 font-semibold transition-colors"
                                    >
                                        Send another message →
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
