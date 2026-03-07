import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    console.error("Please add your MONGODB_URI to .env.local");
    process.exit(1);
}

// Minimal schemas for seeding
const BlogSchema = new mongoose.Schema({ slug: String }, { strict: false });
const ExperienceSchema = new mongoose.Schema({}, { strict: false });
const ProjectSchema = new mongoose.Schema({}, { strict: false });
const SettingsSchema = new mongoose.Schema({}, { strict: false });
const SkillsSchema = new mongoose.Schema({ name: String, category: String }, { strict: false });
const GridSchema = new mongoose.Schema({}, { strict: false });
const ServiceSchema = new mongoose.Schema({}, { strict: false });
const TestimonialSchema = new mongoose.Schema({}, { strict: false });

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
const Experience = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema, "projects");
const Settings = mongoose.models.Setting || mongoose.model("Setting", SettingsSchema);
const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillsSchema);
const GridItem = mongoose.models.GridItem || mongoose.model("GridItem", GridSchema);
const ServiceItem = mongoose.models.ServiceItem || mongoose.model("ServiceItem", ServiceSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

const gridItemsSeed = [
    { id: 1, title: "I prioritize client collaboration, fostering open communication", description: "", className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]", imgClassName: "w-full h-full", titleClassName: "justify-end", img: "/b1.svg", spareImg: "" },
    { id: 2, title: "I'm very flexible with time zone communications", description: "", className: "lg:col-span-2 md:col-span-3 md:row-span-2", imgClassName: "", titleClassName: "justify-start", img: "", spareImg: "" },
    { id: 3, title: "My tech stack", description: "I constantly try to improve", className: "lg:col-span-2 md:col-span-3 md:row-span-2", imgClassName: "", titleClassName: "justify-center", img: "", spareImg: "" },
    { id: 4, title: "Tech enthusiast with a passion for development.", description: "", className: "lg:col-span-2 md:col-span-3 md:row-span-1", imgClassName: "", titleClassName: "justify-start", img: "/grid.svg", spareImg: "/b4.svg" },
    { id: 5, title: "Currently building a JS Animation library", description: "The Inside Scoop", className: "md:col-span-3 md:row-span-2", imgClassName: "absolute right-0 bottom-0 md:w-96 w-60", titleClassName: "justify-center md:justify-start lg:justify-center", img: "/b5.svg", spareImg: "/grid.svg" },
    { id: 6, title: "Do you want to start a project together?", description: "", className: "lg:col-span-2 md:col-span-3 md:row-span-1", imgClassName: "", titleClassName: "justify-center md:max-w-full max-w-60 text-center", img: "", spareImg: "" }
];

const servicesSeed = [
    { title: "Planning & Strategy", description: "We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements.", icon: "Code" },
    { title: "Development & Progress Update", description: "Once the blueprint is approved, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way.", icon: "LayoutTemplate" },
    { title: "Development & Launch", description: "This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up.", icon: "Zap" },
    { title: "Backend & Database", description: "Robust APIs and database architecture to power your application with scalable, secure, and efficient data management.", icon: "Database" }
];

const testimonialsSeed = [
    { quote: "Collaborating with Hlaing Min Oo was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Hlaing Min Oo's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Hlaing Min Oo is the ideal partner.", name: "Michael Johnson", title: "Director of AlphaStream Technologies" },
    { quote: "Hlaing Min Oo's technical expertise transformed our vague concepts into a robust application. His proactive approach to problem-solving and clear communication made the entire process smooth and enjoyable.", name: "Sarah Williams", title: "CTO, TechVision Innovators" },
    { quote: "Working with Hlaing was a game-changer for our startup. He didn't just write code; he helped us scale our infrastructure affordably. His dedication is unmatched.", name: "James Lee", title: "Founder, NextGen Startups" }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB.");

        // Clear existing data
        console.log("Clearing existing collections...");
        await Blog.deleteMany({});
        await Experience.deleteMany({});
        await Project.deleteMany({});
        await Settings.deleteMany({});
        await Skill.deleteMany({});
        await GridItem.deleteMany({});
        await ServiceItem.deleteMany({});
        await Testimonial.deleteMany({});

        // Read JSON files
        console.log("Reading static JSON files...");
        const blogData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "blog.json"), "utf8"));
        const expData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "experience.json"), "utf8"));
        const projData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "projects.json"), "utf8"));
        const settingsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "settings.json"), "utf8"));

        let skillsData: { skills: string[], tools: string[] } = { skills: [], tools: [] };
        try {
            skillsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "skills.json"), "utf8"));
        } catch {
            console.log("skills.json missing, using default.");
        }

        console.log("Inserting data into MongoDB...");
        await Blog.insertMany(blogData);
        await Experience.insertMany(expData);
        await Project.insertMany(projData);
        await Settings.create(settingsData);

        // Wrap skills strings into objects
        const skillsObj = [
            ...(skillsData.skills || []).map(s => ({ name: s, category: 'Skill' })),
            ...(skillsData.tools || []).map(t => ({ name: t, category: 'Tool' }))
        ];
        if (skillsObj.length > 0) {
            await Skill.insertMany(skillsObj);
        }

        await GridItem.insertMany(gridItemsSeed);
        await ServiceItem.insertMany(servicesSeed);
        await Testimonial.insertMany(testimonialsSeed);

        console.log("🎉 Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seed();
