import {
  DiJavascript1,
  DiReact,
  DiPython,
  DiGit,
  DiPhp,
  DiAngularSimple,
} from "react-icons/di";
import {
  SiRedis,
  SiNextdotjs,
  SiPostgresql,
  SiVisualstudiocode,
  SiPostman,
  SiAndroidstudio,
  SiVercel,
  SiPopos,
} from "react-icons/si";
import Portfolio from "../assets/img/oldportfolio.png";
import Pandanflim from "../assets/img/pandaflim.png";
import Vapeshop from "../assets/img/vapeshop.png";
import CustomerFeedbackApp from "../assets/img/customerfeedbackapp.png";

export const showCaseData = [
  {
    id: 1,
    title: "Porfolio",
    description:
      "Personal Portfolio Website to showcase projects, skills, and experiences — built with HTML, CSS, JavaScript, and designed using Canva. Features a clean and responsive layout to highlight work samples, contact information, and personal branding.",
    image: Portfolio,
    ghLink: "https://github.com/dev-hmo/personal-porfolio.git",
    demoLink: "https://hmo-porfolio.vercel.app/",
  },
  {
    id: 2,
    title: "Panda Flim",
    description:
      "A simple and clean movie listing website built with HTML, CSS, and JavaScript. Allows users to explore movie posters, browse titles, and enjoy a responsive, user-friendly interface for discovering films.",
    image: Pandanflim,
    ghLink: "https://github.com/dev-hmo/pandaflimbydevhmo",
    demoLink: "https://pandaflim.vercel.app/",
  },
  {
    id: 3,
    title: "Pi Vape Shop",
    description:
      "A modern and responsive vape product showcase website built with Next.js and Tailwind CSS, designed using Canva. Features smooth navigation, clean UI, and a structured product layout for an enhanced browsing experience.",
    image: Vapeshop,
    ghLink: "https://github.com/dev-hmo/vape-shop",
    demoLink: "https://vape-shop-delta.vercel.app/",
  },
  {
    id: 4,
    title: "Customer Feedback App",
    description:
      "Customer Feedback App — A responsive web application for collecting and displaying user feedback, built with React, React Router DOM, and Tailwind CSS. Powered by Firebase for backend functionality and Firestore for cloud storage. Features include real-time feedback submission, routing, and a clean, user-friendly interface.",
    image: CustomerFeedbackApp,
    ghLink: "https://github.com/dev-hmo/customer-feedback-app.git",
    demoLink: "https://customer-feedback-app-gold.vercel.app/",
  },
];

export const skillStackData = [
  { id: 1, icon: <DiJavascript1 /> },
  { id: 2, icon: <DiReact /> },
  { id: 3, icon: <SiNextdotjs /> },
  { id: 4, icon: <DiGit /> },
  { id: 5, icon: <SiRedis /> },
  { id: 6, icon: <SiPostgresql /> },
  { id: 7, icon: <DiPython /> },
  { id: 8, icon: <DiPhp /> },
  { id: 9, icon: <DiAngularSimple /> },
];

export const toolStackData = [
  { id: 1, icon: <SiPopos /> },
  { id: 2, icon: <SiVisualstudiocode /> },
  { id: 3, icon: <SiPostman /> },
  { id: 4, icon: <SiAndroidstudio /> },
  { id: 5, icon: <SiVercel /> },
];
