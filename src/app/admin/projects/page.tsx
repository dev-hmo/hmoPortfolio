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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Projects ({projects.length})</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 rounded-lg bg-white/5 text-neutral-400 text-sm font-medium hover:text-white hover:bg-white/10 transition-all"
                    >
                        + Add
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save All"}
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {projects.map((project, index) => (
                    <div
                        key={project._id || index}
                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                        {editIndex === index ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={project.title}
                                    onChange={(e) => updateProject(index, "title", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={project.description}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                    rows={2}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-y"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Image path"
                                        value={project.image}
                                        onChange={(e) => updateProject(index, "image", e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    />
                                    <input
                                        type="text"
                                        placeholder="GitHub link"
                                        value={project.ghLink}
                                        onChange={(e) => updateProject(index, "ghLink", e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Demo link"
                                        value={project.demoLink}
                                        onChange={(e) => updateProject(index, "demoLink", e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    />
                                </div>
                                <button
                                    onClick={() => setEditIndex(null)}
                                    className="text-xs text-cyan-400 hover:text-cyan-300"
                                >
                                    Done editing
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-medium text-sm">{project.title || "Untitled"}</h3>
                                    <p className="text-neutral-500 text-xs mt-0.5 truncate max-w-md">
                                        {project.description || "No description"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setEditIndex(index)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
