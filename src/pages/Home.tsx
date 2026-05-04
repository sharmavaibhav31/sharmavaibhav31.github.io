import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { AboutSection } from '../components/sections/AboutSection';
import { CertificationsSection } from '../components/sections/CertificationsSection';
import { useIntersectionObserver } from '../hooks/useScrollReveal';


const PortfolioContent: React.FC = () => {
    useIntersectionObserver();


    return (
        <div className="min-h-screen">
            <Header />
            <main id="main-content">
                <HeroSection />
                <ProjectsSection />
                <ExperienceSection />
                <CapabilitiesSection />
                <CertificationsSection />
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
};

export const Home: React.FC = () => (
    <ThemeProvider>
        <PortfolioContent />
    </ThemeProvider>
);
