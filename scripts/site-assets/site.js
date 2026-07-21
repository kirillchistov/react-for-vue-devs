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
