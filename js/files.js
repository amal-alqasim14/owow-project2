/**
 * documents.js
 * Logic for documents.html (Project Lumina – OWOW project)
 *
 * Responsibilities:
 *  - Define pinned and listed document data
 *  - Render pinned cards and the file table on page load
 *  - Filter the table in real time as the user types in the search bar
 *
 * FILE LOCATION: js/documents.js
 * LINKED FROM:   documents.html (bottom of <body>)
 *
 * Wrapped in an IIFE so no variables leak into the global scope
 * and nothing conflicts with other team members' scripts.
 */

(() => {

  /* ── Data ────────────────────────────────────────────────────
   * Edit these arrays to add, remove, or update documents.
   * ─────────────────────────────────────────────────────────── */

  const PINNED_DOCS = [
    { name: "Signed Proposal.pdf",  category: "Legal",    categoryClass: "legal",    size: "2.4 MB" },
    { name: "Project PRD.pdf",      category: "Strategy", categoryClass: "strategy", size: "1.1 MB" },
    { name: "UX Review Deck.pdf",   category: "Design",   categoryClass: "design",   size: "8.7 MB" },
  ];

  const ALL_DOCS = [
    { name: "Service_Agreement_v2.pdf",      category: "Legal",              categoryClass: "legal",    date: "Oct 12, 2026" },
    { name: "Sprint_3_Meeting_Notes.docx",   category: "Project Management", categoryClass: "pm",       date: "Yesterday, 4:22 PM" },
    { name: "Final_Brand_Guidelines_v1.pdf", category: "Branding",           categoryClass: "branding", date: "Oct 01, 2026" },
    { name: "Q4_Market_Research.pdf",        category: "Research",           categoryClass: "research", date: "Sep 28, 2026" },
  ];


  /* ── Icon map ────────────────────────────────────────────────
   * Maps categoryClass → Font Awesome icon class.
   * Add a new entry here when introducing a new category.
   * ─────────────────────────────────────────────────────────── */

  const ICON_MAP = {
    legal:    "fa-regular fa-file-pdf",
    strategy: "fa-regular fa-file-lines",
    design:   "fa-regular fa-file-powerpoint",
    pm:       "fa-regular fa-file-lines",
    branding: "fa-regular fa-file-image",
    research: "fa-regular fa-file-chart-column",
  };

  function getIcon(categoryClass) {
    return ICON_MAP[categoryClass] || "fa-regular fa-file";
  }


  /* ── Render: pinned cards ────────────────────────────────────
   * Builds the three cards above the table.
   * ─────────────────────────────────────────────────────────── */

  function renderPinnedCards() {
    const grid = document.getElementById("docs-pinned-grid");
    if (!grid) return;

    grid.innerHTML = PINNED_DOCS.map((doc) => `
      <div class="docs-pin-card" role="button" tabindex="0" onclick="docsOpen('${doc.name}')">
        <div class="docs-pin-icon ${doc.categoryClass}">
          <i class="${getIcon(doc.categoryClass)}"></i>
        </div>
        <div class="docs-pin-name">${doc.name}</div>
        <div class="docs-pin-meta">${doc.category} &bull; ${doc.size}</div>
      </div>
    `).join("");
  }


  /* ── Render: table rows ──────────────────────────────────────
   * Called on page load and on every search keystroke.
   * Accepts a subset of ALL_DOCS to support filtering.
   * ─────────────────────────────────────────────────────────── */

  function renderTableRows(docs) {
    const tbody = document.getElementById("docs-tbody");
    if (!tbody) return;

    if (docs.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align:center;padding:24px;color:#9ca3af;font-size:13px;">
            No documents match your search.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = docs.map((doc) => `
      <tr onclick="docsOpen('${doc.name}')">
        <td>
          <div class="docs-file-cell">
            <div class="docs-file-icon ${doc.categoryClass}">
              <i class="${getIcon(doc.categoryClass)}"></i>
            </div>
            <span class="docs-file-name">${doc.name}</span>
          </div>
        </td>
        <td><span class="docs-category-badge">${doc.category}</span></td>
        <td><div class="docs-date">${doc.date}</div></td>
      </tr>
    `).join("");
  }


  /* ── Search / filter ─────────────────────────────────────────
   * Filters by file name and category on every keystroke.
   * ─────────────────────────────────────────────────────────── */

  function initSearch() {
    const input = document.getElementById("docs-search");
    if (!input) return;

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();

      const filtered = query
        ? ALL_DOCS.filter(
            (doc) =>
              doc.name.toLowerCase().includes(query) ||
              doc.category.toLowerCase().includes(query)
          )
        : ALL_DOCS;

      renderTableRows(filtered);
    });
  }


  /* ── Open document ───────────────────────────────────────────
   * Called when a card or table row is clicked.
   * Replace the console.log with your actual open/preview logic.
   * ─────────────────────────────────────────────────────────── */

  window.docsOpen = function (fileName) {
    // TODO: open a preview modal or trigger a download
    console.log("[documents.js] Opening:", fileName);
  };


  /* ── Init ────────────────────────────────────────────────────
   * Script is loaded at the bottom of <body>, so the DOM is
   * already available — no DOMContentLoaded needed.
   * ─────────────────────────────────────────────────────────── */

  renderPinnedCards();
  renderTableRows(ALL_DOCS);
  initSearch();

})();