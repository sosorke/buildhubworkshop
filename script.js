const defaultSiteContent = {
  heroTitle: "Criado para voce, desenvolvido com voce.",
  heroSubtitle: "Cada projeto começa com uma conversa. Ouvimos suas ideias, analisamos suas necessidades e desenvolvemos uma solucao digital que reflita exatamente o que voce imaginou.",
  serviceWeb: "Desenvolvimento Web",
  serviceSystems: "Sistemas",
  serviceLanding: "Landing Pages",
  serviceUx: "UI/UX Design",
  aboutStory: "Desenvolvemos sites e sistemas sob medida, de acordo com a necessidade do cliente, melhorando organizacao, desempenho empresarial e presenca digital.",
  companyEmail: "contato@buildhub.dev",
  companyPhone: "+55 (11) 94000-2026",
  companyLocation: "Sao Paulo, Brasil"
};

const state = {
  projects: [
    {
      id: 1,
      title: "GameBear",
      category: "games",
      label: "Empresa de Desenvolvimento de Jogos",
      description: "Estudio especializado no desenvolvimento de jogos para PC, Mobile e Web, criando experiencias imersivas para jogadores do mundo inteiro.",
      shortDescription: "Experiencias gamer para PC, Mobile e Web.",
      stack: "Design gamer, UI neon, web interativa",
      progress: 100,
      cover: "images/gamebear-cover.svg",
      logo: "images/gamebear-logo.svg",
      theme: "Escuro, azul e roxo neon",
      features: ["Design gamer", "Tons escuros", "Azul e roxo neon", "Interface moderna"]
    },
    {
      id: 2,
      title: "SafeCore",
      category: "security",
      label: "Blog de Tecnologia e Segurança Digital",
      description: "Portal focado em cibersegurança, privacidade digital, proteção de dados e noticias sobre tecnologia.",
      shortDescription: "Blog profissional sobre ciberseguranca e privacidade.",
      stack: "Blog, SEO, artigos em destaque",
      progress: 100,
      cover: "images/safecore-cover.svg",
      logo: "images/safecore-logo.svg",
      theme: "Corporativo, branco e azul",
      features: ["Visual corporativo", "Branco e azul", "Layout de blog profissional", "Artigos em destaque"]
    },
    {
      id: 3,
      title: "Shield Woman",
      category: "store",
      label: "Loja de Defesa Pessoal Feminina",
      description: "E-commerce especializado em artigos voltados para segurança e proteção feminina, com foco em conscientização, informação e prevenção.",
      shortDescription: "Loja virtual elegante para seguranca e protecao feminina.",
      stack: "E-commerce, catalogo, conteudo educativo",
      progress: 100,
      cover: "images/shieldwoman-cover.svg",
      logo: "images/shieldwoman-logo.svg",
      theme: "Roxo, branco e preto",
      features: ["Visual elegante", "Roxo, branco e preto", "Layout de loja virtual", "Catalogo de produtos"]
    }
  ],
  users: [
    { email: "admin@buildhub.dev", password: "123456", role: "adm", name: "Administrador" },
    { email: "cliente@buildhub.dev", password: "123456", role: "cliente", name: "Cliente BuildHub" }
  ],
  contacts: [],
  siteContent: { ...defaultSiteContent }
};

const selectors = {
  loader: document.querySelector("#loader"),
  cursor: document.querySelector("#customCursor"),
  grid: document.querySelector("#floatingGrid"),
  brandText: document.querySelector("#brandText"),
  brandSymbol: document.querySelector("#brandSymbol"),
  navToggle: document.querySelector("#navToggle"),
  navMenu: document.querySelector("#navMenu"),
  projectGrid: document.querySelector("#projectGrid"),
  modal: document.querySelector("#projectModal"),
  modalContent: document.querySelector("#modalContent"),
  contactForm: document.querySelector("#contactForm"),
  loginForm: document.querySelector("#loginForm"),
  toast: document.querySelector("#toast"),
  toTop: document.querySelector("#toTop"),
  dashboard: document.querySelector("#dashboard"),
  dashboardRole: document.querySelector("#dashboardRole"),
  dashboardTitle: document.querySelector("#dashboardTitle"),
  dashboardMenu: document.querySelector("#dashboardMenu"),
  dashboardContent: document.querySelector("#dashboardContent"),
  logoutButton: document.querySelector("#logoutButton"),
  canvas: document.querySelector("#particleCanvas")
};

const storageKeys = {
  contacts: "buildhub_contacts",
  projects: "buildhub_projects",
  session: "buildhub_session",
  siteContent: "buildhub_site_content_v2"
};

const pageType = document.body.dataset.page || "home";

document.addEventListener("DOMContentLoaded", () => {
  hydrateStorage();
  applySiteContent();
  if (selectors.brandText && selectors.brandSymbol) prepareLogoAnimation();
  if (selectors.grid) createFloatingBlocks();
  if (selectors.canvas) initParticles();
  if (selectors.projectGrid) {
    renderProjects();
    bindPortfolio();
  }
  if (selectors.navToggle && selectors.navMenu) bindNavigation();
  bindForms();
  if (selectors.dashboard) bindDashboard();
  initRevealAnimations();
  initCursor();
  restoreSession();

  setTimeout(() => selectors.loader?.classList.add("done"), 850);
});

function hydrateStorage() {
  const savedContacts = JSON.parse(localStorage.getItem(storageKeys.contacts) || "[]");
  const savedProjects = JSON.parse(localStorage.getItem(storageKeys.projects) || "null");
  const savedSiteContent = JSON.parse(localStorage.getItem(storageKeys.siteContent) || "null");

  state.contacts = savedContacts;
  if (savedSiteContent && typeof savedSiteContent === "object") {
    state.siteContent = { ...defaultSiteContent, ...savedSiteContent };
  } else {
    state.siteContent = { ...defaultSiteContent };
    localStorage.setItem(storageKeys.siteContent, JSON.stringify(state.siteContent));
  }

  const hasRequestedPortfolio = Array.isArray(savedProjects) && savedProjects.length === 3 && savedProjects.every((project) => ["GameBear", "SafeCore", "Shield Woman"].includes(project.title));
  if (hasRequestedPortfolio) {
    state.projects = savedProjects;
  } else {
    localStorage.setItem(storageKeys.projects, JSON.stringify(state.projects));
  }
}

function applySiteContent() {
  document.querySelectorAll("[data-site-field]").forEach((element) => {
    const key = element.dataset.siteField;
    if (state.siteContent[key]) element.textContent = state.siteContent[key];
  });
}

function prepareLogoAnimation() {
  const text = selectors.brandText.textContent;
  selectors.brandText.innerHTML = text.split("").map((letter) => `<span>${letter}</span>`).join("");

  setInterval(() => {
    const letters = selectors.brandText.querySelectorAll("span");
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add("logo-pop");
        setTimeout(() => letter.classList.remove("logo-pop"), 520);
      }, index * 55);
    });
    selectors.brandSymbol.animate(
      [
        { transform: "rotate(0deg) scale(1)" },
        { transform: "rotate(-5deg) scale(1.08)" },
        { transform: "rotate(0deg) scale(1)" }
      ],
      { duration: 680, easing: "cubic-bezier(.16,1,.3,1)" }
    );
  }, 3600);
}

function createFloatingBlocks() {
  const blockCount = Math.min(90, Math.floor(window.innerWidth / 16));
  selectors.grid.innerHTML = "";

  for (let index = 0; index < blockCount; index += 1) {
    const block = document.createElement("span");
    block.className = "float-block";
    block.dataset.baseX = Math.random() * 100;
    block.dataset.baseY = Math.random() * 100;
    block.style.left = `${block.dataset.baseX}%`;
    block.style.top = `${block.dataset.baseY}%`;
    block.style.width = `${6 + Math.random() * 11}px`;
    block.style.height = block.style.width;
    block.style.animationDelay = `${Math.random() * -8}s`;
    block.style.opacity = `${0.26 + Math.random() * 0.42}`;
    selectors.grid.appendChild(block);
  }

  if (!createFloatingBlocks.bound) {
    document.addEventListener("mousemove", scatterBlocks);
    createFloatingBlocks.bound = true;
  }
}

function scatterBlocks(event) {
  const blocks = selectors.grid.children;
  const influence = 130;

  Array.from(blocks).forEach((block) => {
    const rect = block.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

    if (distance < influence) {
      const strength = (influence - distance) / influence;
      const angle = Math.atan2(centerY - event.clientY, centerX - event.clientX);
      const move = 44 * strength;
      const rotate = 35 * strength * (centerX > event.clientX ? 1 : -1);
      block.classList.add("scatter");
      block.style.transform = `translate3d(${Math.cos(angle) * move}px, ${Math.sin(angle) * move}px, 0) rotate(${rotate}deg)`;
    } else {
      block.classList.remove("scatter");
      block.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
    }
  });
}

function initParticles() {
  const canvas = selectors.canvas;
  const context = canvas.getContext("2d");
  const particles = [];

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function seed() {
    particles.length = 0;
    const total = Math.min(70, Math.floor(window.innerWidth / 18));
    for (let index = 0; index < total; index += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 1.7 + 0.6
      });
    }
  }

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = "rgba(16, 0, 114, 0.18)";
      context.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  seed();
  draw();
  window.addEventListener("resize", () => {
    resize();
    seed();
    createFloatingBlocks();
  });
}

function bindNavigation() {
  selectors.navToggle.addEventListener("click", () => {
    const isOpen = selectors.navMenu.classList.toggle("open");
    selectors.navToggle.classList.toggle("open", isOpen);
    selectors.navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  selectors.navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
  });

  window.addEventListener("scroll", () => {
    selectors.toTop.classList.toggle("visible", window.scrollY > 620);
    updateActiveNav();
  });

  selectors.toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function closeMobileMenu() {
  selectors.navMenu.classList.remove("open");
  selectors.navToggle.classList.remove("open");
  selectors.navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function updateActiveNav() {
  const sections = ["home", "quem-somos", "servicos", "processo", "portfolio", "faq", "contato", "login"];
  const current = sections.slice().reverse().find((id) => {
    const section = document.getElementById(id);
    return section && section.getBoundingClientRect().top <= 150;
  }) || "home";

  selectors.navMenu.querySelectorAll("a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

function renderProjects() {
  selectors.projectGrid.innerHTML = state.projects.map((project) => `
    <article class="project-card premium-project-card reveal" role="button" tabindex="0" data-project-id="${project.id}" data-category="${project.category}">
      <div class="project-visual premium-project-visual">
        <img class="project-cover" src="${project.cover}" alt="Capa do projeto ${project.title}">
        <span class="project-shine" aria-hidden="true"></span>
      </div>
      <div class="project-body premium-project-body">
        <img class="project-logo" src="${project.logo}" alt="Logo ${project.title}">
        <span class="project-category">${project.label}</span>
        <h3>${project.title}</h3>
        <p>${project.shortDescription || project.description}</p>
        <button class="project-button" type="button">Ver Projeto</button>
      </div>
    </article>
  `).join("");
  initRevealAnimations();
}

function bindPortfolio() {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      filterProjects(button.dataset.filter);
    });
  });

  selectors.projectGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".project-card");
    if (!card) return;
    const project = state.projects.find((item) => item.id === Number(card.dataset.projectId));
    openProjectModal(project);
  });

  selectors.projectGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".project-card");
    if (!card) return;
    event.preventDefault();
    const project = state.projects.find((item) => item.id === Number(card.dataset.projectId));
    openProjectModal(project);
  });

  selectors.modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-modal]")) closeProjectModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProjectModal();
  });
}

function filterProjects(filter) {
  selectors.projectGrid.querySelectorAll(".project-card").forEach((card) => {
    const shouldShow = filter === "all" || card.dataset.category === filter;
    card.hidden = !shouldShow;
  });
}

function openProjectModal(project) {
  selectors.modalContent.innerHTML = `
    <img class="modal-project-cover" src="${project.cover}" alt="Capa do projeto ${project.title}">
    <div class="modal-project-heading">
      <img class="project-logo" src="${project.logo}" alt="Logo ${project.title}">
      <div>
        <span class="project-category">${project.label}</span>
        <h2>${project.title}</h2>
      </div>
    </div>
    <p>${project.description}</p>
    <p><strong>Identidade:</strong> ${project.theme}</p>
    <p><strong>Entrega:</strong> ${project.stack}</p>
    <ul class="feature-list modal-feature-list">${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
    <div class="progress-track"><span style="width: ${project.progress}%"></span></div>
  `;
  selectors.modal.classList.add("open");
  selectors.modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  selectors.modal.classList.remove("open");
  selectors.modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function bindForms() {
  selectors.contactForm?.addEventListener("submit", handleContactSubmit);
  selectors.loginForm?.addEventListener("submit", handleLoginSubmit);

  document.querySelector("#togglePassword")?.addEventListener("click", () => {
    const input = document.querySelector("#loginPassword");
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    document.querySelector("#togglePassword").textContent = isPassword ? "Ocultar" : "Ver";
  });

  const remembered = localStorage.getItem("buildhub_remembered_email");
  if (remembered && document.querySelector("#loginEmail")) {
    document.querySelector("#loginEmail").value = remembered;
    document.querySelector("#rememberLogin").checked = true;
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    phone: form.elements.phone,
    message: form.elements.message
  };
  const data = {
    id: Date.now(),
    name: fields.name.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    message: fields.message.value.trim(),
    date: new Date().toLocaleDateString("pt-BR")
  };

  const rules = [
    [fields.name, data.name.length >= 3, "Informe pelo menos 3 caracteres."],
    [fields.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email), "Informe um email valido."],
    [fields.phone, data.phone.replace(/\D/g, "").length >= 10, "Informe um telefone valido."],
    [fields.message, data.message.length >= 12, "Descreva melhor o projeto."]
  ];

  if (!validateRules(rules)) return;

  state.contacts.unshift(data);
  localStorage.setItem(storageKeys.contacts, JSON.stringify(state.contacts));
  form.reset();
  showToast("Mensagem enviada com sucesso. O contato apareceu no painel ADM.");
  renderCurrentDashboard();
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const emailInput = document.querySelector("#loginEmail");
  const passwordInput = document.querySelector("#loginPassword");
  const rememberInput = document.querySelector("#rememberLogin");
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  const rules = [
    [emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "Digite um email valido."],
    [passwordInput, password.length >= 6, "A senha precisa ter 6 caracteres."]
  ];

  if (!validateRules(rules)) return;

  const user = state.users.find((item) => item.email === email && item.password === password);
  if (!user) {
    showFieldError(passwordInput, "Credenciais invalidas.");
    showToast("Acesso nao encontrado. Tente os logins de demonstracao.");
    return;
  }

  if (rememberInput.checked) {
    localStorage.setItem("buildhub_remembered_email", email);
  } else {
    localStorage.removeItem("buildhub_remembered_email");
  }

  localStorage.setItem(storageKeys.session, JSON.stringify({ email: user.email, role: user.role, name: user.name }));
  showToast(`Bem-vindo, ${user.name}.`);

  if (pageType === "login") {
    setTimeout(() => {
      window.location.href = user.role === "adm" ? "admin.html" : "cliente.html";
    }, 500);
    return;
  }

  if (selectors.dashboard) showDashboard(user);
}

function validateRules(rules) {
  let valid = true;
  rules.forEach(([field, condition, message]) => {
    const row = field.closest(".form-row");
    row.classList.toggle("error", !condition);
    row.querySelector("small").textContent = condition ? "" : message;
    if (!condition) valid = false;
  });
  return valid;
}

function showFieldError(field, message) {
  const row = field.closest(".form-row");
  row.classList.add("error");
  row.querySelector("small").textContent = message;
}

function bindDashboard() {
  selectors.logoutButton?.addEventListener("click", () => {
    localStorage.removeItem(storageKeys.session);
    if (selectors.dashboard) selectors.dashboard.hidden = true;
    showToast("Sessao encerrada.");
    setTimeout(() => {
      window.location.href = pageType === "home" ? "#login" : "login.html";
    }, 500);
  });
}

function restoreSession() {
  const session = JSON.parse(localStorage.getItem(storageKeys.session) || "null");
  if (!session) {
    protectDashboardPage();
    return;
  }

  const user = state.users.find((item) => item.email === session.email);
  if (!user) {
    localStorage.removeItem(storageKeys.session);
    protectDashboardPage();
    return;
  }

  if (pageType === "login") {
    window.location.href = user.role === "adm" ? "admin.html" : "cliente.html";
    return;
  }

  if (pageType === "admin" && user.role !== "adm") {
    window.location.href = "cliente.html";
    return;
  }

  if (pageType === "cliente" && user.role !== "cliente") {
    window.location.href = "admin.html";
    return;
  }

  if (selectors.dashboard) showDashboard(user, false);
}

function protectDashboardPage() {
  if (pageType === "admin" || pageType === "cliente") {
    window.location.href = "login.html";
  }
}

function showDashboard(user, scroll = true) {
  if (!selectors.dashboard) return;
  selectors.dashboard.hidden = false;
  selectors.dashboard.dataset.role = user.role;
  selectors.dashboardRole.textContent = user.role === "adm" ? "Nivel ADM" : "Nivel CLIENTE";
  selectors.dashboardTitle.textContent = user.role === "adm" ? "Painel administrativo" : "Area do cliente";
  renderDashboardMenu(user.role);
  renderCurrentDashboard("overview");
  if (scroll) selectors.dashboard.scrollIntoView({ behavior: "smooth" });
}

function renderDashboardMenu(role) {
  const adminItems = [
    ["overview", "Visao geral"],
    ["site", "Editar site"],
    ["projects", "Projetos"],
    ["contacts", "Contatos"]
  ];
  const clientItems = [
    ["overview", "Andamento"],
    ["files", "Arquivos"],
    ["messages", "Mensagens"]
  ];
  const items = role === "adm" ? adminItems : clientItems;

  selectors.dashboardMenu.innerHTML = items.map(([id, label], index) => (
    `<button class="${index === 0 ? "active" : ""}" type="button" data-panel="${id}">${label}</button>`
  )).join("");

  selectors.dashboardMenu.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectors.dashboardMenu.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderCurrentDashboard(button.dataset.panel);
    });
  });
}

function renderCurrentDashboard(panel = "overview") {
  if (selectors.dashboard.hidden) return;
  const role = selectors.dashboard.dataset.role;
  if (role === "adm") renderAdminDashboard(panel);
  if (role === "cliente") renderClientDashboard(panel);
}

function renderAdminDashboard(panel) {
  if (panel === "site") {
    selectors.dashboardContent.innerHTML = `
      <form class="dashboard-panel site-editor" id="siteEditorForm">
        <h3>Alterar informacoes do site</h3>
        <p>As alteracoes sao salvas no navegador e aplicadas automaticamente no site principal.</p>

        <div class="form-row">
          <label for="editHeroTitle">Titulo principal da Home</label>
          <textarea id="editHeroTitle" name="heroTitle" rows="3">${escapeHTML(state.siteContent.heroTitle)}</textarea>
          <small></small>
        </div>
        <div class="form-row">
          <label for="editHeroSubtitle">Texto de apoio da Home</label>
          <textarea id="editHeroSubtitle" name="heroSubtitle" rows="3">${escapeHTML(state.siteContent.heroSubtitle)}</textarea>
          <small></small>
        </div>

        <div class="editor-grid">
          <div class="form-row">
            <label for="editServiceWeb">Servico 1</label>
            <input id="editServiceWeb" name="serviceWeb" value="${escapeHTML(state.siteContent.serviceWeb)}">
            <small></small>
          </div>
          <div class="form-row">
            <label for="editServiceSystems">Servico 2</label>
            <input id="editServiceSystems" name="serviceSystems" value="${escapeHTML(state.siteContent.serviceSystems)}">
            <small></small>
          </div>
          <div class="form-row">
            <label for="editServiceLanding">Servico 3</label>
            <input id="editServiceLanding" name="serviceLanding" value="${escapeHTML(state.siteContent.serviceLanding)}">
            <small></small>
          </div>
          <div class="form-row">
            <label for="editServiceUx">Servico 4</label>
            <input id="editServiceUx" name="serviceUx" value="${escapeHTML(state.siteContent.serviceUx)}">
            <small></small>
          </div>
        </div>

        <div class="form-row">
          <label for="editAboutStory">Historia da empresa</label>
          <textarea id="editAboutStory" name="aboutStory" rows="4">${escapeHTML(state.siteContent.aboutStory)}</textarea>
          <small></small>
        </div>

        <div class="editor-grid">
          <div class="form-row">
            <label for="editCompanyEmail">Email da empresa</label>
            <input id="editCompanyEmail" name="companyEmail" value="${escapeHTML(state.siteContent.companyEmail)}">
            <small></small>
          </div>
          <div class="form-row">
            <label for="editCompanyPhone">Telefone</label>
            <input id="editCompanyPhone" name="companyPhone" value="${escapeHTML(state.siteContent.companyPhone)}">
            <small></small>
          </div>
          <div class="form-row">
            <label for="editCompanyLocation">Localizacao</label>
            <input id="editCompanyLocation" name="companyLocation" value="${escapeHTML(state.siteContent.companyLocation)}">
            <small></small>
          </div>
        </div>

        <div class="project-actions">
          <button class="btn btn-primary" type="submit">Salvar alteracoes</button>
          <button class="btn btn-ghost" type="button" id="resetSiteContent">Restaurar padrao</button>
          <a class="btn btn-ghost" href="index.html">Ver site</a>
        </div>
      </form>
    `;
    bindSiteEditor();
    return;
  }

  if (panel === "projects") {
    selectors.dashboardContent.innerHTML = `
      <div class="admin-projects">
        ${state.projects.map((project) => `
          <article class="dashboard-panel">
            <span class="project-category">${project.label}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-actions">
              <button class="mini-btn" data-admin-action="edit" data-id="${project.id}">Editar</button>
              <button class="mini-btn" data-admin-action="add">Adicionar</button>
              <button class="mini-btn danger" data-admin-action="delete" data-id="${project.id}">Excluir</button>
            </div>
          </article>
        `).join("")}
      </div>
    `;
    bindAdminProjectActions();
    return;
  }

  if (panel === "contacts") {
    selectors.dashboardContent.innerHTML = `
      <article class="dashboard-panel">
        <h3>Contatos enviados</h3>
        <ul class="mini-list">
          ${state.contacts.length ? state.contacts.map((contact) => `
            <li>
              <span><strong>${escapeHTML(contact.name)}</strong><br>${escapeHTML(contact.email)} | ${escapeHTML(contact.phone)}<br>${escapeHTML(contact.message)}</span>
              <span>${escapeHTML(contact.date)}</span>
            </li>
          `).join("") : "<li>Nenhum contato recebido ainda.</li>"}
        </ul>
      </article>
    `;
    return;
  }

  selectors.dashboardContent.innerHTML = `
    <div class="stats-grid">
      <article class="stat-card"><span>Projetos ativos</span><strong>${state.projects.length}</strong></article>
      <article class="stat-card"><span>Contatos recebidos</span><strong>${state.contacts.length}</strong></article>
      <article class="stat-card"><span>Taxa media</span><strong>91%</strong></article>
    </div>
    <article class="dashboard-panel">
      <h3>Operacao BuildHub</h3>
      <p>Painel de demonstracao com permissao para editar, adicionar e excluir projetos, alem de visualizar contatos enviados pelo formulario.</p>
    </article>
  `;
}

function bindSiteEditor() {
  const form = document.querySelector("#siteEditorForm");
  const resetButton = document.querySelector("#resetSiteContent");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const nextContent = { ...state.siteContent };
    let valid = true;

    form.querySelectorAll("[name]").forEach((field) => {
      const value = formData.get(field.name).trim();
      const row = field.closest(".form-row");
      const isValid = value.length >= 3;
      row.classList.toggle("error", !isValid);
      row.querySelector("small").textContent = isValid ? "" : "Preencha com pelo menos 3 caracteres.";
      if (!isValid) valid = false;
      nextContent[field.name] = value;
    });

    if (!valid) return;

    state.siteContent = nextContent;
    localStorage.setItem(storageKeys.siteContent, JSON.stringify(state.siteContent));
    applySiteContent();
    showToast("Informacoes do site atualizadas.");
  });

  resetButton.addEventListener("click", () => {
    state.siteContent = { ...defaultSiteContent };
    localStorage.setItem(storageKeys.siteContent, JSON.stringify(state.siteContent));
    applySiteContent();
    renderCurrentDashboard("site");
    showToast("Informacoes padrao restauradas.");
  });
}

function bindAdminProjectActions() {
  selectors.dashboardContent.querySelectorAll("[data-admin-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.adminAction;
      const id = Number(button.dataset.id);

      if (action === "add") {
        const next = {
          id: Date.now(),
          title: `Projeto Orbit ${state.projects.length + 1}`,
          category: "sistemas",
          label: "Sistema web",
          description: "Novo projeto adicionado pelo painel ADM usando dados salvos no navegador.",
          stack: "Planejamento, UI, front-end",
          progress: 20
        };
        state.projects.unshift(next);
        persistProjects("Projeto adicionado.");
      }

      if (action === "edit") {
        state.projects = state.projects.map((project) => (
          project.id === id ? { ...project, title: `${project.title} Pro`, progress: Math.min(100, project.progress + 8) } : project
        ));
        persistProjects("Projeto editado.");
      }

      if (action === "delete") {
        state.projects = state.projects.filter((project) => project.id !== id);
        persistProjects("Projeto excluido.");
      }
    });
  });
}

function persistProjects(message) {
  localStorage.setItem(storageKeys.projects, JSON.stringify(state.projects));
  if (selectors.projectGrid) renderProjects();
  renderCurrentDashboard("projects");
  showToast(message);
}

function renderClientDashboard(panel) {
  if (panel === "files") {
    selectors.dashboardContent.innerHTML = `
      <div class="client-files">
        <article class="dashboard-panel"><h3>Briefing.pdf</h3><p>Documento de alinhamento inicial.</p><button class="mini-btn">Baixar</button></article>
        <article class="dashboard-panel"><h3>Wireframes.zip</h3><p>Arquivos de navegacao e estrutura.</p><button class="mini-btn">Baixar</button></article>
        <article class="dashboard-panel"><h3>Preview.html</h3><p>Previa navegavel do projeto.</p><button class="mini-btn">Baixar</button></article>
      </div>
    `;
    return;
  }

  if (panel === "messages") {
    selectors.dashboardContent.innerHTML = `
      <article class="dashboard-panel">
        <h3>Enviar mensagem</h3>
        <div class="form-row">
          <label for="clientMessage">Mensagem para a equipe</label>
          <textarea id="clientMessage" rows="5" placeholder="Escreva sua solicitacao"></textarea>
          <small></small>
        </div>
        <button class="btn btn-primary" id="clientMessageButton" type="button">Enviar</button>
      </article>
    `;
    document.querySelector("#clientMessageButton").addEventListener("click", () => {
      const message = document.querySelector("#clientMessage").value.trim();
      if (message.length < 8) {
        showToast("Escreva uma mensagem um pouco maior.");
        return;
      }
      document.querySelector("#clientMessage").value = "";
      showToast("Mensagem enviada para a equipe BuildHub.");
    });
    return;
  }

  selectors.dashboardContent.innerHTML = `
    <div class="stats-grid">
      <article class="stat-card"><span>Projeto</span><strong>74%</strong></article>
      <article class="stat-card"><span>Etapa atual</span><strong>UI</strong></article>
      <article class="stat-card"><span>Arquivos</span><strong>3</strong></article>
    </div>
    <article class="dashboard-panel">
      <h3>Andamento do projeto</h3>
      <p>Seu projeto esta em fase de refinamento visual e preparacao para desenvolvimento responsivo.</p>
      <div class="progress-track"><span style="width: 74%"></span></div>
    </article>
  `;
}

function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(".reveal:not(.visible)").forEach((element) => observer.observe(element));
}

function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  document.addEventListener("mousemove", (event) => {
    selectors.cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll("a, button, input, textarea").forEach((element) => {
    element.addEventListener("mouseenter", () => selectors.cursor.classList.add("active"));
    element.addEventListener("mouseleave", () => selectors.cursor.classList.remove("active"));
  });
}

function showToast(message) {
  if (!selectors.toast) return;
  selectors.toast.textContent = message;
  selectors.toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => selectors.toast.classList.remove("show"), 3200);
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}



