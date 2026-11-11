const items = [
  {
    id: 1,
    name: 'Bicicleta',
    category: 'brinquedos',
    label: 'Brinquedos',
    image: 'assets/img/itens/bicicleta.jpg',
    artClass: 'item-art--blue',
    condition: 'Bem cuidada',
    description: 'Bicicleta infantil aro 16, revisada e pronta para novas aventuras.'
  },
  {
    id: 2,
    name: 'Kit de histórias',
    category: 'livros',
    label: 'Livros',
    image: 'assets/img/itens/historia.jpg',
    artClass: 'item-art--yellow',
    condition: 'Como novo',
    description: 'Coleção com 8 livros ilustrados para imaginar mundos inteiros.'
  },
  {
    id: 3,
    name: 'Casaco amarelo',
    category: 'roupas',
    label: 'Roupas',
    image: 'assets/img/itens/casaco.jpg',
    artClass: 'item-art--coral',
    condition: 'Bem cuidado',
    description: 'Casaco quentinho tamanho 8, perfeito para os dias de inverno.'
  },
  {
    id: 4,
    name: 'Quebra cabeça',
    category: 'brinquedos',
    label: 'Brinquedos',
    image: 'assets/img/itens/puzzle.jpg',
    artClass: 'item-art--lilac',
    condition: 'Como novo',
    description: 'Jogo de montar com 80 peças e muita criatividade para explorar.'
  },
  {
    id: 5,
    name: 'Mochila',
    category: 'escolar',
    label: 'Escolar',
    image: 'assets/img/itens/mochila.jpg',
    artClass: 'item-art--green',
    condition: 'Bem cuidada',
    description: 'Mochila resistente com divisórias e espaço para todos os cadernos.'
  },
  {
    id: 6,
    name: 'Bola de futebol',
    category: 'brinquedos',
    label: 'Brinquedos',
    image: 'assets/img/itens/bola.jpg',
    artClass: 'item-art--navy',
    condition: 'Com marcas de uso',
    description: 'Bola tamanho infantil para transformar qualquer espaço em campo.'
  },
  {
    id: 7,
    name: 'Caderno de desenho',
    category: 'escolar',
    label: 'Escolar',
    image: 'assets/img/itens/caderno.jpg',
    artClass: 'item-art--yellow',
    condition: 'Como novo',
    description: 'Caderno com folhas lisas e lápis de cor para soltar a imaginação.'
  },
  {
    id: 8,
    name: 'Boneca de pano',
    category: 'brinquedos',
    label: 'Brinquedos',
    image: 'assets/img/itens/boneca-de-pano.png',
    artClass: 'item-art--coral',
    condition: 'Bem cuidada',
    description: 'Boneca macia feita à mão, pronta para ganhar uma nova companhia.'
  }
];

const storageKeys = {
  users: 'donetoy_users',
  session: 'donetoy_session',
  donations: 'donetoy_donations',
  messages: 'donetoy_messages'
};

let currentFilter = 'todos';
let currentSearch = '';
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const readStorage = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

function showToast(message) {
  const toast = $('#toast');

  if (!toast || !$('#toastMessage')) return;

  $('#toastMessage').textContent = message;
  toast.classList.add('is-visible');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3800);
}

function renderItems() {
  const grid = $('#itemsGrid');

  if (!grid) return;

  const term = currentSearch.trim().toLowerCase();

  const filtered = items.filter(item => {
    const matchesFilter =
      currentFilter === 'todos' || item.category === currentFilter;

    const matchesSearch =
      !term ||
      `${item.name} ${item.label} ${item.description}`
        .toLowerCase()
        .includes(term);

    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = filtered.map(item => `
    <article
      class="item-card reveal"
      data-item-id="${item.id}"
      tabindex="0"
      role="button"
      aria-label="Ver detalhes de ${item.name}"
    >
      <div class="item-art ${item.artClass}">
        <span class="item-art__tag">${item.label}</span>

        <img
          src="${item.image}"
          alt="${item.name}"
          class="item-art__image"
          loading="lazy"
        >
      </div>

      <div class="item-body">
        <div class="item-body__top">
          <h3>${item.name}</h3>
          <span aria-hidden="true">↗</span>
        </div>

        <p>${item.condition}</p>

        <span class="item-body__link">
          Ver detalhes <span>→</span>
        </span>
      </div>
    </article>
  `).join('');

  const catalogEmpty = $('#catalogEmpty');
  const showAllItems = $('#showAllItems');

  if (catalogEmpty) {
    catalogEmpty.hidden = filtered.length > 0;
  }

  if (showAllItems) {
    showAllItems.hidden =
      filtered.length === items.length &&
      currentFilter === 'todos' &&
      !term;
  }

  $$('.item-card').forEach(card => {
    card.addEventListener('click', () => {
      openItemModal(Number(card.dataset.itemId));
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openItemModal(Number(card.dataset.itemId));
      }
    });
  });

  requestAnimationFrame(() => {
    $$('.reveal').forEach(element => {
      element.classList.add('is-visible');
    });
  });
}

function openItemModal(itemId) {
  const item = items.find(entry => entry.id === itemId);
  const modalContent = $('#modalContent');
  const modalBackdrop = $('#modalBackdrop');

  if (!item || !modalContent || !modalBackdrop) return;

  modalContent.innerHTML = `
    <div class="modal__art ${item.artClass}">
      <img
        src="${item.image}"
        alt="${item.name}"
        class="modal__image"
      >
    </div>

    <span class="label-mono">
      ${item.label} · ${item.condition}
    </span>

    <h2 id="modalTitle">${item.name}</h2>

    <p>${item.description}</p>

    <div class="modal__meta">
      <span class="modal__pill">Revisado pela equipe</span>
      <span class="modal__pill">Retirada a combinar</span>
    </div>

    <button class="button button--primary" id="requestItem">
      Quero solicitar este item <span>↗</span>
    </button>
  `;

  modalBackdrop.hidden = false;
  document.body.classList.add('no-scroll');

  $('#requestItem').addEventListener('click', () => {
    closeModal();

    const doarSection = $('#doar');

    if (doarSection) {
      doarSection.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      const itemInput = $('[name="item"]', $('#donationForm'));

      if (itemInput) {
        itemInput.value = item.name;
        itemInput.focus();
      }
    }, 650);

    showToast(
      'Item selecionado. Conte como você quer fazer o cuidado circular.'
    );
  });
}

function closeModal() {
  const modalBackdrop = $('#modalBackdrop');

  if (modalBackdrop) {
    modalBackdrop.hidden = true;
  }

  document.body.classList.remove('no-scroll');
}

function updateSessionUI() {
  const session = readStorage(storageKeys.session, null);
  const loginLink = $('.login-link');

  if (!loginLink) return;

  loginLink.textContent = session
    ? `Olá, ${session.name.split(' ')[0]}`
    : 'Entrar';

  loginLink.dataset.openAuth = session ? 'profile' : 'login';
}

function setupFilters() {
  $$('.filter-chip').forEach(button => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;

      $$('.filter-chip').forEach(chip => {
        chip.classList.toggle('is-active', chip === button);
      });

      renderItems();
    });
  });

  const catalogSearch = $('#catalogSearch');

  if (catalogSearch) {
    catalogSearch.addEventListener('input', event => {
      currentSearch = event.target.value;
      renderItems();
    });
  }

  const clearFilters = $('#clearFilters');

  if (clearFilters) {
    clearFilters.addEventListener('click', () => {
      currentFilter = 'todos';
      currentSearch = '';

      if (catalogSearch) {
        catalogSearch.value = '';
      }

      $$('.filter-chip').forEach(chip => {
        chip.classList.toggle(
          'is-active',
          chip.dataset.filter === 'todos'
        );
      });

      renderItems();
    });
  }

  const showAllItems = $('#showAllItems');

  if (showAllItems) {
    showAllItems.addEventListener('click', () => {
      currentFilter = 'todos';
      currentSearch = '';

      if (catalogSearch) {
        catalogSearch.value = '';
      }

      $$('.filter-chip').forEach(chip => {
        chip.classList.toggle(
          'is-active',
          chip.dataset.filter === 'todos'
        );
      });

      renderItems();
    });
  }
}

function setupMobileMenu() {
  const toggle = $('#menuToggle');
  const nav = $('#mainNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');

    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  $$('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupForms() {
  const donationForm = $('#donationForm');

  if (donationForm) {
    donationForm.addEventListener('submit', event => {
      event.preventDefault();

      const data = Object.fromEntries(
        new FormData(event.currentTarget).entries()
      );

      const selectedPhoto = event.currentTarget.elements.photo?.files[0];

      if (selectedPhoto) {
        data.photo = {
          name: selectedPhoto.name,
          type: selectedPhoto.type,
          size: selectedPhoto.size
        };
      } else {
        delete data.photo;
      }

      const donations = readStorage(storageKeys.donations);

      donations.push({
        ...data,
        id: `DON-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'Recebida'
      });

      writeStorage(storageKeys.donations, donations);

      event.currentTarget.reset();

      showToast(
        'Doação recebida! Em breve vamos entrar em contato.'
      );
    });
  }

  const contactForm = $('#contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      const data = Object.fromEntries(
        new FormData(event.currentTarget).entries()
      );

      const messages = readStorage(storageKeys.messages);

      messages.push({
        ...data,
        id: `MSG-${Date.now()}`,
        createdAt: new Date().toISOString()
      });

      writeStorage(storageKeys.messages, messages);

      event.currentTarget.reset();

      showToast(
        'Mensagem enviada. Obrigado por falar com a gente!'
      );
    });
  }

  const registerForm = $('#registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', event => {
      event.preventDefault();

      const data = Object.fromEntries(
        new FormData(event.currentTarget).entries()
      );

      const users = readStorage(storageKeys.users);

      if (
        users.some(
          user => user.email.toLowerCase() === data.email.toLowerCase()
        )
      ) {
        showToast(
          'Este e-mail já está cadastrado neste navegador.'
        );
        return;
      }

      users.push({
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date().toISOString()
      });

      writeStorage(storageKeys.users, users);

      writeStorage(storageKeys.session, {
        name: data.name,
        email: data.email
      });

      updateSessionUI();

      event.currentTarget.reset();

      showToast(`Cadastro criado, ${data.name.split(' ')[0]}!`);
    });
  }
}

function openAuthModal(mode = 'login') {
  const modalContent = $('#modalContent');
  const modalBackdrop = $('#modalBackdrop');

  if (!modalContent || !modalBackdrop) return;

  if (mode === 'profile') {
    const session = readStorage(storageKeys.session, null);

    if (!session) {
      return openAuthModal('login');
    }

    const myDonations = readStorage(storageKeys.donations).filter(
      donation => donation.email === session.email
    );

    modalContent.innerHTML = `
      <span class="label-mono">SEU ESPAÇO DONETOY</span>

      <h2 id="modalTitle">
        Olá, ${session.name.split(' ')[0]}.
      </h2>

      <p>
        Este é o seu resumo neste navegador.
        Aqui ficam as doações enviadas durante esta demonstração.
      </p>

      <div class="modal__meta">
        <span class="modal__pill">
          ${myDonations.length} doação(ões) enviada(s)
        </span>

        <span class="modal__pill">Perfil ativo</span>
      </div>

      <button class="button button--primary" id="profileDonate">
        Enviar outra doação <span>↗</span>
      </button>

      <button
        class="inline-button"
        id="logoutButton"
        style="display:block;margin:17px auto 0"
      >
        Sair do perfil
      </button>
    `;

    modalBackdrop.hidden = false;
    document.body.classList.add('no-scroll');

    $('#profileDonate').addEventListener('click', () => {
      closeModal();

      const doarSection = $('#doar');

      if (doarSection) {
        doarSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    $('#logoutButton').addEventListener('click', () => {
      localStorage.removeItem(storageKeys.session);

      updateSessionUI();
      closeModal();

      showToast(
        'Você saiu do seu perfil neste navegador.'
      );
    });

    return;
  }

  const isLogin = mode === 'login';

  modalContent.innerHTML = `
    <span class="label-mono">
      ${isLogin ? 'BEM-VINDO DE VOLTA' : 'FAÇA PARTE DA REDE'}
    </span>

    <h2 id="modalTitle">
      ${isLogin ? 'Entrar no DoneToy' : 'Criar seu cadastro'}
    </h2>

    <p>
      ${
        isLogin
          ? 'Acesse seu histórico de doações e itens salvos.'
          : 'Crie seu perfil para acompanhar o cuidado circulando.'
      }
    </p>

    <form id="authForm">
      <label>
        E-mail
        <input
          name="email"
          type="email"
          placeholder="voce@email.com"
          required
        />
      </label>

      <label>
        Senha
        <input
          name="password"
          type="password"
          placeholder="Sua senha"
          required
        />
      </label>

      <button class="button button--primary" type="submit">
        ${isLogin ? 'Entrar' : 'Criar cadastro'} <span>↗</span>
      </button>
    </form>

    <p class="form-note">
      ${isLogin ? 'Ainda não tem cadastro? ' : 'Já tem cadastro? '}

      <button class="inline-button" id="switchAuth">
        ${isLogin ? 'Criar agora' : 'Entrar'}
      </button>
    </p>
  `;

  modalBackdrop.hidden = false;
  document.body.classList.add('no-scroll');

  $('#authForm').addEventListener('submit', event => {
    event.preventDefault();

    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    );

    const users = readStorage(storageKeys.users);

    const user = users.find(
      entry =>
        entry.email.toLowerCase() === data.email.toLowerCase() &&
        entry.password === data.password
    );

    if (!user) {
      showToast(
        'Não encontramos esse acesso neste navegador.'
      );
      return;
    }

    writeStorage(storageKeys.session, {
      name: user.name,
      email: user.email
    });

    updateSessionUI();
    closeModal();

    showToast(
      `Que bom te ver, ${user.name.split(' ')[0]}!`
    );
  });

  $('#switchAuth').addEventListener('click', () => {
    openAuthModal(isLogin ? 'register' : 'login');
  });
}

function setupModalAndAuth() {
  const modalClose = $('#modalClose');
  const modalBackdrop = $('#modalBackdrop');

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', event => {
      if (event.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  $$('[data-open-auth]').forEach(button => {
    button.addEventListener('click', () => {
      openAuthModal(button.dataset.openAuth);
    });
  });
}

function setupCampaigns() {
  $$('[data-campaign]').forEach(button => {
    button.addEventListener('click', () => {
      const doarSection = $('#doar');

      if (doarSection) {
        doarSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(
        `Vamos apoiar “${button.dataset.campaign}” juntos.`
      );
    });
  });
}

function setupDemoLinks() {
  $$('[data-demo-link]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      showToast(
        `${link.dataset.demoLink} fica disponível na próxima versão do DoneToy.`
      );
    });
  });
}

function setupReveal() {
  const elements = $$(
    '.process-card, .campaign-feature, .mini-campaign, .impact-photo, .impact-copy, .signup-card, .contact-layout, .faq'
  );

  if (!('IntersectionObserver' in window)) {
    elements.forEach(element => {
      element.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}

setupMobileMenu();
setupFilters();
renderItems();
setupForms();
setupModalAndAuth();
setupCampaigns();
setupDemoLinks();
setupReveal();
updateSessionUI();