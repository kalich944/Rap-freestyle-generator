const level1_words = ['Пельмени','Маршрутка','Очередь','Лопата','Капкан','Холодец','Бензин','Сушняк','Замок','Коммуналка','Пятёрочка','Кепка','Скейт','Оладьи','Карандаш','Шахматы','Батарея','Шуба','Шкаф','Тюбик','Сковородка','Бульон','Сугроб','Вафли','Очки','Спички','Комар','Стопарь','Гирлянда','Кастрюля','Кнопка','Обои','Кирпич','Ватрушка','Зонт','Табурет','Дырка','Лейка','Свитер','Подоконник','Сквозняк','Утюг','Пижама','Холодильник','Скатерть','Тапки','Сырник','Рюкзак','Мандарин','Колбаса','Пульт','Гвоздь','Плитка','Банка','Провод','Щель','Дыня','Пакетик','Колесо','Печенье','Штаны','Носок','Карантин','Залив','Печь','Папка','Степлер','Мел','Лампочка','Вилка','Фонарь','Чайник','Заначка'];

// (остальные массивы level2_words, level3, level4 — оставь как у тебя были)

const backgrounds = ['1.webp', '2.webp', '3.webp', '4.webp']; // или .png — как у тебя сейчас

const bg = document.getElementById('bg');
const output = document.getElementById('output');
const sprayBtn = document.getElementById('spray-btn');
const goBtn = document.getElementById('go-btn');
const soundBtn = document.getElementById('sound-btn');

let currentLevel = 1;
let musicOn = false; // ← ВЫКЛЮЧЕНО ПО УМОЛЧАНИЮ

// === БЕСШОВНАЯ МУЗЫКА ===
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let audioBuffer = null;

async function loadAudio() {
  const resp = await fetch('b1.mp3');
  const buf = await resp.arrayBuffer();
  audioBuffer = await audioContext.decodeAudioData(buf);
}
loadAudio();

function playMusic() {
  if (!audioBuffer || musicOn === false) return;
  audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  audioSource.loop = true;
  audioSource.connect(audioContext.destination);
  audioSource.start(0);
}

// === ПЕРЕКЛЮЧЕНИЕ УРОВНЯ + АНИМАЦИЯ ФОНА ===
sprayBtn.addEventListener('click', () => {
  bg.classList.add('pressed');
  setTimeout(() => bg.classList.remove('pressed'), 140);

  currentLevel = currentLevel >= 4 ? 1 : currentLevel + 1;
  bg.style.backgroundImage = `url('${backgrounds[currentLevel - 1]}')`;
  Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
});

// === GO ===
goBtn.addEventListener('click', () => {
  // (твой код генерации текста — оставь как есть)
  let text = getTextForLevel(currentLevel); // ← вставь свою функцию
  output.textContent = text;
  Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
});

// === ЗВУК ===
soundBtn.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) {
    playMusic();
    soundBtn.classList.add('on');
  } else {
    if (audioSource) audioSource.stop();
    soundBtn.classList.remove('on');
  }
});

// === СТАРТ ===
document.addEventListener('DOMContentLoaded', () => {
  bg.style.backgroundImage = 'url("1.webp")'; // или 1.png
  output.textContent = randomItem(level1_words);
  soundBtn.classList.remove('on'); // на всякий случай

  Telegram?.WebApp?.ready();
  Telegram?.WebApp?.expand();
});

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
