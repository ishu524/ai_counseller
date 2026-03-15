import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '../components/UI';
import { Shield, Sparkles, MessageCircle, Users, Zap, Globe, ArrowRight, ShieldCheck, Clock, Lightbulb } from 'lucide-react';
import { cn } from '../utils/cn';

const Hero = () => (
    <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Ambient Floating Shapes */}
        <motion.div
            animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -z-10"
        />
        <motion.div
            animate={{
                y: [0, 20, 0],
                x: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10"
        />

        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-purple-200/20 to-transparent dark:from-purple-900/10" />
        <div className="container mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 inline-block">
                        Meet Neo — Your Personal AI Counsellor
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                        Your Compassionate <br />
                        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">AI Companion</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                        Accessible mental wellness support whenever you need it. Neo listens with empathy and guides you through self-reflection.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center lg:justify-start gap-4"
                >
                    <Link to="/chat">
                        <Button className="px-8 py-4 text-lg">Start Conversation</Button>
                    </Link>
                    <Link to="/about">
                        <Button variant="outline" className="px-8 py-4 text-lg">Learn More</Button>
                    </Link>
                </motion.div>
            </div>

            <div className="flex-1 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-square max-w-md mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                    <Card className="relative z-10 w-full h-full rounded-full border-none p-2 overflow-hidden ring-4 ring-purple-100 dark:ring-purple-900/20 shadow-2xl">
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600/20 to-blue-500/20 flex items-center justify-center">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                                <MessageCircle className="w-32 h-32 text-purple-600" fill="currentColor" opacity={0.2} />
                            </motion.div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    </section>
);

const Features = () => (
    <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <Badge className="mb-4">Why Neo?</Badge>
                <h2 className="text-4xl lg:text-5xl font-black mb-4">Support for every step.</h2>
                <p className="text-muted-foreground text-lg">Compassionate AI guidance tailored to your unique journey.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Mental Stigma", desc: "Neo provides a non-judgmental space to express yourself freely.", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-100" },
                    { title: "Instant Support", desc: "Available 24/7 whenever you need a listening ear or a moment of reflection.", icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
                    { title: "Decision Clarity", desc: "Through reflective questioning, gain a clearer perspective on your choices.", icon: Lightbulb, color: "text-amber-600", bg: "bg-amber-100" },
                ].map((feature, idx) => (
                    <Card key={idx} className="p-10 flex flex-col items-center text-center group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-inner", feature.bg)}
                        >
                            <feature.icon className={cn("w-10 h-10", feature.color)} />
                        </motion.div>
                        <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const HowItWorks = () => (
    <section className="py-20">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-8">How Neo Works</h2>
                    <ul className="space-y-6">
                        {[
                            "Empathetic conversations focused on listening.",
                            "Socratic questioning to help you reach your own conclusions.",
                            "100% Confidential and safe environment.",
                        ].map((text, i) => (
                            <li key={i} className="flex gap-4 items-start">
                                <div className="mt-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                    <ArrowRight className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-lg">{text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                    <Card className="p-8 aspect-square flex flex-col justify-center items-center text-center">
                        <Globe className="w-10 h-10 mb-4 text-blue-500" />
                        <h4 className="font-bold">Multilingual</h4>
                    </Card>
                    <Card className="p-8 aspect-square flex flex-col justify-center items-center text-center mt-8">
                        <Users className="w-10 h-10 mb-4 text-purple-500" />
                        <h4 className="font-bold">Community</h4>
                    </Card>
                </div>
            </div>
        </div>
    </section>
);

const FutureFeatures = () => (
    <section className="py-20 bg-gradient-to-b from-transparent to-purple-50 dark:to-purple-900/10">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Future of Neo</h2>
                <p className="text-muted-foreground">Continuously evolving to support your journey better.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Voice Interaction", desc: "Speak with Neo naturally for more hands-free, organic support.", icon: Zap },
                    { title: "Multilingual Support", desc: "Neo will soon speak over 20 languages to reach everyone.", icon: Globe },
                    { title: "Therapist Integration", desc: "Seamlessly transition to human therapists when extra care is needed.", icon: Users },
                ].map((f, i) => (
                    <Card key={i} className="p-8 border-dashed border-2 border-purple-200 dark:border-purple-800 bg-transparent flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                            <f.icon className="text-purple-600" size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                        <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <Features />
            <HowItWorks />
            <FutureFeatures />

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <Card className="bg-gradient-to-r from-purple-600 to-blue-500 p-12 text-center text-white border-none shadow-2xl">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to start your journey?</h2>
                        <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
                            Neo is here to support you whenever you're ready. No judgment, just empathy.
                        </p>
                        <Link to="/chat">
                            <Button variant="secondary" className="px-10 py-4 text-lg bg-white text-purple-600 hover:bg-neutral-100">
                                Start Chatting Now
                            </Button>
                        </Link>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
