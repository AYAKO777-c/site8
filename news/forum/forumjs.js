document.addEventListener("DOMContentLoaded", () => {
  // --- Плавная навигация по якорям ---
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Подмена текста в видимых <p> и случайных <li> ---
  const paragraphs = Array.from(document.querySelectorAll("p"));
  const lists = Array.from(document.querySelectorAll("ul, ol"));

  paragraphs.forEach(el => { if (!el.dataset.origHtml) el.dataset.origHtml = el.innerHTML; });
  lists.forEach(list => {
    Array.from(list.querySelectorAll("li")).forEach(li => {
      if (!li.dataset.origHtml) li.dataset.origHtml = li.innerHTML;
    });
  });

  const creepyReplacements = [
    "Ты не должен это видеть...",
    "Она уже рядом.",
    "Смотри под ноги.",
    "Обернись сейчас.",
    "Слышишь шёпот?",
    "Твоя жизнь на экране."
  ];

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0 &&
           rect.left < window.innerWidth && rect.right > 0;
  }

  function corruptVisible() {
    // <p>
    const visibleP = paragraphs.filter(isInViewport);
    if (visibleP.length) {
      const el = visibleP[Math.floor(Math.random() * visibleP.length)];
      if (!el.classList.contains("corrupt")) {
        const phrase = creepyReplacements[Math.floor(Math.random() * creepyReplacements.length)];
        el.classList.add("corrupt");
        el.textContent = phrase;
        setTimeout(() => {
          el.innerHTML = el.dataset.origHtml;
          el.classList.remove("corrupt");
        }, 4000 + Math.random() * 2000);
      }
    }

    // <li>
    const visibleLists = lists.filter(isInViewport);
    if (visibleLists.length) {
      const list = visibleLists[Math.floor(Math.random() * visibleLists.length)];
      const liItems = Array.from(list.querySelectorAll("li"));
      if (liItems.length) {
        const li = liItems[Math.floor(Math.random() * liItems.length)];
        if (!li.classList.contains("corrupt")) {
          const phrase = creepyReplacements[Math.floor(Math.random() * creepyReplacements.length)];
          li.classList.add("corrupt");
          li.textContent = phrase;
          setTimeout(() => {
            li.innerHTML = li.dataset.origHtml;
            li.classList.remove("corrupt");
          }, 4000 + Math.random() * 2000);
        }
      }
    }

    // случайный интервал 15–25 сек
    setTimeout(corruptVisible, 15000 + Math.random() * 10000);
  }

  corruptVisible(); // запуск

  // --- Карта лесополосы ---
  const map = document.getElementById('forest-map');
  const tooltip = document.getElementById('map-tooltip');

  if (map && tooltip) {
    map.querySelectorAll('.map-point').forEach(point => {
      point.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
        tooltip.textContent = point.dataset.text;
      });

      point.addEventListener('mousemove', e => {
        let x = e.clientX + 15;
        let y = e.clientY + 15;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const tipW = tooltip.offsetWidth;
        const tipH = tooltip.offsetHeight;

        if (x + tipW > winW) x = winW - tipW - 5;
        if (y + tipH > winH) y = winH - tipH - 5;

        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      });

      point.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
    });
  }

  // --- Делегирование для всех .read-more ---
  document.body.addEventListener('click', e => {
    if (!e.target.matches('.read-more')) return;

    const entry = e.target.closest('.diary-entry');
    if (!entry) return;

    const preview = entry.querySelector('.entry-preview');
    const content = entry.querySelector('.diary-entry-content');

    // Старый формат (data-full)
    if (entry.dataset.full && preview) {
      const isExpanded = preview.classList.contains('expanded');
      if (!isExpanded) {
        preview.innerHTML = entry.dataset.full + '<br><span class="read-more">[свернуть]</span>';
        preview.classList.add('expanded');
      } else {
        const shortText = entry.dataset.full.split('…')[0] + '… ';
        preview.innerHTML = shortText + '<span class="read-more">[читать дальше]</span>';
        preview.classList.remove('expanded');
      }
    }

    // Новый формат (.diary-entry-content)
    else if (content) {
      const isHidden = content.style.display === 'none' || !content.style.display;
      content.style.display = isHidden ? 'block' : 'none';
      e.target.textContent = isHidden ? '[свернуть]' : '[читать дальше]';
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const mapContainer = document.getElementById('forest-map-container');
  const mapImage = document.getElementById('forest-map');
  const tooltip = document.getElementById('map-tooltip');

  if (!mapContainer || !mapImage || !tooltip) return;

  const mapWidth = mapContainer.offsetWidth;
  const mapHeight = mapContainer.offsetHeight;

  const creepyPointsText = [
    "Старая тропа здесь ведёт в никуда", 
    "Здесь была замечена странная тень", 
    "Проклятая поляна: деревья шепчут имена пропавших",
    "Здесь туман сгущается, будто живой", 
    "Огромный дуб скрывает в своей тени что-то незримое",
    "Камни на тропе образуют странные символы",
    "Следы зверя ведут вглубь леса и исчезают",
    "Здесь слышен далёкий, нечеловеческий смех",
    "Страннок дыхание",
    "Старый мост скрипит, хотя никто не проходит",
    "Почва на поляне мягкая — будто кто-то недавно здесь был",
    "Тень между деревьев движется сама по себе",
    "Гнездо в верхушке дерева выглядит слишком большим для птиц",
    "Ветки шепчут, когда ты идёшь мимо",
    "Туман скрывает путь, который ты думал найти"
  ];

  const creepyComments = [
    "Не могу выбраться…",
    "Она идёт за мной…",
    "Я что-то видел!",
    "Помогите…",
    "Кто-то рядом…",
    "Это не лес…",
    "Мои ноги сами идут туда…",
    "Я слышу шёпот…",
    "Там кто-то смотрит…",
    "Я больше не вернусь сюда"
  ];

  // --- Точки на карте ---
  function spawnRandomPoint() {
    const point = document.createElement('div');
    point.className = 'map-point';
    point.style.position = 'absolute';
    point.style.width = '20px';
    point.style.height = '20px';
    point.style.background = 'red';
    point.style.borderRadius = '50%';
    point.style.cursor = 'pointer';

    point.style.top = (10 + Math.random() * 80) + '%';
    point.style.left = (10 + Math.random() * 80) + '%';
    point.dataset.text = creepyPointsText[Math.floor(Math.random() * creepyPointsText.length)];
    point.style.opacity = '0';

    mapContainer.appendChild(point);
    setTimeout(() => { point.style.opacity = 1; }, 50);

    let shakeInterval;
    point.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
      tooltip.textContent = point.dataset.text;
      point.style.boxShadow = '0 0 20px 5px red';

      shakeInterval = setInterval(() => {
        const x = (Math.random() - 0.5) * 4;
        const y = (Math.random() - 0.5) * 4;
        mapImage.style.transform = `translate(${x}px, ${y}px)`;
      }, 50);
    });

    point.addEventListener('mousemove', e => {
      let x = e.clientX + 15;
      let y = e.clientY + 15;
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const tipW = tooltip.offsetWidth;
      const tipH = tooltip.offsetHeight;
      if (x + tipW > winW) x = winW - tipW - 5;
      if (y + tipH > winH) y = winH - tipH - 5;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });

    point.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
      point.style.boxShadow = 'none';
      clearInterval(shakeInterval);
      mapImage.style.transform = 'translate(0,0)';
    });

    setTimeout(() => {
      point.style.opacity = 0;
      setTimeout(() => { if (point.parentNode) point.parentNode.removeChild(point); }, 1000);
    }, 3000 + Math.random() * 3000);

    setTimeout(spawnRandomPoint, 1000 + Math.random() * 3000);
  }

  // --- Люди на карте с плавным исследованием ---
  function spawnPerson() {
    const person = document.createElement('div');
    person.className = 'map-person';
    person.style.position = 'absolute';
    person.style.width = '15px';
    person.style.height = '15px';
    person.style.background = 'yellow';
    person.style.borderRadius = '50%';
    person.style.cursor = 'pointer';
    person.style.transition = 'opacity 2s ease, background 2s ease, left 0.5s linear, top 0.5s linear';

    let x = Math.random() * (mapWidth - 15);
    let y = Math.random() * (mapHeight - 15);
    person.style.left = x + 'px';
    person.style.top = y + 'px';

    mapContainer.appendChild(person);

    // Случайное «исследование» леса
    const moveInterval = setInterval(() => {
      const dx = (Math.random() - 0.5) * 30; // большее смещение
      const dy = (Math.random() - 0.5) * 30;
      x = Math.max(0, Math.min(x + dx, mapWidth - 15));
      y = Math.max(0, Math.min(y + dy, mapHeight - 15));
      person.style.left = x + 'px';
      person.style.top = y + 'px';
    }, 800);

    // Комментарии
    const commentInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const comment = document.createElement('div');
        comment.textContent = creepyComments[Math.floor(Math.random() * creepyComments.length)];
        comment.style.position = 'absolute';
        comment.style.left = (x + Math.random() * 20 - 10) + 'px';
        comment.style.top = (y + Math.random() * 20 - 10) + 'px';
        comment.style.color = '#ff5555';
        comment.style.fontFamily = 'Courier New, monospace';
        comment.style.fontSize = '12px';
        comment.style.opacity = 0.8;
        comment.style.pointerEvents = 'none';
        mapContainer.appendChild(comment);
        setTimeout(() => { if (comment.parentNode) comment.parentNode.removeChild(comment); }, 4000 + Math.random() * 2000);
      }
    }, 1000);

    // Смерть или побег
    setTimeout(() => {
      clearInterval(moveInterval);
      clearInterval(commentInterval);

      if (Math.random() < 0.5) {
        // убегает к краю
        let targetX = x < mapWidth / 2 ? -20 : mapWidth + 20;
        let targetY = y < mapHeight / 2 ? -20 : mapHeight + 20;

        const escapeInterval = setInterval(() => {
          const dx = targetX - x;
          const dy = targetY - y;
          x += dx * 0.1;
          y += dy * 0.1;
          person.style.left = x + 'px';
          person.style.top = y + 'px';

          if (x < -20 || x > mapWidth + 20 || y < -20 || y > mapHeight + 20) {
            clearInterval(escapeInterval);
            if (person.parentNode) person.parentNode.removeChild(person);
          }
        }, 30);

      } else {
        // умирает — черный и исчезает
        person.style.background = 'black';
        person.style.opacity = 0;
        setTimeout(() => { if (person.parentNode) person.parentNode.removeChild(person); }, 2000);
      }

    }, 5000 + Math.random() * 5000);
  }

  setInterval(spawnPerson, 20000);
  spawnPerson();
  spawnRandomPoint();

});
