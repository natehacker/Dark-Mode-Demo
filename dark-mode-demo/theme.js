// theme.js
(function () {
    const root = document.documentElement;
    const btn = document.getElementById("theme-toggle");
    const icon = document.getElementById("theme-icon");
    const label = document.getElementById("theme-label");
  
    function systemPrefersDark() {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  
    function currentTheme() {
      const attr = root.getAttribute("data-theme");
      if (attr === "dark" || attr === "light") return attr;
      return systemPrefersDark() ? "dark" : "light";
    }
  
    function apply(theme) {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      const isDark = theme === "dark";
      btn.setAttribute("aria-pressed", String(isDark));
      icon.textContent = isDark ? "🌜" : "🌞";
      label.textContent = isDark ? "Dark" : "Light";
    }
  
    // init
    apply(currentTheme());
  
    // click
    btn.addEventListener("click", () => {
      apply(currentTheme() === "dark" ? "light" : "dark");
    });
  
    // keyboard shortcut T
    window.addEventListener("keydown", (e) => {
      if ((e.key === "t" || e.key === "T") && !e.metaKey && !e.ctrlKey && !e.altKey) {
        apply(currentTheme() === "dark" ? "light" : "dark");
      }
    });
  
    // react to system changes if user hasn't explicitly chosen
    try {
      const q = window.matchMedia("(prefers-color-scheme: dark)");
      q.addEventListener?.("change", () => {
        if (!localStorage.getItem("theme")) apply(q.matches ? "dark" : "light");
      });
    } catch (_) {}
  })();
  