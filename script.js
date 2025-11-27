const level1_words = ['Пельмени','Маршрутка','Очередь','Лопата','Капкан','Холодец','Бензин','Сушняк','Замок','Коммуналка','Пятёрочка','Кепка','Скейт','Оладьи','Карандаш','Шахматы','Батарея','Шуба','Шкаф','Тюбик','Сковородка','Бульон','Сугроб','Вафли','Очки','Спички','Комар','Стопарь','Гирлянда','Кастрюля','Кнопка','Обои','Кирпич','Ватрушка','Зонт','Табурет','Дырка','Лейка','Свитер','Подоконник','Сквозняк','Утюг','Пижама','Холодильник','Скатерть','Тапки','Сырник','Рюкзак','Мандарин','Колбаса','Пульт','Гвоздь','Плитка','Банка','Провод','Щель','Дыня','Пакетик','Колесо','Печенье','Штаны','Носок','Карантин','Залив','Печь','Папка','Степлер','Мел','Лампочка','Вилка','Фонарь','Чайник','Заначка'];

// ← ВСТАВЬ СЮДА level2_words, level3, level4 — как в предыдущих версиях

const backgrounds = ['1.png', '2.png', '3.png', '4.png']; // ← твои точные имена

const bg = document.getElementById('bg');
const bgOld = document.getElementById('bg-old');
const output = document.getElementById('output');
const sprayBtn = document.getElementById('spray-btn');
const goBtn = document.getElementById('go-btn');
const soundBtn = document.getElementById('sound-btn');

let currentLevel = 1;
let musicOn = false;

// === МУЗЫКА ===
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let audioBuffer = null;

async function loadAudio() {
  try {
    const resp = await fetch('b1.mp3');
    const buf = await resp.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(buf);
  } catch (e) { console.log(e); }
}
loadAudio();

function playMusic() {
  if (!audioBuffer || !musicOn) return;
  audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  audioSource.loop = true;
  audioSource.connect(audioContext.destination);
  audioSource.start(0);
}

// === ПЛАВНАЯ СМЕНА ФОНА БЕЗ ЧЁРНОГО ЭКРАНА ===
function changeBackground(newUrl) {
  const img = new Image();
  img.onload = () => {
    bgOld.style.backgroundImage = `url('${bg.style.backgroundImage.replace(/url\(["']?([^"']*)["']?\)/, '$1')}')`;
    bg.style.backgroundImage = `url('${newUrl}')`;
    bgOld.style.opacity = '0';
    setTimeout(() => { bgOld.style.backgroundImage = 'none'; bgOld.style.opacity = '1'; }, 400);
  };
  img.src = newUrl;
}

// === ПЕРЕКЛЮЧЕНИЕ УРОВНЯ ===
sprayBtn.addEventListener('click', () => {
  bg.classList.add('pressed');
  setTimeout(() => bg.classList.remove('pressed'), 160);

  currentLevel = currentLevel >= 4 ? 1 : currentLevel + 1;
  changeBackground(backgrounds[currentLevel - 1]);

  Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
});

// === GO ===
goBtn.addEventListener('click', () => {
  let text = '';
  if (currentLevel === 1) text = level1_words[Math.floor(Math.random() * level1_words.length)];
  else if (currentLevel === 2) text = level2_words[Math.floor(Math.random() * level2_words.length)];
  else if (currentLevel === 3) text = `${randomItem(level3.subjects)} ${randomItem(level3.actions)} ${randomItem(level3.places)}`;
  else if (currentLevel === 4) text = `${randomItem(level4.subjects)} ${randomItem(level4.actions)} ${randomItem(level4.places)}`;

  output.textContent = text;
  Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
});

// === ЗВУК ===
soundBtn.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) { playMusic(); soundBtn.classList.add('on'); }
  else { if (audioSource) audioSource.stop(); soundBtn.classList.remove('on'); }
});

// === СТАРТ ===
document.addEventListener('DOMContentLoaded', () => {
  bg.style.backgroundImage = 'url("1.png")';
  output.textContent = level1_words[Math.floor(Math.random() * level1_words.length)];

  Telegram?.WebApp?.ready();
  Telegram?.WebApp?.expand();
});

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
