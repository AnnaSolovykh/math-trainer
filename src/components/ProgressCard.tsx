import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProgressCardProps {
  current: number;
  total: number;
  percentage: number;
  modeStyle: {
    background: string;
    progressColor: string;
  };
  compact?: boolean; 
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ 
  current, 
  total, 
  percentage, 
  modeStyle,
  compact = false 
}) => {
  // Функция для получения мотивационного сообщения
  const getMotivationalMessage = () => {
    if (percentage === 0) {
      return { text: "🚀 Начинаем приключение!", color: "text-purple-600" };
    }
    if (percentage > 0 && percentage < 25) {
      return { text: "💪 Отличное начало!", color: "text-blue-600" };
    }
    if (percentage >= 25 && percentage < 50) {
      return { text: "🌟 Четверть пути пройдена!", color: "text-green-600" };
    }
    if (percentage >= 50 && percentage < 75) {
      return { text: "🔥 Половина позади! Ты молодец!", color: "text-orange-600" };
    }
    if (percentage >= 75 && percentage < 100) {
      return { text: "🏆 Почти финиш! Осталось немного!", color: "text-red-600" };
    }
    if (percentage === 100) {
      return { text: "🎉 Все примеры пройдены! Начинаем заново!", color: "text-purple-600", animated: true };
    }
    return { text: "💡 Подумай хорошенько и введи ответ!", color: "text-white" };
  };

  const motivationalMessage = getMotivationalMessage();

  const compactProgressBar = (
    <div className="flex items-center gap-3">
      {/* Мини прогресс-бар */}
      <div className="flex-1 bg-purple-900/50 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ 
            width: `${percentage}%`,
            background: 'linear-gradient(to right, #fbbf24, #f59e0b, #10b981)' // Радужный для компактного
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      {/* Процент */}
      <span className="text-xs font-bold text-yellow-300 min-w-[2rem]">
        {percentage}%
      </span>
    </div>
  );

  // Обычный прогресс-бар
  const regularProgressBar = (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-bold text-slate-700">
          Прогресс: {current} из {total}
        </span>
        <span className="text-xs sm:text-sm font-bold text-slate-700">
          {percentage}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ 
            width: `${percentage}%`,
            background: modeStyle.background
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
    </>
  );

  // Компактный режим для размещения в подсказке
  if (compact) {
    return (
      <div className="space-y-2">
        {compactProgressBar}
        <div className="text-center">
          <span 
            className={`text-xs sm:text-sm font-bold text-white ${motivationalMessage.animated ? 'animate-bounce' : ''}`}
          >
            {motivationalMessage.text}
          </span>
        </div>
      </div>
    );
  }

  // Обычный режим для отдельной карточки
  return (
    <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/95 backdrop-blur-sm border-2 border-purple-200 shadow-xl mb-3">
      <CardContent className="p-3 sm:p-4">
        {regularProgressBar}
        
        <div className="mt-2 text-center">
          <span 
            className={`text-xs sm:text-sm font-medium ${motivationalMessage.color} ${motivationalMessage.animated ? 'animate-bounce' : ''}`}
          >
            {motivationalMessage.text}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};