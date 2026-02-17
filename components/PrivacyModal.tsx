"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-300/30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors border border-slate-200 z-10"
                        >
                            <X size={18} className="text-slate-500" />
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                                Privacy Policy
                            </h2>
                            <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                                <p className="text-slate-400">Last updated: February 11, 2026</p>
                                <p>
                                    This Privacy Policy describes Our policies and procedures on
                                    the collection, use and disclosure of Your information when You
                                    use the Service and tells You about Your privacy rights and how
                                    the law protects You.
                                </p>

                                <h3 className="text-base font-bold text-slate-700 mt-6">
                                    Interpretation and Definitions
                                </h3>
                                <p>
                                    The words of which the initial letter is capitalized have
                                    meanings defined under the following conditions. The following
                                    definitions shall have the same meaning regardless of whether
                                    they appear in singular or in plural.
                                </p>

                                <h3 className="text-base font-bold text-slate-700 mt-6">
                                    Collecting and Using Your Personal Data
                                </h3>
                                <p>
                                    While using Our Service, We may ask You to provide Us with
                                    certain personally identifiable information that can be used to
                                    contact or identify You. Personally identifiable information
                                    may include, but is not limited to: Email address, First name
                                    and last name, Phone number, Usage Data.
                                </p>

                                <h3 className="text-base font-bold text-slate-700 mt-6">
                                    Security of Your Personal Data
                                </h3>
                                <p>
                                    The security of Your Personal Data is important to Us, but
                                    remember that no method of transmission over the Internet, or
                                    method of electronic storage is 100% secure. While We strive
                                    to use commercially acceptable means to protect Your Personal
                                    Data, We cannot guarantee its absolute security.
                                </p>

                                <h3 className="text-base font-bold text-slate-700 mt-6">
                                    Contact Us
                                </h3>
                                <p>
                                    If you have any questions about this Privacy Policy, You can
                                    contact us:
                                    <br />
                                    By email:{" "}
                                    <a
                                        href="mailto:privacy@threatavoids.com"
                                        className="text-blue-500 hover:underline"
                                    >
                                        privacy@threatavoids.com
                                    </a>
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/20 text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
