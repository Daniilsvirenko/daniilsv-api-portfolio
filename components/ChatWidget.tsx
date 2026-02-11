"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hi! I'm Daniil's AI Assistant. Ask me anything about his stack or experience." },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Disable body scroll when chat is open on mobile
    useEffect(() => {
        if (window.innerWidth < 768) {
            document.body.style.overflow = isOpen ? "hidden" : "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        // Mock response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "I'm currently in demo mode, but I can tell you that Daniil is great at React and Node.js!" },
            ]);
        }, 1000);
    };

    return (
        <div className="z-[100]">
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleOpen}
                className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-colors z-50 flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`
              fixed flex flex-col bg-[#1e1e1e] border-slate-700 shadow-2xl overflow-hidden
              
              /* Mobile Styles: Full Screen */
              inset-0 z-40 rounded-none
              
              /* Desktop Styles: Popover */
              md:inset-auto md:bottom-24 md:right-6 md:w-80 md:h-96 md:rounded-xl md:border
            `}
                    >
                        {/* Header */}
                        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700 safe-area-top">
                            <div className="flex items-center gap-2">
                                <Bot size={18} className="text-green-500" />
                                <span className="text-sm font-bold text-white">Assistant</span>
                            </div>
                            <button
                                onClick={toggleOpen}
                                className="p-2 -mr-2 text-slate-400 hover:text-white md:hidden"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1e1e1e]">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed
                      ${msg.role === "user"
                                                ? "bg-green-600 text-white rounded-br-sm"
                                                : "bg-slate-700 text-slate-200 rounded-bl-sm"
                                            }
                    `}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2 safe-area-bottom">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask something..."
                                className="flex-1 bg-slate-900 border border-slate-600 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 transition-all placeholder:text-slate-500"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-green-600 hover:bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-colors shadow-sm"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}