import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, AlertCircle, RefreshCw } from 'lucide-react';
import { Button, Card, Input } from '../components/UI';
import { cn } from '../utils/cn';

const INTENT_MAPPING = {
    GREETING: {
        keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'anybody there'],
        responses: [
            "Hello. I'm here. How are you holding up in this moment?",
            "Hi there. I'm ready to listen. What's been on your mind lately?",
            "Greetings. It's good to see you. How can I support your reflection today?"
        ]
    },
    GRATITUDE: {
        keywords: ['thanks', 'thank you', 'appreciate', 'helpful', 'thanks a lot'],
        responses: [
            "You're very welcome. We're in this together. What else would you like to explore?",
            "I'm glad that resonated with you. Reflection is a powerful tool. What's the next step for you?",
            "It's my pleasure to support you. What did you discover through our conversation today?"
        ]
    },
    CLOSURE: {
        keywords: ['bye', 'goodbye', 'see you', 'leave', 'done', 'nothing else'],
        responses: [
            "Goodbye for now. Remember, your feelings are valid. I'll be here whenever you need to reflect.",
            "Take care of yourself out there. What's one thing you'll take away from our talk today?",
            "Until next time. Wishing you peace and clarity as you move forward."
        ]
    }
};

const AI_CATEGORIES = {
    ANXIETY: {
        keywords: [
            'anxious', 'worried', 'panic', 'scared', 'stress', 'overwhelmed', 'pressure',
            'nervous', 'fear', 'dread', 'unsettled', 'jittery', 'tense', 'apprehensive',
            'breathless', 'spiraling', 'edge', 'exam', 'deadline', 'future'
        ],
        responses: [
            "It sounds like there's a lot weighing on you right now. If you could describe this pressure as a physical object, what would it look like?",
            "Anxiety often tries to protect us from the unknown. What is the one thing you're most afraid might happen, and how likely is that truly?",
            "When things feel overwhelming, our focus often scatters. What is one small thing within your control that you can touch or handle right now?",
            "I hear the noise of worry in your words. If you could turn the volume down on that noise for just one minute, what would the silence tell you?"
        ]
    },
    SADNESS: {
        keywords: [
            'sad', 'unhappy', 'depressed', 'alone', 'lonely', 'cry', 'hurt',
            'miserable', 'heartbroken', 'grief', 'empty', 'hopeless', 'down',
            'blue', 'tearful', 'sorrow', 'isolate', 'abandon'
        ],
        responses: [
            "I hear the heaviness in your words. It's okay to not be okay. If this sadness had a voice, what do you think it would be trying to tell you?",
            "Feeling alone can be so draining. Who is one person, even from your past, who made you feel truly seen or understood?",
            "Sadness often comes in waves. Where in your body do you feel this wave most strongly right now?",
            "It takes immense strength to name your hurt. What does 'healing' look like to you in this specific situation?"
        ]
    },
    IDENTITY: {
        keywords: [
            'worthless', 'useless', 'fail', 'failure', 'meaning', 'pointless',
            'who am i', 'impostor', 'fraud', 'dumb', 'stupid', 'low', 'confidence',
            'self-esteem', 'unworthy', 'shame', 'guilt'
        ],
        responses: [
            "Those are very heavy thoughts to carry. When did you first start believing that your worth was tied to your achievements?",
            "If a dear friend told you they felt this way, what kind of compassion would you offer them? Can you offer even a fraction of that to yourself?",
            "In moments of doubt, we often forget our own light. What is one thing you've done in your life—no matter how small—that made you feel proud of who you are?",
            "Identity is a journey, not a fixed point. If you were to define yourself by your values instead of your mistakes, who would that person be?"
        ]
    },
    RELATIONSHIPS: {
        keywords: [
            'friend', 'family', 'argument', 'breakup', 'parents', 'fight',
            'toxic', 'partner', 'boyfriend', 'girlfriend', 'divorce', 'betrayal',
            'trust', 'conflict', 'misunderstood', 'ignored'
        ],
        responses: [
            "Relationships can be our greatest mirrors. What part of yourself do you feel is being challenged or misunderstood in this situation?",
            "If you could have a perfectly honest conversation with this person without any consequences, what is the first sentence you would say?",
            "How does this interaction align—or conflict—with the kind of person you want to be in your relationships?",
            "Conflict often points to a boundary that needs tending. What boundary of yours is asking for attention right now?"
        ]
    },
    PROGRESS: {
        keywords: [
            'better', 'happy', 'good', 'improved', 'helped', 'thanks', 'thank',
            'accomplished', 'smile', 'hope', 'proud', 'strong', 'growth',
            'clarity', 'understood', 'relief'
        ],
        responses: [
            "It's wonderful to hear about this spark of light. What do you think contributed most to this shift in your state of mind?",
            "Progress isn't always a straight line, but this moment of clarity is yours. How can you carry this feeling into the rest of your day?",
            "I'm so glad you shared this. What did you learn about your own resilience during this process?",
            "Celebrating the small wins is vital. How does it feel to acknowledge your own growth in this moment?"
        ]
    }
};

const DEFAULT_RESPONSES = [
    "That sounds important to you. Can you tell me more about what's behind that feeling?",
    "I hear you. If you were looking at this situation through the eyes of someone who deeply cares for you, what would they notice?",
    "How did that situation make you feel in the moment, and how does it feel now as you reflect on it?",
    "What do you think might be the next smallest step you could take to feel more aligned with your values?",
    "It takes courage to share that. What inspired you to bring this up today?",
    "If there were no 'right' or 'wrong' answer here, what would your intuition be telling you?",
    "How does this challenge connect to everything else you've been managing lately?",
    "I'm listening closely. Could you expand on that specific part you just mentioned?",
];

const STOP_WORDS = ['a', 'an', 'the', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'some', 'any', 'i', 'me', 'my', 'mine', 'you', 'your', 'yours', 'it', 'its', 'this', 'that', 'these', 'those'];

const getAIResponse = (message, history = []) => {
    const msg = message.toLowerCase();
    const cleanMsg = msg.replace(/[?.!,]/g, '');
    const words = cleanMsg.split(/\s+/).filter(w => !STOP_WORDS.includes(w) && w.length > 2);

    // 1. Intent Mapping (Greetings, Thanks, etc.)
    for (const intent of Object.values(INTENT_MAPPING)) {
        if (intent.keywords.some(key => msg.includes(key))) {
            return intent.responses[Math.floor(Math.random() * intent.responses.length)];
        }
    }

    // 2. Short Message Context (Follow-up to previous question)
    if (msg.length < 15 && history.length > 1) {
        const lastAI = history[history.length - 1]?.text || "";
        if (msg.includes('yes') || msg.includes('ok') || msg.includes('yeah')) {
            return "I appreciate you being open to this. What's the very first thought that comes to mind when you think about that?";
        }
        if (msg.includes('no') || msg.includes('not really')) {
            return "That's fair. We don't have to go there. What would you like to focus on instead?";
        }
        if (msg.includes('why') || msg.includes('how')) {
            return "That's a powerful question. Often, the answer lies in how we feel about it. What is your 'gut' telling you right now?";
        }
    }

    // 3. Category Matching (Keyword Search)
    for (const category of Object.values(AI_CATEGORIES)) {
        if (category.keywords.some(key => msg.includes(key))) {
            return category.responses[Math.floor(Math.random() * category.responses.length)];
        }
    }

    // 4. Pattern Mirroring
    const feelMatch = msg.match(/(?:i feel|feeling|im feeling|i'm feeling) ([^.?!]+)/i);
    if (feelMatch) {
        const emotion = feelMatch[1].trim();
        return `It's brave to acknowledge that you're feeling ${emotion}. When did you first notice this feeling starting to take up space?`;
    }

    const iamMatch = msg.match(/(?:i am |i'm |im )([^.?!]+)/i);
    if (iamMatch) {
        const state = iamMatch[1].trim();
        return `You say you are ${state}. If that state were a season of the year, which one would it be, and why?`;
    }

    const myMatch = msg.match(/my ([^.?!]+)/i);
    if (myMatch) {
        const subject = myMatch[1].trim();
        return `Tell me more about your ${subject}. How does it influence your sense of peace right now?`;
    }

    // 5. Echoing Fallback (The "Intelligence" Layer)
    if (words.length > 0) {
        const subject = words[words.length - 1]; // Take the last significant word
        const bridgeResponses = [
            `I'm listening closely to what you're saying about ${subject}. Could you expand on how that fits into your world right now?`,
            `When you mention ${subject}, what specific image or memory comes to your mind?`,
            `That's an interesting focus: ${subject}. If you were to give ${subject} a color, what would it be?`,
            `I appreciate you sharing about ${subject}. What part of that feels the most urgent to talk about today?`
        ];
        return bridgeResponses[Math.floor(Math.random() * bridgeResponses.length)];
    }

    // 6. Default Reflective
    return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
};

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
                <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
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

        // Simulate AI thinking
        setIsTyping(true);
        setTimeout(() => {
            const aiResponse = { text: getAIResponse(currentInput, messages), isAI: true, timestamp: Date.now() };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-6 h-[calc(100vh-180px)] flex flex-col max-w-4xl">
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
            <div className="p-6 border-t bg-background/50 backdrop-blur-md">
                <div className="max-w-4xl mx-auto space-y-4">
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
