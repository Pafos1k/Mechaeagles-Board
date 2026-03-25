import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  AlertCircle,
  Menu,
  X,
  Newspaper
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LightPillar from '../components/LightPillar';
import { NeonParticles } from '../components/ui/NeonParticles';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type News = {
  Name: string;
  Role: string;
  Title: string;
  Content: string;
  Date: string;
};

const AUTHOR_INFO: Record<string, { fullName: string; photo: string; role: string }> = {
  'Vedarsh': { fullName: 'Vedarsh Misha', photo: '/VedarshMishra.jpg', role: 'Project Manager' },
  'Vedarsh Misha': { fullName: 'Vedarsh Misha', photo: '/VedarshMishra.jpg', role: 'Project Manager' },
  'Austin': { fullName: 'Austin Kinnealey', photo: '/Austin Kinnealey.jpg', role: 'Project Manager' },
  'Austin Kinnealey': { fullName: 'Austin Kinnealey', photo: '/Austin Kinnealey.jpg', role: 'Project Manager' },
  'Lucas': { fullName: 'Lucas DiMarco', photo: '/Lucas DiMarco.jpg', role: 'Science Lead' },
  'Lucas DiMarco': { fullName: 'Lucas DiMarco', photo: '/Lucas DiMarco.jpg', role: 'Science Lead' },
  'Ambrose': { fullName: 'Ambrose McCullough', photo: '/Ambrose McCullough.jpg', role: 'Programmatics Lead' },
  'Ambrose McCullough': { fullName: 'Ambrose McCullough', photo: '/Ambrose McCullough.jpg', role: 'Programmatics Lead' },
  'Sam': { fullName: 'Sam Kaiser', photo: '/Samuel Kaiser.jpg', role: 'Engineering Lead' },
  'Sam Kaiser': { fullName: 'Sam Kaiser', photo: '/Samuel Kaiser.jpg', role: 'Engineering Lead' },
  'Vladislav': { fullName: 'Vladislav Hoila', photo: '/Vlad1.jpg', role: 'Head of Software Development' },
  'Vladislav Hoila': { fullName: 'Vladislav Hoila', photo: '/Vlad1.jpg', role: 'Head of Software Development' },
  'Christian': { fullName: 'Christian Roth', photo: '/Christian Roth.jpg', role: 'Head of Specialization Compliance' },
  'Christian Roth': { fullName: 'Christian Roth', photo: '/Christian Roth.jpg', role: 'Head of Specialization Compliance' },
  'Jack': { fullName: 'Jack Dauphinais', photo: '/Jack Dauphinais.jpg', role: 'Head of Research' },
  'Jack Dauphinais': { fullName: 'Jack Dauphinais', photo: '/Jack Dauphinais.jpg', role: 'Head of Research' },
  'Atharva': { fullName: 'Atharva Naik', photo: '/Atharva Naik.jpg', role: 'Head of HCD' },
  'Atharva Naik': { fullName: 'Atharva Naik', photo: '/Atharva Naik.jpg', role: 'Head of HCD' },
  'Maxwell': { fullName: 'Maxwell Crawford', photo: '/Maxwell Crawford.jpg', role: 'Head of Outreach' },
  'Maxwell Crawford': { fullName: 'Maxwell Crawford', photo: '/Maxwell Crawford.jpg', role: 'Head of Outreach' },
  'Carlos': { fullName: 'Carlos Contreras', photo: '/Juan (Carlos) Contreras.jpg', role: 'Head of Scheduling' },
  'Carlos Contreras': { fullName: 'Carlos Contreras', photo: '/Juan (Carlos) Contreras.jpg', role: 'Head of Scheduling' },
  'Michael': { fullName: 'Michael Maurice', photo: '/MichaelMaurice.jpg', role: 'Head of Marketing' },
  'Michael Maurice': { fullName: 'Michael Maurice', photo: '/MichaelMaurice.jpg', role: 'Head of Marketing' },
  'Matt': { fullName: 'Matt Mahan', photo: '/Matt Mahan.jpg', role: 'Head of Finance' },
  'Matt Mahan': { fullName: 'Matt Mahan', photo: '/Matt Mahan.jpg', role: 'Head of Finance' },
  'Troy': { fullName: 'Troy Sterling', photo: '/Troy Sterling.jpg', role: 'Head of Suspension' },
  'Troy Sterling': { fullName: 'Troy Sterling', photo: '/Troy Sterling.jpg', role: 'Head of Suspension' },
  'Tobin': { fullName: 'Tobin Ting', photo: '/Tobin Ting.jpg', role: 'Head of Steering' },
  'Tobin Ting': { fullName: 'Tobin Ting', photo: '/Tobin Ting.jpg', role: 'Head of Steering' },
  'Paul': { fullName: 'Paul Gin', photo: '/Paulino Gin.jpg', role: 'Head of Roll Cage' },
  'Paul Gin': { fullName: 'Paul Gin', photo: '/Paulino Gin.jpg', role: 'Head of Roll Cage' },
  'Asad': { fullName: 'Asad Faqirzada', photo: '/Asad Faquirzada.jpg', role: 'Head of Drive Train' },
  'Asad Faqirzada': { fullName: 'Asad Faqirzada', photo: '/Asad Faquirzada.jpg', role: 'Head of Drive Train' },
  'Jack DelGrande': { fullName: 'Jack DelGrande', photo: '/Jack DelGrande.jpg', role: 'Head of Fabrication' },
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Teams', href: '/#teams' },
    { name: 'News', href: '/news' },
    { name: 'Contacts', href: '/contacts' },
  ];

  useEffect(() => {
    const fetchNews = () => {
      fetch("https://opensheet.elk.sh/1ZLi6_eGX5UqJOaDzJDGNgw1Q7vzQsyvBYAYpqFlzlSA/Sheet1")
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data)) {
            console.error("Data is not an array:", data);
            setNews([]);
            setLoading(false);
            return;
          }
          const cleaned = data.map((n: any) => ({
            Name: n.Name?.trim() || "",
            Role: n.Role?.trim() || "",
            Title: n.Title?.trim() || "No Title",
            Content: n.Content?.trim() || "",
            Date: n.Date || "",
          }));

          setNews(cleaned);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching news:", err);
          setLoading(false);
        });
    };

    fetchNews();
    const interval = setInterval(fetchNews, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-maroon selection:text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightPillar
          topColor="#ff1a1a"
          bottomColor="#000000"
          intensity={0.4}
          rotationSpeed={0.2}
          interactive={false}
          glowAmount={0.001}
          pillarWidth={4}
          pillarHeight={0.3}
          noiseIntensity={0.4}
          pillarRotation={-15}
          mixBlendMode="screen"
          quality="medium"
          baseX={-0.7}
          className="absolute inset-0"
        />
        <NeonParticles count={300} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/20 via-transparent to-dark-bg" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] md:w-max max-w-[98vw] transition-all duration-300">
        <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-full px-4 md:px-8 py-2 flex items-center justify-between md:justify-center gap-4 md:gap-8 shadow-2xl relative min-h-[52px]">
          <div className="w-10 md:hidden" />
          <Link to="/" className="flex items-center shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img src="/logo2.png" alt="Logo" className="h-6 w-auto" referrerPolicy="no-referrer" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[14px] font-slab tracking-widest text-white/70 uppercase">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="hover:text-white transition-colors whitespace-nowrap">{link.name}</Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex bg-maroon/60 hover:bg-maroon/80 text-white/90 px-6 py-1.5 rounded-xl transition-all items-center gap-2 shadow-lg shrink-0 min-w-[110px] justify-center">
              <User className="w-3.5 h-3.5" />
              <span className="font-slab text-[13px] tracking-widest uppercase">Login</span>
            </button>
            <div className="md:hidden ml-auto">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 text-white/70 hover:text-white">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 w-full mt-2 bg-[#0a0a0a]/95 border border-white/10 rounded-3xl p-8 shadow-2xl md:hidden"
            >
              <div className="flex flex-col items-center gap-6 text-center">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.href} onClick={() => setMobileMenuOpen(false)} className="text-xl font-slab tracking-widest text-white/70 uppercase py-2 w-full">
                    {link.name}
                  </Link>
                ))}
                <button className="w-full bg-maroon/60 hover:bg-maroon/80 text-white/90 px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-3">
                  <User className="w-5 h-5" />
                  <span className="font-slab text-lg tracking-widest uppercase">Login</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-32 px-6 max-w-7xl mx-auto pb-32">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="max-w-2xl flex flex-col items-center">
            <Link to="/" className="inline-flex items-center text-[#ff1a1a] font-mono text-xs tracking-[0.3em] uppercase mb-6 hover:-translate-y-1 transition-transform">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-display font-black mb-6 uppercase tracking-tighter leading-none sm:whitespace-nowrap">
              Latest <span className="text-[#ff1a1a] drop-shadow-[0_0_10px_rgba(255,26,26,0.3)]">News</span>
            </h1>
            <p className="text-xl text-white/40 font-light leading-relaxed shiny-text max-w-xl mx-auto">
              Stay updated with the latest developments from the Mecha-Team command center.
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="flex flex-col gap-8">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="py-20 flex flex-col items-center text-white/20">
                <div className="w-12 h-12 border-2 border-current border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-mono text-xs tracking-widest uppercase">Fetching Intelligence...</p>
              </div>
            ) : news.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-[2rem]">
                <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/30 font-light">No news reports available at this time.</p>
              </div>
            ) : (
              news.map((item, i) => {
                const author = AUTHOR_INFO[item.Name] || AUTHOR_INFO[item.Name.split(' ')[0]] || { fullName: item.Name, photo: '', role: item.Role };
                
                return (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#ff1a1a]/[0.03] border border-[#ff1a1a]/40 shadow-[0_0_25px_rgba(255,26,26,0.12)] transition-all duration-500 hover:border-[#ff1a1a]/80 hover:bg-[#ff1a1a]/10 hover:shadow-[0_0_60px_rgba(255,26,26,0.4)] overflow-hidden"
                  >
                    {/* Internal Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_120%,rgba(255,26,26,0.15),transparent_70%)]" />
                    
                    {/* Card Background Particles */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                      <NeonParticles count={20} />
                    </div>

                    {/* Hover Scanline */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.div 
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/3 bg-gradient-to-b from-transparent via-[#ff1a1a]/10 to-transparent"
                      />
                    </div>

                    <div className="relative z-10 flex flex-col gap-8">
                      {/* Header Section */}
                      <div className="flex items-start gap-6 border-b border-white/10 pb-6">
                        {/* Large Circular Photo */}
                        <div className="relative shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#ff1a1a]/30 group-hover:border-[#ff1a1a] transition-all duration-500 shadow-2xl">
                            {author.photo ? (
                              <img 
                                src={author.photo} 
                                alt={author.fullName} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#ff1a1a]/10 flex items-center justify-center">
                                <User className="w-10 h-10 text-[#ff1a1a]/40" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center gap-1">
                          <span className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight text-white group-hover:text-[#ff1a1a] transition-colors duration-300">
                            {author.fullName}
                          </span>
                          <div className="text-sm md:text-base text-[#ff1a1a]/60 font-mono uppercase tracking-[0.1em]">
                            {author.role}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] md:text-xs text-white/40 font-mono tracking-widest uppercase mt-1">
                            <Calendar className="w-3.5 h-3.5 text-[#ff1a1a]/40" />
                            {item.Date}
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight text-white group-hover:text-[#ff1a1a] transition-colors duration-300 leading-tight">
                          {item.Title}
                        </h2>
                        <div className="h-px w-12 bg-[#ff1a1a]/40 group-hover:w-24 transition-all duration-500" />
                        <p className="text-base font-light leading-relaxed text-white/70 group-hover:text-white/90 transition-colors duration-500 shiny-text whitespace-pre-wrap">
                          {item.Content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}