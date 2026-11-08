/* ============================================================
   O Boleiro — app do balcão
   Vanilla JS, sem build. Cardápio em data.js, arte em art.js.
   ============================================================ */
(() => {
  'use strict';

  /* ---------- atalhos ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const money = (n) => brl.format(n);
  const digits = (v) => String(v).replace(/\D+/g, '');
  const products = new Map(PRODUCTS.map((p) => [p.id, p]));
  const SAVE_KEY = 'oboleiro.sacola.v2';

  /* ---------- estado ---------- */
  const state = {
    cart: new Map(),
    mode: 'delivery',
    step: 1,
    tab: CATEGORIES[0].id
  };
  let cartIsOpen = false;
  let menuIsOpen = false;
  let supportIsOpen = false;
  let lastFocus = null;
  let toastTimer = 0;

  /* ---------- elementos ---------- */
  const el = {
    tabs: $('#tabs'),
    grid: $('#menu-grid'),
    status: $('#menu-status'),
    chip: $('#status-chip'),
    cart: $('#cart'),
    overlay: $('.cart-overlay'),
    cartOpenBtn: $('[data-cart-open]'),
    count: $('[data-cart-count]'),
    countLabel: $('[data-cart-label]'),
    empty: $('#cart-empty'),
    step1: $('[data-step="1"]'),
    checkout: $('#checkout'),
    items: $('#cart-items'),
    kicker: $('#cart-kicker'),
    cartBody: $('.cart-body'),
    formError: $('#form-error'),
    toast: $('#toast'),
    supportOverlay: $('.support-overlay'),
    supportModal: $('#support-modal')
  };

  /* ---------- dinheiro ---------- */
  const subtotal = () =>
    [...state.cart].reduce((sum, [id, qty]) => sum + (products.get(id)?.price || 0) * qty, 0);
  const itemCount = () => [...state.cart.values()].reduce((a, b) => a + b, 0);
  const feeLabel = () => (state.mode === 'delivery' ? 'a combinar' : 'grátis');

  function syncTotals() {
    const sub = money(subtotal());
    for (const id of ['#sum-subtotal', '#sum-subtotal-2', '#sum-total', '#sum-total-2']) {
      const node = $(id);
      if (node) node.textContent = sub;
    }
    for (const id of ['#sum-fee', '#sum-fee-2']) {
      const node = $(id);
      if (node) node.textContent = feeLabel();
    }
    const hint = $('#fee-hint');
    if (hint) {
      hint.textContent = state.mode === 'delivery'
        ? 'a taxa de entrega é confirmada pelo CEP no WhatsApp (R$ 6,50 a R$ 20,50).'
        : 'retirada no balcão, sem taxa de entrega.';
    }
  }

  /* ---------- persistência ---------- */
  function persist() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify([...state.cart]));
    } catch { /* modo privado: sacola só na sessão */ }
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved)) return;
      for (const [id, qty] of saved) {
        if (products.has(id) && Number.isInteger(qty) && qty > 0 && qty <= 99) {
          state.cart.set(id, qty);
        }
      }
    } catch { /* sacola velha ou corrompida: começa vazia */ }
  }

  /* ---------- toast ---------- */
  function toast(message) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove('is-visible'), 2800);
  }

  /* ---------- cardápio ---------- */
  function renderTabs() {
    el.tabs.innerHTML = CATEGORIES.map((cat) => {
      const n = PRODUCTS.filter((p) => p.cat === cat.id).length;
      return `<button class="tab" type="button" data-tab="${cat.id}" aria-pressed="false">${cat.label}<span class="tab-count">${n}</span></button>`;
    }).join('');
  }

  function activateTab(id) {
    const cat = CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
    state.tab = cat.id;
    $$('.tab', el.tabs).forEach((btn) => {
      const on = btn.dataset.tab === cat.id;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    renderMenu(cat);
  }

  function renderMenu(cat) {
    const items = PRODUCTS.filter((p) => p.cat === cat.id);
    el.grid.innerHTML = items.map((p, i) => {
      const media = p.photo
        ? `<img src="assets/produtos/${p.photo}.jpg" alt="${p.name}" width="640" height="640" loading="lazy" decoding="async">`
        : window.boleiroArt(p);
      return `<article class="dish" data-kind="${p.photo ? 'photo' : 'art'}" style="--i:${i}">
        <div class="dish-media">${p.tag ? `<span class="dish-tag">${p.tag}</span>` : ''}${media}</div>
        <div class="dish-body">
          <div class="dish-line"><h3>${p.name}</h3><span class="dish-price">${money(p.price)}</span></div>
          <p class="dish-desc">${p.desc}</p>
          <button class="add" type="button" data-add="${p.id}" aria-label="pôr ${p.name} na sacola">pôr na sacola <span class="add-plus" aria-hidden="true">+</span></button>
        </div>
      </article>`;
    }).join('');
    el.status.textContent = `${items.length} ${items.length === 1 ? 'item' : 'itens'} em ${cat.label.toLowerCase()}`;
    updateTabMask();
  }

  /* ---------- sacola ---------- */
  function renderCart() {
    const count = itemCount();
    el.count.textContent = count;
    el.countLabel.textContent = count === 1 ? '1 item na sacola' : `${count} itens na sacola`;
    el.count.classList.remove('updated');
    void el.count.offsetWidth;
    el.count.classList.add('updated');

    if (count === 0) {
      state.step = 1;
      el.empty.hidden = false;
      el.step1.hidden = true;
      el.checkout.hidden = true;
      el.items.innerHTML = '';
    } else {
      el.empty.hidden = true;
      el.step1.hidden = state.step !== 1;
      el.checkout.hidden = state.step !== 2;
      el.items.innerHTML = [...state.cart].map(([id, qty], i) => {
        const p = products.get(id);
        if (!p) return '';
        return `<li class="cart-item" style="--i:${i}">
          <div class="ci-main">
            <p class="ci-name">${p.name}</p>
            <p class="ci-price">${money(p.price)} cada</p>
          </div>
          <p class="ci-total">${money(p.price * qty)}</p>
          <div class="ci-qty">
            <button type="button" data-qty="${p.id}" data-delta="-1" aria-label="tirar um ${p.name}">−</button>
            <span aria-live="polite">${qty}</span>
            <button type="button" data-qty="${p.id}" data-delta="1" aria-label="pôr mais um ${p.name}">+</button>
          </div>
          <button class="ci-remove" type="button" data-remove="${p.id}">remover</button>
        </li>`;
      }).join('');
      el.kicker.textContent = state.step === 1 ? 'passo 1 de 2' : 'passo 2 de 2';
    }
    syncTotals();
  }

  function addToCart(id, btnEl = null) {
    const p = products.get(id);
    if (!p) return;
    const next = (state.cart.get(id) || 0) + 1;
    state.cart.set(id, Math.min(99, next));
    persist();
    renderCart();
    el.cartOpenBtn.classList.remove('pulse');
    void el.cartOpenBtn.offsetWidth;
    el.cartOpenBtn.classList.add('pulse');

    // feedback visual no botão de suporte
    const supBtn = $('.fab-support');
    if (supBtn) {
      supBtn.classList.add('fab-support--alert');
      setTimeout(() => supBtn.classList.remove('fab-support--alert'), 1000);
    }

    // animação do produto voando para o carrinho
    const btn = btnEl || document.querySelector(`[data-add="${id}"]`);
    if (btn && el.cartOpenBtn) {
      const bRect = btn.getBoundingClientRect();
      const cRect = el.cartOpenBtn.getBoundingClientRect();
      const dx = cRect.left + cRect.width / 2 - (bRect.left + bRect.width / 2);
      const dy = cRect.top + cRect.height / 2 - (bRect.top + bRect.height / 2);

      const fly = document.createElement('div');
      fly.className = 'fly-item';
      fly.setAttribute('aria-hidden', 'true');
      fly.style.setProperty('--dx', `${dx}px`);
      fly.style.setProperty('--dy', `${dy}px`);
      fly.style.left = `${bRect.left}px`;
      fly.style.top = `${bRect.top}px`;
      fly.innerHTML = '<span style="font-size:1.4rem;display:block;transform:rotate(-12deg);">🍰</span>';
      document.body.appendChild(fly);

      void fly.offsetWidth; // força reflow
      fly.style.animation = 'fly-squash 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

      setTimeout(() => fly.remove(), 800);
    }

    toast(`${p.name} na sacola`);
  }

  function changeQty(id, delta) {
    const next = (state.cart.get(id) || 0) + delta;
    if (next <= 0) state.cart.delete(id);
    else state.cart.set(id, Math.min(99, next));
    persist();
    renderCart();
  }

  function showStep(step) {
    state.step = step;
    if (itemCount() === 0) {
      renderCart();
      return;
    }
    el.empty.hidden = true;
    el.step1.hidden = step !== 1;
    el.checkout.hidden = step !== 2;
    el.kicker.textContent = step === 1 ? 'passo 1 de 2' : 'passo 2 de 2';
    el.cartBody.scrollTop = 0;
  }

  function setMode(mode) {
    state.mode = mode;
    $$('.mode-btn').forEach((btn) => {
      const on = btn.dataset.mode === mode;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    $('#address-fields').hidden = mode !== 'delivery';
    $('#pickup-note').hidden = mode === 'delivery';
    syncTotals();
  }

  function openCart() {
    if (cartIsOpen) return;
    cartIsOpen = true;
    lastFocus = document.activeElement;
    el.overlay.hidden = false;
    el.cart.classList.add('is-open');
    el.cart.setAttribute('aria-hidden', 'false');
    el.cartOpenBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('cart-open');
    $('.cart-close', el.cart)?.focus();
  }

  function closeCart() {
    if (!cartIsOpen) return;
    cartIsOpen = false;
    el.overlay.hidden = true;
    el.cart.classList.remove('is-open');
    el.cart.setAttribute('aria-hidden', 'true');
    el.cartOpenBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('cart-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  /* ---------- suporte ---------- */
  function openSupport() {
    if (supportIsOpen) return;
    supportIsOpen = true;
    lastFocus = document.activeElement;
    el.supportOverlay.hidden = false;
    el.supportModal.classList.add('is-open');
    el.supportModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('support-open');
    $('.support-close', el.supportModal)?.focus();
  }

  function closeSupport() {
    if (!supportIsOpen) return;
    supportIsOpen = false;
    el.supportOverlay.hidden = true;
    el.supportModal.classList.remove('is-open');
    el.supportModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('support-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function validateSupport() {
    clearErrors();
    const v = {
      name: $('#sup-name').value.trim(),
      phone: $('#sup-phone').value.trim(),
      message: $('#sup-message').value.trim(),
      order: $('#sup-order').value.trim()
    };
    const bad = [];
    if (v.name.length < 2) bad.push(setError('sup-name', 'diz como te chamam'));
    if (digits(v.phone).length < 10) bad.push(setError('sup-phone', 'telefone com DDD'));
    if (!v.message) bad.push(setError('sup-message', 'conte o que precisa'));
    if (bad.length) {
      el.formError.textContent = 'confere os campos marcados — falta pouco.';
      el.formError.hidden = false;
      bad[0].focus();
      return null;
    }
    return v;
  }

  function buildSupportMessage(v) {
    const lines = [];
    lines.push('*SUPORTE — O Boleiro*');
    lines.push('');
    lines.push(`*Nome:* ${v.name}`);
    lines.push(`*Telefone:* ${v.phone}`);
    if (v.order) lines.push(`*Pedido:* ${v.order}`);
    lines.push('');
    lines.push(`*Mensagem:* ${v.message}`);
    return lines.join('\n');
  }

  /* ---------- navegação mobile ---------- */
  const navToggle = $('.nav-toggle');
  const mobileNav = $('#mobile-nav');

  function openMenu() {
    if (menuIsOpen) return;
    menuIsOpen = true;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    $('.mobile-close', mobileNav)?.focus();
  }

  function closeMenu(restoreFocus) {
    if (!menuIsOpen) return;
    menuIsOpen = false;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (restoreFocus) navToggle.focus();
  }

  /* ---------- pagamento ---------- */
  function renderPayments() {
    $('#pay-grid').innerHTML = CONFIG.payments.map((p, i) => `
      <label class="pay-option">
        <input type="radio" name="payment" value="${p.id}" ${i === 0 ? 'checked' : ''}>
        <span class="pay-box"><strong>${p.label}</strong><small>${p.note}</small></span>
      </label>`).join('');
  }

  /* ---------- validadores ---------- */
  function setError(inputId, message) {
    const input = $('#' + inputId);
    const slot = $(`[data-error-for="${inputId}"]`);
    if (input) input.classList.add('has-error');
    if (slot) slot.textContent = message;
    return input;
  }

  function clearErrors() {
    $$('.field-error').forEach((node) => { node.textContent = ''; });
    $$('.has-error').forEach((node) => node.classList.remove('has-error'));
    el.formError.hidden = true;
    el.formError.textContent = '';
  }

  function validateOrder() {
    clearErrors();
    const v = {
      name: $('#f-name').value.trim(),
      phone: $('#f-phone').value.trim(),
      cep: $('#f-cep').value.trim(),
      district: $('#f-district').value.trim(),
      street: $('#f-street').value.trim(),
      number: $('#f-number').value.trim(),
      extra: $('#f-extra').value.trim(),
      ref: $('#f-ref').value.trim(),
      notes: $('#f-notes').value.trim(),
      payment: ($('input[name="payment"]:checked') || {}).value || CONFIG.payments[0].id,
      change: $('#f-change').value.trim()
    };
    const bad = [];
    if (v.name.length < 2) bad.push(setError('f-name', 'diz como te chamam'));
    if (digits(v.phone).length < 10) bad.push(setError('f-phone', 'telefone com DDD'));
    if (state.mode === 'delivery') {
      if (digits(v.cep).length !== 8) bad.push(setError('f-cep', 'CEP com 8 dígitos'));
      if (!v.district) bad.push(setError('f-district', 'qual o bairro'));
      if (!v.street) bad.push(setError('f-street', 'qual a rua'));
      if (!v.number) bad.push(setError('f-number', 'qual o número'));
    }
    if (bad.length) {
      el.formError.textContent = 'confere os campos marcados — falta pouco.';
      el.formError.hidden = false;
      bad[0].focus();
      return null;
    }
    return v;
  }

  /* ---------- máscaras ---------- */
  function maskPhone(value) {
    const d = digits(value).slice(0, 11);
    if (!d) return '';
    if (d.length <= 2) return `(${d}`;
    const midLen = d.length > 10 ? 5 : 4;
    const ddd = d.slice(0, 2);
    const mid = d.slice(2, 2 + midLen);
    const tail = d.slice(2 + midLen);
    return `(${ddd}) ${mid}${tail ? '-' + tail : ''}`;
  }

  function maskCep(value) {
    const d = digits(value).slice(0, 8);
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  }

  let cepTimer = 0;
  async function lookupCep() {
    const d = digits($('#f-cep').value);
    if (d.length !== 8) return;
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${d}`, { headers: { Accept: 'application/json' } });
      if (!res.ok) return;
      const data = await res.json();
      if (data.street && !$('#f-street').value.trim()) $('#f-street').value = data.street;
      if (data.neighborhood && !$('#f-district').value.trim()) $('#f-district').value = data.neighborhood;
    } catch { /* sem rede: preenche na mão */ }
  }

  /* ---------- mensagem do pedido ---------- */
  function buildMessage(v) {
    const pay = CONFIG.payments.find((p) => p.id === v.payment);
    let change = '';
    if (v.payment === 'dinheiro' && v.change) {
      const n = Number(v.change.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'));
      if (Number.isFinite(n) && n > 0) change = ` (troco para ${money(n)})`;
    }
    const lines = [];
    lines.push('*NOVO PEDIDO — O Boleiro*');
    lines.push(state.mode === 'delivery' ? '_entrega_' : '_retirada no balcão_');
    lines.push('');
    lines.push('*Itens*');
    for (const [id, qty] of state.cart) {
      const p = products.get(id);
      if (p) lines.push(`• ${qty}× ${p.name} — ${money(p.price * qty)}`);
    }
    lines.push('');
    lines.push(`*Subtotal:* ${money(subtotal())}`);
    lines.push(state.mode === 'delivery'
      ? '*Entrega:* a combinar — confirmo a taxa pelo CEP'
      : '*Entrega:* retirada no balcão (sem taxa)');
    lines.push(`*Total dos itens:* ${money(subtotal())}`);
    lines.push('');
    lines.push(`*Nome:* ${v.name}`);
    lines.push(`*Telefone:* ${v.phone}`);
    if (state.mode === 'delivery') {
      lines.push(`*Endereço:* ${v.street}, ${v.number} — ${v.district} — CEP ${v.cep}`);
      if (v.extra) lines.push(`*Complemento:* ${v.extra}`);
      if (v.ref) lines.push(`*Referência:* ${v.ref}`);
    }
    lines.push(`*Pagamento:* ${pay ? pay.label : 'Pix'}${change}`);
    if (v.notes) lines.push(`*Observações:* ${v.notes}`);
    return lines.join('\n');
  }

  /* ---------- status da loja ---------- */
  const DAY_LABEL = { 0: 'domingo', 1: 'segunda', 2: 'terça', 3: 'quarta', 4: 'quinta', 5: 'sexta', 6: 'sábado' };
  const DAY_INDEX = {
    domingo: 0,
    'segunda-feira': 1,
    'terça-feira': 2,
    'quarta-feira': 3,
    'quinta-feira': 4,
    'sexta-feira': 5,
    'sábado': 6
  };
  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  };
  const prettyTime = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
  };
  const scheduleFor = (day) => CONFIG.hours.find((h) => h.open.includes(day));

  function storeClock() {
    const parts = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Fortaleza',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value || '';
    const day = DAY_INDEX[get('weekday').toLowerCase()] ?? new Date().getDay();
    return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
  }

  function storeStatus() {
    const { day, minutes } = storeClock();
    const today = scheduleFor(day);
    if (today) {
      const openAt = toMinutes(today.from);
      const closeAt = toMinutes(today.to);
      if (minutes >= openAt && minutes < closeAt) {
        return { open: true, text: `aberto agora · até ${prettyTime(today.to)}` };
      }
      if (minutes < openAt) {
        return { open: false, text: `fechado · abre hoje às ${prettyTime(today.from)}` };
      }
    }
    for (let step = 1; step <= 7; step += 1) {
      const dayIndex = (day + step) % 7;
      const schedule = scheduleFor(dayIndex);
      if (schedule) {
        const when = step === 1 ? 'amanhã' : DAY_LABEL[dayIndex];
        return { open: false, text: `fechado · abre ${when} às ${prettyTime(schedule.from)}` };
      }
    }
    return { open: false, text: 'fechado agora' };
  }

  function paintStatus() {
    if (!el.chip) return;
    const status = storeStatus();
    if (el.chip.dataset.state === status.text) return;
    el.chip.dataset.state = status.text;
    el.chip.classList.toggle('is-closed', !status.open);
    el.chip.innerHTML = `<span class="dot-live" aria-hidden="true"></span> ${status.text}`;
  }

  /* ---------- listas estáticas ---------- */
  function renderZones() {
    $('#zones-list').innerHTML = CONFIG.zones
      .map((zone) => `<li><b>${zone.km}</b><span>${money(zone.fee)}</span></li>`)
      .join('');
  }

  function renderHours() {
    $('#hours-list').innerHTML = CONFIG.hours
      .map((h) => `<div><dt>${h.days}</dt><dd>${h.time}</dd></div>`)
      .join('');
  }

  /* ---------- aba: máscara do scroll ---------- */
  function updateTabMask() {
    const wrap = $('.tabs-wrap');
    if (!wrap || !el.tabs) return;
    wrap.classList.toggle('is-end', el.tabs.scrollLeft + el.tabs.clientWidth >= el.tabs.scrollWidth - 8);
  }

  /* ---------- eventos ---------- */
  el.tabs.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]');
    if (tab) activateTab(tab.dataset.tab);
  });
  el.tabs.addEventListener('scroll', updateTabMask, { passive: true });
  window.addEventListener('resize', updateTabMask);

  el.items.addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('[data-qty]');
    if (qtyBtn) {
      const { qty: id, delta } = qtyBtn.dataset;
      changeQty(id, Number(delta));
      $(`[data-qty="${id}"][data-delta="${delta}"]`, el.items)?.focus();
      return;
    }
    const remove = e.target.closest('[data-remove]');
    if (remove) {
      state.cart.delete(remove.dataset.remove);
      persist();
      renderCart();
    }
  });

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      addToCart(add.dataset.add, add);
      return;
    }
    if (e.target.closest('[data-cart-open]')) {
      openCart();
      return;
    }
    const close = e.target.closest('[data-cart-close]');
    if (close) closeCart();
    const goMenu = e.target.closest('[data-go-menu]');
    if (goMenu) {
      $('#cardapio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const goCat = e.target.closest('[data-goto-cat]');
    if (goCat) activateTab(goCat.dataset.gotoCat);
  });

  $$('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  $('#to-checkout').addEventListener('click', () => {
    if (itemCount() === 0) {
      toast('a sacola está vazia — escolhe um doce primeiro');
      return;
    }
    showStep(2);
  });
  $('#back-to-cart').addEventListener('click', () => showStep(1));

  $('#f-phone').addEventListener('input', (e) => {
    e.target.value = maskPhone(e.target.value);
  });

  $('#f-cep').addEventListener('input', (e) => {
    e.target.value = maskCep(e.target.value);
    clearTimeout(cepTimer);
    if (digits(e.target.value).length === 8) {
      cepTimer = setTimeout(lookupCep, 500);
    }
  });

  el.checkout.addEventListener('change', (e) => {
    if (e.target.name === 'payment') {
      $('#change-field').hidden = e.target.value !== 'dinheiro';
    }
  });

  el.checkout.addEventListener('submit', (e) => {
    e.preventDefault();
    const order = validateOrder();
    if (!order) return;
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(buildMessage(order))}`;
    window.open(url, '_blank', 'noopener');
    toast('pedido aberto no whatsapp — confere e envia');
  });

  navToggle.addEventListener('click', openMenu);
  $('.mobile-close', mobileNav)?.addEventListener('click', () => closeMenu(true));
  $$('.mobile-links a, .mobile-foot a', mobileNav).forEach((link) => {
    link.addEventListener('click', () => closeMenu(false));
  });

  $('.fab-support')?.addEventListener('click', openSupport);
  $('.support-close', el.supportModal)?.addEventListener('click', closeSupport);
  el.supportOverlay?.addEventListener('click', closeSupport);

  $('#support-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const sup = validateSupport();
    if (!sup) return;
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(buildSupportMessage(sup))}`;
    window.open(url, '_blank', 'noopener');
    toast('suporte aberto no whatsapp — confere e envia');
    closeSupport();
    $('#support-form')?.reset();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (supportIsOpen) { closeSupport(); return; }
      if (cartIsOpen) { closeCart(); return; }
      if (menuIsOpen) { closeMenu(true); return; }
    }
    if (cartIsOpen && e.key === 'Tab') {
      const focusable = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', el.cart)
        .filter((node) => node.offsetParent !== null || node === document.activeElement);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 6);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal ---------- */
  const revealNodes = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealNodes.forEach((node) => io.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('in'));
  }

  /* ---------- boot ---------- */
  renderTabs();
  activateTab(state.tab);
  renderHours();
  renderPayments();
  loadCart();
  renderCart();
  setMode('delivery');
  paintStatus();
  setInterval(paintStatus, 60000);
  $('#year').textContent = new Date().getFullYear();
})();
