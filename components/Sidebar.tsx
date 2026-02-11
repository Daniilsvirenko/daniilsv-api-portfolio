"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, User, Briefcase, Code, Cpu, Send, Menu, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const endpoints = [
    { method: "GET", path: "/about", label: "About Me", icon: User },
    { method: "GET", path: "/experience", label: "Experience", icon: Briefcase },
    { method: "GET", path: "/education", label: "Education", icon: BookOpen },
    { method: "GET", path: "/projects", label: "Projects", icon: Code },
    { method: "GET", path: "/skills", label: "Skills", icon: Cpu },
    { method: "POST", path: "/contact", label: "Contact", icon: Send },
];

export default function Sidebar() {
    const [activepath, setActivePath] = useState("/about");
    const [isOpen, setIsOpen] = useState(false);
    const isScrollingRef = useRef(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleScroll = (id: string) => {
        setActivePath(id);
        setIsOpen(false);
        isScrollingRef.current = true;

        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);

        const element = document.getElementById(id.replace("/", ""));
        if (element) {
            // Offset for fixed header on mobile (-80px) vs desktop
            const yOffset = window.innerWidth < 768 ? -80 : 0;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingRef.current) return;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActivePath("/" + entry.target.id);
                    }
                });
            },
            { threshold: 0.4 } // Adjusted threshold for better mobile trigger
        );

        endpoints.forEach((endpoint) => {
            const id = endpoint.path.replace("/", "");
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* --- Mobile Header (Glassmorphism) --- */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B0C10]/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-4">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <Terminal className="text-green-500" size={20} />
                    <span className="text-white font-bold text-lg tracking-tight">Daniil.API</span>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-300 active:text-green-500 transition-colors rounded-md active:bg-slate-800/50"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* --- Mobile Drawer Overlay --- */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                        />

                        {/* Slide-out Menu */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-[100dvh] w-[85%] max-w-[300px] bg-[#0B0C10] border-r border-slate-800 z-50 flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Terminal className="text-green-500" size={24} />
                                    <h1 className="text-white font-bold text-lg">Menu</h1>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-slate-500">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-4">
                                <nav className="space-y-1 px-3">
                                    {endpoints.map((endpoint) => (
                                        <button
                                            key={endpoint.path}
                                            onClick={() => handleScroll(endpoint.path)}
                                            className={`w-full flex items-center gap-3 px-4 py-4 text-sm font-mono transition-all rounded-lg
                        ${activepath === endpoint.path
                                                    ? "text-white bg-slate-800 border-l-4 border-green-500"
                                                    : "text-slate-400 active:bg-slate-900"
                                                }
                      `}
                                        >
                                            <endpoint.icon
                                                size={18}
                                                className={
                                                    activepath === endpoint.path ? "text-green-400" : "text-slate-500"
                                                }
                                            />
                                            <span className="flex-1 text-left">{endpoint.label}</span>
                                            <span
                                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded opacity-80
                        ${endpoint.method === "GET"
                                                        ? "bg-blue-500/20 text-blue-400"
                                                        : "bg-green-500/20 text-green-400"
                                                    }
                      `}
                                            >
                                                {endpoint.method}
                                            </span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-4 border-t border-slate-800 text-xs text-slate-600 text-center font-mono safe-area-bottom">
                                v1.0.0 • 200 OK
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* --- Desktop Sidebar (Fixed) --- */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-[#0B0C10] border-r border-slate-800 flex-col z-30">
                <div className="p-6 border-b border-slate-800 flex items-center gap-2">
                    <Terminal className="text-green-500" size={24} />
                    <h1 className="text-white font-bold text-lg tracking-tight">
                        Daniil.API <span className="text-slate-500 text-xs">v1.0</span>
                    </h1>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                    <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Endpoints
                    </div>
                    <nav className="space-y-1">
                        {endpoints.map((endpoint) => (
                            <button
                                key={endpoint.path}
                                onClick={() => handleScroll(endpoint.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-mono transition-colors relative group
                  ${activepath === endpoint.path
                                        ? "text-white bg-slate-800/50 border-r-2 border-green-500"
                                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                                    }
                `}
                            >
                                <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded
                  ${endpoint.method === "GET"
                                            ? "bg-blue-500/10 text-blue-400"
                                            : "bg-green-500/10 text-green-400"
                                        }
                `}
                                >
                                    {endpoint.method}
                                </span>
                                <span>{endpoint.path}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 text-xs text-slate-600 border-t border-slate-800 text-center font-mono">
                    Status: <span className="text-green-500">200 OK</span>
                </div>
            </aside>
        </>
    );
}
