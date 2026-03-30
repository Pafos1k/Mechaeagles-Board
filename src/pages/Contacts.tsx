import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Menu,
  X,
  Mail,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import LightPillar from '../components/LightPillar';
import { NeonParticles } from '../components/ui/NeonParticles';

import { getAssetPath } from '../lib/assets';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const leaders = [
  {
    id: 'vedarsh-mishra',
    name: 'Vedarsh Mishra',
    role: 'Project Manager',
    image: getAssetPath('VedarshMishra.jpg'),
    email: 'mailto:mishrave@bc.edu',
    discord: 'pathseekingscholar',
    discordId: '575852049699307521' // Add numeric Discord ID here for direct messaging
  },
  {
    id: 'austin-kinnealey',
    name: 'Austin Kinnealey',
    role: 'Project Manager',
    image: getAssetPath('Austin%20Kinnealey.jpg'),
    email: 'mailto:kinneaau@bc.edu',
    discord: 'austin_67679',
    discordId: '1326938065700261919'
  },
  {
    id: 'lucas-dimarco',
    name: 'Lucas DiMarco',
    role: 'Science Lead',
    image: getAssetPath('Lucas%20DiMarco.jpg'),
    email: 'mailto:dimarc@bc.edu',
    discord: 'lucasanthonydimarco_64401',
    discordId: '1374159432723861626'
  },
  {
    id: 'ambrose-mccullough',
    name: 'Ambrose McCullough',
    role: 'Programmatics Lead',
    image: getAssetPath('Ambrose%20McCullough.jpg'),
    email: 'mailto:mccull@bc.edu',
    discord: 'ambrosemccullough',
    discordId: '1330744010226008084'
  },
  {
    id: 'sam-kaiser',
    name: 'Sam Kaiser',
    role: 'Engineering Lead',
    image: getAssetPath('Samuel%20Kaiser.jpg'),
    email: 'mailto:kazmies@bc.edu',
    discord: 'samrkaiser13',
    discordId: '1466249640658731029'
  },
  {
    id: 'vladislav-hoila',
    name: 'Vladislav Hoila',
    role: 'Head of Software Development',
    image: getAssetPath('Vlad1.jpg'),
    email: 'mailto:hoila@bc.edu',
    discord: 'vladhoila',
    discordId: '1466249192489091332'
  },
  {
    id: 'christian-roth',
    name: 'Christian Roth',
    role: 'Head of Specialization Compliance',
    image: getAssetPath('Christian%20Roth.jpg'),
    email: 'mailto:rothchr@bc.edu',
    discord: 'lazypanda12',
    discordId: '672921989756878898'
  },
  {
    id: 'jack-dauphinais',
    name: 'Jack Dauphinais',
    role: 'Head of Research',
    image: getAssetPath('Jack%20Dauphinais.jpg'),
    email: 'mailto:dauphinj@bc.edu',
    discord: 'jackdauphinais0822',
    discordId: '1468773061892243540'
  },
  {
    id: 'atharva-naik',
    name: 'Atharva Naik',
    role: 'Head of HCD',
    image: getAssetPath('Atharva%20Naik.jpg'),
    email: 'mailto:naikat@bc.edu',
    discord: '-',
    discordId: ''
  },
  {
    id: 'maxwell-crawford',
    name: 'Maxwell Crawford',
    role: 'Head of Outreach',
    image: getAssetPath('Maxwell%20Crawford.jpg'),
    email: 'mailto:crawfm@bc.edu',
    discord: 'peanut_hedder',
    discordId: '1139290530094780456'
  },
  {
    id: 'carlos-contreras',
    name: 'Carlos Contreras',
    role: 'Head of Scheduling',
    image: getAssetPath('Juan%20%28Carlos%29%20Contreras.jpg'),
    email: 'mailto:contrejk@bc.edu',
    discord: 'vexus0468',
    discordId: '463036437949055006'
  },
  {
    id: 'michael-maurice',
    name: 'Michael Maurice',
    role: 'Head of Marketing',
    image: getAssetPath('MichaelMaurice.jpg'),
    email: 'mailto:mauricm@bc.edu',
    discord: 'usa.baby',
    discordId: '614989008094625816'
  },
  {
    id: 'matt-mahan',
    name: 'Matt Mahan',
    role: 'Head of Finance',
    image: getAssetPath('Matt%20Mahan.jpg'),
    email: 'mailto:mahanmat@bc.edu',
    discord: 'mattm3118902',
    discordId: '830894296739348522'
  },
  {
    id: 'troy-sterling',
    name: 'Troy Sterling',
    role: 'Head of Suspension',
    image: getAssetPath('Troy%20Sterling.jpg'),
    email: 'mailto:sterlit@bc.edu',
    discord: '-',
    discordId: ''
  },
  {
    id: 'tobin-ting',
    name: 'Tobin Ting',
    role: 'Head of Steering',
    image: getAssetPath('Tobin%20Ting.jpg'),
    email: 'mailto:tingto@bc.edu',
    discord: 'splishysplashyspaghetti',
    discordId: '285077490001641483'
  },
  {
    id: 'paul-gin',
    name: 'Paul Gin',
    role: 'Head of Roll Cage',
    image: getAssetPath('Paulino%20Gin.jpg'),
    email: 'mailto:ginp@bc.edu',
    discord: '-',
    discordId: ''
  },
  {
    id: 'asad-faqirzada',
    name: 'Asad Faqirzada',
    role: 'Head of Drive Train',
    image: getAssetPath('Asad%20Faquirzada.jpg'),
    email: 'mailto:faqirzad@bc.edu',
    discord: 'asad_faqirzada',
    discordId: '849748343412097024'
  },
  {
    id: 'jack-delgrande',
    name: 'Jack DelGrande',
    role: 'Head of Fabrication',
    image: getAssetPath('Jack%20DelGrande.jpg'),
    email: 'mailto:delgran@bc.edu',
    discord: '-',
    discordId: ''
  }
];

export default function Contacts() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Teams', href: '/#teams' },
    { name: 'News', href: '/news' },
    { name: 'Contacts', href: '/contacts' },
  ];

  const handleDiscordClick = (username: string, userId?: string) => {
    if (username === '-') return;
    
    // Copy to clipboard
    navigator.clipboard.writeText(username);
    setCopySuccess(username);
    
    // Open Discord
    if (userId) {
      // If we have a numeric ID, we can link directly to their profile/DM
      window.open(`https://discord.com/users/${userId}`, '_blank');
    } else {
      // Fallback to just opening the app if we only have a username
      window.open('https://discord.com/app', '_blank');
    }
    
    setTimeout(() => setCopySuccess(null), 2000);
  };

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
            <img src={getAssetPath('logo2.png')} alt="Logo" className="h-6 w-auto" referrerPolicy="no-referrer" />
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
                  <Link key={link.name} to={link.href} onClick={() => setMobileMenuOpen(false)} className="text-xl font-slab tracking-widest text-white/70 hover:text-white uppercase py-2 w-full">
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
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-display font-black mb-6 uppercase tracking-tighter leading-none sm:whitespace-nowrap">
              Leadership <span className="text-[#ff1a1a] drop-shadow-[0_0_10px_rgba(255,26,26,0.3)]">Board</span>
            </h1>
            <p className="text-xl text-white/40 font-light leading-relaxed shiny-text mx-auto">
              The minds behind the machine. Connect with our department leads.
            </p>
          </div>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-[2rem] border bg-[#ff1a1a]/[0.03] border-[#ff1a1a]/20 hover:border-[#ff1a1a]/50 hover:bg-[#ff1a1a]/[0.06] transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-[#ff1a1a]/30 group-hover:border-[#ff1a1a] transition-colors duration-500 shadow-[0_0_20px_rgba(255,26,26,0.1)] group-hover:shadow-[0_0_30px_rgba(255,26,26,0.3)]">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h3 className="text-[14px] font-roboto-slab font-bold tracking-widest uppercase mb-2 text-white">
                {leader.name}
              </h3>
              
              <p className="text-[12px] font-roboto-slab tracking-widest text-[#ff1a1a] uppercase mb-8">
                {leader.role}
              </p>

              <div className="flex items-center gap-4 mt-auto w-full">
                <a 
                  href={leader.email}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff1a1a]/50 hover:bg-[#ff1a1a]/10 hover:text-[#ff1a1a] transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-slab text-xs tracking-widest uppercase">Email</span>
                </a>
                <button 
                  onClick={() => leader.discord !== '-' && handleDiscordClick(leader.discord, leader.discordId)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-300 relative",
                    leader.discord === '-' 
                      ? "bg-white/5 border-white/5 text-white/20 cursor-not-allowed" 
                      : "bg-white/5 border-white/10 hover:border-[#ff1a1a]/50 hover:bg-[#ff1a1a]/10 hover:text-[#ff1a1a]"
                  )}
                  disabled={leader.discord === '-'}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-slab text-xs tracking-widest uppercase flex items-center gap-1">
                    {leader.discord === '-' ? (
                      'Discord'
                    ) : copySuccess === leader.discord ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      'Discord'
                    )}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
