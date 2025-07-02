document.addEventListener('DOMContentLoaded', () => {
    const levelButtons = document.querySelectorAll('.level-btn');
    const startButton = document.querySelector('.start-btn');
    const resultDiv = document.querySelector('#result');
    let selectedLevel = 1;

    // Word lists
    const level1Words = [
'Пельмени',
'Маршрутка',
'Очередь',
'Лопата',
'Капкан',
'Холодец',
'Бензин',
'Сушняк',
'Замок',
'Коммуналка',
'Пятёрочка',
'Кепка',
'Скейт',
'Оладьи',
'Карандаш',
'Шахматы',
'Батарея',
'Шуба',
'Шкаф',
'Тюбик',
'Сковородка',
'Бульон',
'Сугроб',
'Замятие',
'Вафли',
'Очки',
'Спички',
'Тюбик',
'Комар',
'Стопарь',
'Гирлянда',
'Кастрюля',
'Кнопка',
'Обои',
'Кирпич',
'Ватрушка',
'Зонт',
'Табурет',
'Дырка',
'Лейка',
'Свитер',
'Подоконник',
'Сквозняк',
'Утюг',
'Пижама',
'Холодильник',
'Скатерть',
'Тапки',
'Сырник',
'Рюкзак',
'Мандарин',
'Колбаса',
'Пульт',
'Гвоздь',
'Плитка',
'Банка',
'Провод',
'Щель',
'Дыня',
'Пакетик',
'Пыльца',
'Колесо',
'Печенье',
'Штаны',
'Носок',
'Прокол',
'Карантин',
'Залив',
'Печь',
'Папка',
'Степлер',
'Мел',
'Лампочка',
'Вилка',
'Пижон',
'Бутсы',
'Фонарь',
'Свист',
'Бочка',
'Резинка',
'Гудок',
'Капля',
'Скоба',
'Сирень',
'Крыша',
'Лопух',
'Трещина',
'Кофта',
'Бинокль',
'Стакан',
'Пепел',
'Мыло',
'Плавки',
'Воробей',
'Плитка шоколада',
'Чайник',
'Треники',
'Заначка'];
    const level2Words = ['Пыльный рюкзак', 'Горячий чай', 'Сломанный зонт', 'Кривая полка'];
    const level3Words = {
        subjects: ['Бабка', 'Прохожий', 'Таксист'],
        actions: ['уснул', 'упал', 'завис'],
        places: ['в подъезде', 'в магазине', 'в метро']
    };

    // Handle level button clicks
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            levelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedLevel = parseInt(button.getAttribute('data-level'));
        });
    });

    // Random choice helper function
    const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

    // Generate phrase based on level
    const generatePhrase = () => {
        let phrase = '';
        if (selectedLevel === 1) {
            phrase = getRandomElement(level1Words);
        } else if (selectedLevel === 2) {
            phrase = getRandomElement(level2Words);
        } else if (selectedLevel === 3) {
            const subject = getRandomElement(level3Words.subjects);
            const action = getRandomElement(level3Words.actions);
            const place = getRandomElement(level3Words.places);
            phrase = `${subject} ${action} ${place}`;
        }
        resultDiv.textContent = phrase;
    };

    // Handle start button click
    startButton.addEventListener('click', generatePhrase);
});
