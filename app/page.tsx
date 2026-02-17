"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Hardware } from "@/components/Hardware";
import { Features } from "@/components/Features";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PrivacyModal } from "@/components/PrivacyModal";

export default function Home() {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#faf8f5] text-slate-800 font-sans">
            <Navbar />
            <main>
                <Hero />
                <Hardware />
                <Features />
                <DashboardPreview />
                <Contact />
            </main>
            <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />
            <PrivacyModal
                isOpen={isPrivacyOpen}
                onClose={() => setIsPrivacyOpen(false)}
            />
        </div>
    );
}
