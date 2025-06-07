'use client';
import { observer } from "mobx-react-lite";
import { trainerStore } from "@/stores/TrainerStore";
import { useEffect, useState } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const ResultFeedback = observer(() => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return null;

  const isCorrect = trainerStore.feedback === "correct";

  if (isCorrect) {
    return (
      <div className="text-center mt-4 sm:mt-6 lg:mt-8 relative z-10 px-2">
        <Card className="inline-block w-full max-w-sm sm:max-w-md lg:max-w-lg bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 border-4 border-green-500 shadow-2xl transform animate-bounce">
          <CardContent className="p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Декоративные элементы для правильного ответа */}
            <div className="absolute top-1 right-1 w-4 h-4 sm:top-2 sm:right-2 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-400 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 sm:bottom-2 sm:left-2 sm:w-4 sm:h-4 bg-emerald-400 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute top-1/2 right-2 w-2 h-2 sm:right-3 sm:w-3 sm:h-3 lg:right-4 bg-green-500 rounded-full opacity-25 animate-bounce"></div>
            
            {/* Анимированный дракон */}
            <div className="text-4xl sm:text-6xl lg:text-8xl mb-3 sm:mb-4 lg:mb-6 animate-bounce">
              🐲✨
            </div>
            
            {/* Основное сообщение */}
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg sm:text-xl lg:text-3xl px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mb-3 sm:mb-4 lg:mb-6 font-bold border-0 rounded-xl sm:rounded-2xl shadow-lg">
              🎉 Правильно! 🎉
            </Badge>
            
            {/* Дополнительное сообщение */}
            <Alert className="border-green-400 bg-green-100 mt-3 sm:mt-4 lg:mt-6 rounded-xl sm:rounded-2xl shadow-lg">
              <AlertDescription className="text-sm sm:text-base lg:text-xl text-green-800 font-bold text-center">
                ✨ Дракон гордится тобой! Ты молодец! ✨
              </AlertDescription>
            </Alert>
            
            {/* Звездочки для правильного ответа */}
            <div className="flex justify-center gap-1 sm:gap-2 lg:gap-3 mt-3 sm:mt-4 lg:mt-6 text-lg sm:text-2xl lg:text-4xl">
              <span className="animate-bounce" style={{animationDelay: '0s'}}>⭐</span>
              <span className="animate-bounce" style={{animationDelay: '0.2s'}}>⭐</span>
              <span className="animate-bounce" style={{animationDelay: '0.4s'}}>⭐</span>
              <span className="animate-bounce" style={{animationDelay: '0.6s'}}>⭐</span>
              <span className="animate-bounce" style={{animationDelay: '0.8s'}}>⭐</span>
            </div>
            
            {/* Дополнительные эмодзи */}
            <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-3 lg:mt-4 text-lg sm:text-xl lg:text-3xl">
              <span className="animate-pulse" style={{animationDelay: '0s'}}>🎊</span>
              <span className="animate-pulse" style={{animationDelay: '0.5s'}}>🎯</span>
              <span className="animate-pulse" style={{animationDelay: '1s'}}>🏆</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="text-center mt-4 sm:mt-6 lg:mt-8 relative z-10 px-2">
      <Card className="inline-block w-full max-w-sm sm:max-w-md lg:max-w-lg bg-gradient-to-br from-red-100 via-pink-100 to-red-200 border-4 border-red-500 shadow-2xl transform animate-pulse">
        <CardContent className="p-4 sm:p-6 lg:p-8 relative overflow-hidden">
          {/* Декоративные элементы для неправильного ответа */}
          <div className="absolute top-1 right-1 w-4 h-4 sm:top-2 sm:right-2 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-red-400 rounded-full opacity-30 animate-ping"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 sm:bottom-2 sm:left-2 sm:w-4 sm:h-4 bg-pink-400 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-1/2 right-2 w-2 h-2 sm:right-3 sm:w-3 sm:h-3 lg:right-4 bg-red-500 rounded-full opacity-25 animate-bounce"></div>
          
          {/* Анимированный дракон */}
          <div className="text-4xl sm:text-6xl lg:text-8xl mb-3 sm:mb-4 lg:mb-6 animate-bounce">
            🐲💭
          </div>
          
          {/* Основное сообщение */}
          <Badge className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-lg sm:text-xl lg:text-3xl px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mb-3 sm:mb-4 lg:mb-6 font-bold border-0 rounded-xl sm:rounded-2xl shadow-lg">
            🤔 Попробуй еще раз! 🤔
          </Badge>
          
          {/* Дополнительное сообщение */}
          <Alert className="border-red-400 bg-red-100 mt-3 sm:mt-4 lg:mt-6 rounded-xl sm:rounded-2xl shadow-lg">
            <AlertDescription className="text-sm sm:text-base lg:text-xl text-red-800 font-bold text-center">
              💪 Не сдавайся! Дракон верит в тебя! 💪
            </AlertDescription>
          </Alert>
          
          {/* Поощрительные эмодзи */}
          <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4 lg:mt-6 text-lg sm:text-xl lg:text-3xl">
            <span className="animate-pulse" style={{animationDelay: '0s'}}>💪</span>
            <span className="animate-pulse" style={{animationDelay: '0.3s'}}>🎯</span>
            <span className="animate-pulse" style={{animationDelay: '0.6s'}}>💡</span>
            <span className="animate-pulse" style={{animationDelay: '0.9s'}}>🔥</span>
          </div>
          
          {/* Мотивационное сообщение */}
          <div className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm lg:text-lg text-slate-700 font-medium">
            Подумай еще раз и попробуй снова!
          </div>
        </CardContent>
      </Card>
    </div>
  );
});