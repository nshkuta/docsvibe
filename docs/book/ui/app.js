(function () {
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function id() {
    return "id" + Math.floor(Math.random() * 90000 + 10000);
  }

  const supplyClauses = [
    {
      id: "1.1",
      section: "1. Предмет договора",
      text: "Поставщик передаёт, покупатель принимает комплектующие для стендов «Тихая Лампа» по спецификации № ЛЩ-12. Спецификация — приложение и часть договора.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "1.2",
      text: "Право собственности переходит в момент подписания акта приёмки на площадке покупателя.",
      ours: "Площадка приёмки — цех № 4 товарищества «Синяя Полка», без субаренды.",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "1.7.1",
      section: "1.7. Комплектность",
      text: "Каждая партия сопровождается упаковочным листом с номерами ящиков.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "1.7.2",
      text: "Ящики маркируют номером договора и номером партии.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "1.7.3",
      text: "В каждый ящик вкладывается паспорт изделия на русском языке и схема распиновки.",
      ours: "Паспорт только на русском.",
      theirs: "Паспорт — на русском или английском, по запросу покупателя.",
      ourComment: "Для цеха нужен один язык.",
      theirComment: "Часть партии уходит на стенд в Риге-на-Каме, нужен английский."
    },
    {
      id: "2.1",
      section: "2. Срок и поставка",
      text: "Поставка партиями с 1 апреля 2026 г. по 30 сентября 2026 г.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "2.2",
      text: "Срок отдельной партии — десять рабочих дней с заявки покупателя.",
      ours: "",
      theirs: "Срок партии — пятнадцать рабочих дней с заявки.",
      ourComment: "",
      theirComment: "Десять дней не покрывают перевозку с базы в Усть-Тишине."
    },
    {
      id: "3.1",
      section: "3. Цена и расчёты",
      text: "Цена партии — по спецификации, без смены в течение срока договора, кроме оговорённого в пункте 3.2.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "3.2",
      text: "Оплата — сто процентов предоплаты платёжным поручением в течение пяти банковских дней после счёта.",
      ours: "Оплата: тридцать процентов предоплаты, остаток — в течение десяти календарных дней после акта.",
      theirs: "",
      ourComment: "Полная предоплата для нас не подходит.",
      theirComment: ""
    },
    {
      id: "4.1",
      section: "4. Качество",
      text: "Качество — по ТУ 26.40-001-00000000-2024 товарищества «Лазурный склад». Скрытые недостатки заявляют в тридцать календарных дней после обнаружения.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "5.1",
      section: "5. Ответственность",
      text: "За просрочку поставки — неустойка 0,1% цены просроченной партии за каждый день, не больше десяти процентов этой цены.",
      ours: "",
      theirs: "Неустойка 0,05% за день, не больше пяти процентов цены партии.",
      ourComment: "Десять процентов — потолок нашей практики.",
      theirComment: "Просим снизить потолок."
    },
    {
      id: "6.1",
      section: "6. Конфиденциальность",
      text: "Стороны не раскрывают условия договора третьим лицам, кроме закона и своих бухгалтеров.",
      ours: "",
      theirs: "",
      ourComment: "Срок молчания — три года после окончания договора.",
      theirComment: "Согласны с тремя годами."
    },
    {
      id: "7.1",
      section: "7. Заключительные положения",
      text: "Споры сначала письменно, затем в суде по месту нахождения истца — вымышленный город Северск-на-Волге.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "7.2",
      text: "Договор составлен в двух экземплярах равной силы, по одному для каждой стороны.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    }
  ];

  const ndaClauses = [
    {
      id: "1.1",
      section: "1. Предмет",
      text: "Стороны обмениваются сведениями о конструкции стенда «Тихая Лампа» только для оценки поставки комплектующих.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: "Просим явно исключить публичные прайс-листы."
    },
    {
      id: "2.1",
      section: "2. Срок",
      text: "Обязанность молчания действует три года после окончания переговоров.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    },
    {
      id: "3.1",
      section: "3. Исключения",
      text: "Не считается раскрытием сообщение по закону, суду или своему бухгалтеру.",
      ours: "",
      theirs: "",
      ourComment: "",
      theirComment: ""
    }
  ];

  const otherPartyName = "Товарищество «Лазурный склад»";

  const cleanSupply = supplyClauses.map((item) => ({
    id: item.id,
    section: item.section || "",
    text: item.text,
    ours: "",
    theirs: "",
    ourComment: "",
    theirComment: ""
  }));

  const account = {
    email: "iris@sinyaya-polka.test",
    password: "demo",
    name: "Ириса Кленова",
    confirmed: true
  };

  const orgs = [
    {
      id: "org-ooo",
      opf: "ooo",
      title: "ООО «Синяя Полка»",
      fio: "",
      ogrn: "1027600000001",
      ogrnip: "",
      inn: "7601000000",
      kpp: "760101001",
      passport: "",
      address: "г. Северск-на-Волге, ул. Выдуманная, 12",
      role: "Распорядитель",
      base: "устав от 3 февраля 2019 г."
    },
    {
      id: "org-ip",
      opf: "ip",
      title: "",
      fio: "Кленова Ириса Павловна",
      ogrn: "",
      ogrnip: "304760100000012",
      inn: "760100000012",
      kpp: "",
      passport: "",
      address: "г. Северск-на-Волге, пер. Тихий, 4",
      role: "Индивидуальный предприниматель",
      base: "свидетельство о регистрации"
    }
  ];

  const templates = [
    {
      id: "tpl-supply",
      title: "Договор поставки комплектующих",
      source: "конструктор",
      dirty: false,
      sections: [
        { id: "s1", title: "Предмет договора", clauses: [{ id: "c1", text: supplyClauses[0].text }, { id: "c2", text: supplyClauses[1].text }] },
        { id: "s2", title: "Срок и поставка", clauses: [{ id: "c3", text: supplyClauses[5].text }, { id: "c4", text: supplyClauses[6].text }] }
      ]
    },
    {
      id: "tpl-nda",
      title: "Соглашение о неразглашении",
      source: "после импорта Word",
      dirty: false,
      sections: [
        { id: "s3", title: "Предмет", clauses: [{ id: "c5", text: ndaClauses[0].text }] },
        { id: "s4", title: "Срок", clauses: [{ id: "c6", text: ndaClauses[1].text }] },
        { id: "s5", title: "Исключения", clauses: [{ id: "c7", text: ndaClauses[2].text }] }
      ]
    }
  ];

  const projects = [
    {
      id: "p-sy184",
      title: "Поставка комплектующих · СЯ-184",
      templateId: "tpl-supply",
      templateName: "Договор поставки комплектующих",
      orgId: "org-ooo",
      clauses: clone(supplyClauses),
      seen: true,
      approved: false,
      linkState: "none",
      linkToken: ""
    },
    {
      id: "p-nda",
      title: "Неразглашение · «Тихая Лампа»",
      templateId: "tpl-nda",
      templateName: "Соглашение о неразглашении",
      orgId: "org-ooo",
      clauses: clone(ndaClauses),
      seen: false,
      approved: false,
      linkState: "live",
      linkToken: "q441-veta-17"
    },
    {
      id: "p-lamps",
      title: "Разовый заказ ламп · СЯ-201",
      templateId: "tpl-supply",
      templateName: "Договор поставки комплектующих",
      orgId: "org-ip",
      clauses: clone(cleanSupply),
      seen: true,
      approved: false,
      linkState: "none",
      linkToken: ""
    }
  ];

  let screen = "login";
  let dashEmpty = false;
  let openPanel = { id: "", mode: "" };
  let sheetClauseId = "";
  let menuOpen = false;
  let protoNotesOpen = false;
  let role = "own";
  let currentProjectId = "p-sy184";
  let currentTemplateId = "tpl-supply";
  let currentOrgId = "";
  const screens = [
    "register",
    "mail",
    "login",
    "dash",
    "settings",
    "orgs",
    "org-form",
    "templates",
    "import",
    "builder",
    "ours",
    "link",
    "print"
  ];

  function currentProject() {
    return projects.find((item) => item.id === currentProjectId) || projects[0];
  }

  function currentTemplate() {
    return templates.find((item) => item.id === currentTemplateId);
  }

  function clauses() {
    return currentProject().clauses;
  }

  function clauseStatus(item, who) {
    const viewer = who || role;
    const hasOurs = Boolean(item.ours);
    const hasTheirs = Boolean(item.theirs);
    if (!hasOurs && !hasTheirs) return "agreed";
    if (hasOurs && hasTheirs) return "dispute";
    const waitOnUs = viewer === "own" ? hasTheirs : hasOurs;
    return waitOnUs ? "waitUs" : "waitThem";
  }

  function clauseStatusLabel(status) {
    if (status === "agreed") return "согласован";
    if (status === "waitUs") return "ждёт нас";
    if (status === "waitThem") return "ждёт другую сторону";
    return "спор";
  }

  function clauseStatusClass(status) {
    if (status === "agreed") return "dv-status";
    if (status === "waitUs") return "dv-pill dv-pill-action";
    if (status === "dispute") return "dv-pill dv-pill-err";
    return "dv-status dv-status-muted";
  }

  function shortPartyName(name) {
    const raw = String(name || "");
    const quoted = raw.match(/«([^»]+)»/);
    if (quoted) return quoted[1];
    return raw
      .replace(/^(ООО|ИП|Товарищество)\s+/i, "")
      .replace(/^«|»$/g, "")
      .trim() || raw;
  }

  function revWhoLabel(kind) {
    const names = partyLabels();
    const mine = role === "own" ? kind === "ours" : kind === "theirs";
    if (mine) return "Вы предложили";
    return shortPartyName(names.other) + " предлагает";
  }

  function commentWhoLabel(kind) {
    const names = partyLabels();
    const mine = role === "own" ? kind === "ours" : kind === "theirs";
    if (mine) return "Вы";
    return shortPartyName(names.other);
  }

  function isNarrowReview() {
    return window.matchMedia("(max-width: 1100px)").matches;
  }

  function isPhoneReview() {
    return window.matchMedia("(max-width: 720px)").matches;
  }

  function contractNumber(project) {
    const title = (project || currentProject()).title || "";
    const parts = title.split("·");
    return (parts.length > 1 ? parts[parts.length - 1] : title).trim() || "без номера";
  }

  function formatRuDate(value) {
    const d = value ? new Date(value) : new Date();
    if (Number.isNaN(d.getTime())) return "—";
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ];
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear() + " г.";
  }

  function shortPersonName(fio) {
    const parts = String(fio || "")
      .trim()
      .split(/\s+/);
    if (!parts[0]) return "________________";
    if (parts.length === 1) return parts[0];
    const initials = parts
      .slice(1)
      .map((p) => (p[0] ? p[0].toUpperCase() + "." : ""))
      .join(" ");
    return parts[0] + " " + initials;
  }

  function setOverlay(el, on) {
    if (!el) return;
    el.hidden = !on;
    el.classList.toggle("is-on", on);
  }

  function peerWelcomeKey(project) {
    return "dv-peer-welcome-" + project.id;
  }

  function peerWelcomeSeen(project) {
    try {
      return sessionStorage.getItem(peerWelcomeKey(project)) === "1";
    } catch (err) {
      return false;
    }
  }

  function markPeerWelcomeSeen(project) {
    try {
      sessionStorage.setItem(peerWelcomeKey(project), "1");
    } catch (err) {}
  }

  function clauseDomId(item) {
    return "c-" + item.id.split(".").join("-");
  }

  function tally(project, who) {
    const list = (project || currentProject()).clauses;
    const counts = { total: list.length, agreed: 0, waitUs: 0, waitThem: 0, dispute: 0 };
    list.forEach((item) => {
      counts[clauseStatus(item, who)] += 1;
    });
    return counts;
  }

  function openList(project, who) {
    return (project || currentProject()).clauses.filter((item) => clauseStatus(item, who) !== "agreed");
  }

  function pendingCount(project) {
    return openList(project, "own").length;
  }

  function docStatus(project) {
    if (project.approved) return "approved";
    if (pendingCount(project)) return "reviewing";
    return "ready";
  }

  function docStatusLabel(status) {
    if (status === "approved") return "утверждён";
    if (status === "ready") return "готов к утверждению";
    return "на согласовании";
  }

  function summaryLine(counts) {
    const bits = ["Согласовано " + counts.agreed + " из " + counts.total];
    if (counts.waitUs) bits.push("ждут вас " + counts.waitUs);
    if (counts.waitThem) bits.push("ждут другую сторону " + counts.waitThem);
    if (counts.dispute) bits.push("спор " + counts.dispute);
    return bits.join(", ");
  }

  function otherRevision(item) {
    return role === "own" ? item.theirs : item.ours;
  }

  function partyLabels() {
    const ownName = orgLabel(orgForDoc());
    if (role === "own") return { you: "Вы", other: otherPartyName };
    return { you: "Вы", other: ownName };
  }

  function ruCount(n, one, few, many) {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return n + " " + one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return n + " " + few;
    return n + " " + many;
  }

  function orgLabel(org) {
    if (!org) return "Организация не выбрана";
    if (org.opf === "ooo") return org.title;
    if (org.opf === "ip") return "ИП " + org.fio;
    return org.fio || "Физлицо";
  }

  function orgInProjects(orgId) {
    return projects.filter((item) => item.orgId === orgId);
  }

  function templateHasProjects(templateId) {
    return projects.some((item) => item.templateId === templateId);
  }

  function templateChangedAfterProject(tpl) {
    return Boolean(tpl && tpl.dirty && templateHasProjects(tpl.id));
  }

  function opfName(opf) {
    if (opf === "ooo") return "ООО";
    if (opf === "ip") return "ИП";
    return "физлицо";
  }

  function newToken() {
    return "q" + Math.floor(Math.random() * 900 + 100) + "-veta-" + Math.floor(Math.random() * 90 + 10);
  }

  function linkUrl(project) {
    return "https://docsvibe.example/k/" + project.linkToken;
  }

  function flatten(sections) {
    const out = [];
    sections.forEach((sec, si) => {
      sec.clauses.forEach((clause, ci) => {
        out.push({
          id: si + 1 + "." + (ci + 1),
          section: ci === 0 ? si + 1 + ". " + sec.title : "",
          text: clause.text,
          ours: "",
          theirs: "",
          ourComment: "",
          theirComment: ""
        });
      });
    });
    return out;
  }

  function ownScreens() {
    return ["dash", "settings", "orgs", "org-form", "templates", "import", "builder", "ours"];
  }

  function go(name, who, fromHash) {
    if (screens.indexOf(name) < 0) name = "login";
    screen = name;
    if (who) role = who;
    if (name === "link") role = "peer";
    if (name !== "link" && name !== "print") role = "own";
    sheetClauseId = "";
    menuOpen = false;
    if (name === "print") openPanel = { id: "", mode: "" };
    if (!fromHash) {
      const hash = "#" + name;
      if (location.hash !== hash) history.pushState({ screen: name }, "", hash);
    }
    document.querySelectorAll(".dv-screen").forEach((el) => {
      el.classList.toggle("is-on", el.id === "screen-" + name);
    });
    const own = ownScreens().indexOf(name) >= 0;
    const ownBar = document.getElementById("own-bar");
    const guestBar = document.getElementById("guest-bar");
    if (ownBar) ownBar.hidden = !own;
    if (guestBar) guestBar.hidden = true;
    const map = {
      dash: "nav-dash",
      templates: "nav-templates",
      import: "nav-templates",
      builder: "nav-templates",
      orgs: "nav-orgs",
      "org-form": "nav-orgs",
      settings: "nav-settings",
      ours: "nav-dash"
    };
    ["nav-dash", "nav-templates", "nav-orgs", "nav-settings"].forEach((nid) => {
      const el = document.getElementById(nid);
      if (!el) return;
      if (map[name] === nid) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
    const user = document.getElementById("nav-user");
    if (user) user.textContent = account.name;
    if (name === "dash") renderDash();
    if (name === "templates") renderTemplates();
    if (name === "orgs") renderOrgs();
    if (name === "org-form") fillOrgForm();
    if (name === "builder") renderBuilder();
    if (name === "settings") fillSettings();
    if (name === "ours") {
      renderOursChrome();
      renderLinkBox();
    }
    if (name === "ours" || name === "link" || name === "print") renderDoc();
    const proj = currentProject();
    const dead = document.getElementById("link-dead");
    const live = document.getElementById("link-live");
    if (name === "link" && dead && live) {
      const ok = proj.linkState === "live";
      dead.hidden = ok;
      live.hidden = !ok;
    }
    renderProto();
  }

  function renderProto() {
    const dashBtn = document.getElementById("toggle-dash");
    if (dashBtn) dashBtn.textContent = dashEmpty ? "Показать список" : "Пустой дашборд";
    const bar = document.getElementById("proto-bar");
    const extra = document.getElementById("proto-extra");
    const toggle = document.getElementById("proto-open-toggle");
    if (bar) bar.classList.toggle("is-open", protoNotesOpen);
    if (extra) extra.hidden = !protoNotesOpen;
    if (toggle) {
      toggle.setAttribute("aria-expanded", protoNotesOpen ? "true" : "false");
      toggle.textContent = protoNotesOpen ? "Скрыть вопросы" : "Открытые вопросы";
    }
  }

  function renderDash() {
    const list = document.getElementById("dash-list");
    const empty = document.getElementById("dash-empty");
    const line = document.getElementById("dash-line");
    const open = dashEmpty ? [] : projects;
    const pending = open.reduce((sum, item) => sum + pendingCount(item), 0);
    const fresh = open.filter((item) => !item.seen).length;
    if (line) {
      line.textContent = dashEmpty
        ? "Нет открытых проектов."
        : "Правок на согласовании: " + pending + ". Новых с прошлого визита: " + fresh + ".";
    }
    empty.hidden = open.length > 0;
    list.hidden = open.length === 0;
    list.innerHTML = "";
    open.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#ours";
      const bits = [];
      const status = docStatus(item);
      const counts = tally(item, "own");
      if (status === "approved") bits.push("утверждён");
      else if (status === "ready") bits.push("готов к утверждению");
      else {
        bits.push(ruCount(pendingCount(item), "правка на согласовании", "правки на согласовании", "правок на согласовании"));
        if (counts.waitUs) bits.push("ждут вас " + counts.waitUs);
        if (counts.dispute) bits.push("спор " + counts.dispute);
      }
      if (!item.seen) bits.push("новое");
      a.innerHTML = "<span>" + esc(item.title) + "</span><span class=\"dv-list-meta\">" + esc(bits.join(" · ")) + "</span>";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        openProject(item.id);
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    renderProto();
  }

  function openProject(pid) {
    currentProjectId = pid;
    const project = currentProject();
    project.seen = true;
    go("ours");
  }

  function renderTemplates() {
    const list = document.getElementById("templates-list");
    const empty = document.getElementById("templates-empty");
    empty.hidden = templates.length > 0;
    list.hidden = templates.length === 0;
    list.innerHTML = "";
    templates.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#builder";
      a.innerHTML =
        "<span>" +
        esc(item.title) +
        "</span><span class=\"dv-list-meta\">" +
        esc(item.source + (templateChangedAfterProject(item) ? " · шаблон меняли после проекта" : "")) +
        "</span>";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        currentTemplateId = item.id;
        go("builder");
      });
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function renderOrgs() {
    const list = document.getElementById("orgs-list");
    const empty = document.getElementById("orgs-empty");
    empty.hidden = orgs.length > 0;
    list.hidden = orgs.length === 0;
    list.innerHTML = "";
    orgs.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#org-form";
      a.innerHTML = "<span>" + esc(orgLabel(item)) + "</span><span class=\"dv-list-meta\">" + esc(opfName(item.opf)) + "</span>";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        currentOrgId = item.id;
        go("org-form");
      });
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function fillOrgForm() {
    const org = orgs.find((item) => item.id === currentOrgId);
    const title = document.getElementById("org-form-title");
    const del = document.getElementById("org-delete");
    const form = document.getElementById("org-form");
    const data = org || { opf: "ooo", title: "", fio: "", ogrn: "", ogrnip: "", inn: "", kpp: "", passport: "", address: "", role: "", base: "" };
    if (title) title.textContent = org ? orgLabel(org) : "Новая организация";
    if (del) del.hidden = !org;
    form.opf.value = data.opf;
    form.title.value = data.title || "";
    form.fio.value = data.fio || "";
    form.ogrn.value = data.ogrn || "";
    form.ogrnip.value = data.ogrnip || "";
    form.inn.value = data.inn || "";
    form.kpp.value = data.kpp || "";
    form.passport.value = data.passport || "";
    form.address.value = data.address || "";
    form.role.value = data.role || "";
    form.base.value = data.base || "";
    toggleOpf(data.opf);
  }

  function toggleOpf(opf) {
    document.querySelectorAll("[data-opf]").forEach((el) => {
      const ok = el.getAttribute("data-opf").split(" ").indexOf(opf) >= 0;
      el.hidden = !ok;
    });
  }

  function fillSettings() {
    document.getElementById("set-name").value = account.name;
    document.getElementById("set-pass").value = "";
    document.getElementById("set-pass-now").value = "";
    document.getElementById("set-ok").hidden = true;
    clearFieldErr("set-now-wrap", "set-now-hint", "Нужен, только если меняете пароль.");
    clearFieldErr(
      "set-pass-wrap",
      "set-pass-hint",
      "Оставьте пустым, если пароль не меняете. Не короче четырёх знаков."
    );
  }

  function showFieldErr(wrapId, hintId, message) {
    const wrap = document.getElementById(wrapId);
    const hint = document.getElementById(hintId);
    if (wrap) wrap.className = "dv-field dv-field-err";
    if (hint) hint.textContent = message;
  }

  function clearFieldErr(wrapId, hintId, rest) {
    const wrap = document.getElementById(wrapId);
    const hint = document.getElementById(hintId);
    if (wrap) wrap.className = "dv-field";
    if (hint) hint.textContent = rest;
  }

  function renderBuilder(focusSel) {
    const tpl = currentTemplate();
    if (!tpl) return;
    document.getElementById("builder-name").value = tpl.title;
    document.getElementById("builder-title").textContent = "Конструктор · " + tpl.title;
    const root = document.getElementById("builder-root");
    root.innerHTML = "";
    tpl.sections.forEach((sec, si) => {
      const box = document.createElement("section");
      box.className = "dv-builder-sec";
      box.innerHTML =
        "<div class=\"dv-builder-head\">" +
        "<label>Раздел " + (si + 1) + "<input class=\"dv-input\" data-sec-title=\"" + sec.id + "\" value=\"" + esc(sec.title) + "\"></label>" +
        "<div class=\"dv-row\">" +
        "<button type=\"button\" class=\"dv-btn\" data-sec-up=\"" + sec.id + "\">Вверх</button>" +
        "<button type=\"button\" class=\"dv-btn\" data-sec-down=\"" + sec.id + "\">Вниз</button>" +
        "<button type=\"button\" class=\"dv-btn dv-btn-danger\" data-sec-del=\"" + sec.id + "\">Удалить раздел</button>" +
        "</div></div>";
      sec.clauses.forEach((clause, ci) => {
        const row = document.createElement("div");
        row.className = "dv-builder-row";
        row.innerHTML =
          "<span class=\"dv-num\">" + (si + 1) + "." + (ci + 1) + "</span>" +
          "<textarea class=\"dv-area\" data-clause=\"" + clause.id + "\">" + esc(clause.text) + "</textarea>" +
          "<div class=\"dv-row\">" +
          "<button type=\"button\" class=\"dv-btn\" data-cl-up=\"" + clause.id + "\">Вверх</button>" +
          "<button type=\"button\" class=\"dv-btn\" data-cl-down=\"" + clause.id + "\">Вниз</button>" +
          "<button type=\"button\" class=\"dv-btn dv-btn-danger\" data-cl-del=\"" + clause.id + "\">Удалить</button>" +
          "</div>";
        box.appendChild(row);
      });
      const add = document.createElement("button");
      add.type = "button";
      add.className = "dv-btn";
      add.setAttribute("data-cl-add", sec.id);
      add.textContent = "Добавить пункт";
      box.appendChild(add);
      root.appendChild(box);
    });
    if (focusSel) {
      const el = root.querySelector(focusSel);
      if (el) el.focus();
    }
  }

  function markDirty() {
    const tpl = currentTemplate();
    if (tpl) tpl.dirty = true;
  }

  function move(arr, index, dir) {
    if (index < 0) return false;
    const next = index + dir;
    if (next < 0 || next >= arr.length) return false;
    const hold = arr[index];
    arr[index] = arr[next];
    arr[next] = hold;
    return true;
  }

  function moveClause(tpl, clauseId, dir) {
    for (let i = 0; i < tpl.sections.length; i++) {
      const section = tpl.sections[i];
      const ix = section.clauses.findIndex((c) => c.id === clauseId);
      if (ix >= 0) return move(section.clauses, ix, dir);
    }
    return false;
  }

  function renderOursChrome() {
    const project = currentProject();
    const tpl = templates.find((item) => item.id === project.templateId);
    document.getElementById("ours-title").textContent = project.title;
    document.getElementById("ours-meta").textContent =
      "Создан из шаблона «" + project.templateName + "» · 12 марта";
    const snap = document.getElementById("snap-note");
    const row = document.getElementById("snap-row");
    const snapOn = templateChangedAfterProject(tpl);
    if (snap) snap.hidden = !snapOn;
    if (row) row.hidden = !snapOn;
    const pick = document.getElementById("org-pick");
    const pickWrap = document.getElementById("org-pick-wrap");
    const linkWrap = document.getElementById("link-box-wrap");
    if (pickWrap) pickWrap.hidden = Boolean(project.approved);
    if (linkWrap) linkWrap.hidden = Boolean(project.approved);
    if (pick) {
      pick.innerHTML = orgs
        .map((item) => {
          const sel = item.id === project.orgId ? " selected" : "";
          return "<option value=\"" + item.id + "\"" + sel + ">" + esc(orgLabel(item)) + "</option>";
        })
        .join("");
    }
  }

  function revBlock(kind, text, isNew) {
    if (!text) return "";
    return (
      "<div class=\"dv-rev dv-rev-" +
      kind +
      (isNew ? " dv-rev-new" : "") +
      "\"><p class=\"dv-rev-who\">" +
      esc(revWhoLabel(kind)) +
      (isNew ? " <span class=\"dv-rev-badge\">новое</span>" : "") +
      "</p><p class=\"dv-rev-body\">" +
      esc(text) +
      "</p></div>"
    );
  }

  function clauseActionsHtml(item, tools) {
    if (!tools) return "";
    const open = openPanel.id === item.id;
    const cPressed = open && openPanel.mode === "comment" ? "true" : "false";
    const ePressed = open && openPanel.mode === "edit" ? "true" : "false";
    const canAgree = Boolean(otherRevision(item));
    return (
      "<div class=\"dv-clause-actions\">" +
      "<button type=\"button\" class=\"dv-btn\" data-panel=\"comment\" data-id=\"" +
      esc(item.id) +
      "\" aria-pressed=\"" +
      cPressed +
      "\">Ответить</button>" +
      "<button type=\"button\" class=\"dv-btn\" data-panel=\"edit\" data-id=\"" +
      esc(item.id) +
      "\" aria-pressed=\"" +
      ePressed +
      "\">Предложить свою формулировку</button>" +
      (canAgree
        ? "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-approve=\"" +
          esc(item.id) +
          "\">Согласен</button>"
        : "") +
      "</div>"
    );
  }

  function clauseEditFormHtml(item) {
    const val = role === "own" ? item.ours || item.text : item.theirs || item.text;
    return (
      "<div class=\"dv-rev-form\">" +
      "<div class=\"dv-field\"><label>Своя формулировка</label>" +
      "<textarea class=\"dv-area\" data-draft=\"" +
      esc(item.id) +
      "\">" +
      esc(val) +
      "</textarea></div>" +
      "<div class=\"dv-row\">" +
      "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-save=\"" +
      esc(item.id) +
      "\">Отправить</button>" +
      "<button type=\"button\" class=\"dv-btn\" data-close=\"" +
      esc(item.id) +
      "\">Отмена</button>" +
      "</div></div>"
    );
  }

  function clauseCommentFormHtml(item) {
    const val = role === "own" ? item.ourComment : item.theirComment;
    return (
      "<div class=\"dv-discuss\">" +
      (item.ourComment
        ? "<div class=\"dv-comment\"><p class=\"dv-comment-who\">" +
          esc(commentWhoLabel("ours")) +
          "</p><p class=\"dv-comment-body\">" +
          esc(item.ourComment) +
          "</p></div>"
        : "") +
      (item.theirComment
        ? "<div class=\"dv-comment\"><p class=\"dv-comment-who\">" +
          esc(commentWhoLabel("theirs")) +
          "</p><p class=\"dv-comment-body\">" +
          esc(item.theirComment) +
          "</p></div>"
        : "") +
      "<p class=\"dv-caption\">Ответ. Его видит другая сторона.</p>" +
      "<textarea class=\"dv-area\" data-draft=\"" +
      esc(item.id) +
      "\">" +
      esc(val) +
      "</textarea>" +
      "<div class=\"dv-row\">" +
      "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-save=\"" +
      esc(item.id) +
      "\">Сохранить</button>" +
      "<button type=\"button\" class=\"dv-btn\" data-close=\"" +
      esc(item.id) +
      "\">Свернуть</button>" +
      "</div></div>"
    );
  }

  function clauseRow(item, tools) {
    const status = clauseStatus(item);
    const statusHtml = tools
      ? "<span class=\"" +
        clauseStatusClass(status) +
        "\">" +
        esc(clauseStatusLabel(status)) +
        "</span>"
      : "";
    const open = openPanel.id === item.id;
    const phone = isPhoneReview();
    const sheetOpen = phone && sheetClauseId === item.id;
    const newTheirs = tools && role === "own" && item.theirs && !item.seenTheirs;
    const newOurs = tools && role === "peer" && item.ours && !item.seenOurs;
    let revHtml = "";
    if (tools) {
      revHtml += revBlock("ours", item.ours, newOurs);
      revHtml += revBlock("theirs", item.theirs, newTheirs);
    }
    let formHtml = "";
    if (tools && open && openPanel.mode === "edit" && !phone) {
      formHtml = clauseEditFormHtml(item);
    }
    let fallDiscuss = "";
    if (tools && open && openPanel.mode === "comment" && isNarrowReview() && !phone) {
      fallDiscuss =
        "<div class=\"dv-discuss-fall dv-side-block\">" +
        "<h3>Обсуждение · " +
        esc(item.id) +
        "</h3>" +
        clauseCommentFormHtml(item) +
        "</div>";
    }
    const actions = phone ? "" : clauseActionsHtml(item, tools);
    const classes =
      "dv-clause" +
      (status === "waitUs" ? " needs-you" : "") +
      (open ? " is-open is-active" : "") +
      (sheetOpen ? " is-sheet-open" : "");
    const sec = item.section ? "<h3 class=\"dv-sec\">" + esc(item.section) + "</h3>" : "";
    return (
      sec +
      "<article class=\"" +
      classes +
      "\" id=\"" +
      clauseDomId(item) +
      "\" data-clause-id=\"" +
      esc(item.id) +
      "\">" +
      "<div class=\"dv-clause-main\">" +
      "<div class=\"dv-clause-head\">" +
      "<span class=\"dv-num\">" +
      esc(item.id) +
      "</span>" +
      "<div class=\"dv-clause-text\"><p>" +
      esc(item.text) +
      "</p>" +
      statusHtml +
      "</div></div>" +
      revHtml +
      formHtml +
      actions +
      fallDiscuss +
      "</div></article>"
    );
  }

  function printClauseRow(item) {
    const sec = item.section ? "<h3 class=\"dv-sec\">" + esc(item.section) + "</h3>" : "";
    return (
      sec +
      "<article class=\"dv-clause\">" +
      "<div class=\"dv-clause-main\">" +
      "<div class=\"dv-clause-head\">" +
      "<span class=\"dv-num\">" +
      esc(item.id) +
      "</span>" +
      "<div class=\"dv-clause-text\"><p>" +
      esc(item.text) +
      "</p></div></div></div></article>"
    );
  }

  function renderToc(targetId) {
    const root = document.getElementById(targetId);
    if (!root) return;
    const list = clauses();
    let html = "<p class=\"dv-toc-title\">Разделы</p><ul class=\"dv-toc-list\">";
    list.forEach((item) => {
      if (item.section) {
        html +=
          "<li><a class=\"dv-toc-sec\" href=\"#\" data-jump=\"" +
          esc(item.id) +
          "\">" +
          esc(item.section) +
          "</a></li>";
      }
      const status = clauseStatus(item);
      let mark = "";
      if (status === "waitUs" || status === "dispute") {
        mark =
          " <span class=\"" +
          clauseStatusClass(status) +
          "\">" +
          esc(clauseStatusLabel(status)) +
          "</span>";
      }
      html +=
        "<li><a href=\"#\" data-jump=\"" +
        esc(item.id) +
        "\">" +
        esc(item.id) +
        mark +
        "</a></li>";
    });
    html += "</ul>";
    root.innerHTML = html;
  }

  function renderDiscussPanel(bodyId, titleId) {
    const body = document.getElementById(bodyId);
    const title = document.getElementById(titleId);
    if (!body) return;
    const project = currentProject();
    if (project.approved) {
      if (title) title.textContent = "Обсуждение";
      body.innerHTML = "<p class=\"dv-discuss-empty\">Договор утверждён. Обсуждение закрыто.</p>";
      return;
    }
    const item = clauses().find((c) => c.id === openPanel.id);
    if (!item) {
      if (title) title.textContent = "Обсуждение";
      body.innerHTML = "<p class=\"dv-discuss-empty\">Выберите пункт и нажмите «Ответить».</p>";
      return;
    }
    if (title) title.textContent = "Обсуждение · " + item.id;
    let html = "";
    if (item.ourComment) {
      html +=
        "<div class=\"dv-comment\"><p class=\"dv-comment-who\">" +
        esc(commentWhoLabel("ours")) +
        "</p><p class=\"dv-comment-body\">" +
        esc(item.ourComment) +
        "</p></div>";
    }
    if (item.theirComment) {
      html +=
        "<div class=\"dv-comment\"><p class=\"dv-comment-who\">" +
        esc(commentWhoLabel("theirs")) +
        "</p><p class=\"dv-comment-body\">" +
        esc(item.theirComment) +
        "</p></div>";
    }
    if (!item.ourComment && !item.theirComment && openPanel.mode !== "comment") {
      html += "<p class=\"dv-discuss-empty\">Пока без ответов.</p>";
    }
    if (openPanel.mode === "comment" && !isNarrowReview()) {
      const val = role === "own" ? item.ourComment : item.theirComment;
      html +=
        "<div class=\"dv-discuss\">" +
        "<p class=\"dv-caption\">Ответ. Его видит другая сторона.</p>" +
        "<textarea class=\"dv-area\" data-draft=\"" +
        esc(item.id) +
        "\">" +
        esc(val) +
        "</textarea>" +
        "<div class=\"dv-row\">" +
        "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-save=\"" +
        esc(item.id) +
        "\">Сохранить</button>" +
        "<button type=\"button\" class=\"dv-btn\" data-close=\"" +
        esc(item.id) +
        "\">Свернуть</button>" +
        "</div></div>";
    } else if (openPanel.mode === "comment" && isPhoneReview()) {
      html += "<p class=\"dv-discuss-empty\">Форма ответа открыта в шторке.</p>";
    } else if (openPanel.mode === "comment" && isNarrowReview()) {
      html += "<p class=\"dv-discuss-empty\">Форма ответа открыта под пунктом.</p>";
    }
    body.innerHTML = html;
  }

  function renderPeerWelcome() {
    const box = document.getElementById("peer-welcome");
    const orgLabelEl = document.getElementById("peer-org-label");
    const project = currentProject();
    const sender = orgLabel(orgForDoc());
    if (orgLabelEl) orgLabelEl.textContent = sender;
    if (!box) return;
    const hide = peerWelcomeSeen(project) || project.approved;
    box.hidden = hide;
    const waitLine = (wait) =>
      wait
        ? "Ждут вашего ответа: " + ruCount(wait, "пункт", "пункта", "пунктов") + "."
        : "Открытых пунктов, которые ждут вас, сейчас нет.";
    if (hide) {
      const compact = document.getElementById("peer-welcome-compact");
      if (compact) compact.hidden = true;
      return;
    }
    const counts = tally(project, "peer");
    const wait = counts.waitUs;
    box.innerHTML =
      "<h2>Договор от " +
      esc(sender) +
      "</h2>" +
      "<p>Просмотрите пункты, ответьте или предложите свою формулировку. Когда формулировка подходит — нажмите «Согласен».</p>" +
      "<p class=\"dv-caption\" style=\"margin:0\">" +
      esc(waitLine(wait)) +
      "</p>";
  }

  function orgForDoc() {
    const project = currentProject();
    if (!project) return null;
    return orgs.find((item) => item.id === project.orgId) || orgs[0] || null;
  }

  function preamble() {
    const own = orgForDoc();
    if (!own) {
      return "Реквизиты своей стороны не выбраны. Заведите организацию в разделе «Реквизиты».";
    }
    const ownName = orgLabel(own);
    const face = own.opf === "ooo" ? (own.role || "руководитель") + " " + account.name : own.fio || account.name;
    return (
      ownName +
      ", далее покупатель, в лице " +
      face +
      ", действующей на основании " +
      (own.base || "устава") +
      ", и товарищество «Лазурный склад», далее поставщик, в лице кладовщика-распорядителя Фёдора Бурелома, действующего по уставу от 18 ноября 2021 г., заключили договор о нижеследующем."
    );
  }

  function docShell(inner, extraClass) {
    const own = orgForDoc();
    const ownName = orgLabel(own);
    const inn = own && own.inn ? "ИНН " + own.inn : "";
    const address = own ? own.address : "";
    const sign = own ? own.role + " · " + (own.fio || account.name) : "";
    return (
      "<div class=\"dv-doc" +
      (extraClass ? " " + extraClass : "") +
      "\">" +
      "<div class=\"dv-doc-head\"><h2>" +
      esc(currentProject().title) +
      "</h2>" +
      "<div class=\"dv-doc-meta\"><span>г. Северск-на-Волге</span><span>12 марта 2026 г.</span></div></div>" +
      "<p class=\"dv-preamble\">" +
      esc(preamble()) +
      "</p>" +
      inner +
      "<div class=\"dv-sign\">" +
      "<div><p><strong>Покупатель</strong></p><p>" +
      esc(ownName) +
      "</p><p>" +
      esc(inn) +
      "</p><p>" +
      esc(address) +
      "</p><p>" +
      esc(sign) +
      "</p></div>" +
      "<div><p><strong>Поставщик</strong></p><p>Товарищество «Лазурный склад»</p><p>рег. № ЛС-2201-К</p><p>пос. Усть-Тишина, тракт Синий, 3</p><p>Кладовщик-распорядитель Фёдор Бурелом</p></div>" +
      "</div></div>"
    );
  }

  function printDocShell(inner) {
    const project = currentProject();
    const own = orgForDoc();
    const ownName = orgLabel(own);
    const ownFio = shortPersonName(own && (own.fio || account.name));
    const num = contractNumber(project);
    const edition = formatRuDate(project.approvedAt || "2026-10-12");
    const footLeft = "№ " + num + " · итоговая редакция от " + edition;
    document.documentElement.style.setProperty("--dv-print-foot-left", JSON.stringify(footLeft));
    return (
      "<div class=\"dv-print-doc\">" +
      "<div class=\"dv-doc-head\"><h2>Договор № " +
      esc(num) +
      "</h2>" +
      "<div class=\"dv-doc-meta\"><span>г. Северск-на-Волге</span><span>12 марта 2026 г.</span></div></div>" +
      "<p class=\"dv-preamble\">" +
      esc(preamble()) +
      "</p>" +
      inner +
      "<div class=\"dv-print-sign\">" +
      "<div class=\"dv-print-sign-party\"><p><strong>Покупатель</strong></p><p>" +
      esc(ownName) +
      "</p><div class=\"dv-print-sign-line\"></div><div class=\"dv-print-sign-meta\"><span>" +
      esc(ownFio) +
      "</span><span>М.П.</span></div></div>" +
      "<div class=\"dv-print-sign-party\"><p><strong>Поставщик</strong></p><p>Товарищество «Лазурный склад»</p>" +
      "<div class=\"dv-print-sign-line\"></div><div class=\"dv-print-sign-meta\"><span>Бурелом Ф.</span><span>М.П.</span></div></div>" +
      "</div>" +
      "<p class=\"dv-print-preview-note\">В печати внизу каждой страницы: " +
      esc(footLeft) +
      " и «стр.» с номером страницы</p>" +
      "</div>"
    );
  }

  function renderReviewBar() {
    const project = currentProject();
    const oursBar = document.getElementById("review-bar-ours");
    const linkBar = document.getElementById("review-bar-link");
    const status = docStatus(project);
    const counts = tally(project);
    const open = openList(project);
    const statusClass =
      status === "approved"
        ? "dv-status"
        : status === "ready"
          ? "dv-pill dv-pill-ok"
          : "dv-status dv-status-muted";
    let html =
      "<span class=\"" +
      statusClass +
      "\">" +
      esc(docStatusLabel(status)) +
      "</span>";
    if (status === "approved") {
      html +=
        "<p class=\"dv-review-line\">Договор нельзя править. Доступна версия для печати.</p>" +
        "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-go-print>Версия для печати</button>";
    } else {
      html += "<p class=\"dv-review-line\">" + esc(summaryLine(counts)) + "</p>";
      if (open.length) {
        html += "<button type=\"button\" class=\"dv-btn\" data-next-open>К следующему открытому</button>";
      }
      if (role === "own") {
        const blocked = open.length > 0;
        html +=
          "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-approve-doc" +
          (blocked ? " disabled" : "") +
          ">Утвердить итог</button>";
        if (blocked) {
          const why =
            "Нельзя утвердить: открыты " +
            ruCount(open.length, "пункт", "пункта", "пунктов") +
            (counts.dispute
              ? ", из них " + ruCount(counts.dispute, "спор", "спора", "споров")
              : "") +
            ".";
          html += "<p class=\"dv-review-why\">" + esc(why) + "</p>";
        }
      }
    }
    if (oursBar) {
      oursBar.innerHTML = html;
      oursBar.hidden = screen !== "ours";
    }
    if (linkBar) {
      linkBar.innerHTML = html;
      linkBar.hidden = screen !== "link" || project.linkState !== "live";
    }
  }

  function visibleDoc() {
    if (screen === "link") return document.getElementById("doc-link");
    if (screen === "print") return document.getElementById("doc-print");
    return document.getElementById("doc-ours");
  }

  function jumpNextOpen() {
    const open = openList();
    const root = visibleDoc();
    if (!open.length || !root) return;
    const y = window.scrollY;
    let next = null;
    for (let i = 0; i < open.length; i++) {
      const el = root.querySelector("#" + clauseDomId(open[i]));
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top > y + 48) {
        next = el;
        break;
      }
    }
    if (!next) next = root.querySelector("#" + clauseDomId(open[0]));
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderDoc() {
    const project = currentProject();
    const ours = document.getElementById("doc-ours");
    const link = document.getElementById("doc-link");
    const print = document.getElementById("doc-print");
    if (screen === "print") {
      const packed = printDocShell(clauses().map(printClauseRow).join(""));
      if (print) print.innerHTML = packed;
      closeOverlays();
      return;
    }
    const tools = !project.approved;
    if (isPhoneReview() && openPanel.id) sheetClauseId = openPanel.id;
    const html = clauses()
      .map((item) => clauseRow(item, tools))
      .join("");
    const extra = project.approved ? "dv-print" : "";
    const packed = docShell(html, extra);
    if (ours && screen === "ours") ours.innerHTML = packed;
    if (link && screen === "link") {
      const welcomeBit = peerWelcomeCompactHtml(project);
      link.innerHTML = welcomeBit + packed;
    }
    renderReviewBar();
    renderPhoneChrome();
    renderActionSheet();
    renderMenuSheet();
    if (screen === "ours") {
      renderToc("toc-ours");
      renderDiscussPanel("discuss-ours-body", "discuss-ours-title");
    }
    if (screen === "link" && project.linkState === "live") {
      renderToc("toc-link");
      renderDiscussPanel("discuss-link-body", "discuss-link-title");
      renderPeerWelcome();
    }
  }

  function peerWelcomeCompactHtml(project) {
    if (role !== "peer" || peerWelcomeSeen(project) || project.approved) return "";
    const sender = orgLabel(orgForDoc());
    const counts = tally(project, "peer");
    const wait = counts.waitUs;
    return (
      "<div class=\"dv-welcome-compact\" id=\"peer-welcome-compact\">" +
      "<p><strong>Договор от " +
      esc(sender) +
      ".</strong> " +
      (wait
        ? "Ждут ответа: " + ruCount(wait, "пункт", "пункта", "пунктов") + "."
        : "Открытых пунктов нет.") +
      " <button type=\"button\" class=\"dv-linkish\" data-dismiss-welcome>Скрыть</button></p>" +
      "</div>"
    );
  }

  function phoneStatusHtml(project) {
    const status = docStatus(project);
    const statusClass =
      status === "approved"
        ? "dv-status"
        : status === "ready"
          ? "dv-pill dv-pill-ok"
          : "dv-status dv-status-muted";
    return (
      "<span class=\"" +
      statusClass +
      "\">" +
      esc(docStatusLabel(status)) +
      "</span>"
    );
  }

  function renderPhoneChrome() {
    const project = currentProject();
    const counts = tally(project);
    const open = openList(project);
    const bars = [
      { bar: "phone-bar-ours", progress: "phone-progress-ours", on: screen === "ours" },
      { bar: "phone-bar-link", progress: "phone-progress-link", on: screen === "link" && project.linkState === "live" }
    ];
    bars.forEach((slot) => {
      const bar = document.getElementById(slot.bar);
      const progress = document.getElementById(slot.progress);
      if (!bar || !progress) return;
      if (!slot.on) {
        bar.innerHTML = "";
        progress.innerHTML = "";
        return;
      }
      bar.innerHTML =
        "<p class=\"dv-phone-bar-title\">" +
        esc(project.title) +
        "</p>" +
        phoneStatusHtml(project) +
        "<button type=\"button\" class=\"dv-btn\" data-open-menu>Меню</button>";
      let right = "";
      if (project.approved) {
        right =
          "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-go-print>Печать</button>";
      } else if (open.length) {
        right = "<button type=\"button\" class=\"dv-btn\" data-next-open>Следующий</button>";
      } else if (role === "own") {
        right =
          "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-approve-doc>Утвердить</button>";
      }
      progress.innerHTML =
        "<p class=\"dv-phone-progress-line\">" +
        counts.agreed +
        " / " +
        counts.total +
        "</p>" +
        right;
    });
  }

  function closeOverlays() {
    sheetClauseId = "";
    menuOpen = false;
    setOverlay(document.getElementById("action-sheet"), false);
    setOverlay(document.getElementById("menu-sheet"), false);
    setOverlay(document.getElementById("sheet-backdrop"), false);
  }

  function renderActionSheet() {
    const sheet = document.getElementById("action-sheet");
    const backdrop = document.getElementById("sheet-backdrop");
    const project = currentProject();
    const show =
      isPhoneReview() &&
      (screen === "ours" || screen === "link") &&
      sheetClauseId &&
      !project.approved &&
      !menuOpen;
    if (!sheet) return;
    if (!show) {
      setOverlay(sheet, false);
      if (!menuOpen) setOverlay(backdrop, false);
      return;
    }
    const item = clauses().find((c) => c.id === sheetClauseId);
    if (!item) {
      setOverlay(sheet, false);
      return;
    }
    const tools = !project.approved;
    let body = clauseActionsHtml(item, tools);
    if (openPanel.id === item.id && openPanel.mode === "edit") body += clauseEditFormHtml(item);
    if (openPanel.id === item.id && openPanel.mode === "comment") body += clauseCommentFormHtml(item);
    sheet.innerHTML =
      "<div class=\"dv-sheet-handle\"></div>" +
      "<h3 class=\"dv-sheet-title\" id=\"action-sheet-title\">Пункт " +
      esc(item.id) +
      "</h3>" +
      body +
      "<div class=\"dv-row\" style=\"margin-top:0.75rem\"><button type=\"button\" class=\"dv-btn\" data-close-sheet>Закрыть</button></div>";
    setOverlay(sheet, true);
    setOverlay(backdrop, true);
  }

  function renderMenuSheet() {
    const sheet = document.getElementById("menu-sheet");
    const backdrop = document.getElementById("sheet-backdrop");
    const project = currentProject();
    const show =
      isPhoneReview() && menuOpen && (screen === "ours" || (screen === "link" && project.linkState === "live"));
    if (!sheet) return;
    if (!show) {
      setOverlay(sheet, false);
      if (!sheetClauseId) setOverlay(backdrop, false);
      return;
    }
    const list = clauses();
    let toc =
      "<p class=\"dv-toc-title\">Разделы</p><ul class=\"dv-toc-list\">";
    list.forEach((item) => {
      if (item.section) {
        toc +=
          "<li><a class=\"dv-toc-sec\" href=\"#\" data-jump=\"" +
          esc(item.id) +
          "\">" +
          esc(item.section) +
          "</a></li>";
      }
      const status = clauseStatus(item);
      let mark = "";
      if (status === "waitUs") mark = " <span class=\"dv-pill dv-pill-action\">ждёт нас</span>";
      else if (status === "dispute") mark = " <span class=\"dv-pill dv-pill-err\">спор</span>";
      else if (status === "waitThem") mark = " <span class=\"dv-status dv-status-muted\">ждёт другую сторону</span>";
      else mark = " <span class=\"dv-status\">согласован</span>";
      toc +=
        "<li><a href=\"#\" data-jump=\"" +
        esc(item.id) +
        "\">" +
        esc(item.id) +
        mark +
        "</a></li>";
    });
    toc += "</ul>";
    let extra = "";
    if (role === "own" && !project.approved) {
      extra +=
        "<div class=\"dv-side-block\" style=\"margin-top:0.75rem\"><h3>Ссылка и реквизиты</h3>" +
        "<p class=\"dv-caption\">Откройте на широком экране или скопируйте ссылку в блоке проекта.</p></div>";
    }
    if (role === "peer") {
      extra +=
        "<div class=\"dv-side-block\" style=\"margin-top:0.75rem\"><h3>Отправитель</h3><p class=\"dv-caption\" style=\"margin:0\">" +
        esc(orgLabel(orgForDoc())) +
        "</p></div>";
    }
    if (project.approved) {
      extra +=
        "<div class=\"dv-row\" style=\"margin-top:0.75rem\"><button type=\"button\" class=\"dv-btn dv-btn-primary\" data-go-print>Версия для печати</button></div>";
    } else if (role === "own") {
      const blocked = openList(project).length > 0;
      extra +=
        "<div class=\"dv-row\" style=\"margin-top:0.75rem\"><button type=\"button\" class=\"dv-btn dv-btn-primary\" data-approve-doc" +
        (blocked ? " disabled" : "") +
        ">Утвердить итог</button></div>";
    }
    sheet.innerHTML =
      "<div class=\"dv-sheet-handle\"></div>" +
      "<h3 class=\"dv-sheet-title\" id=\"menu-sheet-title\">Меню</h3>" +
      toc +
      extra +
      "<div class=\"dv-row\" style=\"margin-top:0.75rem\"><button type=\"button\" class=\"dv-btn\" data-close-menu>Закрыть</button></div>";
    setOverlay(sheet, true);
    setOverlay(backdrop, true);
  }

  function renderLinkBox() {
    const box = document.getElementById("link-box");
    const project = currentProject();
    if (!box) return;
    if (project.linkState === "none") {
      box.innerHTML =
        "<p class=\"dv-caption\">Ссылка ещё не выдана. Контрагент документ не видит.</p>" +
        "<button type=\"button\" class=\"dv-btn dv-btn-primary\" id=\"link-issue\">Выдать ссылку</button>";
    } else if (project.linkState === "live") {
      box.innerHTML =
        "<span class=\"dv-pill dv-pill-ok\">ссылка активна</span>" +
        "<code>" +
        esc(linkUrl(project)) +
        "</code>" +
        "<div class=\"dv-row\"><button type=\"button\" class=\"dv-btn\" id=\"link-copy\">Скопировать</button>" +
        "<button type=\"button\" class=\"dv-btn dv-btn-danger\" id=\"link-revoke\">Отключить</button></div>";
    } else {
      box.innerHTML =
        "<span class=\"dv-pill dv-pill-err\">ссылка отключена</span>" +
        "<p class=\"dv-caption\">Старый адрес больше не открывает договор.</p>" +
        "<button type=\"button\" class=\"dv-btn dv-btn-primary\" id=\"link-issue\">Выдать снова</button>";
    }
  }

  function createProjectFromTemplate() {
    const tpl = currentTemplate();
    if (!tpl) return;
    if (!orgs.length) {
      window.alert("Сначала заведите организацию в реквизитах.");
      go("orgs");
      return;
    }
    const project = {
      id: id(),
      title: tpl.title + " · проект",
      templateId: tpl.id,
      templateName: tpl.title,
      orgId: orgs[0].id,
      clauses: flatten(tpl.sections),
      seen: true,
      approved: false,
      linkState: "none",
      linkToken: ""
    };
    projects.unshift(project);
    currentProjectId = project.id;
    go("ours");
  }

  function importFile(kind) {
    const names = { docx: "Word", pdf: "PDF", txt: "текст" };
    const tpl = {
      id: id(),
      title: "Импорт из файла (" + names[kind] + ")",
      source: "после импорта " + names[kind],
      dirty: false,
      sections: [
        {
          id: id(),
          title: "Предмет",
          clauses: [{ id: id(), text: "Покупатель заказывает, поставщик передаёт комплект ламп для стенда «Тихая Лампа» по счёту № 88-Т." }]
        },
        {
          id: id(),
          title: "Срок",
          clauses: [{ id: id(), text: "Передача на складе покупателя в течение семи рабочих дней после оплаты." }]
        }
      ]
    };
    templates.unshift(tpl);
    currentTemplateId = tpl.id;
    go("builder");
  }

  function bind() {
    document.getElementById("register-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const pass = document.getElementById("reg-pass").value;
      if (pass.length < 4) {
        showFieldErr("reg-pass-wrap", "reg-pass-hint", "Пароль не короче четырёх знаков.");
        return;
      }
      clearFieldErr("reg-pass-wrap", "reg-pass-hint", "Не короче четырёх знаков. Можно показать пароль рядом.");
      account.email = document.getElementById("reg-mail").value;
      account.password = pass;
      account.confirmed = false;
      document.getElementById("mail-copy").textContent =
        "На " + account.email + " ушло письмо. Пока почту не подтвердите, в работу не пускаем.";
      go("mail");
    });
    document.getElementById("reg-show").addEventListener("change", (e) => {
      document.getElementById("reg-pass").type = e.target.checked ? "text" : "password";
    });
    document.getElementById("login-show").addEventListener("change", (e) => {
      document.getElementById("pass").type = e.target.checked ? "text" : "password";
    });
    document.getElementById("set-show").addEventListener("change", (e) => {
      const type = e.target.checked ? "text" : "password";
      document.getElementById("set-pass").type = type;
      document.getElementById("set-pass-now").type = type;
    });
    document.getElementById("mail-resend").addEventListener("click", () => {
      document.getElementById("mail-resend-note").hidden = false;
    });
    document.getElementById("mail-confirm").addEventListener("click", () => {
      account.confirmed = true;
      go("login");
    });
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const err = document.getElementById("login-err");
      const wrap = document.getElementById("login-err-wrap");
      const mail = document.getElementById("mail").value;
      const pass = document.getElementById("pass").value;
      wrap.className = "dv-field dv-field-err";
      if (mail !== account.email || pass !== account.password) {
        wrap.hidden = false;
        err.textContent = "Неверная почта или пароль.";
        return;
      }
      if (!account.confirmed) {
        wrap.hidden = false;
        err.textContent = "Почта ещё не подтверждена.";
        return;
      }
      wrap.hidden = true;
      go("dash");
    });
    document.getElementById("settings-form").addEventListener("submit", (e) => {
      e.preventDefault();
      clearFieldErr("set-now-wrap", "set-now-hint", "Нужен, только если меняете пароль.");
      clearFieldErr(
        "set-pass-wrap",
        "set-pass-hint",
        "Оставьте пустым, если пароль не меняете. Не короче четырёх знаков."
      );
      account.name = document.getElementById("set-name").value.trim() || account.name;
      const next = document.getElementById("set-pass").value;
      const now = document.getElementById("set-pass-now").value;
      if (next) {
        if (now !== account.password) {
          showFieldErr("set-now-wrap", "set-now-hint", "Укажите текущий пароль.");
          document.getElementById("set-ok").hidden = true;
          return;
        }
        if (next.length < 4) {
          showFieldErr("set-pass-wrap", "set-pass-hint", "Пароль не короче четырёх знаков.");
          document.getElementById("set-ok").hidden = true;
          return;
        }
        account.password = next;
      }
      document.getElementById("nav-user").textContent = account.name;
      document.getElementById("set-ok").hidden = false;
    });
    document.getElementById("org-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const opf = form.opf.value;
      const data = {
        opf: opf,
        title: form.title.value,
        fio: form.fio.value,
        ogrn: form.ogrn.value,
        ogrnip: form.ogrnip.value,
        inn: form.inn.value,
        kpp: form.kpp.value,
        passport: form.passport.value,
        address: form.address.value,
        role: form.role.value,
        base: form.base.value
      };
      const existing = orgs.find((item) => item.id === currentOrgId);
      if (existing) Object.assign(existing, data);
      else {
        data.id = id();
        orgs.push(data);
        currentOrgId = data.id;
      }
      go("orgs");
    });
    document.getElementById("org-form").addEventListener("change", (e) => {
      if (e.target.name === "opf") toggleOpf(e.target.value);
    });
    document.getElementById("org-delete").addEventListener("click", () => {
      const used = orgInProjects(currentOrgId);
      if (used.length) {
        window.alert(
          "Эту организацию нельзя удалить. Она выбрана в проектах: " + used.map((item) => item.title).join(", ") + "."
        );
        return;
      }
      if (!window.confirm("Удалить организацию?")) return;
      const index = orgs.findIndex((item) => item.id === currentOrgId);
      if (index >= 0) orgs.splice(index, 1);
      go("orgs");
    });
    document.getElementById("org-new").addEventListener("click", () => {
      currentOrgId = "";
      go("org-form");
    });
    document.getElementById("toggle-dash").addEventListener("click", () => {
      dashEmpty = !dashEmpty;
      if (screen === "dash") renderDash();
      else renderProto();
    });
    document.getElementById("link-open").addEventListener("click", () => {
      const project = currentProject();
      if (project.linkState !== "live") {
        project.linkToken = project.linkToken || newToken();
        project.linkState = "live";
      }
      go("link");
    });
    document.getElementById("proto-back-own").addEventListener("click", () => {
      go("ours");
    });
    document.getElementById("proto-open-toggle").addEventListener("click", () => {
      protoNotesOpen = !protoNotesOpen;
      renderProto();
    });
    document.getElementById("print-run").addEventListener("click", () => {
      window.print();
    });
    window.addEventListener("resize", () => {
      if (screen === "ours" || screen === "link" || screen === "print") renderDoc();
    });
    document.getElementById("tpl-new").addEventListener("click", () => {
      const tpl = {
        id: id(),
        title: "Новый шаблон",
        source: "конструктор",
        dirty: false,
        sections: [{ id: id(), title: "Предмет", clauses: [{ id: id(), text: "Стороны договариваются о поставке." }] }]
      };
      templates.unshift(tpl);
      currentTemplateId = tpl.id;
      go("builder");
    });
    document.getElementById("tpl-to-project").addEventListener("click", createProjectFromTemplate);
    document.getElementById("tpl-new-from-project").addEventListener("click", (e) => {
      e.preventDefault();
      const project = currentProject();
      if (project && project.templateId) currentTemplateId = project.templateId;
      createProjectFromTemplate();
    });
    document.getElementById("builder-name").addEventListener("input", (e) => {
      const tpl = currentTemplate();
      if (!tpl) return;
      tpl.title = e.target.value;
      markDirty();
    });
    document.getElementById("builder-add-sec").addEventListener("click", () => {
      const tpl = currentTemplate();
      tpl.sections.push({ id: id(), title: "Новый раздел", clauses: [{ id: id(), text: "Текст пункта." }] });
      markDirty();
      renderBuilder();
    });
    document.getElementById("org-pick").addEventListener("change", (e) => {
      currentProject().orgId = e.target.value;
      renderDoc();
    });
    document.querySelectorAll("[data-go]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        go(el.getAttribute("data-go"));
      });
    });
    window.addEventListener("hashchange", applyHash);
    window.addEventListener("popstate", applyHash);
    document.getElementById("app-root").addEventListener("click", (e) => {
      const imp = e.target.closest("[data-import]");
      if (imp) {
        importFile(imp.getAttribute("data-import"));
        return;
      }
      const issue = e.target.closest("#link-issue");
      if (issue) {
        const project = currentProject();
        project.linkToken = newToken();
        project.linkState = "live";
        renderLinkBox();
        return;
      }
      const copy = e.target.closest("#link-copy");
      if (copy) {
        const url = linkUrl(currentProject());
        const done = function () {
          copy.textContent = "Скопировано";
          setTimeout(function () {
            if (copy.isConnected) copy.textContent = "Скопировать";
          }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done).catch(done);
        } else done();
        return;
      }
      const revoke = e.target.closest("#link-revoke");
      if (revoke) {
        currentProject().linkState = "revoked";
        renderLinkBox();
        return;
      }
      const printBtn = e.target.closest("[data-go-print]");
      if (printBtn) {
        menuOpen = false;
        go("print");
        return;
      }
      const back = e.target.closest("#print-back");
      if (back) {
        go(role === "peer" ? "link" : "ours");
        return;
      }
      const openMenu = e.target.closest("[data-open-menu]");
      if (openMenu) {
        menuOpen = true;
        sheetClauseId = "";
        openPanel = { id: "", mode: "" };
        renderDoc();
        return;
      }
      const closeMenu = e.target.closest("[data-close-menu]");
      if (closeMenu) {
        menuOpen = false;
        renderDoc();
        return;
      }
      const closeSheet = e.target.closest("[data-close-sheet]");
      if (closeSheet) {
        sheetClauseId = "";
        openPanel = { id: "", mode: "" };
        renderDoc();
        return;
      }
      const dismissWelcome = e.target.closest("[data-dismiss-welcome]");
      if (dismissWelcome) {
        markPeerWelcomeSeen(currentProject());
        renderDoc();
        return;
      }
      if (e.target.id === "sheet-backdrop" || e.target.closest("#sheet-backdrop")) {
        closeOverlays();
        openPanel = { id: "", mode: "" };
        renderDoc();
        return;
      }
      const jump = e.target.closest("[data-jump]");
      if (jump) {
        e.preventDefault();
        const item = clauses().find((c) => c.id === jump.getAttribute("data-jump"));
        const root = visibleDoc();
        const el = item && root && root.querySelector("#" + clauseDomId(item));
        menuOpen = false;
        if (isPhoneReview() && item && !currentProject().approved) {
          sheetClauseId = item.id;
        }
        renderDoc();
        if (el) {
          requestAnimationFrame(() => {
            const again = visibleDoc() && visibleDoc().querySelector("#" + clauseDomId(item));
            if (again) again.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
        return;
      }
      const nextOpen = e.target.closest("[data-next-open]");
      if (nextOpen) {
        jumpNextOpen();
        return;
      }
      const approveDoc = e.target.closest("[data-approve-doc]");
      if (approveDoc) {
        const project = currentProject();
        if (role !== "own" || project.approved || pendingCount(project)) return;
        project.approved = true;
        project.approvedAt = "2026-10-12";
        openPanel = { id: "", mode: "" };
        sheetClauseId = "";
        menuOpen = false;
        renderOursChrome();
        renderDoc();
        return;
      }
      const panel = e.target.closest("[data-panel]");
      if (panel) {
        if (currentProject().approved) return;
        const cid = panel.getAttribute("data-id");
        const mode = panel.getAttribute("data-panel");
        if (openPanel.id === cid && openPanel.mode === mode) openPanel = { id: "", mode: "" };
        else openPanel = { id: cid, mode: mode };
        if (isPhoneReview()) {
          sheetClauseId = cid;
          menuOpen = false;
        }
        if (role === "peer") markPeerWelcomeSeen(currentProject());
        renderDoc();
        return;
      }
      const close = e.target.closest("[data-close]");
      if (close) {
        openPanel = { id: "", mode: "" };
        renderDoc();
        return;
      }
      const save = e.target.closest("[data-save]");
      if (save) {
        if (currentProject().approved) return;
        const cid = save.getAttribute("data-save");
        const item = clauses().find((c) => c.id === cid);
        const area =
          (save.closest(".dv-sheet") || document).querySelector("[data-draft=\"" + cid + "\"]") ||
          document.querySelector("[data-draft=\"" + cid + "\"]");
        if (!item || !area) return;
        const text = area.value.trim();
        if (openPanel.mode === "edit") {
          if (role === "own") item.ours = text;
          else item.theirs = text;
        } else {
          if (role === "own") item.ourComment = text;
          else item.theirComment = text;
        }
        if (role === "peer") markPeerWelcomeSeen(currentProject());
        openPanel = { id: "", mode: "" };
        renderDoc();
        return;
      }
      const approve = e.target.closest("[data-approve]");
      if (approve) {
        if (currentProject().approved) return;
        const item = clauses().find((c) => c.id === approve.getAttribute("data-approve"));
        const taken = item && otherRevision(item);
        if (!item || !taken) return;
        item.text = taken;
        item.ours = "";
        item.theirs = "";
        if (role === "peer") markPeerWelcomeSeen(currentProject());
        openPanel = { id: "", mode: "" };
        sheetClauseId = "";
        renderDoc();
        return;
      }
      const clauseTap = e.target.closest("[data-clause-id]");
      if (
        clauseTap &&
        isPhoneReview() &&
        (screen === "ours" || screen === "link") &&
        !currentProject().approved &&
        !e.target.closest("button, a, textarea, input, label, .dv-sheet")
      ) {
        sheetClauseId = clauseTap.getAttribute("data-clause-id");
        menuOpen = false;
        if (role === "peer") markPeerWelcomeSeen(currentProject());
        renderDoc();
        return;
      }
      const tpl = currentTemplate();
      if (!tpl) return;
      const secUp = e.target.closest("[data-sec-up]");
      const secDown = e.target.closest("[data-sec-down]");
      const secDel = e.target.closest("[data-sec-del]");
      const clUp = e.target.closest("[data-cl-up]");
      const clDown = e.target.closest("[data-cl-down]");
      const clDel = e.target.closest("[data-cl-del]");
      const clAdd = e.target.closest("[data-cl-add]");
      if (!(secUp || secDown || secDel || clUp || clDown || clDel || clAdd)) return;
      if (secDel && !window.confirm("Удалить раздел и его пункты?")) return;
      if (clDel && !window.confirm("Удалить пункт?")) return;
      let changed = false;
      let focusSel = "";
      if (secUp) {
        const sid = secUp.getAttribute("data-sec-up");
        changed = move(tpl.sections, tpl.sections.findIndex((s) => s.id === sid), -1);
        focusSel = "[data-sec-up=\"" + sid + "\"]";
      }
      if (secDown) {
        const sid = secDown.getAttribute("data-sec-down");
        changed = move(tpl.sections, tpl.sections.findIndex((s) => s.id === sid), 1);
        focusSel = "[data-sec-down=\"" + sid + "\"]";
      }
      if (secDel) {
        const ix = tpl.sections.findIndex((s) => s.id === secDel.getAttribute("data-sec-del"));
        if (ix >= 0) {
          tpl.sections.splice(ix, 1);
          changed = true;
        }
      }
      if (clUp) {
        const cid = clUp.getAttribute("data-cl-up");
        changed = moveClause(tpl, cid, -1);
        focusSel = "[data-cl-up=\"" + cid + "\"]";
      }
      if (clDown) {
        const cid = clDown.getAttribute("data-cl-down");
        changed = moveClause(tpl, cid, 1);
        focusSel = "[data-cl-down=\"" + cid + "\"]";
      }
      if (clDel) {
        tpl.sections.forEach((sec) => {
          const ix = sec.clauses.findIndex((c) => c.id === clDel.getAttribute("data-cl-del"));
          if (ix >= 0) {
            sec.clauses.splice(ix, 1);
            changed = true;
          }
        });
      }
      if (clAdd) {
        tpl.sections.forEach((sec) => {
          if (sec.id === clAdd.getAttribute("data-cl-add")) {
            sec.clauses.push({ id: id(), text: "Новый пункт." });
            changed = true;
          }
        });
      }
      if (changed) markDirty();
      renderBuilder(focusSel);
    });
    document.getElementById("builder-root").addEventListener("input", (e) => {
      const tpl = currentTemplate();
      if (!tpl) return;
      const title = e.target.getAttribute("data-sec-title");
      const clause = e.target.getAttribute("data-clause");
      tpl.sections.forEach((sec) => {
        if (sec.id === title) sec.title = e.target.value;
        sec.clauses.forEach((item) => {
          if (item.id === clause) item.text = e.target.value;
        });
      });
      markDirty();
    });
    document.getElementById("builder-root").addEventListener("keydown", (e) => {
      if (!e.altKey) return;
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      const dir = e.key === "ArrowUp" ? -1 : 1;
      const cl = e.target.closest("[data-clause]");
      const sec = e.target.closest("[data-sec-title]");
      const tpl = currentTemplate();
      if (!tpl) return;
      let changed = false;
      let focusSel = "";
      if (cl) {
        const cid = cl.getAttribute("data-clause");
        changed = moveClause(tpl, cid, dir);
        focusSel = "[data-clause=\"" + cid + "\"]";
      }
      if (sec) {
        const sid = sec.getAttribute("data-sec-title");
        changed = move(tpl.sections, tpl.sections.findIndex((s) => s.id === sid), dir);
        focusSel = "[data-sec-title=\"" + sid + "\"]";
      }
      e.preventDefault();
      if (changed) markDirty();
      renderBuilder(focusSel);
    });
  }

  function applyHash() {
    const name = (location.hash || "").replace("#", "") || "login";
    if (name === screen) return;
    go(name, null, true);
  }

  function start() {
    const params = new URLSearchParams(location.search);
    const hash = (location.hash || "").replace("#", "");
    const initial = params.get("screen") || hash || "login";
    if (initial === "link") {
      const project = currentProject();
      if (project.linkState !== "live") {
        project.linkToken = newToken();
        project.linkState = "live";
      }
      go("link", null, true);
      if (location.hash !== "#link") history.replaceState({ screen: "link" }, "", "#link");
    } else if (screens.indexOf(initial) >= 0) {
      if (initial === "mail") account.confirmed = false;
      go(initial, null, true);
      if (location.hash !== "#" + initial) history.replaceState({ screen: initial }, "", "#" + initial);
    } else {
      go("login", null, true);
      if (location.hash !== "#login") history.replaceState({ screen: "login" }, "", "#login");
    }
  }

  bind();
  renderProto();
  start();
})();
