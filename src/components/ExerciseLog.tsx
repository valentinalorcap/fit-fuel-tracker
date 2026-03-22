import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Check, Plus, Trash2 } from "lucide-react";

export interface SetEntry {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

interface ExerciseLogProps {
  name: string;
  sets: SetEntry[];
  onUpdateSet: (setId: string, field: "reps" | "weight", value: number) => void;
  onToggleSet: (setId: string) => void;
  onAddSet: () => void;
  previousBest?: { reps: number; weight: number };
}

const ExerciseLog = ({ name, sets, onUpdateSet, onToggleSet, onAddSet, previousBest }: ExerciseLogProps) => {
  return (
    <div className="rounded-lg border bg-card shadow-card">
      <div className="px-4 py-3">
        <h3 className="text-sm font-bold">{name}</h3>
        {previousBest && (
          <p className="text-xs text-muted-foreground">
            Mejor anterior: {previousBest.weight}kg × {previousBest.reps}
          </p>
        )}
      </div>

      <div className="border-t">
        <div className="grid grid-cols-[2.5rem_1fr_1fr_2.5rem] gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <span>Set</span>
          <span>Kg</span>
          <span>Reps</span>
          <span></span>
        </div>

        {sets.map((set, i) => (
          <div
            key={set.id}
            className={`grid grid-cols-[2.5rem_1fr_1fr_2.5rem] items-center gap-2 px-4 py-1.5 ${
              set.completed ? "opacity-60" : ""
            }`}
          >
            <span className="tabular-nums text-sm font-medium text-muted-foreground">
              {i + 1}
            </span>
            <Input
              type="number"
              value={set.weight || ""}
              onChange={(e) => onUpdateSet(set.id, "weight", Number(e.target.value))}
              className="h-10 rounded-xl border-none bg-muted tabular-nums text-center text-sm font-medium"
              placeholder="0"
            />
            <Input
              type="number"
              value={set.reps || ""}
              onChange={(e) => onUpdateSet(set.id, "reps", Number(e.target.value))}
              className="h-10 rounded-xl border-none bg-muted tabular-nums text-center text-sm font-medium"
              placeholder="0"
            />
            <button
              onClick={() => onToggleSet(set.id)}
              className={`active-scale flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                set.completed
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Check size={16} />
            </button>
          </div>
        ))}

        <div className="px-4 py-2">
          <button
            onClick={onAddSet}
            className="active-scale flex w-full items-center justify-center gap-1.5 rounded-xl bg-muted py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus size={14} />
            Añadir serie
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseLog;
