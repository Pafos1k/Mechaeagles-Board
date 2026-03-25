import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Code, Settings, Cpu, User, Users, Terminal, Menu, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, addDoc, query, limit } from 'firebase/firestore';
import { db } from '../firebase';
import LightPillar from '../components/LightPillar';
import { cn } from '../lib/utils';
import { LogoCloud } from '../components/ui/LogoCloud';
import { NeonParticles } from '../components/ui/NeonParticles';

const logos = [
  { name: 'NASA', src: '/NASA.png' },
  { name: 'Solidworks', src: '/SOLIDWORK.png' },
  { name: 'Boston College', src: '/BCEngeeniring.png' },
  { name: 'Autodesk', src: '/FUSION.png' },
  { name: 'SAE', src: '/SAE.png' },
  { name: "IGO'S", src: '/IGOS.png' },
];


const Bubble = React.memo(({ className, delay = 0, duration = 8 }: { className?: string, delay?: number, duration?: number }) => {
  const { randomY, randomRotate, randomDuration, baseRotation } = useMemo(() => ({
    randomY: Math.random() * 15 + 5, // Slightly more movement
    randomRotate: Math.random() * 15 + 5, // Slightly more rotation/wobble
    randomDuration: duration + Math.random() * 4,
    baseRotation: Math.random() * 30 - 15 // Initial tilt between -15 and 15 degrees
  }), [duration]);
  
  return (
    <motion.div
      className={`absolute ${className} will-change-transform transform-gpu`}
      style={{ translateZ: 0 }}
      animate={{
        y: [0, -randomY, 0],
        rotate: [baseRotation, baseRotation + randomRotate, baseRotation - randomRotate, baseRotation],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    >
      <img src="/bublic.png" className="w-full h-full object-contain" alt="sticker" referrerPolicy="no-referrer" />
    </motion.div>
  );
});

Bubble.displayName = 'Bubble';

const teams = [
  {
    id: 'science',
    name: 'Science',
    code: 'DEPT-01',
    status: 'ACTIVE',
    icon: Terminal,
    description: 'Forging the digital intellect of our machines.',
    color: 'text-[#ff1a1a]',
    bg: 'bg-[#ff1a1a]/5',
    border: 'border-[#ff1a1a]/30',
    glow: 'shadow-[0_0_20px_rgba(255,26,26,0.2)]'
  },
  {
    id: 'programmatics',
    name: 'Programmatics',
    code: 'DEPT-02',
    status: 'ACTIVE',
    icon: Users,
    description: 'Orchestrating the team\'s strategic momentum.',
    color: 'text-[#ff1a1a]',
    bg: 'bg-[#ff1a1a]/5',
    border: 'border-[#ff1a1a]/30',
    glow: 'shadow-[0_0_20px_rgba(255,26,26,0.2)]'
  },
  {
    id: 'engineering',
    name: 'Engineering',
    code: 'DEPT-03',
    status: 'ACTIVE',
    icon: Settings,
    description: 'Building the physical foundation of speed.',
    color: 'text-[#ff1a1a]',
    bg: 'bg-[#ff1a1a]/5',
    border: 'border-[#ff1a1a]/30',
    glow: 'shadow-[0_0_20px_rgba(255,26,26,0.2)]'
  }
];

const initialAssignments = [
  {
    teamId: 'engineering',
    subTeamId: 'suspension',
    title: 'Suspension Stress Analysis',
    description: 'Run FEA simulations on the front suspension components to ensure safety.',
    dueDate: '2026-03-21T17:00:00Z',
    importance: 5,
    completed: false,
    assignedTo: 'Alex Chen'
  },
  {
    teamId: 'engineering',
    subTeamId: 'drive-train',
    title: 'Drive Train Integration',
    description: 'Finalize the mounting points for the motor and gearbox.',
    dueDate: '2026-04-13T17:00:00Z',
    importance: 4,
    completed: false,
    assignedTo: 'Sarah Miller'
  },
  {
    teamId: 'programmatics',
    subTeamId: 'marketing',
    title: 'Sponsorship Proposal',
    description: 'Finalize the deck for the upcoming meeting with potential sponsors.',
    dueDate: '2026-03-25T17:00:00Z',
    importance: 5,
    completed: true,
    assignedTo: 'Jordan Lee'
  },
  {
    teamId: 'programmatics',
    subTeamId: 'finance',
    title: 'Budget Review',
    description: 'Audit the Q1 expenses and prepare the Q2 forecast.',
    dueDate: '2026-03-28T17:00:00Z',
    importance: 4,
    completed: false,
    assignedTo: 'Chris Wang'
  },
  {
    teamId: 'science',
    subTeamId: 'software-development',
    title: 'Telemetry Dashboard',
    description: 'Optimize the real-time data visualization for the trackside team.',
    dueDate: '2026-04-05T17:00:00Z',
    importance: 4,
    completed: false,
    assignedTo: 'Dr. Aris'
  },
  {
    teamId: 'science',
    subTeamId: 'science',
    title: 'Material Fatigue Test',
    description: 'Analyze carbon fiber samples after 1000 cycles.',
    dueDate: '2026-04-10T17:00:00Z',
    importance: 3,
    completed: false,
    assignedTo: 'Elena Rossi'
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Teams', href: '/#teams' },
    { name: 'News', href: '/news' },
    { name: 'Contacts', href: '/contacts' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      const targetHash = href.replace('/', '');
      if (window.location.hash === targetHash) {
        e.preventDefault();
        const id = targetHash.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-maroon selection:text-white">
      {/* Navigation */}
      <nav className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] md:w-max max-w-[98vw] transition-all duration-300">
        <div className="bg-[#0a0a0a]/90 border-0 md:border border-white/10 rounded-full px-4 md:px-8 py-2 flex items-center justify-between md:justify-center gap-4 md:gap-8 shadow-2xl flex-nowrap relative min-h-[52px]">
          
          {/* Mobile Spacer (Left) */}
          <div className="w-10 md:hidden" />

          {/* Logo - Centered on mobile, Left on desktop/tablet */}
          <div className="flex items-center shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img src="/logo2.png" alt="Logo" className="h-6 md:h-6 w-auto" referrerPolicy="no-referrer" />
          </div>
          
          {/* Desktop/Tablet Links - Show on md+ */}
          <div className="hidden md:flex items-center gap-8 text-[14px] font-slab tracking-widest text-white/70 uppercase">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:static md:translate-x-0">
            {/* Login - Hidden on mobile, shown on md+ */}
            <button className="hidden md:flex bg-maroon/60 hover:bg-maroon/80 text-white/90 px-6 py-1.5 rounded-xl transition-all items-center gap-2 shadow-lg shrink-0 min-w-[110px] justify-center">
              <div className="relative flex items-center gap-2 font-slab text-[13px] tracking-widest uppercase whitespace-nowrap">
                <User className="w-3.5 h-3.5" />
                Login
              </div>
            </button>

            {/* Mobile Menu Toggle - Only on mobile (< md) */}
            <div className="md:hidden ml-auto">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-white/70 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
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
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className="text-xl font-slab tracking-widest text-white/70 hover:text-white uppercase py-2 w-full"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="w-12 h-px bg-white/10 my-2" />

                {/* Login Button inside Mobile Menu */}
                <button className="w-full bg-maroon/60 hover:bg-maroon/80 text-white/90 px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg">
                  <User className="w-5 h-5" />
                  <span className="font-slab text-lg tracking-widest uppercase">Login</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-bg pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Straight Pillar Effect - The main vertical beam */}
          <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
            <LightPillar
              topColor="#ff1a1a"
              bottomColor="#000000"
              intensity={0.7}
              rotationSpeed={0.3}
              interactive={false}
              glowAmount={0.0015}
              pillarWidth={3}
              pillarHeight={0.4}
              noiseIntensity={0.5}
              pillarRotation={25}
              mixBlendMode="screen"
              quality="high"
              baseX={0.8} // Position it to the right within the full-screen shader
              className="absolute inset-0"
            />
          </div>

          {/* Large Bubbles */}
          <Bubble className="w-[17.6rem] h-[17.6rem] md:w-[26.4rem] md:h-[26.4rem] -left-[2rem] top-[30%]" delay={0} duration={10} />
          <Bubble className="w-[11rem] h-[11rem] md:w-[15.4rem] md:h-[15.4rem] right-[10%] bottom-[20%]" delay={2} duration={12} />
          <Bubble className="w-[4.4rem] h-[4.4rem] md:w-[6.6rem] md:h-[6.6rem] right-[25%] top-[25%]" delay={4} duration={9} />
          
          {/* Small Engineering Parts - Only 3 */}
          <Bubble className="w-8 h-8 left-[20%] top-[15%]" delay={1} duration={7} />
          <Bubble className="w-6 h-6 right-[15%] top-[40%]" delay={3} duration={6} />
          <Bubble className="w-10 h-10 left-[10%] bottom-[30%]" delay={5} duration={8} />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-dark-bg" />
        </div>

        <div className="z-10 text-center px-4 max-w-4xl flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-sans font-light tracking-tight mb-8 leading-[1.1] text-white"
          >
            We unite teams<br />
            to achieve <span className="text-maroon font-medium">excellence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-white/30 max-w-2xl mx-auto font-light leading-relaxed mb-12 shiny-text"
          >
            A space where every task has a purpose, every deadline drives progress, and every contribution matters.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full flex justify-center mb-20 -translate-y-4"
          >
            <Link 
              to="/#teams"
              onClick={(e) => handleNavClick(e, '/#teams')}
              className="group relative px-9 py-3.5 bg-[#050505] border border-maroon-light rounded-full transition-all duration-300 hover:bg-maroon/10 hover:border-maroon-light shadow-[0_0_20px_rgba(128,0,0,0.5)] animate-glow-pulse flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-maroon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Zap className="w-4 h-4 text-maroon-light group-hover:scale-110 transition-all duration-300" />
              <span className="relative text-white group-hover:text-white font-slab font-light text-base tracking-widest uppercase leading-none transition-colors duration-300">
                Check progress
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Sponsor Marquee */}
        <div className="absolute bottom-8 left-0 w-full z-20">
          <section className="relative mx-auto max-w-2xl px-6">
            <h2 className="mb-2 text-center font-medium text-white/30 text-[9px] tracking-[0.3em] uppercase">
              Trusted by experts:
            </h2>

            <LogoCloud logos={logos.map(l => ({ src: l.src, alt: l.name }))} />
          </section>
        </div>
      </section>

      {/* Teams Section */}
      <section id="teams" className="relative overflow-hidden bg-black py-24 md:py-32">
        {/* Technical Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Red Neon Particles - Increased count */}
          <NeonParticles count={450} />

          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,26,26,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,26,26,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,26,26,0.08),transparent_80%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 md:w-12 h-px bg-[#ff1a1a]" />
              <span className="text-[#ff1a1a] font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase">System Architecture</span>
              <div className="w-8 md:w-12 h-px bg-[#ff1a1a]" />
            </div>
            <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-display font-black mb-6 uppercase tracking-tighter leading-none sm:whitespace-nowrap">
              The <span className="text-[#ff1a1a] drop-shadow-[0_0_8px_rgba(255,26,26,0.5)]">Core</span> <span className="text-white/20">Units</span>
            </h2>
            <p className="text-lg md:text-xl font-light max-w-3xl leading-relaxed shiny-text">
              Three specialized departments operating in absolute synchronization to push the limits of automotive engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 relative justify-items-center">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative group ${index === 1 ? 'md:translate-y-12' : ''} [container-type:inline-size] w-full max-w-[280px] md:max-w-[300px] lg:max-w-[320px]`}
              >
                <Link 
                  to={`/team/${team.id}`}
                  className="block relative aspect-[4/5] md:aspect-[3/4] rounded-[2rem] border border-[#ff1a1a]/40 bg-[#ff1a1a]/[0.03] shadow-[0_0_25px_rgba(255,26,26,0.12)] transition-all duration-500 hover:border-[#ff1a1a]/80 hover:bg-[#ff1a1a]/10 group-hover:shadow-[0_0_60px_rgba(255,26,26,0.4)] overflow-hidden"
                >
                  {/* Internal Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_120%,rgba(255,26,26,0.15),transparent_70%)]" />
                  
                  {/* Card Background Particles */}
                  <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <NeonParticles count={40} />
                  </div>
                  
                  <div className="absolute inset-0 p-[10cqw] flex flex-col justify-center items-center text-center z-10">
                    <div className="mb-[8cqw] p-[4cqw] rounded-[20%] bg-[#ff1a1a]/10 border border-[#ff1a1a]/30 group-hover:border-[#ff1a1a]/60 group-hover:bg-[#ff1a1a]/20 transition-all duration-500 shadow-[0_0_15px_rgba(255,26,26,0.1)]">
                      <team.icon className="w-[8cqw] h-[8cqw] text-[#ff1a1a]/80 group-hover:text-[#ff1a1a] transition-colors" />
                    </div>

                    <div className="relative mb-[8cqw] w-full flex flex-col items-center">
                      <h3 className="text-[9.2cqw] font-display font-black text-white uppercase tracking-tight mb-[2cqw] group-hover:scale-110 transition-transform duration-500 leading-none text-center">
                        {team.name}
                      </h3>
                      <p className="text-white/40 text-[4.5cqw] font-light leading-relaxed group-hover:text-white/70 transition-colors duration-500 shiny-text text-center">
                        {team.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="group/btn relative px-[7cqw] py-[2.5cqw] bg-[#050505] border border-[#ff1a1a]/40 rounded-full transition-all duration-500 group-hover:bg-[#ff1a1a]/10 group-hover:border-[#ff1a1a] shadow-[0_0_15px_rgba(255,26,26,0.2)] flex items-center justify-center gap-[2cqw] overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#ff1a1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative text-[#ff1a1a]/70 group-hover:text-white font-mono text-[3cqw] tracking-[0.4em] uppercase transition-colors duration-300">
                          Explore
                        </span>
                        <ChevronRight className="relative w-[4cqw] h-[4cqw] text-[#ff1a1a]/70 group-hover:text-white transition-all duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Scanline */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div 
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      className="w-full h-1/3 bg-gradient-to-b from-transparent via-[#ff1a1a]/10 to-transparent"
                    />
                  </div>
                </Link>

                {/* Floating Label */}
                <div className="absolute -top-6 -right-4 pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <span className="text-8xl font-display font-black text-[#ff1a1a]/[0.05] uppercase tracking-tighter">
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
