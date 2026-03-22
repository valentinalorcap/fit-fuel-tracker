import { useState } from "react";
import { motion } from "framer-motion";
import WorkoutCard, { WorkoutTemplate } from "@/components/WorkoutCard";
import ExerciseLog, { SetEntry } from "@/components/ExerciseLog";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Timer, Plus } from "lucide-react";

const templates: WorkoutTemplate[] = [
  { id: "1", name: "Push A — Pecho y Tríceps", exercises: 5, lastPerformed: "hace 3 días", emoji: "💪" },
  { id: "2", name: "Pull A — Espalda y Bíceps", exercises: 5, lastPerformed: "hace 2 días", emoji: "🏋️" },
  { id: "3", name: "Pierna — Cuádriceps y Glúteos", exercises: 6, lastPerformed: "hace 5 días", emoji: "🦵" },
  { id: "4", name: "Push B — Hombros y Tríceps", exercises: 5, emoji: "🔥" },
];

const initialExercises = [
  {
    name: "Press banca",
    previousBest: { weight: 80, reps: 8 },
    sets: [
      { id: "s1", reps: 8, weight: 80, completed: true },
      { id: "s2", reps: 7, weight: 80, completed: true },
      { id: "s3", reps: 0, weight: 0, completed: false },
    ],
  },
  {
    name: "Press inclinado mancuernas",
    previousBest: { weight: 30, reps: 10 },
    sets: [
      { id: "s4", reps: 0, weight: 0, completed: false },
      { id: "s5", reps: 0, weight: 0, completed: false },
      { id: "s6", reps: 0, weight: 0, completed: false },
    ],
  },
  {
    name: "Aperturas",
    previousBest: { weight: 14, reps: 12 },
    sets: [
      { id: "s7", reps: 0, weight: 0, completed: false },
      { id: "s8", reps: 0, weight: 0, completed: false },
      { id: "s9", reps: 0, weight: 0, completed: false },
    ],
  },
];

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

const WorkoutPage = () => {
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [exercises, setExercises] = useState(initialExercises);

  const handleUpdateSet = (exerciseIdx: number, setId: string, field: "reps" | "weight", value: number) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[exerciseIdx] = {
        ...copy[exerciseIdx],
        sets: copy[exerciseIdx].sets.map((s) =>
          s.id === setId ? { ...s, [field]: value } : s
        ),
      };
      return copy;
    });
  };

  const handleToggleSet = (exerciseIdx: number, setId: string) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[exerciseIdx] = {
        ...copy[exerciseIdx],
        sets: copy[exerciseIdx].sets.map((s) =>
          s.id === setId ? { ...s, completed: !s.completed } : s
        ),
      };
      return copy;
    });
  };

  const handleAddSet = (exerciseIdx: number) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[exerciseIdx] = {
        ...copy[exerciseIdx],
        sets: [
          ...copy[exerciseIdx].sets,
          { id: crypto.randomUUID(), reps: 0, weight: 0, completed: false },
        ],
      };
      return copy;
    });
  };

  if (activeWorkout) {
    const workout = templates.find((t) => t.id === activeWorkout);
    return (
      <div className="min-h-screen pb-24">
        <div className="mx-auto max-w-[480px] px-5 pt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveWorkout(null)}
              className="active-scale flex h-9 w-9 items-center justify-center rounded-lg bg-muted"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold tracking-tight">{workout?.name}</h1>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Timer size={12} />
                <span>En progreso</span>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-5 space-y-3"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            {exercises.map((ex, i) => (
              <motion.div key={ex.name} variants={item}>
                <ExerciseLog
                  name={ex.name}
                  sets={ex.sets}
                  previousBest={ex.previousBest}
                  onUpdateSet={(setId, field, val) => handleUpdateSet(i, setId, field, val)}
                  onToggleSet={(setId) => handleToggleSet(i, setId)}
                  onAddSet={() => handleAddSet(i)}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 space-y-2">
            <button className="active-scale flex w-full items-center justify-center gap-2 rounded-xl bg-muted py-3.5 text-sm font-medium text-muted-foreground">
              <Plus size={18} />
              Añadir ejercicio
            </button>
            <button className="active-scale flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground">
              Finalizar entreno
            </button>
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-[480px] px-5 pt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
          <h1 className="text-2xl font-bold tracking-tight">Entrenamiento</h1>
          <p className="text-sm text-muted-foreground mt-1">Elige una rutina o crea una nueva</p>
        </motion.div>

        <motion.div
          className="mt-5 space-y-3"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
        >
          {templates.map((workout) => (
            <motion.div key={workout.id} variants={item}>
              <WorkoutCard
                workout={workout}
                onStart={() => setActiveWorkout(workout.id)}
                onCopy={() => setActiveWorkout(workout.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4">
          <button className="active-scale flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary">
            <Plus size={18} />
            Crear nueva rutina
          </button>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default WorkoutPage;
