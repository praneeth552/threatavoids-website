"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export const Contact = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formState),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setStatus("success");
            setFormState({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err) {
            setStatus("error");
            setErrorMsg(
                err instanceof Error ? err.message : "Failed to send message."
            );
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section
            id="contact"
            className="relative py-24 md:py-32 bg-[#faf8f5] overflow-hidden"
        >
            <div className="absolute inset-0 blueprint-grid opacity-30" />
            <div className="absolute top-0 left-1/3 w-[30%] h-[40%] bg-blue-300/[0.05] blur-[100px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-slate-500">
                        Interested in our technology or partnership opportunities? Reach out
                        to our team.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto bg-white/80 border border-slate-200 shadow-lg p-8 md:p-10 rounded-2xl"
                >
                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                Message Sent!
                            </h3>
                            <p className="text-slate-500">
                                Thank you for reaching out. Our team will get back to you
                                shortly via email.
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-slate-600 mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all outline-none"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-slate-600 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all outline-none"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-slate-600 mb-2"
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formState.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all outline-none"
                                    placeholder="Partnership Inquiry"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-slate-600 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all outline-none resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
                            >
                                {status === "submitting" ? (
                                    <span className="animate-pulse font-semibold">
                                        Sending...
                                    </span>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                            {status === "error" && (
                                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 mt-4">
                                    <AlertCircle size={16} className="flex-shrink-0" />
                                    <p>{errorMsg || "Something went wrong. Please try again."}</p>
                                </div>
                            )}

                            <div className="flex items-start gap-2 text-xs text-slate-500 mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <AlertCircle
                                    size={14}
                                    className="mt-0.5 flex-shrink-0 text-slate-400"
                                />
                                <p>
                                    Your message is sent directly to our team via secure SMTP.
                                </p>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};
