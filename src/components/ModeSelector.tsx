'use client';
import { observer } from "mobx-react-lite";
import { trainerStore } from "@/stores/TrainerStore";

export const ModeSelector = observer(() => {
  const modes = [
    { key: "multiply", label: "Умножение", emoji: "✖️", color: "bg-accent hover:bg-accent-hover" },
    { key: "divide", label: "Деление", emoji: "➗", color: "bg-accent-secondary hover:bg-accent-secondary-hover" },
    { key: "mixed", label: "Смешанное", emoji: "🔥", color: "bg-gradient-fire" }
  ] as const;

  return (
    <div className="flex justify-center gap-4 mt-8 relative z-10">
      <div className="bg-white rounded-2xl shadow-magical p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-primary font-comic flex items-center justify-center gap-2">
            🐲 Выбери режим 🐲
          </h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {modes.map((mode) => (
            <button
              key={mode.key}
              onClick={() => trainerStore.setMode(mode.key)}
              className={`
                px-6 py-3 rounded-xl font-bold text-lg font-comic transition-all duration-300 transform hover:scale-105 shadow-golden flex items-center gap-2
                ${trainerStore.mode === mode.key 
                  ? `${mode.color} text-white ring-4 ring-accent ring-opacity-50 shadow-2xl` 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              <span className="text-xl">{mode.emoji}</span>
              {mode.label}
              {trainerStore.mode === mode.key && (
                <span className="ml-2 text-xl animate-bounce">⭐</span>
              )}
            </button>
          ))}
        </div>
        
        <div className="text-center mt-4 text-gray-600 font-comic">
          💡 Нажми на режим, чтобы изменить его
        </div>
      </div>
    </div>
  );
});