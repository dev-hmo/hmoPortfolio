"use client";
import { useState, useEffect } from "react";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fetchProjects = async () => {
        const res = await fetch("/api/projects");
        setProjects(await res.json());
        setLoading(false);
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSave = async () => {
        setSaving(true);
        await fetch("/api/projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projects),
        });
        setSaving(false);
        setEditIndex(null);
    };

    const handleAdd = () => {
        const newProject: Project = {
            id: Date.now(), // Temporary ID for unsaved items
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
        const updated = projects.filter((_, i) => i !== index);
        setProjects(updated);
        setEditIndex(null);
    };

    const updateProject = (index: number, field: keyof Project, value: string | number) => {
        const updated = [...projects];
        updated[index] = { ...updated[index], [field]: value };
        setProjects(updated);
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.02] p-6 rounded-2xl border border-white/10">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        Projects <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2.5 py-1 rounded-full">{projects.length} Total</span>
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">Manage your portfolio projects and external links.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all shadow-sm flex items-center gap-2"
                    >
                        <span>+</span> Add Project
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#0c0e2b] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[30%]">Project Info</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[40%]">Links & Details</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[30%] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {projects.map((project, index) => (
                                <tr key={project._id || index} className="group hover:bg-white/[0.02] transition-colors">
                                    {editIndex === index ? (
                                        <td colSpan={3} className="px-6 py-6">
                                            <div className="bg-black/50 p-6 rounded-xl border border-cyan-500/30 space-y-4 shadow-inner">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs text-cyan-400 mb-1 block">Title</label>
                                                        <input type="text" value={project.title} onChange={(e) => updateProject(index, "title", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500/50" />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-cyan-400 mb-1 block">Image Path</label>
                                                        <input type="text" value={project.image} onChange={(e) => updateProject(index, "image", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500/50" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-cyan-400 mb-1 block">Description</label>
                                                    <textarea value={project.description} onChange={(e) => updateProject(index, "description", e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500/50 resize-y" />
                                                </div>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs text-cyan-400 mb-1 block">GitHub Link</label>
                                                        <input type="text" value={project.ghLink} onChange={(e) => updateProject(index, "ghLink", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500/50" />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-cyan-400 mb-1 block">Live Demo Link</label>
                                                        <input type="text" value={project.demoLink} onChange={(e) => updateProject(index, "demoLink", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500/50" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end pt-2">
                                                    <button onClick={() => setEditIndex(null)} className="px-6 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-colors">
                                                        Finish Editing
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                                                        {project.image ? <span className="text-xs text-neutral-500">IMG</span> : <span className="text-lg">📁</span>}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium text-sm leading-tight">{project.title || "Untitled Project"}</h3>
                                                        <p className="text-neutral-500 text-xs mt-1 line-clamp-2 max-w-[250px]">{project.description || "No description provided."}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <span className="text-neutral-500 w-16">GitHub:</span>
                                                        {project.ghLink ? (
                                                            <a href={project.ghLink} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 truncate max-w-[200px]">{project.ghLink}</a>
                                                        ) : <span className="text-neutral-600 italic">Not set</span>}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <span className="text-neutral-500 w-16">Demo:</span>
                                                        {project.demoLink ? (
                                                            <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 truncate max-w-[200px]">{project.demoLink}</a>
                                                        ) : <span className="text-neutral-600 italic">Not set</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-middle text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setEditIndex(index)} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(index)} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-neutral-500 text-sm">
                                        No projects found. Click "Add Project" to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
