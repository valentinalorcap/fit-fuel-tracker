import { cn } from "@/lib/utils";

interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  variant: "protein" | "carbs" | "fat" | "calories";
}

const variantColors: Record<string, string> = {
  protein: "bg-macro-protein",
  carbs: "bg-macro-carbs",
  fat: "bg-macro-fat",
  calories: "bg-macro-calories",
};

const MacroBar = ({ label, current, target, unit = "g", variant }: MacroBarProps) => {
  const pct = Math.min((current / target) * 100, 100);
  const remaining = Math.max(target - current, 0);

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="flex items-baseline gap-1">
          <span className="tabular-nums text-lg font-bold leading-none tracking-tight">
            {current}
          </span>
          <span className="text-xs text-muted-foreground">
            / {target}{unit}
          </span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-600", variantColors[variant])}
          style={{ width: `${pct}%`, "--bar-width": `${pct}%` } as React.CSSProperties}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {remaining > 0 ? `${remaining}${unit} restantes` : "✓ Objetivo alcanzado"}
      </p>
    </div>
  );
};

export default MacroBar;
