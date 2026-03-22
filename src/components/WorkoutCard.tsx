import { ChevronRight, Copy, Dumbbell } from "lucide-react";

export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: number;
  lastPerformed?: string;
  emoji: string;
}

interface WorkoutCardProps {
  workout: WorkoutTemplate;
  onStart: () => void;
  onCopy: () => void;
}

const WorkoutCard = ({ workout, onStart, onCopy }: WorkoutCardProps) => {
  return (
    <div className="rounded-lg border bg-card shadow-card">
      <button
        onClick={onStart}
        className="active-scale flex w-full items-center gap-3 px-4 py-4 text-left"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-lg">
          {workout.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm">{workout.name}</p>
          <p className="text-xs text-muted-foreground">
            {workout.exercises} ejercicios
            {workout.lastPerformed && ` · Último: ${workout.lastPerformed}`}
          </p>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>
      <div className="border-t px-4 py-2">
        <button
          onClick={onCopy}
          className="active-scale flex items-center gap-1.5 text-xs font-medium text-primary"
        >
          <Copy size={12} />
          Copiar último entreno
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
