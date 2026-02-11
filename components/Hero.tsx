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
        <section className="min-h-screen flex items-center justify-center -mt-20">
            <div className="w-full max-w-2xl">
                <div className="bg-[#1e1e1e] rounded-lg shadow-2xl border border-slate-800 overflow-hidden">
                    <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-black/50">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 text-center text-xs font-mono text-slate-400">
                            bash — 80x24
                        </div>
                    </div>

                    <div className="p-6 font-mono text-sm min-h-[400px]">
                        <div className="flex items-center gap-2 text-green-400 mb-4">
                            <span>$</span>
                            <span>{typedText}</span>
                            <motion.span
                                animate={{ opacity: [0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-green-400 block"
                            />
                        </div>

                        {showOutput && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="text-slate-400 mb-2">HTTP/2 200 OK</div>
                                <div className="text-slate-500 text-xs mb-4">content-type: application/json</div>
                                <JsonViewer data={portfolioData.personal} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
