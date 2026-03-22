import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";

const allFoods = [
  { name: "Avena con leche", calories: 280, protein: 12, carbs: 45, fat: 6, quantity: "1 taza", icon: "🥣", favorite: true },
  { name: "Pechuga de pollo", calories: 165, protein: 31, carbs: 0, fat: 3.6, quantity: "100g", icon: "🍗", favorite: true },
  { name: "Arroz blanco", calories: 206, protein: 4.3, carbs: 45, fat: 0.4, quantity: "1 taza", icon: "🍚", favorite: true },
  { name: "Huevos revueltos", calories: 182, protein: 12, carbs: 2, fat: 14, quantity: "2 unidades", icon: "🥚", favorite: false },
  { name: "Plátano", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, quantity: "1 mediano", icon: "🍌", favorite: false },
  { name: "Proteína whey", calories: 120, protein: 24, carbs: 3, fat: 1, quantity: "1 scoop", icon: "🥛", favorite: true },
  { name: "Pan integral", calories: 69, protein: 3.6, carbs: 12, fat: 1.1, quantity: "1 rebanada", icon: "🍞", favorite: false },
  { name: "Atún en lata", calories: 116, protein: 26, carbs: 0, fat: 1, quantity: "1 lata", icon: "🐟", favorite: true },
  { name: "Yogur griego", calories: 100, protein: 17, carbs: 6, fat: 0.7, quantity: "170g", icon: "🥛", favorite: false },
  { name: "Aguacate", calories: 160, protein: 2, carbs: 8.5, fat: 14.7, quantity: "½ unidad", icon: "🥑", favorite: false },
  { name: "Pasta integral", calories: 174, protein: 7.5, carbs: 37, fat: 0.8, quantity: "1 taza cocida", icon: "🍝", favorite: false },
  { name: "Almendras", calories: 164, protein: 6, carbs: 6, fat: 14, quantity: "28g", icon: "🥜", favorite: false },
];

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

const FoodLibrary = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  const filtered = allFoods
    .filter((f) => filter === "all" || f.favorite)
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-[480px] px-5 pt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
          <h1 className="text-2xl font-bold tracking-tight">Alimentos</h1>
          <p className="text-sm text-muted-foreground mt-1">Tu biblioteca de alimentos y recetas</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }} className="mt-5">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar alimento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 rounded-xl border-none bg-muted pl-10 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => setFilter("all")}
              className={`active-scale flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("favorites")}
              className={`active-scale flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === "favorites" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <Star size={12} /> Favoritos
            </button>
          </div>
        </motion.div>

        <motion.div
          className="mt-4 space-y-1"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } } }}
        >
          {filtered.map((food) => (
            <motion.div key={food.name} variants={item}>
              <div className="active-scale flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted">
                <span className="text-xl">{food.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{food.name}</p>
                    {food.favorite && <Star size={12} className="text-macro-carbs fill-macro-carbs" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {food.quantity} · P:{food.protein}g · C:{food.carbs}g · G:{food.fat}g
                  </p>
                </div>
                <div className="text-right">
                  <p className="tabular-nums text-sm font-bold">{food.calories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4">
          <button className="active-scale flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground">
            <Plus size={18} />
            Crear alimento personalizado
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default FoodLibrary;
