import { Trophy, Handshake, Zap, Star, Target, Sparkles } from "lucide-react";

import vedanta from "../assets/events/vedanta.png";
import algamitra from "../assets/events/algamitra.png";
import iicu from "../assets/events/iicu.png";
import indianoil from "../assets/events/indianoil.png";
import unstop from "../assets/events/unstop.png";
import group from "../assets/events/group.png";


export const events = [
   
    {
      name: 'OptimiseIT',
      tagline: 'Think. Analyze. Innovate. Crack real-world cases',
      image: 'src/assets/events/OptimiseIT.png',
      prize: '₹15,000+', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'QuizBowl',
      tagline: 'Fast quiz testing real-life knowledge & problem-solving',
      image: 'src/assets/events/Quizbowl.png',
      prize: '₹15,000+', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'Code The Problem',
      tagline: 'Think smart. Code fast. Solve engineering problems',
      image: 'src/assets/events/Code The Problem.png',
      prize: '₹15,000+', eligibility: 'UG & PG', platform: 'HackerRank',
    },
    {
      name: 'Chem-e-Reel',
      tagline: 'Turn science into stories. Engage through reels',
      image: 'src/assets/events/Chem-E-Reel.png',
      prize: '₹10,000+', eligibility: 'UG & PG', platform: 'Unstop',
    },
    {
      name: 'Aspen Workshop',
      tagline: 'Hands-on Aspen Plus process simulation & design',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
      prize: 'Free Entry', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'Reverse Brainstorming',
      tagline: 'Creative problem-solving by exploring what goes wrong',
      image: 'src/assets/events/Reverse BrainStorming.png',
      prize: '₹15,000+', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'Photography Challenge',
      tagline: 'Capture creativity through everyday moments',
      image: 'src/assets/events/Photography Challenge.png',
      prize: '₹10,000+ And Exciting Goodies', eligibility: 'UG & PG', platform: 'Online',
    },
    {
      name: 'Chem-Meme Challenge',
      tagline: 'Turn scientific concepts into relatable humor',
      image: 'src/assets/events/Chem-Meme Challenge.png',
      prize: '₹8,000+', eligibility: 'Open', platform: 'Online',
    },
    {
      name: 'Chem-Engage',
      tagline: 'Interactive event fostering engagement through challenges',
      image: 'src/assets/events/Chem Engage.png',
      prize: '₹10,000+', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'Chem-Intelligence',
      tagline: 'Analytical thinking and problem-solving through tasks',
      image: 'src/assets/events/Chem Intillegence.png',
      prize: 'Win Prizes', eligibility: 'UG & PG', platform: 'On-site',
    },
  ];
export const tiers = [
    {
      name: 'Title Sponsor', subtitle: 'Premier Partnership', accentClass: 'bg-slate-200/10 text-slate-200', icon: Trophy,
      deliverables: [
        { label: 'Branding through photobooths', value: 'At multiple hotspot zones' },
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'yes' },
        { label: 'Special Association with Fugacity', value: 'yes' },
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In all the Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'yes' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
        { label: "Hyperlink to company's website on fugacity's website", value: 'yes' },
        { label: 'Branding through distribution of exclusive company merch', value: 'yes' },
      ],
    },
    {
      name: 'In Association With', subtitle: 'Co-title Partner', accentClass: 'bg-cyan-500/10 text-cyan-300', icon: Handshake,
      deliverables: [
        { label: 'Branding through photobooths', value: 'At any one hotspot zone' },
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'yes' },
        { label: 'Special Association with Fugacity', value: 'yes' },
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In multiple Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'yes' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
        { label: "Hyperlink to company's website on fugacity's website", value: 'yes' },
        { label: 'Branding through distribution of exclusive company merch', value: 'yes' },
      ],
    },
    {
      name: 'Powered By', subtitle: 'Technology Partner', accentClass: 'bg-amber-500/10 text-amber-400', icon: Zap,
      deliverables: [
        { label: 'Branding through photobooths', value: 'At any one hotspot zone' },
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'yes' },
        { label: 'Special Association with Fugacity', value: 'yes' },
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In one Hotspot zone' },
        { label: 'Video branding at strategic locations', value: 'yes' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
        { label: "Hyperlink to company's website on fugacity's website", value: 'yes' },
        { label: 'Branding through distribution of exclusive company merch', value: 'yes' },
      ] ,
    },
    {
      name: 'Major Sponsor', subtitle: 'Key Supporter', accentClass: 'bg-gray-400/10 text-gray-300', icon: Star,
      deliverables: [
        { label: 'Branding through photobooths', value: 'optional' },
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: null },
       
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In specific Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'yes' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
        { label: "Hyperlink to company's website on fugacity's website", value: 'optional' },
        { label: 'Branding through distribution of exclusive company merch', value: 'optional' },
      ] ,
    },
    {
      name: 'Strategic Sponsor', subtitle: 'Industry Partner', accentClass: 'bg-teal-500/10 text-teal-400', icon: Target,
      deliverables: [
       
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'optional' },
       
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In specific Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'optional' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
       
        { label: 'Branding through distribution of exclusive company merch', value: 'optional' },
      ] ,
    },
    {
      name: 'Event Sponsor', subtitle: 'Event Specific Support', accentClass: 'bg-orange-700/10 text-orange-400', icon: Sparkles,
      deliverables: [
       
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'optional' },
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In specific Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'optional' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
       
        { label: 'Branding through distribution of exclusive company merch', value: 'optional' },
      ] ,
    },
  ];
  export const contacts = [
    { name: 'Yug Birla', phone: '+91 9303903529', email: 'yug.cheaiitkgp@gmail.com' },
    { name: 'Nikita Ameriya', phone: '+91 8112289524', email: 'nikitaameriya.cheaiitkgp@gmail.com' },
    { name: 'Yeshfeen Fatima', phone: '+91 8467950818', email: 'yeshfeen.cheaiitkgp@gmail.com' },
    { name: 'Sundram Kumar', phone: '+91 7070038511', email: 'sundram.cheaiitkgp@gmail.com' },
  ];
  

export const partners = [
  {
    logo: vedanta,
    name: "VEDANTA",
    role: "Title Sponsor",
  },
  {
    logo: algamitra,
    name: "ALGAMITRA",
    role: "Powered By",
  },
  {
    logo: indianoil,
    name: "INDIAN OIL",
    role: "Industry Partner",
  },
  {
    logo: iicu,
    name: "Indian Institute of Chemical Engineers",
    role: "Knowledge Partner",
  },
  {
    logo: unstop,
    name: "UNSTOP",
    role: "Platform Partner",
  },
  {
    logo: group,
    name: "Navin Fluorine International",
    role: "Previous Sponsors",
  },
];