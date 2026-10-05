(function () {
  const templates = [
    { title: "Договор поставки", meta: "шаблон · текст" },
    { title: "Соглашение о молчании", meta: "шаблон · текст" }
  ];
  const projects = [
    { title: "Поставка комплектующих · СЯ-184", meta: "в работе" },
    { title: "Молчание · «Тихая Лампа»", meta: "ожидает ссылку" }
  ];

  const clauses = [
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

  const preamble =
    "Товарищество «Синяя Полка», далее покупатель, в лице распорядителя Ирисы Кленовой, действующей по уставу от 3 февраля 2019 г., и товарищество «Лазурный склад», далее поставщик, в лице кладовщика-распорядителя Фёдора Бурелома, действующего по уставу от 18 ноября 2021 г., заключили договор о нижеследующем.";

  let screen = "login";
  let templatesEmpty = false;
  let projectsEmpty = false;
  let linkState = "none";
  let linkToken = "";
  let openPanel = { id: "", mode: "" };
  let role = "own";

  function hasDispute(item) {
    return Boolean(item.ours && item.theirs);
  }

  function disputesOpen() {
    return clauses.some(hasDispute);
  }

  function newToken() {
    return "q" + Math.floor(Math.random() * 900 + 100) + "-veta-" + Math.floor(Math.random() * 90 + 10);
  }

  function linkUrl() {
    return "https://docsvibe.example/k/" + linkToken;
  }

  function go(name, who) {
    screen = name;
    if (who) role = who;
    if (name === "link") role = "peer";
    if (name !== "link" && name !== "print") role = "own";
    document.querySelectorAll(".dv-screen").forEach((el) => {
      el.classList.toggle("is-on", el.id === "screen-" + name);
    });
    const own = name !== "login" && name !== "link" && name !== "print";
    const ownBar = document.getElementById("own-bar");
    const guestBar = document.getElementById("guest-bar");
    if (ownBar) ownBar.hidden = !own;
    if (guestBar) guestBar.hidden = name !== "link";
    const navT = document.getElementById("nav-templates");
    const navP = document.getElementById("nav-projects");
    if (navT) {
      if (name === "templates") navT.setAttribute("aria-current", "page");
      else navT.removeAttribute("aria-current");
    }
    if (navP) {
      if (name === "projects" || name === "ours") navP.setAttribute("aria-current", "page");
      else navP.removeAttribute("aria-current");
    }
    if (name === "ours" || name === "link" || name === "print") renderDoc();
    if (name === "ours") renderLinkBox();
    const dead = document.getElementById("link-dead");
    const live = document.getElementById("doc-link");
    if (name === "link" && dead && live) {
      const ok = linkState === "live";
      dead.hidden = ok;
      live.hidden = !ok;
    }
  }

  function renderList(target, emptyEl, items, empty, onOpen) {
    emptyEl.hidden = !empty;
    target.hidden = empty;
    target.innerHTML = "";
    if (empty) return;
    items.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#ours";
      a.innerHTML = "<span>" + item.title + "</span><span class=\"dv-list-meta\">" + item.meta + "</span>";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        onOpen();
      });
      li.appendChild(a);
      target.appendChild(li);
    });
  }

  function renderLists() {
    renderList(
      document.getElementById("templates-list"),
      document.getElementById("templates-empty"),
      templates,
      templatesEmpty,
      () => go("ours")
    );
    renderList(
      document.getElementById("projects-list"),
      document.getElementById("projects-empty"),
      projects,
      projectsEmpty,
      () => go("ours")
    );
    const tt = document.getElementById("toggle-templates");
    const tp = document.getElementById("toggle-projects");
    if (tt) tt.textContent = templatesEmpty ? "Показать список" : "Показать пустой список";
    if (tp) tp.textContent = projectsEmpty ? "Показать список" : "Показать пустой список";
  }

  function mark(kind, title, text) {
    if (!text) return "";
    return (
      "<span class=\"dv-mark dv-mark-" +
      kind +
      "\"><b>" +
      title +
      "</b>" +
      text +
      "</span>"
    );
  }

  function clauseRow(item, tools) {
    const dispute = hasDispute(item) ? "<span class=\"dv-pill dv-pill-err\">спор</span>" : "";
    const body =
      "<span class=\"dv-num\">" +
      item.id +
      "</span>" +
      item.text +
      mark("ours", "Редакция своей стороны", item.ours) +
      mark("theirs", "Редакция контрагента", item.theirs) +
      mark("ours", "Комментарий своей стороны", item.ourComment) +
      mark("theirs", "Комментарий контрагента", item.theirComment) +
      dispute;
    const open = openPanel.id === item.id;
    const cPressed = open && openPanel.mode === "comment" ? "true" : "false";
    const ePressed = open && openPanel.mode === "edit" ? "true" : "false";
    const toolHtml = tools
      ? "<div class=\"dv-clause-tools\">" +
        "<button type=\"button\" data-panel=\"comment\" data-id=\"" +
        item.id +
        "\" aria-pressed=\"" +
        cPressed +
        "\">Комментарий</button>" +
        "<button type=\"button\" data-panel=\"edit\" data-id=\"" +
        item.id +
        "\" aria-pressed=\"" +
        ePressed +
        "\">Редакция</button>" +
        (role === "own" && item.theirs
          ? "<button type=\"button\" data-approve=\"" + item.id + "\">Принять редакцию контрагента</button>"
          : "") +
        "</div>"
      : "";
    let discuss = "";
    if (tools && open) {
      const isEdit = openPanel.mode === "edit";
      const label = isEdit ? "Своя редакция пункта. Её видит другая сторона." : "Комментарий. Его видит другая сторона.";
      const val = role === "own" ? (isEdit ? item.ours : item.ourComment) : isEdit ? item.theirs : item.theirComment;
      discuss =
        "<div class=\"dv-discuss\">" +
        "<p class=\"dv-caption\">" +
        label +
        "</p>" +
        "<textarea class=\"dv-area\" data-draft=\"" +
        item.id +
        "\">" +
        val +
        "</textarea>" +
        "<div class=\"dv-row\" style=\"margin-top:0.45rem\">" +
        "<button type=\"button\" class=\"dv-btn dv-btn-primary\" data-save=\"" +
        item.id +
        "\">Сохранить</button>" +
        "<button type=\"button\" class=\"dv-btn\" data-close=\"" +
        item.id +
        "\">Свернуть</button>" +
        "</div></div>";
    }
    const sec = item.section ? "<h3 class=\"dv-sec\">" + item.section + "</h3>" : "";
    return (
      sec +
      "<article class=\"dv-clause" +
      (open ? " is-open" : "") +
      "\" id=\"c-" +
      item.id.split(".").join("-") +
      "\">" +
      "<div class=\"dv-clause-body\">" +
      body +
      "</div>" +
      toolHtml +
      discuss +
      "</article>"
    );
  }

  function docShell(inner, extraClass) {
    return (
      "<div class=\"dv-doc" +
      (extraClass ? " " + extraClass : "") +
      "\">" +
      "<div class=\"dv-doc-head\"><h2>Договор поставки № СЯ-184</h2>" +
      "<div class=\"dv-doc-meta\"><span>г. Северск-на-Волге</span><span>12 марта 2026 г.</span></div></div>" +
      "<p class=\"dv-preamble\">" +
      preamble +
      "</p>" +
      inner +
      "<div class=\"dv-sign\">" +
      "<div><p><strong>Покупатель</strong></p><p>Товарищество «Синяя Полка»</p><p>рег. № СП-4418-П</p><p>г. Северск-на-Волге, ул. Выдуманная, 12</p><p>Распорядитель Ириса Кленова</p></div>" +
      "<div><p><strong>Поставщик</strong></p><p>Товарищество «Лазурный склад»</p><p>рег. № ЛС-2201-К</p><p>пос. Усть-Тишина, тракт Синий, 3</p><p>Кладовщик-распорядитель Фёдор Бурелом</p></div>" +
      "</div></div>"
    );
  }

  function renderDoc() {
    const tools = screen !== "print";
    const html = clauses.map((item) => clauseRow(item, tools)).join("");
    const extra = screen === "print" ? "dv-print" : "";
    const packed = docShell(html, extra);
    const ours = document.getElementById("doc-ours");
    const link = document.getElementById("doc-link");
    const print = document.getElementById("doc-print");
    if (ours) ours.innerHTML = packed;
    if (link) link.innerHTML = packed;
    if (print) print.innerHTML = packed;
    const printBtn = document.getElementById("btn-print");
    const wait = document.getElementById("print-wait");
    if (printBtn) printBtn.hidden = disputesOpen() || role !== "own" || screen !== "ours";
    if (wait) wait.hidden = !disputesOpen() || screen !== "ours";
  }

  function renderLinkBox() {
    const box = document.getElementById("link-box");
    if (!box) return;
    if (linkState === "none") {
      box.innerHTML =
        "<p class=\"dv-caption\">Ссылка-ключ ещё не выдана. Контрагент документ не видит.</p>" +
        "<button type=\"button\" class=\"dv-btn dv-btn-primary\" id=\"link-issue\">Выдать ссылку</button>";
    } else if (linkState === "live") {
      box.innerHTML =
        "<span class=\"dv-pill dv-pill-ok\">ссылка жива</span>" +
        "<code>" +
        linkUrl() +
        "</code>" +
        "<div class=\"dv-row\"><button type=\"button\" class=\"dv-btn\" id=\"link-open\">Открыть как контрагент</button>" +
        "<button type=\"button\" class=\"dv-btn dv-btn-danger\" id=\"link-revoke\">Отозвать</button></div>";
    } else {
      box.innerHTML =
        "<span class=\"dv-pill dv-pill-err\">отозвана</span>" +
        "<p class=\"dv-caption\">Старый адрес больше не открывает договор.</p>" +
        "<button type=\"button\" class=\"dv-btn dv-btn-primary\" id=\"link-issue\">Выдать снова</button>";
    }
  }

  function bind() {
    const login = document.getElementById("login-form");
    if (login) {
      login.addEventListener("submit", (e) => {
        e.preventDefault();
        go("projects");
      });
    }
    document.querySelectorAll("[data-go]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        go(el.getAttribute("data-go"));
      });
    });
    const tt = document.getElementById("toggle-templates");
    const tp = document.getElementById("toggle-projects");
    if (tt) {
      tt.addEventListener("click", () => {
        templatesEmpty = !templatesEmpty;
        renderLists();
      });
    }
    if (tp) {
      tp.addEventListener("click", () => {
        projectsEmpty = !projectsEmpty;
        renderLists();
      });
    }
    document.getElementById("app-root").addEventListener("click", (e) => {
      const issue = e.target.closest("#link-issue");
      if (issue) {
        linkToken = newToken();
        linkState = "live";
        renderLinkBox();
        return;
      }
      const revoke = e.target.closest("#link-revoke");
      if (revoke) {
        linkState = "revoked";
        renderLinkBox();
        return;
      }
      const openLink = e.target.closest("#link-open");
      if (openLink) {
        go("link");
        return;
      }
      const printBtn = e.target.closest("#btn-print");
      if (printBtn) {
        go("print");
        return;
      }
      const back = e.target.closest("#print-back");
      if (back) {
        go("ours");
        return;
      }
      const panel = e.target.closest("[data-panel]");
      if (panel) {
        const id = panel.getAttribute("data-id");
        const mode = panel.getAttribute("data-panel");
        if (openPanel.id === id && openPanel.mode === mode) openPanel = { id: "", mode: "" };
        else openPanel = { id, mode };
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
        const id = save.getAttribute("data-save");
        const item = clauses.find((c) => c.id === id);
        const area = document.querySelector("[data-draft=\"" + id + "\"]");
        if (!item || !area) return;
        const text = area.value.trim();
        if (openPanel.mode === "edit") {
          if (role === "own") item.ours = text;
          else item.theirs = text;
        } else {
          if (role === "own") item.ourComment = text;
          else item.theirComment = text;
        }
        openPanel = { id: "", mode: "" };
        renderDoc();
        return;
      }
      const approve = e.target.closest("[data-approve]");
      if (approve) {
        const item = clauses.find((c) => c.id === approve.getAttribute("data-approve"));
        if (!item || !item.theirs) return;
        item.ours = item.theirs;
        item.theirs = "";
        renderDoc();
      }
    });
  }

  function start() {
    renderLists();
    const params = new URLSearchParams(location.search);
    const hash = (location.hash || "").replace("#", "");
    const initial = params.get("screen") || hash || "login";
    if (initial === "link") {
      if (linkState !== "live") {
        linkToken = newToken();
        linkState = "live";
      }
      go("link");
    } else if (["templates", "projects", "ours", "print"].indexOf(initial) >= 0) {
      go(initial);
    } else go("login");
  }

  bind();
  start();
})();
