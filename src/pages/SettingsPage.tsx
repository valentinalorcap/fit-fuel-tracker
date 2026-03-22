import { motion } from "framer-motion";
import { User, Target, Bell, Database, ChevronRight, LogOut } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const settingsGroups = [
  {
    title: "Perfil",
    items: [
      { icon: User, label: "Datos personales", desc: "Peso, altura, actividad" },
      { icon: Target, label: "Objetivos diarios", desc: "2,200 kcal · 160P · 250C · 65G" },
    ],
  },
  {
    title: "App",
    items: [
      { icon: Bell, label: "Recordatorios", desc: "Notificaciones de comidas" },
      { icon: Database, label: "Exportar datos", desc: "CSV o JSON" },
    ],
  },
];

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

const SettingsPage = () => {
  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-[480px] px-5 pt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
          <h1 className="text-2xl font-bold tracking-tight">Ajustes</h1>
        </motion.div>

        <motion.div
          className="mt-5 space-y-6"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
        >
          {settingsGroups.map((group) => (
            <motion.div key={group.title} variants={item}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
              <div className="rounded-lg border bg-card shadow-card overflow-hidden">
                {group.items.map((settingItem, i) => {
                  const Icon = settingItem.icon;
                  return (
                    <button
                      key={settingItem.label}
                      className="active-scale flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted border-b last:border-b-0"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{settingItem.label}</p>
                        <p className="text-xs text-muted-foreground">{settingItem.desc}</p>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          <motion.div variants={item}>
            <button className="active-scale flex w-full items-center justify-center gap-2 rounded-xl bg-destructive/10 py-3.5 text-sm font-medium text-destructive">
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </motion.div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default SettingsPage;
