import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, UserCheck, EyeOff, Sparkles, Scale } from 'lucide-react';
import { Card, Badge } from '../components/UI';
import { cn } from '../utils/cn';

const PrivacyPage = () => {
    const points = [
        { title: 'Confidentiality', desc: 'Your conversations with Neo are private, encrypted, and ephemeral.', icon: Lock, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
        { title: 'Total Neutrality', desc: 'Neo provides a safe, non-judgmental space for your truest thoughts.', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { title: 'Self-Powered', desc: 'Neo facilitates reflection; you maintain full agency over your decisions.', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
        { title: 'Transparency', desc: 'We are open about being an AI companion, not a medical service.', icon: Scale, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    ];

    return (
        <div className="container mx-auto px-6 py-20 max-w-5xl space-y-24">
            <div className="text-center space-y-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Badge className="mb-4">Trust & Safety</Badge>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tight">
                        Privacy by <br />
                        <span className="text-gradient">Design.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Your trust is our most valuable asset. We build with transparency and security at every layer.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {points.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="p-10 flex flex-col items-center text-center group cursor-default">
                            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3", p.bg)}>
                                <p.icon className={p.color} size={36} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-black text-2xl">{p.title}</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">{p.desc}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Card className="p-16 border-none relative overflow-hidden bg-white dark:bg-zinc-900/50 shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Sparkles size={250} className="text-primary" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                                <EyeOff size={32} />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Crucial Disclosure</h2>
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed italic">
                            "Neo is a conversational AI designed for emotional support and self-reflection. It is not a licensed therapist, medical provider, or crisis intervention service. If you are in immediate danger or experiencing a mental health emergency, please contact your local emergency services or a qualified professional immediately."
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default PrivacyPage;
