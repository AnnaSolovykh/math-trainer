import { makeAutoObservable } from "mobx";

type Mode = "multiply" | "divide" | "mixed";

interface Question {
  text: string;
  answer: number;
  type: "multiply" | "divide";
}

class TrainerStore {
  mode: Mode = "multiply";
  currentQuestion = "";
  correctAnswer = 0;
  userInput = "";
  feedback: "correct" | "wrong" | null = null;
  isInitialized = false;
  
  // Счетчики для чередования фраз
  correctMessageIndex = 0;
  wrongMessageIndex = 0;
  
  // Пулы примеров для каждого режима
  multiplyPool: Question[] = [];
  dividePool: Question[] = [];
  mixedPool: Question[] = [];
  
  // Текущие индексы для каждого режима
  multiplyIndex = 0;
  divideIndex = 0;
  mixedIndex = 0;
  
  correctMessages = [
    "🏆 Потрясающе! Ты настоящий гений математики! ✨",
    "⭐ Блестяще! Ты умница! 🌟",
    "🎉 Невероятно! У тебя математический талант! 🚀",
    "👑 Великолепно! Ты королева чисел! 💎",
    "🌈 Фантастика! Ты решаешь как волшебница! ✨",
    "🦄 Удивительно! Ты математическая принцесса! 💫",
    "🎯 Точно в цель! Ты супергерой математики! 🦸‍♀️",
    "🌟 Сияешь как звезда! Ты просто класс! ✨",
    "🏅 Чемпионка! Ты покоряешь числа! 🎊",
    "💝 Прекрасно! У тебя золотая голова! 👸",
    "🦋 Легко и красиво! Ты математическая фея! ✨",
    "🌺 Восхитительно! Ты цветочек умный! 🌸",
    "🎪 Браво! Ты звезда математического цирка! ⭐",
    "🍀 Удача улыбается умницам! Ты молодчина! 🌟",
    "🎨 Творишь математические чудеса! Ты художница чисел! 🖌️"
  ];
  
  wrongMessages = [
    "🌟 У тебя получится! Попробуй еще раз! 🚀",
    "💪 Ты сильная! Не сдавайся, принцесса! 👑",
    "🦄 Каждая ошибка делает тебя умнее! ✨",
    "🌈 Ты на правильном пути! Попробуй снова! 💫",
    "🌸 Дыши глубже и попробуй еще раз! 🌺",
    "⭐ Звездочки не сразу загораются! Ты справишься! 🌟",
    "🦋 Как бабочка учится летать - попробуй снова! 💕",
    "🎯 Почти попала! Еще один выстрел! 🏹",
    "🌻 Растешь и учишься! Попробуй еще раз! 🌱",
    "🎪 Даже акробаты падают! Попробуй снова! 🤸‍♀️",
    "🍀 Удача любит смелых! Давай еще раз! 💪",
    "🎨 Ошибки - это наброски к шедевру! 🖌️",
    "🦸‍♀️ Супергерои не боятся трудностей! 💥",
    "🌙 Даже луна не всегда полная! Попробуй снова! ⭐",
    "🎵 Играй свою мелодию математики! 🎼"
  ];

  constructor() {
    makeAutoObservable(this);
  }

  // Генерация всех возможных примеров умножения (исключаем умножение на 1 и 10)
  generateMultiplyPool(): Question[] {
    const pool: Question[] = [];
    
    for (let a = 2; a <= 9; a++) {
      for (let b = 2; b <= 9; b++) {
        // Исключаем умножение на 1 и 10, добавляем только в пределах до 100
        const result = a * b;
        if (result <= 100) {
          pool.push({
            text: `${a} × ${b}`,
            answer: result,
            type: "multiply"
          });
        }
      }
    }
    
    // Перемешиваем массив для случайного порядка
    return this.shuffleArray(pool);
  }

  // Генерация всех возможных примеров деления (исключаем деление на 1 и 10)
  generateDividePool(): Question[] {
    const pool: Question[] = [];
    
    for (let a = 2; a <= 9; a++) {
      for (let b = 2; b <= 9; b++) {
        const dividend = a * b;
        // Исключаем деление на 1 и деление результатов на 10, ограничиваем до 100
        if (dividend <= 100) {
          pool.push({
            text: `${dividend} ÷ ${a}`,
            answer: b,
            type: "divide"
          });
        }
      }
    }
    
    return this.shuffleArray(pool);
  }

  // Генерация смешанного пула (50/50 умножение и деление)
  generateMixedPool(): Question[] {
    const multiplyQuestions = this.generateMultiplyPool();
    const divideQuestions = this.generateDividePool();
    
    // Берем равное количество примеров или ограничиваем меньшим пулом
    const minLength = Math.min(multiplyQuestions.length, divideQuestions.length);
    const mixedPool: Question[] = [];
    
    for (let i = 0; i < minLength; i++) {
      mixedPool.push(multiplyQuestions[i]);
      mixedPool.push(divideQuestions[i]);
    }
    
    return this.shuffleArray(mixedPool);
  }

  // Перемешивание массива (алгоритм Фишера-Йейтса)
  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Инициализация пулов примеров
  initializePools() {
    this.multiplyPool = this.generateMultiplyPool();
    this.dividePool = this.generateDividePool();
    this.mixedPool = this.generateMixedPool();
    
    // Сбрасываем индексы
    this.multiplyIndex = 0;
    this.divideIndex = 0;
    this.mixedIndex = 0;
  }

  // Инициализация только на клиенте
  initialize() {
    if (!this.isInitialized && typeof window !== 'undefined') {
      this.isInitialized = true;
      this.initializePools();
      this.generateQuestion();
    }
  }

  setMode(newMode: Mode) {
    this.mode = newMode;
    if (this.isInitialized) {
      // При смене режима генерируем новый пул если нужно
      if (newMode === "multiply" && this.multiplyPool.length === 0) {
        this.multiplyPool = this.generateMultiplyPool();
        this.multiplyIndex = 0;
      } else if (newMode === "divide" && this.dividePool.length === 0) {
        this.dividePool = this.generateDividePool();
        this.divideIndex = 0;
      } else if (newMode === "mixed" && this.mixedPool.length === 0) {
        this.mixedPool = this.generateMixedPool();
        this.mixedIndex = 0;
      }
      
      this.generateQuestion();
    }
    this.feedback = null;
  }

  generateQuestion() {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') return;
    
    let currentPool: Question[];
    let currentIndex: number;
    
    // Выбираем пул в зависимости от режима
    switch (this.mode) {
      case "multiply":
        currentPool = this.multiplyPool;
        currentIndex = this.multiplyIndex;
        break;
      case "divide":
        currentPool = this.dividePool;
        currentIndex = this.divideIndex;
        break;
      case "mixed":
        currentPool = this.mixedPool;
        currentIndex = this.mixedIndex;
        break;
      default:
        return;
    }

    // Если пул пуст или мы дошли до конца, перегенерируем и перемешиваем
    if (currentPool.length === 0 || currentIndex >= currentPool.length) {
      this.initializePools();
      currentPool = this.mode === "multiply" ? this.multiplyPool : 
                   this.mode === "divide" ? this.dividePool : this.mixedPool;
      currentIndex = 0;
    }

    // Берем следующий пример из пула
    const question = currentPool[currentIndex];
    this.currentQuestion = question.text;
    this.correctAnswer = question.answer;

    // Увеличиваем индекс для следующего раза
    switch (this.mode) {
      case "multiply":
        this.multiplyIndex = currentIndex + 1;
        break;
      case "divide":
        this.divideIndex = currentIndex + 1;
        break;
      case "mixed":
        this.mixedIndex = currentIndex + 1;
        break;
    }
  }

  // Получить текущее сообщение для правильного ответа
  getCurrentCorrectMessage() {
    return this.correctMessages[this.correctMessageIndex];
  }

  // Получить текущее сообщение для ошибки
  getCurrentWrongMessage() {
    return this.wrongMessages[this.wrongMessageIndex];
  }

  // Получить прогресс по текущему режиму
  getCurrentProgress() {
    switch (this.mode) {
      case "multiply":
        return {
          current: this.multiplyIndex,
          total: this.multiplyPool.length,
          percentage: this.multiplyPool.length > 0 ? Math.round((this.multiplyIndex / this.multiplyPool.length) * 100) : 0
        };
      case "divide":
        return {
          current: this.divideIndex,
          total: this.dividePool.length,
          percentage: this.dividePool.length > 0 ? Math.round((this.divideIndex / this.dividePool.length) * 100) : 0
        };
      case "mixed":
        return {
          current: this.mixedIndex,
          total: this.mixedPool.length,
          percentage: this.mixedPool.length > 0 ? Math.round((this.mixedIndex / this.mixedPool.length) * 100) : 0
        };
      default:
        return { current: 0, total: 0, percentage: 0 };
    }
  }

  checkAnswer() {
    const answer = Number(this.userInput);
    if (answer === this.correctAnswer) {
      this.feedback = "correct";
      // Переходим к следующему сообщению для правильных ответов
      this.correctMessageIndex = (this.correctMessageIndex + 1) % this.correctMessages.length;
      
      setTimeout(() => {
        this.feedback = null;
        this.generateQuestion();
        this.userInput = "";
      }, 4000); // 4 секунды для правильного ответа
    } else {
      this.feedback = "wrong";
      // Переходим к следующему сообщению для ошибок
      this.wrongMessageIndex = (this.wrongMessageIndex + 1) % this.wrongMessages.length;
      
      // Убираем неправильный ответ через 4 секунды и возвращаем к примеру
      setTimeout(() => {
        this.feedback = null;
        this.userInput = ""; // Очищаем поле ввода при ошибке
      }, 4000); // 4 секунды показываем сообщение дракона
    }
  }

  // Сброс для нового вопроса
  nextQuestion() {
    this.feedback = null;
    this.userInput = "";
    this.generateQuestion();
  }

  // Сброс прогресса (начать заново)
  resetProgress() {
    this.initializePools();
    this.generateQuestion();
  }
}

export const trainerStore = new TrainerStore();