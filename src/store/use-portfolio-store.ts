import { create } from "zustand";

// ===========================================================================
// Portfolio Store — Zustand
// Centralized UI state management for the portfolio
// ===========================================================================

interface PortfolioState {
    /** Currently active navigation section */
    activeSection: string;
    setActiveSection: (section: string) => void;

    /** Email copy state */
    isCopied: boolean;
    setCopied: (copied: boolean) => void;
    copyEmail: (email: string) => void;

    /** Floating nav visibility */
    isNavVisible: boolean;
    setNavVisible: (visible: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    // --- Active Section ---
    activeSection: "hero",
    setActiveSection: (section) => set({ activeSection: section }),

    // --- Email Copy ---
    isCopied: false,
    setCopied: (copied) => set({ isCopied: copied }),
    copyEmail: async (email: string) => {
        try {
            await navigator.clipboard.writeText(email);
            set({ isCopied: true });
            setTimeout(() => set({ isCopied: false }), 2000);
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = email;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            set({ isCopied: true });
            setTimeout(() => set({ isCopied: false }), 2000);
        }
    },

    // --- Nav Visibility ---
    isNavVisible: true,
    setNavVisible: (visible) => set({ isNavVisible: visible }),
}));
