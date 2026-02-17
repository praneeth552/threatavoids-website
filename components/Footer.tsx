"use client";

import { Instagram, Linkedin, Mail } from "lucide-react";

interface FooterProps {
    onOpenPrivacy: () => void;
}

export const Footer = ({ onOpenPrivacy }: FooterProps) => {
    return (
        <footer className="bg-[#f1ede8] text-slate-500 py-16 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/threatavoids-logo.png"
                                alt="ThreatAvoids Logo"
                                className="w-10 h-10 rounded-lg object-contain"
                            />
                            <span className="text-lg font-bold text-slate-800 tracking-tight">
                                ThreatAvoids
                            </span>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed mb-6 text-slate-500">
                            Revolutionizing LPG logistics with IoT-enabled security and
                            real-time monitoring. Designed for integration with major energy
                            providers to ensure safety in every home.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Instagram, href: "https://www.instagram.com/threat_avoids", label: "Instagram" },
                                { icon: Linkedin, href: "https://www.linkedin.com/company/threatavoids/", label: "LinkedIn" },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="text-slate-400 hover:text-blue-500 transition-colors duration-300"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Solution Links */}
                    <div>
                        <h4 className="text-slate-700 font-semibold mb-6 text-sm uppercase tracking-wider">
                            Solution
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { label: "Vision", href: "#vision" },
                                { label: "The Device", href: "#the-device" },
                                { label: "Features", href: "#features" },
                                { label: "App Prototype", href: "#app-prototype" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-slate-500 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-slate-700 font-semibold mb-6 text-sm uppercase tracking-wider">
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="#vision"
                                    className="text-slate-500 hover:text-blue-500 transition-colors duration-300"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-slate-500 hover:text-blue-500 transition-colors duration-300"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={onOpenPrivacy}
                                    className="text-slate-500 hover:text-blue-500 transition-colors duration-300 text-left"
                                >
                                    Privacy Policy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-300/50 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
                    <p className="text-slate-400">
                        &copy; {new Date().getFullYear()} ThreatAvoids. All rights
                        reserved.
                    </p>
                    <div className="flex items-center space-x-2 text-slate-500">
                        <Mail size={14} />
                        <a
                            href="mailto:ajaymuley2799@gmail.com"
                            className="hover:text-blue-500 transition-colors duration-300"
                        >
                            ajaymuley2799@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
