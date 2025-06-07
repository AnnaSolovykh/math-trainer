import TrainerPageContent from '@/components/TrainerPageContent';
import { Suspense } from 'react';

export default function TrainerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐲</div>
          <div className="text-white text-xl">Загружаем тренажер...</div>
        </div>
      </div>
    }>
      <TrainerPageContent />
    </Suspense>
  );
}
