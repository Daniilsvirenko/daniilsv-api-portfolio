"use client";

import { motion } from "framer-motion";

interface SkillsProps {
    data: Record<string, string[]>;
}

export default function SkillsGrid({ data }: SkillsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {Object.entries(data).map(([category, items], i) => (
                <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-900/50 p-6 rounded-lg border border-slate-800"
                >
                    <h3 className="text-green-500 font-bold mb-4 capitalize font-mono">
                        {category.replace(/_/g, ' ')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700 font-mono hover:border-green-500 hover:text-green-400 transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
