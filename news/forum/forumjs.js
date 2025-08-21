document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Открытие полного текста дневника
document.querySelectorAll('.diary-entry').forEach(entry => {
  const preview = entry.querySelector('.entry-preview');
  const fullText = entry.dataset.full;
  const readMore = preview.querySelector('.read-more');

  readMore.addEventListener('click', () => {
    preview.textContent = fullText;
  });
});

// --- Дневники (оставляем старый код)
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.diary-entry').forEach(entry => {
  const preview = entry.querySelector('.entry-preview');
  const fullText = entry.dataset.full;
  const readMore = preview.querySelector('.read-more');

  readMore.addEventListener('click', () => {
    preview.textContent = fullText;
  });
});

// --- Карта лесополосы
const map = document.getElementById('forest-map');
const tooltip = document.getElementById('map-tooltip');

map.querySelectorAll('.map-point').forEach(point => {
  point.addEventListener('mouseenter', e => {
    tooltip.style.display = 'block';
    tooltip.textContent = point.dataset.text;
  });

  point.addEventListener('mousemove', e => {
    tooltip.style.top = e.clientY + 15 + 'px';
    tooltip.style.left = e.clientX + 15 + 'px';
  });

  point.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});
