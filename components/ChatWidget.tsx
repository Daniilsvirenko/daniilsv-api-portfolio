"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hi! I'm Daniil's AI Assistant. Ask me anything about his stack or experience." }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        // Mock response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "I'm currently in demo mode, but I can tell you that Daniil is great at React and Node.js!" }
            ]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[#1e1e1e] border border-slate-700 rounded-lg shadow-2xl w-80 h-96 flex flex-col mb-4 overflow-hidden"
                    >
                        <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
                            <div className="flex items-center gap-2">
                                <Bot size={18} className="text-green-500" />
                                <span className="text-sm font-bold text-white">Assistant</span>
                            </div>
                            <button onClick={toggleOpen} className="text-slate-400 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg p-3 text-sm
                      ${msg.role === "user"
                                                ? "bg-green-600 text-white"
                                                : "bg-slate-700 text-slate-200"
                                            }
                    `}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask something..."
                                className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-green-500"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-green-600 hover:bg-green-500 text-white rounded p-1.5 transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleOpen}
                className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-colors flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
}
