// ============================================================
// Завдання 4 — Аккордеон
// ============================================================
// Вимоги:
//   1. Клік на .panel-title відкриває/закриває .panel-content
//      (додається/прибирається клас .open на .panel).
//   2. Одночасно відкрита ЛИШЕ ОДНА панель.
//   3. EVENT DELEGATION на .accordion.
//   4. КЛАВІАТУРА: Enter і Space на .panel-title (з tabindex=0).
//   5. ARIA: aria-expanded="true"/"false" оновлюється.
// ============================================================

// TODO

const accordion = document.querySelector('.accordion');

if (accordion) {
  const togglePanel = (titleElement) => {
    const currentPanel = titleElement.closest('.panel');
    if (!currentPanel) return;

    const isOpen = currentPanel.classList.contains('open');

    const allPanels = accordion.querySelectorAll('.panel');
    allPanels.forEach(panel => {
      if (panel !== currentPanel) {
        panel.classList.remove('open');
        const panelTitle = panel.querySelector('.panel-title');
        if (panelTitle) {
          panelTitle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    if (isOpen) {
      currentPanel.classList.remove('open');
      titleElement.setAttribute('aria-expanded', 'false');
    } else {
      currentPanel.classList.add('open');
      titleElement.setAttribute('aria-expanded', 'true');
    }
  };

  accordion.addEventListener('click', (event) => {
    const title = event.target.closest('.panel-title');
    if (!title || !accordion.contains(title)) return;
    
    togglePanel(title);
  });

  accordion.addEventListener('keydown', (event) => {
    const title = event.target.closest('.panel-title');
    if (!title || !accordion.contains(title)) return;

    if (event.code === 'Space' || event.key === 'Enter') {
      event.preventDefault(); 
      togglePanel(title);
    }
  });
}