import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  User, 
  AlertCircle,
  X,
  Menu
} from 'lucide-react';
import { Assignment } from '../types';
import { format, parseISO } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import LightPillar from '../components/LightPillar';
import { NeonParticles } from '../components/ui/NeonParticles';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const teamMeta: Record<string, { 
  name: string; 
  color: string; 
  desc: string; 
  code: string;
  subTeams: { id: string; name: string }[]
}> = {
  science: {
    name: 'Science',
    color: 'text-[#ff1a1a]',
    desc: 'Forging the digital intellect of our machines through cutting-edge software development and research.',
    code: 'MECHA-SCI',
    subTeams: [
      { id: 'software-development', name: 'Software Development' },
      { id: 'science', name: 'Science' }
    ]
  },
  programmatics: {
    name: 'Programmatics',
    color: 'text-[#ff1a1a]',
    desc: 'Orchestrating the team\'s strategic momentum through targeted outreach, financial precision, and brand elevation.',
    code: 'MECHA-PROG',
    subTeams: [
      { id: 'outreach', name: 'Outreach' },
      { id: 'scheduling', name: 'Scheduling' },
      { id: 'marketing', name: 'Marketing' },
      { id: 'finance', name: 'Finance' }
    ]
  },
  engineering: {
    name: 'Engineering',
    color: 'text-[#ff1a1a]',
    desc: 'Building the physical foundation of speed.',
    code: 'MECHA-ENG',
    subTeams: [
      { id: 'suspension', name: 'Suspension' },
      { id: 'steering-braking', name: 'Steering and braking' },
      { id: 'roll-cage', name: 'Roll cage' },
      { id: 'drive-train', name: 'Drive train' },
      { id: 'fabrication', name: 'Fabrication' }
    ]
  }
};

export default function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubTeam, setActiveSubTeam] = useState<string | null>(null);

  const meta = teamMeta[teamId || ''] || teamMeta.engineering;

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Teams', href: '/#teams' },
    { name: 'News', href: '/news' },
    { name: 'Contacts', href: '/contacts' },
  ];

  useEffect(() => {
    if (!teamId) return;

    const fetchTasks = () => {
      fetch("https://opensheet.elk.sh/1GaVgayOS4N3p8CV4FZCpSw85JdO-xd-XnDcMpjHuASs/Sheet1")
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data)) {
            console.error("Data is not an array:", data);
            setAssignments([]);
            setLoading(false);
            return;
          }
          const teamTasks = data
            .filter((t: any) => t.Team?.trim().toLowerCase() === meta.name.toLowerCase())
            .map((t: any, index: number) => ({
              id: `sheet-${index}`,
              teamId: teamId,
              subTeamId: t.Subteam?.trim().toLowerCase().replace(/\s+and\s+/g, '-').replace(/\s+/g, '-'),
              title: t.Task,
              description: t.Description,
              dueDate: t.Deadline,
              importance: 3,
              completed: t.Status?.trim() === 'Completed',
              assignedTo: ''
            }));
          
          setAssignments(teamTasks as any);
          setLoading(false);

          if (!activeSubTeam && meta.subTeams.length > 0) {
            setActiveSubTeam(meta.subTeams[0].id);
          }
        })
        .catch((err) => {
          console.error("Error fetching tasks from sheet:", err);
          setLoading(false);
        });
    };

    fetchTasks();
    const interval = setInterval(fetchTasks, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [teamId, meta.name, meta.subTeams, activeSubTeam]);

  const handleMarkCompleted = (id: string) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, completed: true } : a));
  };

  const sortedAssignments = [...assignments.filter(a => a.subTeamId === activeSubTeam)].sort((a, b) => {
    // Completed tasks at the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Sort by closest deadline
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return dateA - dateB;
  });

  const completedCount = sortedAssignments.filter(a => a.completed).length;
  const progressPercent = sortedAssignments.length > 0 
    ? Math.round((completedCount / sortedAssignments.length) * 100) 
    : 0;

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
            <Link to="/#teams" className="inline-flex items-center text-[#ff1a1a] font-mono text-xs tracking-[0.3em] uppercase mb-6 hover:-translate-y-1 transition-transform">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Units
            </Link>
            <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-display font-black mb-6 uppercase tracking-tighter leading-none sm:whitespace-nowrap">
              {meta.name} <span className="text-[#ff1a1a] drop-shadow-[0_0_10px_rgba(255,26,26,0.3)]">Unit</span>
            </h1>
            <p className="text-xl text-white/40 font-light leading-relaxed shiny-text max-w-xl mx-auto">
              {meta.desc}
            </p>
          </div>
        </div>

        {/* Sub-team Selection */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {meta.subTeams.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubTeam(sub.id)}
              className={cn(
                "group relative px-8 py-3.5 rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden border",
                activeSubTeam === sub.id 
                  ? "bg-maroon/20 border-maroon-light shadow-[0_0_25px_rgba(255,26,26,0.4)] animate-glow-pulse" 
                  : "bg-[#050505] border-white/10 hover:border-[#ff1a1a]/50"
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-tr from-[#ff1a1a]/20 to-transparent transition-opacity duration-500",
                activeSubTeam === sub.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )} />
              <span className={cn(
                "relative font-slab text-sm tracking-[0.2em] uppercase transition-colors duration-300",
                activeSubTeam === sub.id ? "text-white" : "text-white/40 group-hover:text-white"
              )}>
                {sub.name}
              </span>
            </button>
          ))}
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center text-white/20">
                <div className="w-12 h-12 border-2 border-current border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-mono text-xs tracking-widest uppercase">Synchronizing Data...</p>
              </div>
            ) : sortedAssignments.length === 0 ? (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2rem]">
                <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/30 font-light">No active assignments for this sub-unit.</p>
              </div>
            ) : (
              sortedAssignments.map((assignment) => (
                <motion.div
                  key={assignment.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "group relative p-7 rounded-[2rem] border transition-all duration-500 overflow-hidden flex flex-col min-h-[260px]",
                    assignment.completed 
                      ? "bg-emerald-500/[0.03] border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.12)] hover:border-emerald-500/80 hover:bg-emerald-500/10 hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]" 
                      : "bg-[#ff1a1a]/[0.03] border-[#ff1a1a]/40 shadow-[0_0_25px_rgba(255,26,26,0.12)] hover:border-[#ff1a1a]/80 hover:bg-[#ff1a1a]/10 hover:shadow-[0_0_60px_rgba(255,26,26,0.4)]"
                  )}
                >
                  {/* Internal Glow */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                    assignment.completed 
                      ? "bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.15),transparent_70%)]"
                      : "bg-[radial-gradient(circle_at_50%_120%,rgba(255,26,26,0.15),transparent_70%)]"
                  )} />
                  
                  {/* Card Background Particles */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                    <NeonParticles count={20} />
                  </div>

                  {/* Hover Scanline */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div 
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      className={cn(
                        "w-full h-1/3 bg-gradient-to-b from-transparent to-transparent",
                        assignment.completed ? "via-emerald-500/10" : "via-[#ff1a1a]/10"
                      )}
                    />
                  </div>

                  <div className="relative z-10 flex flex-col h-full gap-5">
                    {/* Header: Title and Date */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className={cn(
                          "text-xl font-display font-bold uppercase tracking-tight mb-1",
                          assignment.completed ? "text-emerald-500/90" : "text-white"
                        )}>
                          {assignment.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "w-1 h-1 rounded-full",
                                  i < assignment.importance 
                                    ? (assignment.completed ? "bg-emerald-500" : "bg-[#ff1a1a]") 
                                    : "bg-white/10"
                                )} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-[10px] tracking-widest uppercase transition-colors",
                          assignment.completed 
                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500" 
                            : "bg-white/5 border-white/10 text-white/60 group-hover:border-[#ff1a1a]/30 group-hover:text-white"
                        )}>
                          <Calendar className="w-3 h-3" />
                          {(() => {
                            try {
                              return format(parseISO(assignment.dueDate), 'MMM dd, yyyy');
                            } catch (e) {
                              return assignment.dueDate;
                            }
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                      <p className={cn(
                        "text-base font-light leading-relaxed max-w-2xl line-clamp-5",
                        assignment.completed ? "text-white/40" : "shiny-text"
                      )}>
                        {assignment.description}
                      </p>
                    </div>

                    {/* Footer: Status and Actions */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                          assignment.completed 
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                            : "bg-white/5 text-white/20 border border-white/10"
                        )}>
                          {assignment.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </div>
                        <span className={cn(
                          "font-mono text-[9px] tracking-widest uppercase",
                          assignment.completed ? "text-emerald-500" : "text-white/50"
                        )}>
                          {assignment.completed ? "Task Completed" : "In Progress"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
