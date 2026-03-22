import { Plus, ChevronRight } from "lucide-react";

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: string;
}

interface MealSectionProps {
  title: string;
  emoji: string;
  entries: FoodEntry[];
  onAdd: () => void;
}

const MealSection = ({ title, emoji, entries, onAdd }: MealSectionProps) => {
  const totalCal = entries.reduce((s, e) => s + e.calories, 0);

  return (
    <div className="rounded-lg border bg-card shadow-card">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          <h3 className="text-sm font-bold">{title}</h3>
          {entries.length > 0 && (
            <span className="tabular-nums text-xs text-muted-foreground">
              {totalCal} kcal
            </span>
          )}
        </div>
        <button
          onClick={onAdd}
          className="active-scale flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20"
        >
          <Plus size={18} />
        </button>
      </div>

      {entries.length > 0 && (
        <div className="border-t">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between border-b px-4 py-2.5 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{entry.name}</p>
                <p className="text-xs text-muted-foreground">{entry.quantity}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="tabular-nums text-sm font-medium">
                  {entry.calories} kcal
                </span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      )}

      {entries.length === 0 && (
        <div className="border-t px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">Sin registros aún</p>
        </div>
      )}
    </div>
  );
};

export default MealSection;
