"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Blog", href: "/admin/blog", icon: "📝" },
    { name: "Projects", href: "/admin/projects", icon: "🚀" },
    { name: "Grid (About)", href: "/admin/grid", icon: "🍱" },
    { name: "Experience", href: "/admin/experience", icon: "💼" },
    { name: "Services", href: "/admin/services", icon: "🛠️" },
    { name: "Testimonials", href: "/admin/testimonials", icon: "💬" },
    { name: "Skills", href: "/admin/skills", icon: "⚡" },
    { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (isLoginPage) {
            setLoading(false);
            return;
        }

        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.authenticated) {
                    setIsAuthenticated(true);
                } else {
                    router.push("/admin/login");
                }
            })
            .catch(() => {
                router.push("/admin/login");
            })
            .finally(() => setLoading(false));
    }, [router, isLoginPage]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black-100 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-black-100 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col bg-[#04071d] border-r border-white/10 shrink-0">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-white">HMO Admin</h1>
                    <p className="text-xs text-neutral-500 mt-1">Portfolio Manager</p>
                </div>

                <nav className="flex-1 py-4">
                    {adminLinks.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive
                                    ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <span className="text-base">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                    >
                        <span>🌐</span> View Portfolio
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header & Sidebar Overlays */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#04071d] border-b border-white/10 p-4 flex items-center justify-between">
                <h1 className="text-lg font-bold text-white">HMO Admin</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 -mr-2 text-neutral-400 hover:text-white"
                >
                    {sidebarOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Sidebar Back-drop */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar Menu */}
            <aside
                className={`lg:hidden fixed top-[69px] bottom-0 w-64 bg-[#04071d] border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{ left: 0 }}
            >
                <nav className="flex-1 overflow-y-auto">
                    <div className="space-y-1 py-4">
                        {adminLinks.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive
                                        ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400"
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 border border-red-500/20 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 lg:p-10 lg:pt-10 pt-24 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
