"use client";

import { useState } from "react";
import { Terminal, User, Briefcase, Code, Cpu, Send, Menu, X, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

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

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleScroll = (id: string) => {
        setActivePath(id);
        setIsOpen(false); // Close mobile sidebar on selection
        const element = document.getElementById(id.replace("/", ""));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 right-4 z-[60] p-2 bg-slate-800 text-white rounded-md md:hidden hover:bg-slate-700 transition-colors"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                />
            )}

            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-[#0B0C10] border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
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
