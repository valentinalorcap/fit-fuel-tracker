interface CalorieRingProps {
  current: number;
  target: number;
}

const CalorieRing = ({ current, target }: CalorieRingProps) => {
  const pct = Math.min((current / target) * 100, 100);
  const remaining = Math.max(target - current, 0);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(var(--macro-calories))"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
            style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="tabular-nums text-3xl font-bold tracking-tight leading-none">
            {remaining}
          </span>
          <span className="text-xs font-medium text-muted-foreground mt-0.5">
            kcal restantes
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalorieRing;
