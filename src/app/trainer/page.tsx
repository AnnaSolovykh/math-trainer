'use client';
import { QuestionBox } from "@/components/QuestionBox";
import { ResultFeedback } from "@/components/ResultFeedback";
import { trainerStore } from "@/stores/TrainerStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TrainerPage() {
  const params = useSearchParams();
  const mode = params.get("mode");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    trainerStore.initialize();
    
    if (mode === "multiply" || mode === "divide" || mode === "mixed") {
      trainerStore.setMode(mode);
    }
  }, [mode]);

  const getModeConfig = (mode: string) => {
    switch(mode) {
      case 'multiply': 
        return { 
          emoji: '✖️', 
          title: 'Умножение', 
          bgClass: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
          description: 'Тренируем таблицу умножения',
          color: 'yellow'
        };
      case 'divide': 
        return { 
          emoji: '➗', 
          title: 'Деление', 
          bgClass: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
          description: 'Изучаем деление чисел',
          color: 'emerald'
        };
      case 'mixed': 
        return { 
          emoji: '🔥', 
          title: 'Смешанное', 
          bgClass: 'bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400',
          description: 'Комбинируем умножение и деление',
          color: 'orange'
        };
      default: 
        return { 
          emoji: '📝', 
          title: 'Тренировка', 
          bgClass: 'bg-gradient-to-r from-purple-400 to-purple-500',
          description: 'Математические упражнения',
          color: 'purple'
        };
    }
  };

  const modeConfig = getModeConfig(isClient ? trainerStore.mode : mode || 'multiply');

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex flex-col p-3 sm:p-4 lg:p-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 w-10 h-10 sm:top-6 sm:right-6 sm:w-12 sm:h-12 lg:top-8 lg:right-8 lg:w-16 lg:h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-12 left-4 w-8 h-8 sm:bottom-16 sm:left-6 sm:w-10 sm:h-10 lg:bottom-16 lg:left-12 lg:w-12 lg:h-12 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/4 left-4 w-6 h-6 sm:top-1/4 sm:left-6 sm:w-8 sm:h-8 lg:left-8 bg-orange-400 rounded-full opacity-25 animate-bounce delay-1000"></div>
      
      <div className="text-center mb-4 sm:mb-6 lg:mb-8 relative z-10 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <Badge
            className={`${modeConfig.bgClass} text-white text-3xl lg:text-4xl px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 font-bold border-0 rounded-2xl shadow-2xl`}
          >
            <span className="text-4xl lg:text-5xl mr-3 animate-bounce">{modeConfig.emoji}</span>
            {modeConfig.title}
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center w-full">
        <QuestionBox />
        <ResultFeedback />
      </div>
      
      <div className="mt-4 sm:mt-6 relative z-10 space-y-3 sm:space-y-4">
        <div className="text-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="sm"
            className="bg-white/90 hover:bg-white border-2 border-purple-300 hover:border-purple-400 text-purple-800 hover:text-purple-900 font-bold text-sm sm:text-base lg:text-lg px-4 py-2 sm:px-6 sm:py-3 lg:px-8 shadow-lg w-full sm:w-auto"
          >
            ← Назад к выбору
          </Button>
        </div>
        
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-purple-800 border-purple-300 shadow-2xl">
            <CardContent className="p-2 sm:p-3 lg:p-4">
              {!trainerStore.feedback && (
                <p className="text-sm sm:text-base lg:text-xl text-white font-bold">
                  ✨ Ты отлично справляешься! Продолжай! ✨
                </p>
              )}
              {trainerStore.feedback === "correct" && (
                <p className="text-sm sm:text-base lg:text-xl text-emerald-200 font-bold">
                  🎉 Превосходно! Ты настоящий математик! 🎉
                </p>
              )}
              {trainerStore.feedback === "wrong" && (
                <p className="text-sm sm:text-base lg:text-xl text-yellow-200 font-bold">
                  💪 Не сдавайся! Каждая ошибка делает тебя сильнее! 💪
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}