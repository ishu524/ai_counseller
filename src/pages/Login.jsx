import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Input, Badge } from '../components/UI';
import { Mail, Lock, Heart, Sparkles, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10 space-y-4">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30 ring-4 ring-white/10"
                    >
                        <Heart size={40} className="text-white" fill="white" />
                    </motion.div>
                    <Badge>Welcome Back</Badge>
                    <h1 className="text-4xl font-black tracking-tight">
                        Continue your <span className="text-gradient">Journey.</span>
                    </h1>
                    <p className="text-muted-foreground font-medium italic">"Every step forward is a victory."</p>
                </div>

                <Card className="p-10 space-y-8 border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                        <Sparkles size={120} className="text-primary" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Identity</p>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="pl-12 h-14 bg-white/50 dark:bg-black/20"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            {errors.email && <p className="text-[10px] font-bold text-red-500 ml-2 uppercase tracking-tight">{errors.email}</p>}
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Security Key</p>
                                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 h-14 bg-white/50 dark:bg-black/20"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            {errors.password && <p className="text-[10px] font-bold text-red-500 ml-2 uppercase tracking-tight">{errors.password}</p>}
                        </div>

                        <Button type="submit" size="lg" className="w-full h-14 shadow-2xl shadow-primary/30" disabled={loading}>
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    Validating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    Sign In <ArrowRight size={20} />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="text-center pt-6 border-t border-border">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">New to Neo?</p>
                        <Link to="/signup">
                            <Button variant="outline" className="w-full h-12 rounded-2xl border-2">
                                Create Your Account
                            </Button>
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default LoginPage;
