"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiSave, FiX, FiCheck, FiCpu, FiTool, FiZap } from "react-icons/fi";

export default function AdminSkillsPage() {
    const [skills, setSkills] = useState<string[]>([]);
    const [tools, setTools] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [newTool, setNewTool] = useState("");

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const r = await fetch("/api/skills");
                const data = await r.json();
                setSkills(Array.isArray(data.skills) ? data.skills : []);
                setTools(Array.isArray(data.tools) ? data.tools : []);
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/skills", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skills, tools }),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            alert("Failed to save skills");
        } finally {
            setSaving(false);
        }
    };

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const addTool = () => {
        if (newTool.trim() && !tools.includes(newTool.trim())) {
            setTools([...tools, newTool.trim()]);
            setNewTool("");
        }
    };

    if (loading) {
        return (
            <div className="p-8 space-y-6 max-w-4xl mx-auto">
                <div className="h-8 w-48 bg-white/5 animate-pulse rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
                    <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0c1a] p-6 rounded-2xl border border-white/5 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        Technology Stack
                        <span className="text-xs font-normal text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            {skills.length + tools.length} Technologies
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-sm mt-1">Configure the core skills and developer tools displayed on your profile.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg min-w-[140px] justify-center",
                            saved 
                                ? "bg-emerald-500 text-white shadow-emerald-900/20" 
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-900/20 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
                        )}
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : saved ? (
                            <><FiCheck className="w-4 h-4" /> Changes Applied</>
                        ) : (
                            <><FiSave className="w-4 h-4" /> Deploy Updates</>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Skills Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col rounded-3xl border border-white/5 bg-[#0a0c1a] overflow-hidden shadow-xl"
                >
                    <div className="p-6 border-b border-white/5 bg-gradient-to-br from-blue-500/10 to-transparent">
                        <div className="flex items-center gap-3 mb-1">
                            <FiCpu className="text-blue-400 w-5 h-5" />
                            <h2 className="text-lg font-bold text-white">Core Skills</h2>
                        </div>
                        <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold">Programming & Engineering</p>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-8 min-h-[100px] content-start">
                            <AnimatePresence>
                                {skills.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 hover:bg-blue-500/20 transition-all group"
                                    >
                                        <FiZap className="w-3 h-3 opacity-50" />
                                        {skill}
                                        <button
                                            onClick={() => setSkills(skills.filter((s) => s !== skill))}
                                            className="ml-1 p-0.5 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                        >
                                            <FiX className="w-3 h-3" />
                                        </button>
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-auto space-y-3">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Add New Skill</label>
                            <div className="relative group/input">
                                <input
                                    type="text"
                                    placeholder="e.g. React.js, Python, AWS"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-neutral-700"
                                />
                                <button
                                    onClick={addSkill}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20 shadow-lg"
                                >
                                    <FiPlus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tools Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col rounded-3xl border border-white/5 bg-[#0a0c1a] overflow-hidden shadow-xl"
                >
                    <div className="p-6 border-b border-white/5 bg-gradient-to-br from-purple-500/10 to-transparent">
                        <div className="flex items-center gap-3 mb-1">
                            <FiTool className="text-purple-400 w-5 h-5" />
                            <h2 className="text-lg font-bold text-white">Developer Tools</h2>
                        </div>
                        <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold">Workflow & Productivity</p>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-8 min-h-[100px] content-start">
                            <AnimatePresence>
                                {tools.map((tool) => (
                                    <motion.span
                                        key={tool}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 hover:bg-purple-500/20 transition-all group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                                        {tool}
                                        <button
                                            onClick={() => setTools(tools.filter((t) => t !== tool))}
                                            className="ml-1 p-0.5 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                        >
                                            <FiX className="w-3 h-3" />
                                        </button>
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-auto space-y-3">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Add New Tool</label>
                            <div className="relative group/input">
                                <input
                                    type="text"
                                    placeholder="e.g. VS Code, Docker, Git"
                                    value={newTool}
                                    onChange={(e) => setNewTool(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTool())}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder:text-neutral-700"
                                />
                                <button
                                    onClick={addTool}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-purple-600/10 text-purple-400 hover:bg-purple-600 hover:text-white transition-all border border-purple-500/20 shadow-lg"
                                >
                                    <FiPlus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <FiZap className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Dashboard Performance Tip</h4>
                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                        The changes here are reflected immediately on the "Skills" section of your homepage. 
                        Try to keep the lists balanced (around 6-8 items each) for the best visual presentation.
                    </p>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}

