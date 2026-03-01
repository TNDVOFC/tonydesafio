import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

const data = [
  { name: 'Resenhas na Mídia', value: 26, color: '#3B82F6' },
  { name: 'Tema do Livro', value: 18, color: '#10B981' },
  { name: 'Dica de Amigos', value: 18, color: '#F59E0B' },
  { name: 'Nome do Autor', value: 15, color: '#8B5CF6' },
  { name: 'Capa do Livro', value: 12, color: '#EC4899' },
  { name: 'Título do Livro', value: 11, color: '#F43F5E' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100"
      >
        {/* Header Compacto */}
        <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full blur-2xl" />
          </div>
          
          <h1 className="text-xl font-bold leading-tight mb-1">Escolha de Livros</h1>
          <p className="text-slate-400 text-xs">Pesquisa com adultos (40-45 anos)</p>
        </div>

        <div className="p-6">
          {/* Gráfico Pie com efeito de profundidade e tilt */}
          <div className="h-64 w-full relative mb-8 perspective-1000">
            <motion.div 
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 25 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full h-full relative z-10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {data.map((entry, index) => (
                      <linearGradient key={`gradient-${index}`} id={`grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                      </linearGradient>
                    ))}
                    <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="12" stdDeviation="8" floodOpacity="0.4" />
                    </filter>
                  </defs>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={6}
                    dataKey="value"
                    strokeWidth={0}
                    filter="url(#pieShadow)"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#grad-${index})`}
                        style={{ 
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
            
            {/* Sombra de base para flutuação */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/10 blur-xl rounded-full" />
            
            {/* Centro do Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
              <span className="text-2xl font-black text-slate-900 drop-shadow-sm">100%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Total</span>
            </div>
          </div>

          {/* Legenda Compacta */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] font-medium text-slate-600 truncate">{item.name}</span>
                <span className="text-[10px] font-bold text-slate-900 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>

          {/* Info Aluno */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-900">Anthony Carvalho</p>
              <p className="text-[10px] text-slate-500">Português • 8º Ano</p>
            </div>
            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl">
              <BookOpen size={16} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
