(function () {
  // Theme toggle -----------------------------------------------------------
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  function currentTheme() {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  applyTheme(currentTheme());

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // Mobile sidebar -----------------------------------------------------------
  var sidebarToggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('.sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        sidebar.classList.remove('open');
      });
    });
  }

  // Help panel ("Stuck?") -----------------------------------------------------
  var helpFab = document.querySelector('.help-fab');
  var helpPanel = document.querySelector('.help-panel');
  var helpClose = document.querySelector('.help-panel-close');
  if (helpFab && helpPanel) {
    var openHelp = function () {
      helpPanel.classList.add('open');
      helpFab.setAttribute('aria-expanded', 'true');
    };
    var closeHelp = function () {
      helpPanel.classList.remove('open');
      helpFab.setAttribute('aria-expanded', 'false');
    };
    helpFab.addEventListener('click', function () {
      helpPanel.classList.contains('open') ? closeHelp() : openHelp();
    });
    if (helpClose) helpClose.addEventListener('click', closeHelp);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && helpPanel.classList.contains('open')) closeHelp();
    });
  }

  // Quiz interactivity --------------------------------------------------------
  document.querySelectorAll('.quiz-question').forEach(function (question) {
    var options = Array.prototype.slice.call(question.querySelectorAll('.quiz-option'));
    var checkBtn = question.querySelector('.quiz-check-btn');
    var resetBtn = question.querySelector('.quiz-reset-btn');
    var resultBox = question.querySelector('.quiz-result');
    var banner = question.querySelector('.quiz-result-banner');
    var pointer = question.querySelector('.quiz-pointer');

    if (!checkBtn) return;

    function setChecked(state) {
      options.forEach(function (opt) {
        opt.classList.toggle('checked-state', state);
        var input = opt.querySelector('input');
        input.disabled = state;
      });
    }

    checkBtn.addEventListener('click', function () {
      var allCorrect = true;
      options.forEach(function (opt) {
        var input = opt.querySelector('input');
        var isCorrect = opt.dataset.correct === 'true';
        var isChecked = input.checked;
        if (isCorrect !== isChecked) allCorrect = false;
        opt.classList.toggle('quiz-option-correct', isCorrect && isChecked);
        opt.classList.toggle('quiz-option-missed', isCorrect && !isChecked);
        opt.classList.toggle('quiz-option-wrong', !isCorrect && isChecked);
      });
      setChecked(true);
      resultBox.hidden = false;
      if (allCorrect) {
        banner.textContent = 'Верно! Разбор вариантов — ниже.';
        banner.className = 'quiz-result-banner quiz-result-banner--ok';
        if (pointer) pointer.hidden = true;
      } else {
        banner.textContent = 'Не совсем — разбор ниже подскажет, где ошибка.';
        banner.className = 'quiz-result-banner quiz-result-banner--miss';
        if (pointer) pointer.hidden = false;
      }
      checkBtn.hidden = true;
      if (resetBtn) resetBtn.hidden = false;
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        options.forEach(function (opt) {
          var input = opt.querySelector('input');
          input.checked = false;
          opt.classList.remove('quiz-option-correct', 'quiz-option-missed', 'quiz-option-wrong');
        });
        setChecked(false);
        resultBox.hidden = true;
        checkBtn.hidden = false;
        resetBtn.hidden = true;
      });
    }
  });
})();

// Search --------------------------------------------------------------------
(function () {
  var input = document.querySelector('.site-search');
  var resultsBox = document.querySelector('.search-results');
  if (!input || !resultsBox) return;

  var currentSlug = location.pathname.replace(/^\/|\/$/g, '');
  var index = null;
  var activeIndex = 0;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch('/search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        index = data;
        return data;
      });
  }

  function badgeFor(slug) {
    if (slug === '') return 'Главная';
    if (slug === 'assessment') return 'Диагностика';
    if (slug === 'practicum-map') return 'Прил.';
    var moduleMatch = slug.match(/^(\d\d)-/);
    return moduleMatch ? 'М' + moduleMatch[1] : 'Модуль';
  }

  function scoreEntry(entry, words, order) {
    var titleLower = entry.title.toLowerCase();
    var score = 0;
    var heading = null;

    if (titleLower === words.join(' ')) score += 100;
    words.forEach(function (w) {
      if (titleLower.indexOf(w) !== -1) score += 50;
    });
    entry.headings.forEach(function (h) {
      var hLower = h.text.toLowerCase();
      words.forEach(function (w) {
        if (hLower.indexOf(w) !== -1) {
          score += 20;
          if (!heading) heading = h;
        }
      });
    });
    var excerptLower = entry.excerpt.toLowerCase();
    words.forEach(function (w) {
      if (excerptLower.indexOf(w) !== -1) score += 5;
    });
    // Contextual boost only sharpens an already-relevant hit — it must never
    // be the sole reason a page with zero real text match shows up.
    if (score > 0 && entry.slug === currentSlug) score += 15;

    return { entry: entry, score: score, heading: heading, order: order };
  }

  function runSearch(query) {
    var words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length || !index) return [];
    return index
      .map(function (entry, i) { return scoreEntry(entry, words, i); })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score !== a.score ? b.score - a.score : a.order - b.order; })
      .slice(0, 8);
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function highlight(text, words) {
    var escaped = escapeHtml(text);
    words.forEach(function (w) {
      if (!w) return;
      var re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      escaped = escaped.replace(re, '<mark>$1</mark>');
    });
    return escaped;
  }

  function renderResults(results, words) {
    if (!results.length) {
      resultsBox.innerHTML = '<div class="search-empty">Ничего не найдено</div>';
      resultsBox.hidden = false;
      return;
    }
    resultsBox.innerHTML = results
      .map(function (r, i) {
        var href = '/' + r.entry.slug + '/' + (r.heading ? '#' + r.heading.id : '');
        var headingLine = r.heading
          ? '<div class="search-result-heading">' + highlight(r.heading.text, words) + '</div>'
          : '';
        return (
          '<a class="search-result' + (i === 0 ? ' active' : '') + '" href="' + href + '">' +
          '<div class="search-result-title"><span class="search-result-badge">' + badgeFor(r.entry.slug) + '</span>' +
          highlight(r.entry.title, words) + '</div>' +
          headingLine +
          '<div class="search-result-snippet">' + highlight(r.entry.excerpt, words) + '</div>' +
          '</a>'
        );
      })
      .join('');
    resultsBox.hidden = false;
    activeIndex = 0;
  }

  function updateActive(items) {
    items.forEach(function (el, i) { el.classList.toggle('active', i === activeIndex); });
  }

  input.addEventListener('focus', function () { loadIndex(); });

  input.addEventListener('input', function () {
    var query = input.value;
    if (!query.trim()) {
      resultsBox.hidden = true;
      return;
    }
    loadIndex().then(function () {
      var words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
      renderResults(runSearch(query), words);
    });
  });

  input.addEventListener('keydown', function (e) {
    var items = resultsBox.querySelectorAll('.search-result');
    if (e.key === 'ArrowDown' && items.length) {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      updateActive(items);
    } else if (e.key === 'ArrowUp' && items.length) {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      updateActive(items);
    } else if (e.key === 'Enter' && items[activeIndex]) {
      e.preventDefault();
      items[activeIndex].click();
    } else if (e.key === 'Escape') {
      resultsBox.hidden = true;
      input.blur();
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target !== input && !resultsBox.contains(e.target)) {
      resultsBox.hidden = true;
    }
  });

  document.addEventListener('keydown', function (e) {
    var tag = document.activeElement && document.activeElement.tagName;
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      e.preventDefault();
      input.focus();
    }
  });
})();
