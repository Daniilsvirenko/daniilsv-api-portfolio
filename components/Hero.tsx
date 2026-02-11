"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JsonViewer from "./JsonViewer";
import { portfolioData } from "@/lib/data";

export default function Hero() {
    const [typedText, setTypedText] = useState("");
    const command = "curl -X GET https://daniil.dev/api/personal";
    const [showOutput, setShowOutput] = useState(false);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedText(command.substring(0, index + 1));
            index++;
            if (index === command.length) {
                clearInterval(interval);
                setTimeout(() => setShowOutput(true), 500);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-[80vh] flex items-center justify-center pt-24 md:pt-10 px-2 md:px-0">
            <div className="w-full max-w-3xl mx-auto">

                <div className="bg-[#1e1e1e] rounded-lg shadow-2xl border border-slate-800 overflow-hidden w-full">

                    {/* Header */}
                    <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-black/50">
                        <div className="flex gap-2 shrink-0">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 text-center text-[10px] md:text-xs font-mono text-slate-500 truncate px-4">
                            visitor@daniil.dev: ~
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-3 md:p-8 font-mono min-h-[300px] md:min-h-[400px]">
                        {/* Command line - breaks naturally if too long on mobile */}
                        <div className="flex flex-wrap items-center gap-2 text-green-400 mb-4 break-all text-xs md:text-sm">
                            <span className="shrink-0">$</span>
                            <span>{typedText}</span>
                            <motion.span
                                animate={{ opacity: [0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-green-400 block shrink-0"
                            />
                        </div>

                        {showOutput && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                <div className="text-slate-400 mb-1 text-[10px] md:text-xs">HTTP/2 200 OK</div>
                                <div className="text-slate-500 text-[10px] md:text-xs mb-4">content-type: application/json</div>

                                {/* JSON Area - The JsonViewer now handles wrapping internaly */}
                                <div className="max-w-full">
                                    <JsonViewer data={portfolioData.personal} />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}