import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, AlertCircle, RefreshCw } from 'lucide-react';
import { Button, Card, Input } from '../components/UI';
import { cn } from '../utils/cn';
import axios from 'axios';

const ChatMessage = ({ message, isAI }) => (
    <motion.div
        initial={{ opacity: 0, x: isAI ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
            "flex w-full mb-6",
            isAI ? "justify-start" : "justify-end"
        )}
    >
        <div className={cn(
            "flex max-w-[80%] gap-3",
            !isAI && "flex-row-reverse"
        )}>
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md",
                isAI ? "bg-purple-600 text-white" : "bg-blue-500 text-white"
            )}>
                {isAI ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className={cn(
                "p-4 rounded-2xl shadow-sm",
                isAI ? "bg-white dark:bg-zinc-800 rounded-tl-none border border-border" : "bg-purple-600 text-white rounded-tr-none"
            )}>
                {/* Try to parse markdown-like bold text from Gemini */}
                <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {message.text.split('**').map((part, index) => 
                        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                    )}
                </div>
                <span className="text-[10px] opacity-50 mt-2 block">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    </motion.div>
);

const TypingIndicator = () => (
    <div className="flex gap-2 mb-6 ml-14">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                className="w-2 h-2 rounded-full bg-purple-400"
            />
        ))}
    </div>
);

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Neo, your AI counsellor. I'm here to listen and help you reflect. How are you feeling today?", isAI: true, timestamp: Date.now() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, isAI: false, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');

        // Real AI Integration
        setIsTyping(true);
        try {
            // NOTE: Using a hardcoded mock token for demo purposes if not logged in.
            // In a real app, you would get this from Context/LocalStorage
            const mockToken = localStorage.getItem('token') || "mock_token_for_testing"; 
            
            // To test endpoints locally without auth middleware blocking us, 
            // you might temporarily need to bypass auth in backend if you aren't logging in first.
            // For now, we will assume you have a token or we just make the request.
            const response = await axios.post('http://localhost:5000/api/chat/send', 
                { text: currentInput },
                { 
                    headers: { 
                        Authorization: `Bearer ${mockToken}` 
                    } 
                }
            );

            if (response.data && response.data.neoMessage) {
                const aiResponse = { 
                    text: response.data.neoMessage.text, 
                    isAI: true, 
                    timestamp: response.data.neoMessage.timestamp || Date.now() 
                };
                setMessages(prev => [...prev, aiResponse]);
            }
        } catch (error) {
            console.error("Chat API Error:", error);
            const errorResponse = { 
                text: "I'm sorry, I'm having trouble connecting to my thought processes right now. Please try again or make sure you are logged in.", 
                isAI: true, 
                timestamp: Date.now() 
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-2 md:px-8 h-[calc(100vh-120px)] flex flex-col">
            {/* Disclaimer Modal */}
            <AnimatePresence>
                {showDisclaimer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
                    >
                        <Card className="max-w-md w-full p-8 text-center space-y-6">
                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto text-amber-600">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-2xl font-bold">A Gentle Reminder</h2>
                            <p className="text-muted-foreground">
                                Neo provides emotional guidance and a safe space for reflection, but is <strong>not a licensed therapist</strong> or a replacement for professional medical help.
                            </p>
                            <Button onClick={() => setShowDisclaimer(false)} className="w-full py-4">
                                I Understand
                            </Button>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar py-6">
                {messages.map((msg, i) => (
                    <ChatMessage key={i} message={msg} isAI={msg.isAI} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Area */}
            <div className="p-4 md:p-6 border-t bg-background/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto space-y-4">
                    {/* Quick Suggestions */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
                        {['I feel overwhelmed', 'Need clarity', 'Just want to vent', 'Hard decision ahead'].map((text) => (
                            <button
                                key={text}
                                onClick={() => setInput(text)}
                                className="whitespace-nowrap px-4 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/20 hover:border-primary/40 text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                {text}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="flex gap-3">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your reflection here..."
                            className="flex-1 h-14"
                        />
                        <Button type="submit" size="sm" className="shrink-0 w-14 h-14" disabled={!input.trim()}>
                            <Send size={20} />
                        </Button>
                    </form>
                    <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-50">
                        Reflective questioning for emotional clarity.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
