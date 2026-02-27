import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
        primary: 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]',
        secondary: 'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98]',
        outline: 'border-2 border-primary/20 bg-transparent hover:bg-primary/5 hover:border-primary/40',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        glass: 'glass text-foreground hover:bg-white/40 dark:hover:bg-white/10 shadow-xl',
    };

    const sizes = {
        sm: 'h-9 px-4 text-xs rounded-xl font-bold uppercase tracking-wider',
        md: 'h-11 px-6 text-sm rounded-2xl font-bold uppercase tracking-wider',
        lg: 'h-14 px-10 text-base rounded-3xl font-black uppercase tracking-widest',
    };

    return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                'inline-flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

export const Card = React.forwardRef(({ className, children, ...props }, ref) => (
    <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={cn('glass-card', className)}
        {...props}
    >
        {children}
    </motion.div>
));

export const Input = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                'w-full px-5 py-3 rounded-2xl bg-white/50 dark:bg-black/50 border-2 border-transparent focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-muted-foreground/50',
                className
            )}
            {...props}
        />
    );
});

export const Badge = ({ children, className, variant = 'primary' }) => {
    const variants = {
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary text-secondary-foreground border-border',
        success: 'bg-green-500/10 text-green-600 border-green-500/20',
    };

    return (
        <span className={cn(
            'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};
