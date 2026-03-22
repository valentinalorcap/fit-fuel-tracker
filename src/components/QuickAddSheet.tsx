import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Search, Star, Clock, Plus } from "lucide-react";
import { useState } from "react";

interface QuickAddSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mealType: string;
  onAddFood: (food: { name: string; calories: number; protein: number; carbs: number; fat: number; quantity: string }) => void;
}

const frequentFoods = [
  { name: "Avena con leche", calories: 280, protein: 12, carbs: 45, fat: 6, quantity: "1 taza", icon: "🥣" },
  { name: "Pechuga de pollo", calories: 165, protein: 31, carbs: 0, fat: 3.6, quantity: "100g", icon: "🍗" },
  { name: "Arroz blanco", calories: 206, protein: 4.3, carbs: 45, fat: 0.4, quantity: "1 taza", icon: "🍚" },
  { name: "Huevos revueltos", calories: 182, protein: 12, carbs: 2, fat: 14, quantity: "2 unidades", icon: "🥚" },
  { name: "Plátano", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, quantity: "1 mediano", icon: "🍌" },
  { name: "Proteína whey", calories: 120, protein: 24, carbs: 3, fat: 1, quantity: "1 scoop", icon: "🥛" },
  { name: "Pan integral", calories: 69, protein: 3.6, carbs: 12, fat: 1.1, quantity: "1 rebanada", icon: "🍞" },
  { name: "Atún en lata", calories: 116, protein: 26, carbs: 0, fat: 1, quantity: "1 lata", icon: "🐟" },
];

const QuickAddSheet = ({ open, onOpenChange, mealType, onAddFood }: QuickAddSheetProps) => {
  const [search, setSearch] = useState("");

  const filtered = frequentFoods.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (food: typeof frequentFoods[0]) => {
    onAddFood({
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      quantity: food.quantity,
    });
    onOpenChange(false);
    setSearch("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-0">
        <SheetHeader className="px-5 pb-3">
          <SheetTitle className="text-left text-base">
            Añadir a {mealType}
          </SheetTitle>
        </SheetHeader>

        <div className="px-5 pb-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar alimento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 rounded-xl border-none bg-muted pl-10 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 px-5 pb-3">
          <button className="active-scale flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Star size={12} /> Favoritos
          </button>
          <button className="active-scale flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Clock size={12} /> Recientes
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          <div className="space-y-1">
            {filtered.map((food) => (
              <button
                key={food.name}
                onClick={() => handleAdd(food)}
                className="active-scale flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted"
              >
                <span className="text-xl">{food.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{food.name}</p>
                  <p className="text-xs text-muted-foreground">{food.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="tabular-nums text-sm font-bold">{food.calories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
                <Plus size={16} className="text-primary" />
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">No se encontraron alimentos</p>
              <button className="mt-3 active-scale rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                Crear alimento personalizado
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickAddSheet;
