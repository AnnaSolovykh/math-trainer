'use client';
import { observer } from "mobx-react-lite";
import { trainerStore } from "@/stores/TrainerStore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const QuestionBox = observer(() => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    trainerStore.initialize();
  }, []);

  const getModeStyle = (mode: string) => {
    switch(mode) {
      case 'multiply': 
        return { background: 'linear-gradient(to right, #fbbf24, #f59e0b)' };
      case 'divide': 
        return { background: 'linear-gradient(to right, #10b981, #059669)' };
      case 'mixed': 
        return { background: 'linear-gradient(to right, #f97316, #dc2626, #fbbf24)' };
      default: 
        return { background: 'linear-gradient(to right, #8b5cf6, #7c3aed)' };
    }
  };

  const badgeStyle = getModeStyle(trainerStore.mode);

  if (!isClient || !trainerStore.currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center relative z-10 px-2">
        <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/98 backdrop-blur-sm border-2 border-purple-200 shadow-2xl">
          <CardHeader className="text-center p-4 sm:p-5 lg:p-6">
            <div className="text-4xl sm:text-5xl lg:text-7xl mb-3 sm:mb-4 lg:mb-6 animate-bounce">🐲</div>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl text-slate-800 font-bold">
              Готовим пример...
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6 sm:space-y-8 lg:space-y-12 p-4 sm:p-5 lg:p-6">
            <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-base sm:text-lg lg:text-xl px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mb-3 sm:mb-4 lg:mb-6 border-0 mx-auto block text-center">
              Реши пример
            </Badge>
            
            <div className="flex justify-center">
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-32 h-16 sm:w-40 sm:h-20 lg:w-48 lg:h-24 text-center text-2xl sm:text-3xl lg:text-4xl font-bold border-4 border-yellow-300 bg-yellow-50/50 rounded-xl sm:rounded-2xl"
                placeholder="?"
                disabled
              />
            </div>
            
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-lg sm:text-xl lg:text-2xl font-bold px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 h-auto rounded-xl sm:rounded-2xl opacity-50 w-full sm:w-auto"
                disabled
              >
                <span className="text-xl sm:text-2xl lg:text-3xl mr-2 sm:mr-3">⭐</span>
                Проверить
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-3 sm:mt-4 lg:mt-6 w-full max-w-sm sm:max-w-md bg-purple-800 border-purple-600 shadow-2xl">
          <CardContent className="p-3 sm:p-4">
            <p className="text-sm sm:text-base lg:text-lg text-white text-center font-bold">
              💡 Подумай хорошенько и введи ответ!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center relative z-10 px-2">
      <Card className={`w-full max-w-sm sm:max-w-md lg:max-w-lg backdrop-blur-sm border-2 shadow-2xl relative overflow-hidden transition-all duration-500 ${
        trainerStore.feedback === "correct" 
          ? "bg-green-50 border-green-300" 
          : trainerStore.feedback === "wrong"
          ? "bg-red-50 border-red-300"
          : "bg-white/98 border-purple-200"
      }`}>
        {/* Декоративные элементы - адаптивные */}
        <div className="absolute top-2 right-2 w-6 h-6 sm:top-3 sm:right-3 sm:w-7 sm:h-7 lg:top-4 lg:right-4 lg:w-8 lg:h-8 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-5 h-5 sm:bottom-3 sm:left-3 sm:w-6 sm:h-6 lg:bottom-4 lg:left-4 bg-emerald-400 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/2 left-2 w-3 h-3 sm:left-3 sm:w-4 sm:h-4 lg:left-4 bg-orange-400 rounded-full opacity-25 animate-pulse delay-500"></div>
        
        <CardHeader className="text-center p-8 sm:p-10 lg:p-12">
          {/* Дракон-помощник */}
          <div className="text-5xl sm:text-6xl lg:text-8xl mb-6 sm:mb-8 lg:mb-10 animate-bounce">🐲</div>
          
          {/* Режим - показываем только если нет feedback с ПРАВИЛЬНЫМ ЦВЕТОМ */}
          {!trainerStore.feedback && (
            <Badge 
              className="text-white text-base sm:text-lg lg:text-xl px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mb-6 sm:mb-8 lg:mb-10 border-0 mx-auto block text-center"
              style={badgeStyle}
            >
              Реши пример
            </Badge>
          )}
          
          {/* Вопрос - ДИНАМИЧЕСКИЕ СООБЩЕНИЯ */}
          <CardTitle className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-0 text-center leading-relaxed px-2">
            {trainerStore.feedback === "wrong" ? (
              <span className="text-red-800 block">
                {trainerStore.getCurrentWrongMessage()}
              </span>
            ) : trainerStore.feedback === "correct" ? (
              <span className="text-green-800 block">
                {trainerStore.getCurrentCorrectMessage()}
              </span>
            ) : (
              <span className="text-white drop-shadow-lg">
                {trainerStore.currentQuestion}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 lg:space-y-8 p-4 sm:p-5 lg:p-6">
          {/* Поле ввода - СКРЫВАЕМ при feedback */}
          {!trainerStore.feedback && (
            <div className="flex justify-center">
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-32 h-16 sm:w-40 sm:h-20 lg:w-48 lg:h-24 text-center text-2xl sm:text-3xl lg:text-4xl font-bold border-4 border-yellow-400 bg-yellow-50 focus:border-yellow-500 focus:ring-yellow-300 focus:ring-2 rounded-xl sm:rounded-2xl transition-all duration-300"
                value={trainerStore.userInput}
                onChange={(e) => (trainerStore.userInput = e.target.value)}
                placeholder="?"
                aria-label="Введите ответ на математический пример"
              />
            </div>
          )}
          
          {/* Кнопка проверки - УБИРАЕМ при feedback */}
          {!trainerStore.feedback && (
            <div className="flex justify-center">
              <Button
                onClick={() => trainerStore.checkAnswer()}
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white text-lg sm:text-xl lg:text-2xl font-bold px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 h-auto shadow-lg hover:shadow-xl hover:shadow-yellow-300/50 transform hover:scale-105 transition-all duration-300 rounded-xl sm:rounded-2xl w-full sm:w-auto hover:brightness-110"
              >
                <span className="text-xl sm:text-2xl lg:text-3xl mr-2 sm:mr-3 animate-bounce" style={{animationDuration: '2.5s'}}>⭐</span>
                Проверить
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Подсказка - УСЛОВНАЯ */}
      <Card className="mt-3 sm:mt-4 lg:mt-6 w-full max-w-sm sm:max-w-md bg-purple-800 border-purple-600 shadow-2xl">
        <CardContent className="p-3 sm:p-4">
          <p className="text-sm sm:text-base lg:text-lg text-white text-center font-bold">
            {trainerStore.feedback === "wrong" ? (
              "💪 Попробуй еще раз, когда будешь готов!"
            ) : trainerStore.feedback === "correct" ? (
              "🚀 Приготовься к новому вызову!"
            ) : (
              "💡 Подумай хорошенько и введи ответ!"
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
});