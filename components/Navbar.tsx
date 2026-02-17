"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = ["Vision", "The Device", "Remote Safety", "App Prototype"];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-[#faf8f5]/90 backdrop-blur-xl border-b border-slate-200/60 py-3 shadow-sm"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center space-x-3 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/threatavoids-logo.png"
                        alt="ThreatAvoids Logo"
                        className="w-9 h-9 rounded-lg object-contain"
                    />
                    <span className="text-lg font-bold text-slate-800 tracking-tight">
                        ThreatAvoids
                        <span className="text-[10px] font-medium text-slate-400 ml-2 border border-slate-300 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Beta
                        </span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                            className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {item}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
                    >
                        Contact Us
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-slate-500 hover:text-slate-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[#faf8f5]/95 backdrop-blur-xl border-b border-slate-200/60 overflow-hidden"
                    >
                        <div className="px-6 py-6 space-y-4 flex flex-col">
                            {navLinks.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                                    className="text-base font-medium text-slate-500 hover:text-blue-600 transition-colors py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="bg-blue-600 text-white w-full py-3 rounded-lg text-base font-semibold flex items-center justify-center mt-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
