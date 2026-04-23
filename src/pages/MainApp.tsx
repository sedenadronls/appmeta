import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckSquare, Target, Settings, Plus, Flame, CheckCircle2, Circle, ChevronRight, ArrowLeft, Send, Play, Moon, LogOut, DownloadCloud, Star, Bell, Trash2 } from 'lucide-react';

export function MainApp({ isDarkMode, setIsDarkMode, onLogout, userName }: any) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [showNotifs, setShowNotifs] = useState(false);

  // Global Mock DB State
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Morning Workout', time: '07:00 AM', completed: true, status: 'today' },
    { id: '2', title: 'Review PRs', time: '10:00 AM', completed: false, status: 'today' },
    { id: '3', title: 'Write Weekly Report', time: '02:00 PM', completed: false, status: 'today' },
  ]);

  const [goals, setGoals] = useState([
    { 
      id: '1', title: 'Launch MVP', progress: 45, deadline: '2026-05-01', daysLeft: 14, 
      description: 'Ship the alpha build to the first 100 users.',
      subtasks: [{ id: 's1', title: 'Setup DB', completed: true }, { id: 's2', title: 'Build UI', completed: false }],
      notes: [{ id: 'n1', date: 'Oct 12', content: 'Database schema finalized.' }]
    },
  ]);

  const [alarms, setAlarms] = useState([
    { id: '1', time: '06:30 AM', label: 'Deep Work Wake', active: true },
    { id: '2', time: '08:00 PM', label: 'Wind Down', active: false }
  ]);

  const notifications = [
    { id: 1, title: 'Deadline Approaching', text: '5 days left to complete your Launch MVP goal.', urgent: false },
    { id: 2, title: 'Inactivity Alert', text: 'You haven\'t checked your progress today. Did you work on your goals?', urgent: true },
    { id: 3, title: 'Task Reminder', text: 'Morning Workout is scheduled for 07:00 AM!', urgent: false },
  ];

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTask = (id: string) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
  const toggleAlarm = (id: string) => setAlarms(alarms.map(a => a.id === id ? { ...a, active: !a.active } : a));

  const handleAddTask = () => {
    if(!newTaskTitle.trim()) return;
    setTasks([{ id: Date.now().toString(), title: newTaskTitle, time: 'Now', completed: false, status: 'today' }, ...tasks]);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const [noteInput, setNoteInput] = useState('');
  const addNote = () => {
    if(!noteInput.trim()) return;
    setGoals(goals.map(g => g.id === selectedGoal.id ? {...g, notes: [{id: Date.now().toString(), date: 'Today', content: noteInput}, ...g.notes]} : g));
    setNoteInput('');
  };

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      <AnimatePresence mode="wait">
        {selectedGoal ? (
          // GOAL DETAIL SCREEN
          <motion.div key="goal-detail" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="absolute inset-0 bg-[#f7f5f0] dark:bg-[#1a1814] z-20 flex flex-col">
            <header className="pt-12 pb-4 px-6 flex items-center gap-4 bg-white/50 dark:bg-black/20 backdrop-blur-md border-b border-[#947e62]/20">
              <button onClick={() => setSelectedGoal(null)} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"><ArrowLeft className="w-6 h-6" /></button>
              <h1 className="font-serif text-2xl font-bold flex-1 truncate">{selectedGoal.title}</h1>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="bg-white/40 dark:bg-black/20 p-6 rounded-3xl border border-[#947e62]/20">
                <div className="flex justify-between mb-2"><span className="text-sm rounded opacity-70">Progress</span><span className="font-bold text-[#947e62]">{selectedGoal.progress}%</span></div>
                <div className="h-2 w-full bg-[#2d2a26]/10 dark:bg-white/10 rounded-full overflow-hidden mb-6"><div className="h-full bg-[#947e62] rounded-full" style={{ width: `${selectedGoal.progress}%` }} /></div>
                <div className="flex gap-4"><div className="flex-1 p-4 rounded-2xl bg-black/5 dark:bg-white/5"><div className="text-3xl font-serif">{selectedGoal.daysLeft}</div><div className="text-xs uppercase tracking-wider opacity-60">Days Left</div></div></div>
              </div>
              <div>
                 <h3 className="font-serif text-xl mb-4">Daily Notes</h3>
                 <div className="flex gap-2 mb-4">
                   <input type="text" value={noteInput} onChange={e => setNoteInput(e.target.value)} placeholder="Write today's note..." className="flex-1 p-4 rounded-xl bg-white/40 dark:bg-black/20 focus:outline-none border border-[#947e62]/20" />
                   <button onClick={addNote} className="p-4 rounded-xl bg-[#947e62] text-white"><Send className="w-5 h-5" /></button>
                 </div>
                 <div className="space-y-3">
                   {goals.find(g => g.id === selectedGoal.id)?.notes.map(n => (
                     <div key={n.id} className="p-4 rounded-2xl bg-white/20 dark:bg-black/10 border border-[#947e62]/10"><div className="text-xs font-semibold text-[#947e62] mb-1">{n.date}</div><div className="text-sm opacity-90">{n.content}</div></div>
                   ))}
                 </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // MAIN TABS
          <motion.div key="main-tabs" className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto pb-24">
              
              {/* HOME TAB */}
              {activeTab === 'home' && (
                <div className="p-6 md:p-8 space-y-8 mt-12 md:mt-4">
                  <header className="flex justify-between items-start relative z-50">
                    <div>
                      <div className="text-sm font-semibold tracking-widest text-[#947e62] uppercase mb-1">Good Morning</div>
                      <h1 className="font-serif text-4xl font-bold">{userName}</h1>
                    </div>
                    <div className="relative">
                      <button onClick={() => setShowNotifs(!showNotifs)} className="p-2 relative bg-white/40 dark:bg-black/20 rounded-full border border-[#947e62]/20 shadow-sm transition-all hover:bg-white dark:hover:bg-black">
                        <Bell className="w-6 h-6 text-[#947e62]" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1814]"></span>
                      </button>
                      <AnimatePresence>
                        {showNotifs && (
                          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 top-14 w-72 md:w-80 glass-panel dark:bg-black/80 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-[#947e62]/20">
                            <h3 className="font-serif text-lg font-bold mb-3 border-b border-[#947e62]/10 pb-2 flex justify-between">Notifications <button onClick={() => setShowNotifs(false)} className="text-xs opacity-50 font-sans">Close</button></h3>
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                              {notifications.map(n => (
                                <div key={n.id} className="p-3 bg-white/50 dark:bg-black/30 rounded-xl border border-[#947e62]/10">
                                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${n.urgent ? 'text-red-500' : 'text-[#947e62]'}`}>{n.title}</div>
                                  <div className="text-sm opacity-80 leading-snug">{n.text}</div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </header>

                  <div className="glass-panel dark:bg-black/20 p-6 rounded-3xl relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-serif text-2xl">Current Streak</h3>
                      <Flame className="text-[#947e62] w-6 h-6 animate-pulse" />
                    </div>
                    <div className="text-6xl font-serif mb-2">14<span className="text-2xl opacity-50"> days</span></div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl mb-4 flex items-center justify-between">Next Task <button className="text-sm text-[#947e62]" onClick={() => setActiveTab('tasks')}>See All</button></h3>
                    <div className="bg-[#947e62] text-white p-6 rounded-3xl flex justify-between items-center shadow-lg">
                      <div><div className="text-sm opacity-80 mb-1">10:00 AM</div><div className="font-semibold text-xl">Review PRs</div></div>
                      <button className="w-12 h-12 bg-white text-[#947e62] rounded-full flex items-center justify-center transition-transform active:scale-95"><Play className="w-5 h-5 ml-1" /></button>
                    </div>
                  </div>

                  {/* ALARMS WIDGET */}
                  <div>
                    <h3 className="font-serif text-xl mb-4 flex items-center justify-between">Smart Alarms <button className="text-sm text-[#947e62] flex items-center gap-1"><Plus className="w-4 h-4"/> Add</button></h3>
                    <div className="space-y-3">
                      {alarms.map((alarm) => (
                        <div key={alarm.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-[#947e62]/10 shadow-sm transition-all hover:bg-white/60 dark:hover:bg-black/40">
                          <div>
                            <div className="font-sans font-semibold text-xl mb-1">{alarm.time}</div>
                            <div className="text-xs font-medium uppercase tracking-widest opacity-60 text-[#947e62]">{alarm.label}</div>
                          </div>
                          <button onClick={() => toggleAlarm(alarm.id)} className={`w-12 h-6 rounded-full p-1 transition-colors ${alarm.active ? 'bg-[#947e62]' : 'bg-black/10 dark:bg-white/10'}`}>
                            <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-sm" style={{ originX: alarm.active ? 1 : 0 }} animate={{ x: alarm.active ? 24 : 0 }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TASKS TAB */}
              {activeTab === 'tasks' && (
                <div className="p-6 md:p-8 space-y-6 mt-12 md:mt-4">
                  <header className="flex justify-between items-center"><h1 className="font-serif text-4xl font-bold">Tasks</h1><button onClick={() => setIsAddingTask(!isAddingTask)} className="p-2 bg-[#947e62] text-white rounded-full shadow-lg"><Plus className="w-5 h-5" /></button></header>
                  
                  <AnimatePresence>
                    {isAddingTask && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-2 p-2 bg-white/50 dark:bg-black/30 border border-[#947e62]/20 rounded-2xl overflow-hidden">
                        <input autoFocus type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddTask()} placeholder="New task..." className="flex-1 bg-transparent px-2 text-sm focus:outline-none" />
                        <button onClick={handleAddTask} className="px-3 py-1.5 bg-[#947e62] text-white text-xs font-bold rounded-xl">Save</button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
                    <div className="flex-1 text-center py-2 bg-white dark:bg-white/10 rounded-lg shadow-sm font-medium text-sm">Today</div>
                    <div className="flex-1 text-center py-2 opacity-50 font-medium text-sm">Upcoming</div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <AnimatePresence mode="popLayout">
                      {tasks.map(task => (
                        <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, x: -100 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} className="relative overflow-hidden rounded-2xl bg-[#947e62]/5 dark:bg-black/20">
                          
                          {/* UNDERLAY ACTIONS (Visible when dragging) */}
                          <div className="absolute inset-0 flex">
                            <div className="w-1/2 bg-green-500/20 flex text-green-700 dark:text-green-400 items-center pl-6 font-semibold uppercase text-[10px] tracking-widest"><CheckCircle2 className="w-5 h-5 mr-3"/> Complete</div>
                            <div className="w-1/2 bg-red-500/20 flex justify-end text-red-700 dark:text-red-400 items-center pr-6 font-semibold uppercase text-[10px] tracking-widest"><Trash2 className="w-5 h-5 mr-3"/> Delete</div>
                          </div>

                          {/* DRAGGABLE CARD */}
                          <motion.div 
                            drag="x" 
                            dragConstraints={{ left: 0, right: 0 }} 
                            dragSnapToOrigin={true}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => { 
                              if (offset.x > 80) toggleTask(task.id); 
                              else if (offset.x < -80) deleteTask(task.id); 
                            }} 
                            className={`relative p-5 rounded-2xl flex items-center gap-4 transition-colors ${task.completed ? 'bg-white/80 dark:bg-[#1a1814] border border-transparent opacity-50' : 'bg-white/95 dark:bg-[#2d2a26] border border-[#947e62]/20 shadow-sm'}`}
                          >
                            <button onClick={() => toggleTask(task.id)} className="shrink-0 transition-transform active:scale-75">{task.completed ? <CheckCircle2 className="w-6 h-6 text-[#947e62]" /> : <Circle className="w-6 h-6 opacity-30" />}</button>
                            <div className="flex-1"><div className={`font-medium text-lg leading-tight ${task.completed ? 'line-through opacity-70' : ''}`}>{task.title}</div><div className="text-xs opacity-50 mt-1 font-semibold tracking-wider">{task.time}</div></div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* GOALS TAB */}
              {activeTab === 'goals' && (
                <div className="p-6 md:p-8 space-y-6 mt-12 md:mt-4">
                  <header className="flex justify-between items-center"><h1 className="font-serif text-4xl font-bold">Goals</h1><button className="p-2 bg-[#947e62] text-white rounded-full shadow-lg"><Plus className="w-5 h-5" /></button></header>
                  <div className="space-y-4">
                    {goals.map(goal => (
                      <button key={goal.id} onClick={() => setSelectedGoal(goal)} className="w-full text-left p-6 rounded-3xl bg-white/50 dark:bg-black/30 border border-[#947e62]/20 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div><h3 className="font-serif text-2xl font-bold mb-1">{goal.title}</h3><div className="text-xs font-semibold text-[#947e62] bg-[#947e62]/20 px-2 py-1 rounded-md w-fit">{goal.daysLeft} days left</div></div>
                          <ChevronRight className="opacity-30" />
                        </div>
                        <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#947e62] rounded-full" style={{ width: `${goal.progress}%` }} /></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="p-6 md:p-8 space-y-8 mt-12 md:mt-4">
                  <header><h1 className="font-serif text-4xl font-bold">Settings</h1></header>
                  <div className="space-y-6">
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3">Preferences</h4>
                      <div className="bg-white/50 dark:bg-black/30 rounded-3xl border border-[#947e62]/10 overflow-hidden">
                        <div className="p-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                          <div className="flex items-center gap-3"><Moon className="w-5 h-5 opacity-70" /><span>Dark Mode</span></div>
                          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-[#947e62]' : 'bg-black/10 dark:bg-white/10'}`}><motion.div layout className="w-4 h-4 rounded-full bg-white shadow-sm" style={{ originX: isDarkMode ? 1 : 0 }} animate={{ x: isDarkMode ? 24 : 0 }} /></button>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3"><Bell className="w-5 h-5 opacity-70" /><span>Notifications</span></div>
                          <button className="w-12 h-6 rounded-full p-1 bg-[#947e62]"><motion.div className="w-4 h-4 rounded-full bg-white shadow-sm translate-x-6" /></button>
                        </div>
                      </div>
                    </section>
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3">Data & Account</h4>
                      <div className="bg-white/50 dark:bg-black/30 rounded-3xl border border-[#947e62]/10 overflow-hidden">
                        <button className="w-full p-4 flex items-center gap-3 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"><DownloadCloud className="w-5 h-5 opacity-70" /><span>Backup / Sync</span></button>
                        <button onClick={onLogout} className="w-full p-4 flex items-center gap-3 text-red-500 hover:bg-red-500/10 transition-colors"><LogOut className="w-5 h-5" /><span>Logout</span></button>
                      </div>
                    </section>
                  </div>
                  <footer className="pt-8 flex flex-col items-center justify-center opacity-60">
                    <div className="font-cursive text-3xl mb-2 text-[#947e62]">Μετανοlι</div>
                    <div className="text-[10px] tracking-widest uppercase font-semibold mb-4">Version 1.0.0</div>
                    <button className="flex items-center gap-2 text-sm font-semibold bg-[#947e62]/20 text-[#947e62] px-4 py-2 rounded-xl"><Star className="w-4 h-4" /> Rate Us</button>
                  </footer>
                </div>
              )}
            </div>

            {/* BOTTOM NAVIGATION BOARD */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 md:pb-8 bg-gradient-to-t from-white via-white/80 dark:from-[#1a1814] dark:via-[#1a1814]/80 to-transparent pt-8 z-50">
              <nav className="flex justify-around items-center bg-white/80 dark:bg-[#2d2a26]/80 backdrop-blur-2xl p-2 rounded-3xl shadow-xl border border-[#947e62]/20 relative">
                {[
                  { id: 'home', icon: Home, label: 'Home' },
                  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
                  { id: 'goals', icon: Target, label: 'Goals' },
                  { id: 'settings', icon: Settings, label: 'Settings' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative flex flex-col items-center justify-center w-16 h-12 rounded-2xl transition-all ${activeTab === tab.id ? 'text-[#947e62]' : 'opacity-40 hover:opacity-100'}`}>
                    {activeTab === tab.id && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-[#947e62]/10 rounded-2xl" />}
                    <tab.icon className="w-6 h-6 relative z-10" />
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
