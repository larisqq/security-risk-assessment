document.addEventListener("DOMContentLoaded", function () {
  // County data with crime rates and risk levels
  const countyData = {
    AB: { name: "Alba", rate: 2.5, level: "low", file: "pdf/alba.pdf" },
    AR: { name: "Arad", rate: 3.0, level: "low", file: "pdf/arad.pdf" },
    AG: { name: "Argeș", rate: 4.1, level: "medium", file: "pdf/arges.pdf" },
    BC: { name: "Bacău", rate: 3.8, level: "high", file: "pdf/bacau.pdf" },
    BH: { name: "Bihor", rate: 2.9, level: "high", file: "pdf/bihor.pdf" },
    BN: {
      name: "Bistrița-Năsăud",
      rate: 3.5,
      level: "low",
      file: "pdf/bistrita-nasaud.pdf",
    },
    BT: { name: "Botoșani", rate: 3.3, level: "low", file: "pdf/botosani.pdf" },
    BV: { name: "Brașov", rate: 4.5, level: "high", file: "pdf/brasov.pdf" },
    BR: { name: "Brăila", rate: 3.7, level: "low", file: "pdf/braila.pdf" },
    BZ: { name: "Buzău", rate: 2.8, level: "low", file: "pdf/buzau.pdf" },
    CS: {
      name: "Caraș-Severin",
      rate: 3.1,
      level: "low",
      file: "pdf/caras-severin.pdf",
    },
    CL: { name: "Călărași", rate: 2.6, level: "low", file: "pdf/calarasi.pdf" },
    CJ: { name: "Cluj", rate: 4.0, level: "high", file: "pdf/cluj.pdf" },
    CT: {
      name: "Constanța",
      rate: 3.9,
      level: "high",
      file: "pdf/constanta.pdf",
    },
    CV: { name: "Covasna", rate: 2.4, level: "low", file: "pdf/covasna.pdf" },
    DB: {
      name: "Dâmbovița",
      rate: 3.6,
      level: "low",
      file: "pdf/dambovita.pdf",
    },
    DJ: { name: "Dolj", rate: 4.2, level: "high", file: "pdf/dolj.pdf" },
    GL: { name: "Galați", rate: 3.4, level: "high", file: "pdf/galati.pdf" },
    GR: { name: "Giurgiu", rate: 2.7, level: "low", file: "pdf/giurgiu.pdf" },
    GJ: { name: "Gorj", rate: 3.0, level: "low", file: "pdf/gorj.pdf" },
    HR: { name: "Harghita", rate: 2.3, level: "low", file: "pdf/harghita.pdf" },
    HD: {
      name: "Hunedoara",
      rate: 3.5,
      level: "medium",
      file: "pdf/hunedoara.pdf",
    },
    IL: { name: "Ialomița", rate: 2.8, level: "low", file: "pdf/ialomita.pdf" },
    IS: { name: "Iași", rate: 4.3, level: "high", file: "pdf/iasi.pdf" },
    IF: { name: "Ilfov", rate: 3.1, level: "high", file: "pdf/ilfov.pdf" },
    MM: {
      name: "Maramureș",
      rate: 3.9,
      level: "medium",
      file: "pdf/maramures.pdf",
    },
    MH: {
      name: "Mehedinți",
      rate: 2.6,
      level: "low",
      file: "pdf/mehedinti.pdf",
    },
    MS: { name: "Mureș", rate: 3.4, level: "high", file: "pdf/mures.pdf" },
    NT: { name: "Neamț", rate: 3.2, level: "low", file: "pdf/neamt.pdf" },
    OT: { name: "Olt", rate: 2.9, level: "low", file: "pdf/olt.pdf" },
    PH: { name: "Prahova", rate: 4.1, level: "high", file: "pdf/prahova.pdf" },
    SM: { name: "Satu Mare", rate: 3.2, file: "pdf/satu-mare.pdf" },
    SJ: { name: "Sălaj", rate: 3.0, level: "low", file: "pdf/salaj.pdf" },
    SB: { name: "Sibiu", rate: 3.8, level: "high", file: "pdf/sibiu.pdf" },
    SV: {
      name: "Suceava",
      rate: 4.4,
      level: "medium",
      file: "pdf/suceava.pdf",
    },
    TR: {
      name: "Teleorman",
      rate: 2.7,
      level: "low",
      file: "pdf/teleorman.pdf",
    },
    TM: { name: "Timiș", rate: 3.6, level: "high", file: "pdf/timis.pdf" },
    TL: { name: "Tulcea", rate: 2.4, level: "low", file: "pdf/tulcea.pdf" },
    VL: { name: "Vâlcea", rate: 3.1, level: "low", file: "pdf/valcea.pdf" },
    VN: { name: "Vrancea", rate: 2.8, level: "low", file: "pdf/vrancea.pdf" },
    VS: { name: "Vaslui", rate: 3.3, level: "low", file: "pdf/vaslui.pdf" },
    B: {
      name: "București",
      rate: 5.0,
      level: "high",
      file: "pdf/bucuresti.pdf",
    },
  };

  // Color scheme
  const colors = {
    low: "#8BC34A", // Light green
    medium: "#FFC107", // Amber
    high: "#F44336", // Red
    selected: "#2196F3", // Blue
    textNormal: "#000", // Black (as requested)
    textHover: "#000", // Black
    strokeNormal: "#fff", // White
    strokeHover: "#333", // Dark gray
  };

  // DOM elements
  const infoBox = document.getElementById("county-info");
  let selectedCounty = null;
  let countyLabels = [];

  // Initialize the map
  function initMap() {
    // Style the national coefficients button
    const nationalBtn = document.querySelector(
      ".national-crime-download .btn-galben"
    );
    if (nationalBtn) {
      nationalBtn.classList.add("gradient-btn");
      nationalBtn.innerHTML = `<i class="fas fa-chart-line"></i> ${nationalBtn.textContent}`;
      addButtonAnimation(nationalBtn);
    }

    // Add interactivity to each county path
    document.querySelectorAll("svg path[id]").forEach((path) => {
      const countyId = path.id;
      const data = countyData[countyId];

      if (data) {
        // Set initial style
        path.style.fill = colors[data.level] || colors.low;
        path.style.stroke = colors.strokeNormal;
        path.style.strokeWidth = "0.5px";
        path.style.transition = "all 0.3s ease";
        path.style.cursor = "pointer";
        path.dataset.name = data.name;
        path.dataset.rate = data.rate;
        path.dataset.level = data.level;

        // Add county code label - black and bold as requested
        const bbox = path.getBBox();
        const textEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        textEl.setAttribute("x", bbox.x + bbox.width / 2);
        textEl.setAttribute("y", bbox.y + bbox.height / 2);
        textEl.setAttribute("text-anchor", "middle");
        textEl.setAttribute("dominant-baseline", "middle");
        textEl.setAttribute("font-size", "11px");
        textEl.setAttribute("font-weight", "bold");
        textEl.setAttribute("fill", colors.textNormal);
        textEl.textContent = countyId;
        textEl.classList.add("county-label");
        path.parentNode.insertBefore(textEl, path.nextSibling);
        countyLabels.push(textEl);

        // Mouse enter event
        path.addEventListener("mouseenter", function () {
          this.style.stroke = colors.strokeHover;
          this.style.strokeWidth = "1.5px";
          textEl.setAttribute("font-size", "12px");

          // Show tooltip
          showTooltip(this, countyId, data);
        });

        // Mouse leave event
        path.addEventListener("mouseleave", function () {
          if (this !== selectedCounty) {
            this.style.stroke = colors.strokeNormal;
            this.style.strokeWidth = "0.5px";
          }
          textEl.setAttribute("font-size", "11px");

          // Hide tooltip
          hideTooltip();
        });

        // Click event
        path.addEventListener("click", function () {
          selectCounty(this, countyId, data);
        });
      }
    });

    // Initial info box content
    infoBox.innerHTML = `
      <div class="map-prompt">
        <i class="fas fa-hand-pointer"></i>
        <p>Selectați un județ de pe hartă pentru a vizualiza datele de criminalitate</p>
      </div>
    `;
  }

  // Add animation to buttons
  function addButtonAnimation(btn) {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
    });

    btn.addEventListener("mousedown", function () {
      this.style.transform = "translateY(1px)";
    });

    btn.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px)";
    });
  }

  // Show tooltip on hover
  function showTooltip(path, countyId, data) {
    const tooltip = document.createElement("div");
    tooltip.className = "county-tooltip";
    tooltip.innerHTML = `
      <strong>${data.name}</strong><br>
      Rata: ${data.rate}/10
    `;

    const rect = path.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
    tooltip.style.top = `${rect.top + window.scrollY - 40}px`;

    document.body.appendChild(tooltip);
    path.dataset.tooltip = tooltip;
  }

  // Hide tooltip
  function hideTooltip() {
    const tooltip = document.querySelector(".county-tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Select a county
  function selectCounty(path, countyId, data) {
    // Deselect previous county
    if (selectedCounty) {
      selectedCounty.style.fill =
        colors[selectedCounty.dataset.level] || colors.low;
      selectedCounty.style.stroke = colors.strokeNormal;
      selectedCounty.style.strokeWidth = "0.5px";
    }

    // Select new county
    selectedCounty = path;
    path.style.fill = colors.selected;
    path.style.stroke = colors.strokeHover;
    path.style.strokeWidth = "2px";

    // Update info box
    showCountyInfo(countyId, data);
  }

  // Show county info in the side panel
  function showCountyInfo(countyId, data) {
    infoBox.innerHTML = `
      <div class="county-header">
        <h3>${data.name} <span class="county-code">(${countyId})</span></h3>
        <div class="risk-level ${data.level}">
          <span class="risk-dot"></span>
          ${getRiskLevelText(data.level)}
        </div>
      </div>
      <div class="county-stats">
        <div class="stat-item">
          <div class="stat-label">Rata criminalității</div>
          <div class="stat-value">${data.rate}<small>/10</small></div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Nivel de risc</div>
          <div class="stat-value ${data.level}">${getRiskLevelText(
      data.level
    )}</div>
        </div>
      </div>
      <button class="download-btn gradient-btn">
        <i class="fas fa-download"></i> Descarcă raportul complet
      </button>
    `;

    // Add button animation
    const downloadBtn = document.querySelector(".download-btn");
    addButtonAnimation(downloadBtn);

    // Add download event
    downloadBtn.addEventListener("click", () => {
      downloadPdf(data.file, `Raport Criminalitate ${data.name}.pdf`);
    });
  }

  // Helper functions
  function getRiskLevelText(level) {
    const levels = {
      low: "Risc scăzut",
      medium: "Risc mediu",
      high: "Risc ridicat",
    };
    return levels[level] || "Necunoscut";
  }

  function downloadPdf(filePath, fileName) {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Initialize the map
  initMap();
});
