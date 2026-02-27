import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Heart, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './UI';
import { cn } from '../utils/cn';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Chat', path: '/chat' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'About', path: '/about' },
    ];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-500",
            scrolled ? "py-3 glass border-b border-white/10 shadow-xl" : "py-6 bg-transparent"
        )}>
            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-blue-500 origin-left"
                style={{ scaleX }}
            />
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-2 ring-white/10"
                    >
                        <Heart className="text-white w-6 h-6" fill="white" />
                    </motion.div>
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent tracking-tight">Neo</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "text-sm font-black uppercase tracking-widest transition-all duration-300 relative py-1",
                                    location.pathname === link.path ? "text-primary" : "text-muted-foreground/70 hover:text-primary"
                                )}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 border-l border-border pl-10">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-3 rounded-2xl bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.button>
                        <Link to="/login">
                            <Button variant="primary" size="sm" className="px-8 shadow-xl shadow-primary/20">Get Started</Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 rounded-xl bg-muted/50">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-primary">
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 w-full glass border-b border-white/10 overflow-hidden"
                    >
                        <div className="p-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-2xl font-black uppercase tracking-tighter transition-colors",
                                        location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4">
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full py-5 text-xl">Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-muted/30 border-t border-border py-20 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                <Sparkles size={400} className="text-primary" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg">
                                <Heart className="text-white w-5 h-5" fill="white" />
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Neo</span>
                        </Link>
                        <p className="text-lg text-muted-foreground max-w-sm leading-relaxed italic">
                            "Empathetic AI companion helping you navigate life's challenges with clarity, compassion, and deep human insight."
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-primary">Platform</h4>
                        <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                            <li><Link to="/chat" className="hover:text-primary transition-colors">AI Reflection</Link></li>
                            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Mood Insights</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">Our Ethos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-primary">Wellness</h4>
                        <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Ethics</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">User Trust</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
                        &copy; {new Date().getFullYear()} Neo Emotional Guidance System.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                        <span>Encrypted Session</span>
                        <span>v1.0.4 Platinum</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <Navbar />
            <main className="flex-grow pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
};
