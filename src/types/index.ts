// ===========================================================================
// Enterprise-Grade Type Definitions
// All data models are strictly typed for compile-time safety
// ===========================================================================

export interface NavItem {
    name: string;
    link: string;
}

export interface GridItem {
    id?: number;
    _id?: string;
    title: string;
    description: string;
    className: string;
    imgClassName: string;
    titleClassName: string;
    img: string;
    spareImg: string;
}

export interface Project {
    id?: number;
    _id?: string;
    title: string;
    description: string;
    image: string;
    ghLink: string;
    demoLink: string;
}

export interface ExperienceItem {
    _id?: string;
    title: string;
    company: string;
    date: string;
    description: string;
}

export interface ServiceItem {
    _id?: string;
    title: string;
    description: string;
    icon?: string;
}

export interface SocialMediaItem {
    id: number;
    img: string;
    link: string;
}

export interface Testimonial {
    _id?: string;
    quote: string;
    name: string;
    title: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    coverImage: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SiteSettings {
    name: string;
    title: string;
    email: string;
    githubUsername: string;
    githubUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    bio: string;
}
