import { makeAutoObservable } from "mobx";

type Mode = "multiply" | "divide" | "mixed";

class TrainerStore {
  mode: Mode = "multiply";
  currentQuestion = "";
  correctAnswer = 0;
  userInput = "";
  feedback: "correct" | "wrong" | null = null;
  isInitialized = false; // Флаг для отслеживания инициализации
  
  // Счетчики для чередования фраз
  correctMessageIndex = 0;
  wrongMessageIndex = 0;
  
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
    // НЕ вызываем generateQuestion в конструкторе!
  }

  // Инициализация только на клиенте
  initialize() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.generateQuestion();
    }
  }

  setMode(newMode: Mode) {
    this.mode = newMode;
    if (this.isInitialized) {
      this.generateQuestion();
    }
    this.feedback = null;
  }

  generateQuestion() {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') return;
    
    const a = Math.floor(Math.random() * 10 + 1);
    const b = Math.floor(Math.random() * 10 + 1);
    
    if (this.mode === "multiply") {
      this.currentQuestion = `${a} × ${b}`;
      this.correctAnswer = a * b;
    } else if (this.mode === "divide") {
      this.currentQuestion = `${a * b} ÷ ${a}`;
      this.correctAnswer = b;
    } else {
      // Для смешанного режима - выбираем случайно
      const randomMode = Math.random() > 0.5 ? "multiply" : "divide";
      const oldMode = this.mode;
      this.mode = randomMode;
      this.generateQuestion();
      this.mode = oldMode; // Возвращаем обратно "mixed"
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
      }, 4000); // 4 секунды показываем сообщение дракона
    }
  }

  // Сброс для нового вопроса
  nextQuestion() {
    this.feedback = null;
    this.userInput = "";
    this.generateQuestion();
  }
}

export const trainerStore = new TrainerStore();