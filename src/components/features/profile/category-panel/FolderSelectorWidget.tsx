// import React, { useState } from 'react'
// import {
//   Folder,
//   FolderOpen,
//   Check,
//   Search,
//   Plus,
//   HardDrive,
//   ChevronRight,
//   Settings,
// } from 'lucide-react'

// export default function FolderSelectorWidget() {
//   // Configuração do Tema (Mapeado das cores fornecidas)
//   const theme = {
//     colors: {
//       primary: '#8B5CF6',
//       primaryHover: '#7C3AED',
//       background: '#111827',
//       backgroundSoft: 'rgba(17,24,39,0.3)',
//       card: '#1F2937',
//       text: '#E5E7EB',
//       textMuted: '#9CA3AF',
//       border: '#374151',
//       borderStrong: '#4B5563',
//       borderSubtle: 'rgba(55,65,81,0.5)',
//       overlay: 'rgba(0,0,0,0.6)',
//       ring: 'rgba(255,255,255,0.1)',
//     },
//   }

//   // Mock Data
//   const [folders, setFolders] = useState([
//     {
//       id: 1,
//       name: 'Campanhas 2024',
//       path: '/marketing/campanhas-2024',
//       count: 12,
//     },
//     { id: 2, name: 'Posters Instagram', path: '/social/instagram', count: 45 },
//     { id: 3, name: 'Lançamentos Q1', path: '/produtos/lancamentos', count: 8 },
//     { id: 4, name: 'Rascunhos', path: '/pessoal/rascunhos', count: 2 },
//     { id: 5, name: 'Arquivados', path: '/backups/2023', count: 156 },
//   ])

//   const [currentFolderId, setCurrentFolderId] = useState(2) // "Posters Instagram" selecionado por padrão
//   const [isChanging, setIsChanging] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')

//   const currentFolder = folders.find((f) => f.id === currentFolderId)

//   const filteredFolders = folders.filter((f) =>
//     f.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   return (
//     <div
//       className="flex min-h-screen w-full items-center justify-center p-6 font-sans"
//       style={{
//         backgroundColor: theme.colors.background,
//         color: theme.colors.text,
//       }}
//     >
//       <div
//         className="w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl transition-all duration-300"
//         style={{
//           backgroundColor: theme.colors.card,
//           border: `1px solid ${theme.colors.border}`,
//           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
//         }}
//       >
//         {/* Cabeçalho do Widget */}
//         <div
//           className="border-b p-6"
//           style={{ borderColor: theme.colors.border }}
//         >
//           <div className="mb-1 flex items-center justify-between">
//             <h2 className="flex items-center gap-2 text-lg font-semibold">
//               <HardDrive size={20} style={{ color: theme.colors.primary }} />
//               Destino dos Posters
//             </h2>
//             <button className="rounded-full p-2 transition-colors hover:bg-white/5">
//               <Settings size={18} style={{ color: theme.colors.textMuted }} />
//             </button>
//           </div>
//           <p className="text-sm" style={{ color: theme.colors.textMuted }}>
//             Gerencie onde seus novos posters serão salvos automaticamente.
//           </p>
//         </div>

//         {/* Área da Pasta Atual (Sempre visível) */}
//         <div className="relative p-6">
//           <label
//             className="mb-3 block text-xs font-bold uppercase tracking-wider"
//             style={{ color: theme.colors.textMuted }}
//           >
//             Pasta Selecionada Atualmente
//           </label>

//           <div
//             className="group relative flex items-center gap-4 overflow-hidden rounded-xl border p-5 transition-all duration-300"
//             style={{
//               backgroundColor: theme.colors.backgroundSoft,
//               borderColor: isChanging
//                 ? theme.colors.primary
//                 : theme.colors.borderStrong,
//               boxShadow: isChanging
//                 ? `0 0 20px ${theme.colors.primary}20`
//                 : 'none',
//             }}
//           >
//             {/* Ícone com Glow */}
//             <div
//               className="flex items-center justify-center rounded-lg p-3 shadow-lg"
//               style={{
//                 backgroundColor: isChanging
//                   ? theme.colors.primary
//                   : theme.colors.border,
//                 color: '#fff',
//                 transition: 'background-color 0.3s',
//               }}
//             >
//               <FolderOpen size={24} />
//             </div>

//             <div className="min-w-0 flex-1">
//               <h3 className="truncate text-lg font-medium">
//                 {currentFolder?.name}
//               </h3>
//               <p className="flex items-center gap-1 truncate text-xs opacity-70">
//                 <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
//                 {currentFolder?.path}
//               </p>
//             </div>

//             <div className="text-right">
//               <span
//                 className="block text-xs font-medium"
//                 style={{ color: theme.colors.textMuted }}
//               >
//                 Itens
//               </span>
//               <span className="font-bold">{currentFolder?.count}</span>
//             </div>
//           </div>

//           {/* Botão de Toggle para Mudar Pasta */}
//           {!isChanging && (
//             <div className="mt-6">
//               <button
//                 onClick={() => setIsChanging(true)}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:translate-y-[-1px]"
//                 style={{
//                   backgroundColor: theme.colors.primary,
//                   color: '#fff',
//                 }}
//                 onMouseOver={(e) =>
//                   (e.currentTarget.style.backgroundColor =
//                     theme.colors.primaryHover)
//                 }
//                 onMouseOut={(e) =>
//                   (e.currentTarget.style.backgroundColor = theme.colors.primary)
//                 }
//               >
//                 Alterar Pasta de Destino
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Área de Seleção (Expansível) */}
//         {isChanging && (
//           <div className="animate-in fade-in slide-in-from-top-4 duration-300">
//             <div className="px-6 pb-2">
//               <div
//                 className="flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-all focus-within:ring-2"
//                 style={{
//                   backgroundColor: theme.colors.background,
//                   borderColor: theme.colors.border,
//                   '--tw-ring-color': theme.colors.primary,
//                 }}
//               >
//                 <Search size={18} style={{ color: theme.colors.textMuted }} />
//                 <input
//                   type="text"
//                   placeholder="Buscar pasta..."
//                   className="w-full border-none bg-transparent text-sm placeholder-gray-500 outline-none"
//                   style={{ color: theme.colors.text }}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   autoFocus
//                 />
//               </div>
//             </div>

//             <div className="custom-scrollbar max-h-[280px] overflow-y-auto px-4 pb-4 pt-2">
//               <div className="space-y-1">
//                 {filteredFolders.map((folder) => {
//                   const isActive = folder.id === currentFolderId
//                   return (
//                     <button
//                       key={folder.id}
//                       onClick={() => {
//                         setCurrentFolderId(folder.id)
//                         setIsChanging(false)
//                       }}
//                       className="group flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all"
//                       style={{
//                         backgroundColor: isActive
//                           ? 'rgba(139, 92, 246, 0.1)'
//                           : 'transparent',
//                       }}
//                     >
//                       <div
//                         style={{
//                           color: isActive
//                             ? theme.colors.primary
//                             : theme.colors.textMuted,
//                         }}
//                       >
//                         {isActive ? (
//                           <FolderOpen size={20} />
//                         ) : (
//                           <Folder size={20} />
//                         )}
//                       </div>

//                       <div className="flex-1">
//                         <p
//                           className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}
//                           style={{
//                             color: isActive ? '#fff' : theme.colors.text,
//                           }}
//                         >
//                           {folder.name}
//                         </p>
//                         <p
//                           className="truncate text-xs opacity-60"
//                           style={{ color: theme.colors.textMuted }}
//                         >
//                           {folder.path}
//                         </p>
//                       </div>

//                       {isActive && (
//                         <div className="rounded-full bg-purple-500/20 p-1">
//                           <Check
//                             size={14}
//                             style={{ color: theme.colors.primary }}
//                           />
//                         </div>
//                       )}

//                       {!isActive && (
//                         <ChevronRight
//                           size={14}
//                           className="opacity-0 transition-opacity group-hover:opacity-100"
//                           style={{ color: theme.colors.textMuted }}
//                         />
//                       )}
//                     </button>
//                   )
//                 })}
//               </div>

//               {/* Ação de Criar Nova Pasta */}
//               <button
//                 className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed p-3 text-sm transition-colors hover:bg-white/5"
//                 style={{
//                   borderColor: theme.colors.borderStrong,
//                   color: theme.colors.textMuted,
//                 }}
//               >
//                 <Plus size={16} />
//                 <span>Criar Nova Pasta</span>
//               </button>
//             </div>

//             {/* Footer da Seleção */}
//             <div
//               className="flex justify-end border-t bg-black/20 p-4"
//               style={{ borderColor: theme.colors.border }}
//             >
//               <button
//                 onClick={() => setIsChanging(false)}
//                 className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5"
//                 style={{ color: theme.colors.textMuted }}
//               >
//                 Cancelar
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Styles for Custom Scrollbar to match theme */}
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background-color: ${theme.colors.border};
//           border-radius: 20px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background-color: ${theme.colors.borderStrong};
//         }
//       `}</style>
//     </div>
//   )
// }
