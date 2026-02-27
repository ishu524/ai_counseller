import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/UI';
import { cn } from '../utils/cn';

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <Badge variant="primary">Contact Us</Badge>
                        <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                            We're here to <br />
                            <span className="text-gradient">listen.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                            Have questions, feedback, or just want to share your journey? Our team is always ready to hear from you.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {[
                            { icon: Mail, label: 'Email Us', val: 'hello@neo-ai.com', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
                            { icon: MapPin, label: 'Our Office', val: 'Digital Wellness Lab, SF', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex gap-6 items-center group cursor-default"
                            >
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110", item.bg)}>
                                    <item.icon className={item.color} size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                                    <p className="text-xl font-bold">{item.val}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full max-w-xl">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full"
                            >
                                <Card className="p-16 text-center space-y-8 bg-white dark:bg-zinc-900 border-none shadow-2xl">
                                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto text-green-600">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-black">Message Sent!</h2>
                                        <p className="text-muted-foreground text-lg italic">
                                            "Thank you for reaching out. A real human will get back to you within 24 hours."
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => setSubmitted(false)}
                                        variant="outline"
                                        className="mt-4 px-10 rounded-2xl"
                                    >
                                        Send another message
                                    </Button>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Card className="p-10 md:p-12 space-y-8 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                        <Sparkles size={150} className="text-primary" />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black uppercase tracking-tight">Drop a note</h3>
                                        <p className="text-sm text-muted-foreground font-medium">We respond individually to every message.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Your Name</p>
                                            <Input placeholder="Alex Newman" required />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</p>
                                            <Input type="email" placeholder="alex@example.com" required />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Message</p>
                                            <textarea
                                                className="w-full min-h-[160px] px-5 py-4 rounded-2xl bg-white/50 dark:bg-black/50 border-2 border-transparent focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-muted-foreground/30"
                                                placeholder="What's on your mind? We're listening..."
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full shadow-2xl shadow-primary/30"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <Send size={20} /> Send Message
                                                </div>
                                            )}
                                        </Button>
                                    </form>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
