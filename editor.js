const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
    mode: 'htmlmixed',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    tabSize: 2,
    lineWrapping: true
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    tabSize: 2,
    lineWrapping: true
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    tabSize: 2,
    lineWrapping: true
});

const output = document.getElementById('output');
const runButton = document.getElementById('run-btn');

const templates = {
    clock: {
        html: `<div class="clock">
    <div class="time">00:00:00</div>
    <div class="date">1 января 2024</div>
</div>`,
        css: `.clock {
    background: rgba(40, 42, 54, 0.8);
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(189, 147, 249, 0.3);
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #bd93f9;
}

.time {
    font-size: 60px;
    font-family: 'Courier New', monospace;
    color: #50fa7b;
    text-shadow: 0 0 10px rgba(80, 250, 123, 0.5);
    margin-bottom: 10px;
}

.date {
    font-size: 20px;
    color: #6272a4;
}`,
        js: `function updateClock() {
    const now = new Date();
    const time = document.querySelector('.time');
    const date = document.querySelector('.date');
    time.textContent = now.toLocaleTimeString();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    date.textContent = now.toLocaleDateString('ru-RU', options);
}
setInterval(updateClock, 1000);
updateClock();`
    },
    calculator: {
        html: `<div class="calculator">
    <input type="text" class="display" readonly>
    <div class="buttons">
        <button class="op">C</button>
        <button class="op">←</button>
        <button class="op">÷</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="op">×</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button class="op">-</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button class="op">+</button>
        <button class="zero">0</button>
        <button>.</button>
        <button class="op">=</button>
    </div>
</div>`,
        css: `.calculator {
    background: #282a36;
    border-radius: 10px;
    padding: 20px;
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(189, 147, 249, 0.3);
}

.display {
    width: calc(100% - 40px);
    height: 60px;
    border: none;
    background: #44475a;
    color: #f8f8f2;
    text-align: right;
    padding: 0 20px;
    font-size: 24px;
    margin-bottom: 20px;
    border-radius: 5px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    padding: 15px;
    border: none;
    background: #44475a;
    color: #f8f8f2;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background: #6272a4;
}

.op {
    background: #bd93f9;
    color: #282a36;
}

.op:hover {
    background: #ff79c6;
}

.zero {
    grid-column: span 2;
}`,
        js: `const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let calculation = [];
let accumulative;

function calculate(btn) {
    const value = btn.textContent;
    
    if(value === "C") {
        calculation = [];
        display.value = '';
    } else if(value === "=") {
        display.value = eval(accumulative);
    } else if(value === "←") {
        calculation.pop();
        accumulative = calculation.join('');
        display.value = accumulative;
    } else {
        calculation.push(value);
        accumulative = calculation.join('');
        display.value = accumulative;
    }
}

buttons.forEach(button => button.addEventListener('click', () => calculate(button)));`
    },
    gallery: {
        html: `<div class="gallery">
    <div class="card">
        <img src="GalleryImages/forest.jpg">
        <div class="info">
            <h3>Лесной пейзаж</h3>
            <p>Красота дикой природы</p>
        </div>
    </div>
    <div class="card">
        <img src="GalleryImages/sea.jpg">
        <div class="info">
            <h3>Морской пейзаж</h3>
            <p>Безмятежность океана</p>
        </div>
    </div>
    <div class="card">
        <img src="GalleryImages/space.jpg">
        <div class="info">
            <h3>Космическое пространство</h3>
            <p>Бескрайние просторы вселенной</p>
        </div>
    </div>
    <button id="shuffle-images" class="shuffle-btn">🔄 Перемешать</button>
</div>`,
        css: `.gallery {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    flex-wrap: wrap;
    position: relative;
}

.card {
    position: relative;
    width: 300px;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
}

.card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
}

.info {
    position: absolute;
    bottom: -100%;
    left: 0;
    width: 100%;
    padding: 20px;
    background: rgba(40, 42, 54, 0.9);
    color: #f8f8f2;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(189, 147, 249, 0.3);
}

.card:hover img {
    transform: scale(1.1);
}

.card:hover .info {
    bottom: 0;
}

.info h3 {
    color: #bd93f9;
    margin-bottom: 10px;
}

.info p {
    color: #6272a4;
    font-size: 14px;
}

.shuffle-btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #bd93f9;
    color: #282a36;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
    z-index: 100;
}

.shuffle-btn:hover {
    background: #ff79c6;
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 4px 15px rgba(189, 147, 249, 0.3);
}`,
        js: `const images = [
    'GalleryImages/forest.jpg',
    'GalleryImages/sea.jpg',
    'GalleryImages/space.jpg',
    'GalleryImages/mountain.jpg',
    'GalleryImages/desert.jpg',
    'GalleryImages/waterfall.jpg'
];

const titles = [
    'Лесной пейзаж',
    'Морской пейзаж',
    'Космическое пространство',
    'Горный пейзаж',
    'Пустынный пейзаж',
    'Водопад'
];

const descriptions = [
    'Красота дикой природы',
    'Безмятежность океана',
    'Бескрайние просторы вселенной',
    'Величие горных вершин',
    'Загадочные пески пустыни',
    'Сила падающей воды'
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateGallery() {
    const cards = document.querySelectorAll('.card');
    const shuffledIndices = shuffleArray([...Array(images.length).keys()]);
    
    cards.forEach((card, index) => {
        const randomIndex = shuffledIndices[index % images.length];
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');
        
        img.src = images[randomIndex];
        title.textContent = titles[randomIndex];
        desc.textContent = descriptions[randomIndex];
        
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
        }, index * 100);
    });
}

document.querySelector('#shuffle-images').addEventListener('click', updateGallery);

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateY(-10px)\`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

updateGallery();`
    }
};

function updateOutput() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const outputContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
    `;

    output.srcdoc = outputContent;
}

function saveToLocalStorage() {
    localStorage.setItem('htmlCode', htmlEditor.getValue());
    localStorage.setItem('cssCode', cssEditor.getValue());
    localStorage.setItem('jsCode', jsEditor.getValue());
}

function loadFromLocalStorage() {
    const htmlCode = localStorage.getItem('htmlCode');
    const cssCode = localStorage.getItem('cssCode');
    const jsCode = localStorage.getItem('jsCode');

    if (htmlCode) htmlEditor.setValue(htmlCode);
    if (cssCode) cssEditor.setValue(cssCode);
    if (jsCode) jsEditor.setValue(jsCode);
}

document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const templateName = btn.dataset.template;
        const template = templates[templateName];
        
        htmlEditor.setValue(template.html);
        cssEditor.setValue(template.css);
        jsEditor.setValue(template.js);
        
        updateOutput();
    });
});

runButton.addEventListener('click', updateOutput);

htmlEditor.on('change', () => {
    saveToLocalStorage();
});

cssEditor.on('change', () => {
    saveToLocalStorage();
});

jsEditor.on('change', () => {
    saveToLocalStorage();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        updateOutput();
    }
});

loadFromLocalStorage();
updateOutput();
