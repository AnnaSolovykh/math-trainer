'use client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  
  const handleSelect = (mode: "multiply" | "divide" | "mixed") => {
    router.push(`/trainer?mode=${mode}`);
  };

  // Функция для получения стилей кнопок
  const getButtonStyle = (mode: string) => {
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 left-4 w-12 h-12 sm:top-8 sm:left-8 sm:w-16 sm:h-16 lg:top-10 lg:left-10 lg:w-20 lg:h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-8 right-6 w-10 h-10 sm:bottom-12 sm:right-12 sm:w-14 sm:h-14 lg:bottom-20 lg:right-16 lg:w-16 lg:h-16 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/4 right-4 w-8 h-8 sm:top-1/3 sm:right-8 sm:w-10 sm:h-10 lg:right-10 lg:w-12 lg:h-12 bg-orange-400 rounded-full opacity-25 animate-bounce delay-1000"></div>
      
      <div className="text-center mb-6 sm:mb-8 lg:mb-12 relative z-10 px-2">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-4 text-white text-center drop-shadow-2xl leading-tight">
          🐲 Математический Дракон 🐲
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-purple-100 mb-4 sm:mb-6 lg:mb-8">
          Выбери, что будем тренировать!
        </p>
      </div>
      
      <Card className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-purple-200 shadow-2xl">
        <CardHeader className="text-center p-4 sm:p-6 lg:p-8">
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-purple-900 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl lg:text-4xl">🎯</span>
            Выбери режим тренировки
          </CardTitle>
          <CardDescription className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2">
            Помоги дракону стать лучшим математиком!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <Button
              onClick={() => handleSelect("multiply")}
              size="lg"
              className="h-16 sm:h-20 lg:h-24 text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col gap-1 sm:gap-2"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl">✖️</span>
              <span>Умножение</span>
            </Button>
            
            <Button
              onClick={() => handleSelect("divide")}
              size="lg"
              className="h-16 sm:h-20 lg:h-24 text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col gap-1 sm:gap-2"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl">➗</span>
              <span>Деление</span>
            </Button>
            
            <Button
              onClick={() => handleSelect("mixed")}
              size="lg"
              className="h-16 sm:h-20 lg:h-24 text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 hover:from-orange-500 hover:via-red-500 hover:to-yellow-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col gap-1 sm:gap-2 animate-pulse"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl">🔥</span>
              <span>Смешанное</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 sm:mt-6 lg:mt-8 text-purple-100 text-center px-4">
        <p className="text-base sm:text-lg lg:text-xl font-medium">
          ✨ Помоги дракону решить все примеры! ✨
        </p>
      </div>
    </main>
  );
}