// Списки слов
const who = [
  "Сантехник",
  "Таксист",
  "Тётя",
  "Бармен",
  "Вахтёр",
  "Дальнобойщик",
  "Продавщица",
  "Хипстер",
  "Бомж",
  "Старик"
];

const where = [
  "в тёмной подворотне",
  "на помойке за углом",
  "в сортире ночного клуба",
  "в луже после дождя",
  "в подвале с крысами",
  "на крыше с протечкой",
  "в заброшенной общаге",
  "в баре с тухлым пивом",
  "в тиктоке с кринжем",
  "в канаве у трассы"
];

const what = [
  "обосрался от смеха",
  "упал в лужу пива",
  "застрял в костюме хот-дога",
  "выпил литр самогона",
  "разлил кетчуп на босса",
  "уснул на чужой тёлке",
  "спутал виски с мочой",
  "съел тухлую шаурму",
  "порвал штаны на жопе",
  "спалил бороду фейерверком"
];

// Функция генерации фразы
function generatePhrase() {
  const randomWho = who[Math.floor(Math.random() * who.length)];
  const randomWhere = where[Math.floor(Math.random() * where.length)];
  const randomWhat = what[Math.floor(Math.random() * what.length)];
  const phrase = `${randomWho} ${randomWhere} ${randomWhat}`;
  document.getElementById("result").innerText = phrase;
}
