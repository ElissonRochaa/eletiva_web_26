// tema: papel <-> anteprojeto
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  themeToggle.addEventListener('click', () => {
    const novo = body.dataset.theme === 'paper' ? 'blueprint' : 'paper';
    body.dataset.theme = novo;
    themeToggle.setAttribute('aria-pressed', novo === 'blueprint');
    themeLabel.textContent = novo === 'blueprint' ? 'anteprojeto' : 'papel';
  });

  // acordeão
  document.querySelectorAll('.acc-item').forEach(item => {
    const q = item.querySelector('.acc-q');
    const a = item.querySelector('.acc-a');
    q.addEventListener('click', () => {
      const abrir = !item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.acc-a').style.maxHeight = null;
      });
      if(abrir){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // abas
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });

  // ver código
  document.querySelectorAll('.code-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const snip = document.getElementById(btn.dataset.target);
      snip.classList.toggle('open');
      btn.textContent = snip.classList.contains('open') ? 'ocultar código' : 'ver código';
    });
  });

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // hero: typewriter de código sincronizado com o preview
  const codeOut = document.getElementById('codeOut');
  const pCard = document.getElementById('pCard');
  const pHeading = document.getElementById('pHeading');
  const pText = document.getElementById('pText');
  const pBtn = document.getElementById('pBtn');

  const linhas = [
    { html: '<span class="tok-tag">&lt;section</span> <span class="tok-attr">class=</span><span class="tok-str">"card"</span><span class="tok-tag">&gt;</span>\n', acao: () => pCard.classList.add('show') },
    { html: '  <span class="tok-tag">&lt;h2&gt;</span><span class="tok-txt">Alerta em tempo real</span><span class="tok-tag">&lt;/h2&gt;</span>\n', acao: () => pHeading.textContent = 'Alerta em tempo real' },
    { html: '  <span class="tok-tag">&lt;p&gt;</span><span class="tok-txt">Sem frameworks. Só o navegador.</span><span class="tok-tag">&lt;/p&gt;</span>\n', acao: () => pText.textContent = 'Sem frameworks. Só o navegador.' },
    { html: '  <span class="tok-tag">&lt;button</span> <span class="tok-attr">id=</span><span class="tok-str">"btn"</span><span class="tok-tag">&gt;</span><span class="tok-txt">Ativar</span><span class="tok-tag">&lt;/button&gt;</span>\n', acao: () => { pBtn.style.display = 'inline-flex'; pBtn.textContent = 'Ativar'; } },
    { html: '<span class="tok-tag">&lt;/section&gt;</span>', acao: () => pBtn.classList.add('pulse') }
  ];

  function digitar(){
    codeOut.innerHTML = '';
    pCard.classList.remove('show');
    pHeading.textContent = ''; pText.textContent = '';
    pBtn.style.display = 'none'; pBtn.classList.remove('pulse');

    let i = 0;
    function proximaLinha(){
      if(i >= linhas.length){
        setTimeout(digitar, 3200);
        return;
      }
      const linha = linhas[i];
      const span = document.createElement('span');
      span.innerHTML = linha.html;
      const caret = document.createElement('span');
      caret.className = 'caret';
      codeOut.appendChild(span);
      codeOut.appendChild(caret);
      setTimeout(() => {
        caret.remove();
        linha.acao();
        i++;
        setTimeout(proximaLinha, 260);
      }, 420);
    }
    proximaLinha();
  }
  
  digitar();