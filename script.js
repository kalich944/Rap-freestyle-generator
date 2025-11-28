// === ВСЕ МАССИВЫ СЛОВ ===
const level1_words = ['Пельмени','Маршрутка','Очередь','Лопата','Капкан','Холодец','Бензин','Сушняк','Замок','Коммуналка','Пятёрочка','Кепка','Скейт','Оладьи','Карандаш','Шахматы','Батарея','Шуба','Шкаф','Тюбик','Сковородка','Бульон','Сугроб','Вафли','Очки','Спички','Комар','Стопарь','Гирлянда','Кастрюля','Кнопка','Обои','Кирпич','Ватрушка','Зонт','Табурет','Дырка','Лейка','Свитер','Подоконник','Сквозняк','Утюг','Пижама','Холодильник','Скатерть','Тапки','Сырник','Рюкзак','Мандарин','Колбаса','Пульт','Гвоздь','Плитка','Банка','Провод','Щель','Дыня','Пакетик','Колесо','Печенье','Штаны','Носок','Карантин','Залив','Печь','Папка','Степлер','Мел','Лампочка','Вилка','Фонарь','Чайник','Заначка'];

const level2_words = ['Пыльный рюкзак','Горячий чай','Сломанный зонт','Кривая полка','Грустный таксист','Старый будильник','Треснувший экран','Тихий подъезд','Мокрые кроссовки','Хрустящий снег','Потёртая джинсовка','Шумный сосед','Заваленный стол','Разбитая кружка','Скрипучая дверь','Запотевшее окно','Шаркающие тапки','Огрызок яблока','Грязное зеркало','Ржавая труба','Сгоревшая лампочка','Пустой блокнот','Медленный интернет','Мокрый асфальт','Тарелка супа','Теплый плед','Пятно на футболке','Холодная батарея','Пирожок с капустой','Пульт под диваном','Гречка без соли','Незаправленная кровать','Открытая форточка','Мелкий дождь','Заваленная кладовка'];

const level3 = {
  subjects: ['Дед','Бабка','Гопник','Кот','Сосед','Таксист','Кассирша','Бомж','Школьник','Алкаш','Блогер','Батя','Мент','Продавщица','Бабушка с семечками','Клоун','Дворник'],
  actions: ['уснул','орал','поскользнулся','выпил','спрятался','станцевал','упал','завис','застрял','обосрался','взорвался','заплакал','засмеялся','убежал','покраснел','позеленел','взлетел','сгорел','расплавился'],
  places: ['в подъезде','в сортире ночного клуба','в маршрутке','на крыше','в Пятёрочке','у мусорки','в лифте','на остановке','в коммуналке','в Хогвартсе','на Марсе','в подвале','в ванной','на чердаке','в космосе','под кроватью']
};

const level4 = {
  subjects: ['Хипстер','Блогер','Олигарх','Дракон','Баба Яга','Инопланетянин','Ктулху','Шрек','Гарри Поттер','Терминатор','Бэтмен','Дарт Вейдер','Чебурашка','Годзилла','Санта','Иисус'],
  actions: ['выпил литр самогона','станцевал макарену в трусах','спел шансон с котами','поймал жука в бороде','застрял в шторах','улетел на картонных крыльях','спалил штаны','разбил стакан с виски','побил рекорд по матюкам','съел носок','обоссал столб','выиграл миллиард','проиграл душу','взорвал планету','проглотил солнце'],
  places: ['в сортире ночного клуба','на звезде смерти','в хогвартсе','в зоне 51','на марсе','в бабушкином огороде','в матрице','на эвересте','под северным сиянием','в канаве у трассы','на свалке','в аду','в раю','в параллельной вселенной','внутри чёрной дыры']
};

// === ТВОИ ФОНЫ — УБЕДИСЬ, ЧТО ИМЕНА ТОЧНО СОВПАДАЮТ! ===
const backgrounds = ['1.png', '2.png', '3.png', '4.png']; // ← если webp — пиши .webp

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
  } catch (e) { console.log('Ошибка загрузки музыки:', e); }
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
    // Старый фон переезжает в bgOld
    bgOld.style.backgroundImage = bg.style.backgroundImage || `url('${backgrounds[0]}')`;
    bg.style.backgroundImage = `url('${newUrl}')`;
    bgOld.style.opacity = '0';
    setTimeout(() => {
      bgOld.style.backgroundImage = 'none';
      bgOld.style.opacity = '1';
    }, 400);
  };
  img.src = newUrl;
}

// === ПЕРЕКЛЮЧЕНИЕ УРОВНЯ (с увеличением) ===
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

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
