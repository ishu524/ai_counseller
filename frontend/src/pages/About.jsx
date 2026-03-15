import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button } from '../components/UI';
import { Heart, Target, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

const AboutPage = () => {
    const sections = [
        {
            title: 'Our Mission',
            content: 'To empower students and young adults with accessible, empathetic, and confidential mental wellness tools that foster emotional resilience through self-reflection.',
            icon: Target,
            color: 'text-blue-600',
            bg: 'bg-blue-100 dark:bg-blue-900/30'
        },
        {
            title: 'Our Vision',
            content: 'A world where digital wellness companions provide safe, judgment-free spaces for deep reflection, complementing and bridging the gap to professional therapy.',
            icon: Eye,
            color: 'text-purple-600',
            bg: 'bg-purple-100 dark:bg-purple-900/30'
        },
    ];

    return (
        <div className="container mx-auto px-6 py-20 space-y-24">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Badge className="mb-6">The Neo Story</Badge>
                    <h1 className="text-5xl lg:text-7xl font-black mb-6">
                        More than just <br />
                        <span className="text-gradient">Artificial Intelligence.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Neo was born from the belief that every person deserves a compassionate listening ear, especially when life feels overwhelming and professional help feels out of reach.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {sections.map((s, i) => (
                    <Card key={i} className="p-12 space-y-8 group hover:border-primary/30 transition-all cursor-default">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner", s.bg)}
                        >
                            <s.icon className={s.color} size={32} />
                        </motion.div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black">{s.title}</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">{s.content}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-16 border-none relative overflow-hidden bg-white dark:bg-zinc-900/50 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 translate-x-12 -translate-y-12">
                    <Sparkles size={300} className="text-primary" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600">
                            <ShieldCheck size={40} />
                        </div>
                        <h2 className="text-4xl font-black">Why We Choose Neo?</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Our philosophy is simple: clarity comes from within. We provide the mirror; you see the path.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-8 rounded-3xl bg-background/50 border border-white/10 space-y-4">
                            <h4 className="font-black text-xl uppercase tracking-widest text-primary">Reflective Growth</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                We avoid generic advice. Instead, we use Socratic questioning to help you unlock the answers already residing in your heart.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-background/50 border border-white/10 space-y-4">
                            <h4 className="font-black text-xl uppercase tracking-widest text-primary">Total Privacy</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Your journey is yours alone. Every conversation with Neo is encrypted and ephemeral, ensuring a truly safe space for your thoughts.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 text-center">
                        <Link to="/chat">
                            <Button size="lg" className="shadow-2xl shadow-primary/40 px-12">
                                Start Your Journey
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AboutPage;
