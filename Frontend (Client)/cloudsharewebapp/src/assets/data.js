// 🌟 Features Section
import {CreditCard, FileText, FolderOpen, LayoutDashboard, Upload} from "lucide-react";

export const features = [
    {
        id: 1,
        iconName: "UploadCloud",
        iconColor: "text-blue-500",
        title: "Easy File Upload",
        description: "Quickly upload your files with our intuitive drag-and-drop interface.",
    },
    {
        id: 2,
        iconName: "ShieldCheck",
        iconColor: "text-green-500",
        title: "Secure Storage",
        description: "Your files are encrypted and stored securely in our cloud infrastructure.",
    },
    {
        id: 3,
        iconName: "Share2",
        iconColor: "text-purple-500",
        title: "Simple Sharing",
        description: "Share files with anyone using secure links that you control.",
    },
    {
        id: 4,
        iconName: "CreditCard",
        iconColor: "text-pink-500",
        title: "Flexible Credits",
        description: "Pay only for what you use with our credit-based system.",
    },
    {
        id: 5,
        iconName: "FolderOpen",
        iconColor: "text-orange-500",
        title: "File Management",
        description: "Organize, preview, and manage your files from any device.",
    },
    {
        id: 6,
        iconName: "Receipt",
        iconColor: "text-indigo-500",
        title: "Transaction History",
        description: "Keep track of all your credit purchases and usage.",
    },
];


// 💰 Pricing Section
export const pricingPlans = [
    {
        id: "free",
        name: "Free",
        price: "0",
        description: "Perfect for getting started",
        features: [
            "5 file uploads",
            "Basic file sharing",
            "7-day file retention",
            "Email support",
        ],
        cta: "Get Started",
        highlighted: false,
    },
    {
        id: "premium",
        name: "Premium",
        price: "499",
        description: "For individuals with larger needs",
        features: [
            "500 file uploads",
            "Advanced file sharing",
            "30-day file retention",
            "Priority email support",
            "File analytics",
        ],
        cta: "Upgrade to Premium",
        highlighted: true, // ⭐ Popular plan
    },
    {
        id: "ultimate",
        name: "Ultimate",
        price: "1299",
        description: "For teams and businesses",
        features: [
            "5000 file uploads",
            "Team sharing capabilities",
            "Unlimited file retention",
            "24/7 priority support",
            "Advanced analytics",
            "API access",
        ],
        cta: "Get Ultimate",
        highlighted: false,
    },
];


// 🗣️ Testimonials Section
export const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Founder & CEO",
        company: "TechNova",
        image: "https://i.pravatar.cc/100?img=3",
        quote:
            "This app transformed how our team collaborates. Uploads are fast and security is unmatched.",
        rating: 5,
    },
    {
        id: 2,
        name: "Ananya Gupta",
        role: "Freelance Designer",
        company: "Self-Employed",
        image: "https://i.pravatar.cc/100?img=5",
        quote:
            "The platform is super intuitive and affordable. Sharing designs with clients has never been easier.",
        rating: 4,
    },
    {
        id: 3,
        name: "Vikram Patel",
        role: "IT Manager",
        company: "GlobalSoft Solutions",
        image: "https://i.pravatar.cc/100?img=7",
        quote:
            "The enterprise plan gave us seamless collaboration and world-class support. Highly recommend it!",
        rating: 5,
    },
];


//Side menu bar options
export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Upload",
        icon: Upload,
        path: "/upload",
    },
    {
        id: "03",
        label: "My Files",
        icon: FolderOpen,
        path: "/my-files",
    },
    {
        id: "04",
        label: "Subscriptions",
        icon: CreditCard,
        path: "/subscriptions",
    },
    {
        id: "05",
        label: "Transactions",
        icon: FileText,
        path: "/transactions",
    },
];
