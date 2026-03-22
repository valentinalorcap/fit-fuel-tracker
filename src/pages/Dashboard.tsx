import { useState } from "react";
import { motion } from "framer-motion";
import CalorieRing from "@/components/CalorieRing";
import MacroBar from "@/components/MacroBar";
import MealSection, { FoodEntry } from "@/components/MealSection";
import DailyTip from "@/components/DailyTip";
import QuickAddSheet from "@/components/QuickAddSheet";
import BottomNav from "@/components/BottomNav";

const TARGETS = { calories: 2200, protein: 160, carbs: 250, fat: 65 };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

const Dashboard = () => {
  const [meals, setMeals] = useState<Record<string, FoodEntry[]>>({
    desayuno: [
      { id: "1", name: "Avena con leche", calories: 280, protein: 12, carbs: 45, fat: 6, quantity: "1 taza" },
      { id: "2", name: "Plátano", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, quantity: "1 mediano" },
    ],
    almuerzo: [
      { id: "3", name: "Pechuga de pollo", calories: 165, protein: 31, carbs: 0, fat: 3.6, quantity: "100g" },
      { id: "4", name: "Arroz blanco", calories: 206, protein: 4.3, carbs: 45, fat: 0.4, quantity: "1 taza" },
    ],
    cena: [],
    snacks: [],
  });

  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeMeal, setActiveMeal] = useState("desayuno");

  const allEntries = Object.values(meals).flat();
  const totals = allEntries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleAdd = (mealType: string) => {
    setActiveMeal(mealType);
    setSheetOpen(true);
  };

  const handleAddFood = (food: Omit<FoodEntry, "id">) => {
    const entry: FoodEntry = { ...food, id: crypto.randomUUID() };
    setMeals((prev) => ({ ...prev, [activeMeal]: [...prev[activeMeal], entry] }));
  };

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const mealConfig = [
    { key: "desayuno", title: "Desayuno", emoji: "🌅" },
    { key: "almuerzo", title: "Almuerzo", emoji: "☀️" },
    { key: "cena", title: "Cena", emoji: "🌙" },
    { key: "snacks", title: "Snacks", emoji: "🍎" },
  ];

  return (
    <div className="min-h-screen pb-24">
      <motion.div
        className="mx-auto max-w-[480px] px-5 pt-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {today}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-balance">
            Tu combustible
          </h1>
        </motion.div>

        {/* Calorie Ring */}
        <motion.div variants={item} className="mt-6 flex justify-center">
          <CalorieRing current={Math.round(totals.calories)} target={TARGETS.calories} />
        </motion.div>

        {/* Macro Bars */}
        <motion.div variants={item} className="mt-6 space-y-4">
          <MacroBar label="Proteína" current={Math.round(totals.protein)} target={TARGETS.protein} variant="protein" />
          <MacroBar label="Carbohidratos" current={Math.round(totals.carbs)} target={TARGETS.carbs} variant="carbs" />
          <MacroBar label="Grasas" current={Math.round(totals.fat)} target={TARGETS.fat} variant="fat" />
        </motion.div>

        {/* Daily Tip */}
        <motion.div variants={item} className="mt-6">
          <DailyTip
            proteinLeft={Math.round(TARGETS.protein - totals.protein)}
            carbsLeft={Math.round(TARGETS.carbs - totals.carbs)}
            fatLeft={Math.round(TARGETS.fat - totals.fat)}
            caloriesLeft={Math.round(TARGETS.calories - totals.calories)}
          />
        </motion.div>

        {/* Meals */}
        <motion.div variants={item} className="mt-6 space-y-3">
          {mealConfig.map((m) => (
            <MealSection
              key={m.key}
              title={m.title}
              emoji={m.emoji}
              entries={meals[m.key]}
              onAdd={() => handleAdd(m.key)}
            />
          ))}
        </motion.div>
      </motion.div>

      <QuickAddSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        mealType={mealConfig.find((m) => m.key === activeMeal)?.title || ""}
        onAddFood={handleAddFood}
      />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
