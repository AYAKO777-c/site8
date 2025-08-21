// ============================
// Случайное окно камеры
// ============================
// ============================
// Эффект постепенного появления текста (typewriter) для камеры
// ============================
function typeWriter(element, text, speed = 50) {
  element.innerHTML = ""; // очищаем
  let i = 0;
  let timer = setInterval(() => {
    // Заменяем переносы \n на <br>
    let char = text.charAt(i);
    if (char === "\n") {
      element.innerHTML += "<br>";
    } else {
      element.innerHTML += char;
    }
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}


function showCameraWindow() {
  const cam = document.getElementById("camera-warning");
  if (!cam) return;

  cam.style.display = "block";

  // Текст для эффекта печатной машинки
  const mainText = "Подключение к камере...\nРазрешение получено. Наблюдение включено.";

  typeWriter(cam, mainText, 50); // скорость 50ms на символ

  // Скрываем окно через 5 секунд после завершения печати
  setTimeout(() => cam.style.display = "none", 5000 + mainText.length * 50);
}

// Первое появление через 7 секунд
setTimeout(showCameraWindow, 7000);

// Рандомное повторение каждые 20-60 секунд
setInterval(() => {
  if (Math.random() < 0.5) showCameraWindow();
}, Math.floor(Math.random() * (60000 - 20000 + 1)) + 20000);

// ============================
// Фоновый шёпот (click to start)
// ============================
const whisper = document.getElementById("whisperAudio");
if (whisper) {
  window.addEventListener("click", () => {
    if (whisper.paused) {
      whisper.volume = 0.2;
      whisper.play();
    }
  });
}

// ============================
// Резкий крик ворона при скролле
// ============================
const crow = document.getElementById("crowAudio");
window.addEventListener("scroll", () => {
  if (crow) {
    crow.currentTime = 0; // начинаем с начала
    crow.volume = 0.6;
    crow.play();
  }
});

// ============================
// Динамический фон (туман, мерцание)
const bg = document.createElement('div');
bg.id = 'dynamic-bg';
document.body.appendChild(bg);

setInterval(() => {
  const brightness = 0.3 + Math.random() * 0.3; // случайная яркость
  const blur = 0.5 + Math.random() * 1.5;       // случайное размытие
  bg.style.filter = `brightness(${brightness}) blur(${blur}px)`;
}, 1500);

// ============================
// Случайные вспышки
const flash = document.createElement('div');
flash.className = 'flash';
document.body.appendChild(flash);

function triggerFlash() {
  flash.style.opacity = 0.6;
  setTimeout(() => { flash.style.opacity = 0; }, 100);
}

// случайные вспышки каждые 5-15 секунд
setInterval(() => {
  if (Math.random() < 0.5) triggerFlash();
}, 5000 + Math.random() * 10000);

// ============================
// Эффект наблюдения глазами
for (let i = 0; i < 5; i++) {
  const eye = document.createElement('div');
  eye.className = 'eye';
  document.body.appendChild(eye);
}

document.addEventListener('mousemove', e => {
  const eyes = document.querySelectorAll('.eye');
  eyes.forEach(eye => {
    const offsetX = (Math.random() - 0.5) * 20; // слегка рандомное движение
    const offsetY = (Math.random() - 0.5) * 20;
    eye.style.left = `${e.clientX + offsetX}px`;
    eye.style.top = `${e.clientY + offsetY}px`;
  });
});

// ============================
// Невидимые преследователи
const numShadows = 5;
const shadows = [];

for (let i = 0; i < numShadows; i++) {
  const shadow = document.createElement('div');
  shadow.className = 'shadow';
  document.body.appendChild(shadow);
  shadows.push(shadow);
}

function triggerShadow() {
  const shadow = shadows[Math.floor(Math.random() * shadows.length)];
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  shadow.style.left = `${x}px`;
  shadow.style.top = `${y}px`;
  shadow.style.opacity = 0.6 + Math.random() * 0.4; // чуть ярче
  shadow.style.transform = `scale(${0.5 + Math.random()}) rotate(${Math.random()*30-15}deg)`;

  // Исчезает с мерцанием
  setTimeout(() => {
    shadow.style.opacity = 0;
  }, 1000 + Math.random() * 1000);
}
