import React from 'react';
import { motion } from 'framer-motion';
import { Smile, MessageSquare, TrendingUp, Lightbulb, Calendar, ArrowUpRight, Sparkles, Heart } from 'lucide-react';
import { Card, Button } from '../components/UI';
import { cn } from '../utils/cn';

const DashboardPage = () => {
    const stats = [
        { label: 'Mood Today', value: 'Calm', icon: Smile, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
        { label: 'Conversations', value: '12', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
        { label: 'Wellness Score', value: '88%', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { label: 'Reflections', value: '5', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    ];

    const history = [
        { date: 'Oct 24', title: 'Managing work stress', type: 'Reflection' },
        { date: 'Oct 22', title: 'Decision on final project', type: 'Reflective' },
        { date: 'Oct 20', title: 'Morning anxiety check-in', type: 'Calming' },
    ];
    
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Alex' };

    return (
        <div className="container mx-auto px-6 py-8 space-y-12">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold">Good morning, {user.name}</h1>
                <p className="text-muted-foreground">Here's a look at your wellness journey this week.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="flex items-center gap-4 p-6 border-none shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-shadow">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-black">{stat.value}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Section */}
                <div className="lg:col-span-2 space-y-10">
                    <Card className="relative overflow-hidden p-10 border-none bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl">
                        <div className="relative z-10 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/30">
                                <Sparkles size={12} /> Daily Insight
                            </div>
                            <h2 className="text-3xl font-black italic leading-tight max-w-lg">
                                "I am capable of navigating through uncertainty with grace. Every challenge is an opportunity for growth."
                            </h2>
                            <div className="pt-4 flex flex-wrap gap-4">
                                <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-neutral-100 font-bold px-8 shadow-xl">
                                    Deep Dive
                                </Button>
                                <Button variant="ghost" className="text-white hover:bg-white/10 px-8 ring-1 ring-white/30">
                                    Save Quote
                                </Button>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                            <Heart size={300} fill="white" />
                        </div>
                    </Card>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Calendar size={20} className="text-purple-600" />
                            Recent Conversations
                        </h3>
                        <div className="space-y-3">
                            {history.map((item, i) => (
                                <Card key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm font-medium text-muted-foreground w-12">{item.date}</div>
                                        <div>
                                            <h4 className="font-semibold group-hover:text-purple-600 transition-colors">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground">{item.type} session</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-purple-600 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <Card className="p-8 space-y-6">
                        <h3 className="font-bold text-lg">Wellness Progress</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Consistency', value: 75 },
                                { label: 'Reflection Detail', value: 60 },
                                { label: 'Emotional Clarity', value: 90 },
                            ].map((bar, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>{bar.label}</span>
                                        <span className="font-bold">{bar.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${bar.value}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                            className="h-full bg-purple-600 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp size={20} className="text-primary" /> Mood Analytics
                        </h3>
                        <Card className="min-h-[300px] flex flex-col justify-end p-8 relative overflow-hidden bg-white dark:bg-zinc-900 border-none shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                            <div className="h-full w-full flex items-end justify-between items-stretch gap-2 mb-8 relative z-10">
                                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                                            className="w-full bg-gradient-to-t from-primary to-purple-400 rounded-t-lg group-hover:brightness-110 transition-all relative"
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {h}%
                                            </div>
                                        </motion.div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center relative z-10">
                                <div className="space-y-1">
                                    <p className="text-2xl font-black">82% Positive</p>
                                    <p className="text-xs text-muted-foreground font-bold italic">Your mood is trending upwards this week.</p>
                                </div>
                                <Button variant="outline" size="sm">Full Report</Button>
                            </div>
                        </Card>
                    </section>

                    <Card className="p-8 bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800">
                        <h3 className="font-bold text-lg mb-2">Neo's Tip</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Try deep breathing for 2 minutes before your next session. It helps focus your reflections.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
