"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JsonViewer from "./JsonViewer";

interface ApiEndpointProps {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    description: string;
    response: object;
    defaultOpen?: boolean;
}

export default function ApiEndpoint({
    method,
    path,
    description,
    response,
    defaultOpen = false,
}: ApiEndpointProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [copied, setCopied] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`curl -X ${method} https://daniil.dev/api${path}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const methodColors = {
        GET: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        POST: "text-green-400 bg-green-500/10 border-green-500/20",
        PUT: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        DELETE: "text-red-400 bg-red-500/10 border-red-500/20",
    };

    return (
        // FIX: max-w-full ensures the card never exceeds the screen width
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-[#0B0C10] mb-6 w-full max-w-full">
            <div
                onClick={toggleOpen}
                className="flex flex-col md:flex-row md:items-center gap-3 p-4 cursor-pointer hover:bg-slate-900/50 transition-colors active:bg-slate-900"
            >
                {/* Top Row on Mobile: Method + Chevron */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className={`px-3 py-1 rounded text-xs font-bold border shrink-0 ${methodColors[method]}`}>
                        {method}
                    </div>
                    <div className="text-slate-500 md:hidden">
                        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                </div>

                {/* Path: FIX - Added 'break-all' so long paths wrap on mobile */}
                <div className="font-mono text-sm text-slate-300 flex-1 break-all">
                    {path}
                </div>

                {/* Description: Hidden on very small screens if needed, or kept small */}
                <div className="text-xs text-slate-500 md:text-sm">
                    {description}
                </div>

                {/* Desktop Chevron */}
                <div className="text-slate-500 hidden md:block shrink-0">
                    {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-800 bg-[#0d1117]"
                    >
                        {/* Controls Bar */}
                        <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
                            <div className="font-mono text-xs text-slate-500">Example Request</div>
                            <button
                                onClick={copyToClipboard}
                                className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-xs py-1 px-2 rounded hover:bg-slate-800"
                            >
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy cURL"}</span>
                            </button>
                        </div>

                        {/* Code Block: FIX - overflow-x-auto allows inner scrolling */}
                        <div className="p-4 font-mono text-xs md:text-sm text-slate-300 overflow-x-auto bg-black/20 whitespace-nowrap scrollbar-hide">
                            curl -X {method} https://daniil.dev/api{path}
                        </div>

                        <div className="p-3 border-t border-slate-800 border-b bg-slate-900/30">
                            <div className="font-mono text-xs text-slate-500">Response (200 OK)</div>
                        </div>

                        {/* JSON Response Wrapper */}
                        <div className="bg-[#0d1117] overflow-x-hidden">
                            {/* Pass a max-width to the viewer container */}
                            <div className="max-w-full overflow-x-auto">
                                <JsonViewer data={response} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}