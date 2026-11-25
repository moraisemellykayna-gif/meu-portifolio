// ===== Edite aqui os seus sonhos =====
const sonhos = [
  "Conquistar minha independência",
  "Crescer na minha carreira",
  "Adquirir novos conhecimentos",
  "Construir uma vida da qual eu me orgulhe",
  "Tornar-me a mulher que desejo ser"
];

// Menu no celular
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  btn.setAttribute('aria-expanded', aberto);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('aberto'); btn.setAttribute('aria-expanded', false); }
});

// Caminho que se desenha ao abrir a página
const trilha = document.getElementById('trilha');
const tamanho = trilha.getTotalLength();
const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (semMovimento) {
  document.body.classList.add('pronto');
} else {
  trilha.style.strokeDasharray = tamanho;
  trilha.style.strokeDashoffset = tamanho;
  trilha.getBoundingClientRect();
  trilha.style.transition = 'stroke-dashoffset 2.4s ease-in-out';
  requestAnimationFrame(() => {
    trilha.style.strokeDashoffset = 0;
    document.body.classList.add('pronto');
  });
}

// Lista de sonhos interativa
const lista = document.getElementById('lista-sonhos');
const progresso = document.getElementById('progresso');
let salvos = [];
try { salvos = JSON.parse(localStorage.getItem('sonhos') || '[]'); } catch (e) {}

function atualizar() {
  const total = lista.querySelectorAll('.sonho[aria-pressed="true"]').length;
  progresso.textContent = total === 0
    ? 'Cada sonho começa com um passo.'
    : `${total} de ${sonhos.length} sonhos conquistados. Seguindo no meu tempo.`;
}

sonhos.forEach((texto, i) => {
  const li = document.createElement('li');
  const b = document.createElement('button');
  b.className = 'sonho';
  b.type = 'button';
  b.setAttribute('aria-pressed', salvos.includes(i));
  b.innerHTML = '<span class="marca-sonho" aria-hidden="true">✓</span><span></span>';
  b.lastChild.textContent = texto;
  b.addEventListener('click', () => {
    const ativo = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', ativo);
    const marcados = [...lista.querySelectorAll('.sonho')].map((x, n) => x.getAttribute('aria-pressed') === 'true' ? n : -1).filter(n => n >= 0);
    try { localStorage.setItem('sonhos', JSON.stringify(marcados)); } catch (e) {}
    atualizar();
  });
  li.appendChild(b);
  lista.appendChild(li);
});
atualizar();

// Destaca a seção atual no menu
const links = [...menu.querySelectorAll('a')];
const obs = new IntersectionObserver(entradas => {
  entradas.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => obs.observe(s));
