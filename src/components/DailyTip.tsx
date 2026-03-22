import { Lightbulb } from "lucide-react";

interface DailyTipProps {
  proteinLeft: number;
  carbsLeft: number;
  fatLeft: number;
  caloriesLeft: number;
}

const DailyTip = ({ proteinLeft, carbsLeft, fatLeft, caloriesLeft }: DailyTipProps) => {
  let tip = "";

  if (caloriesLeft <= 0) {
    tip = "Has alcanzado tu objetivo calórico. Si comes más, prioriza proteína magra.";
  } else if (proteinLeft > 20 && caloriesLeft < 400) {
    tip = `Te faltan ${proteinLeft}g de proteína con pocas calorías. Prueba: atún, claras de huevo o proteína whey.`;
  } else if (proteinLeft > 30) {
    tip = `Aún necesitas ${proteinLeft}g de proteína. Buenas opciones: pollo, pescado o legumbres.`;
  } else if (fatLeft < 5 && carbsLeft > 30) {
    tip = `Grasa casi completa. Enfócate en carbohidratos: arroz, fruta o avena.`;
  } else if (caloriesLeft > 500) {
    tip = `Llevas buen ritmo. Todavía tienes ${caloriesLeft} kcal disponibles.`;
  } else {
    tip = `Vas bien. ${caloriesLeft} kcal restantes para cerrar el día.`;
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card p-4 shadow-card">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-macro-calories/10">
        <Lightbulb size={16} className="text-macro-calories" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
          Recomendación
        </p>
        <p className="text-sm leading-relaxed">{tip}</p>
      </div>
    </div>
  );
};

export default DailyTip;
