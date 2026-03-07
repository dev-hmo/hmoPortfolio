"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiGithub, FiExternalLink, FiImage } from "react-icons/fi";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/projects", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projects),
            });
            setEditIndex(null);
            await fetchProjects();
        } catch (error) {
            alert("Failed to save projects");
        } finally {
            setSaving(false);
        }
    };

    const handleAdd = () => {
        const newProject: Project = {
            id: Date.now(),
            title: "",
            description: "",
            image: "",
            ghLink: "",
            demoLink: "",
        };
        setProjects([...projects, newProject]);
        setEditIndex(projects.length);
    };

    const handleDelete = (index: number) => {
        if (!confirm("Delete this project?")) return;
        setProjects(projects.filter((_, i) => i !== index));
        setEditIndex(null);
    };

    const updateProject = (index: number, field: keyof Project, value: string | number) => {
        const updated = [...projects];
        updated[index] = { ...updated[index], [field]: value };
        setProjects(updated);
    };

    if (loading) {
        return (
            <div className="p-8 space-y-4">
                <div className="h-8 w-48 bg-white/5 animate-pulse rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0c1a] p-6 rounded-2xl border border-white/5 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        Project Portfolio
                        <span className="text-xs font-normal text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            {projects.length} Items
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-sm mt-1 text-balance">Showcase your best work with images, descriptions, and live links.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-neutral-300 text-sm font-semibold hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                    >
                        <FiPlus className="w-4 h-4" /> Add Project
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-blue-900/20 hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-50"
                    >
                        <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Save All Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {projects.map((project, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={project.id || index}
                            className={cn(
                                "group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden",
                                editIndex === index
                                    ? "bg-[#11142b] border-blue-500/50 shadow-2xl z-10"
                                    : "bg-[#0a0c1a] border-white/5 hover:border-white/20"
                            )}
                        >
                            {editIndex === index ? (
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Editing Project</span>
                                        </div>
                                        <button onClick={() => setEditIndex(null)} className="p-2 hover:bg-white/5 rounded-full text-neutral-400 transition-colors">
                                            <FiX className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Project Title</label>
                                            <input
                                                type="text"
                                                value={project.title}
                                                onChange={(e) => updateProject(index, "title", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                                placeholder="My Awesome App"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Description</label>
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => updateProject(index, "description", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all min-h-[100px] resize-none"
                                                placeholder="Short summary of the project..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Thumbnail Image URL</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={project.image}
                                                    onChange={(e) => updateProject(index, "image", e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-neutral-300 text-xs font-mono focus:ring-2 focus:ring-blue-500/50 outline-none"
                                                    placeholder="/p1.svg"
                                                />
                                                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                                                    <FiGithub className="w-3 h-3" /> GitHub Repo
                                                </label>
                                                <input
                                                    type="text"
                                                    value={project.ghLink}
                                                    onChange={(e) => updateProject(index, "ghLink", e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-blue-400 text-xs focus:ring-2 focus:ring-blue-500/50 outline-none"
                                                    placeholder="https://github.com/..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                                                    <FiExternalLink className="w-3 h-3" /> Demo URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={project.demoLink}
                                                    onChange={(e) => updateProject(index, "demoLink", e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-cyan-400 text-xs focus:ring-2 focus:ring-blue-500/50 outline-none"
                                                    placeholder="https://demo.com/..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end border-t border-white/5 pt-4">
                                        <button 
                                            onClick={() => setEditIndex(null)}
                                            className="px-8 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40"
                                        >
                                            Keep Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="h-44 bg-gradient-to-br from-blue-900/20 to-black overflow-hidden relative">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FiImage className="w-12 h-12 text-white/5" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => setEditIndex(index)}
                                                className="p-2 rounded-lg bg-black/60 text-white hover:bg-blue-600 transition-all backdrop-blur-md border border-white/10"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="p-2 rounded-lg bg-black/60 text-white hover:bg-red-600 transition-all backdrop-blur-md border border-white/10"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-white font-bold text-lg mb-2">{project.title || "New Project"}</h3>
                                        <p className="text-neutral-500 text-sm line-clamp-3 mb-6 flex-1">
                                            {project.description || "Describe what makes this project unique, the tech stack used, and the problems it solves."}
                                        </p>
                                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                            {project.ghLink && (
                                                <a href={project.ghLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors">
                                                    <FiGithub className="w-4 h-4" /> REPOSITORY
                                                </a>
                                            )}
                                            {project.demoLink && (
                                                <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                                                    <FiExternalLink className="w-4 h-4" /> LIVE PREVIEW
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {projects.length === 0 && (
                <div className="py-24 text-center rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.01]">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FiPlus className="w-8 h-8 text-neutral-600" />
                    </div>
                    <p className="text-neutral-500 font-medium">No projects found in your portfolio yet.</p>
                    <button onClick={handleAdd} className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-bold">Create your first entry</button>
                </div>
            )}
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}

