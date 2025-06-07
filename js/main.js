// ================== Funcții utilitare ==================
function getCrimeRate(code) {
  return crimeRates[code] ?? "necunoscută";
}

function getCrimeCases(code) {
  return crimeCases[code] ?? "necunoscut";
}

function getJudetName(code) {
  return judetNames[code] ?? code;
}

// ================== Selectarea județului ==================
document.querySelectorAll("#features path").forEach((path) => {
  path.addEventListener("click", function () {
    // Eliminăm selecția anterioară
    document.querySelectorAll("#features path").forEach((p) => {
      p.classList.remove("selected");
    });

    // Adăugăm clasa 'selected' pe județul actual
    this.classList.add("selected");

    const judetCode = this.id;
    const judetName = getJudetName(judetCode);

    // Afișăm informațiile în panoul info
    const infoBox = document.getElementById("judet-info");
    if (infoBox) {
      infoBox.innerHTML = `
        <h2>Informații despre județul ${judetName}</h2>
        <p>Rată criminalitate: ${getCrimeRate(judetCode)}%</p>
        <p>Număr cazuri: ${getCrimeCases(judetCode)} cazuri</p>
      `;
    }
  });
});

// ================== Tooltip dinamic ==================
const tooltip = document.getElementById("tooltip");

document.querySelectorAll("#features path").forEach((path) => {
  path.addEventListener("mouseover", function (e) {
    const judetCode = this.id;
    const judetName = getJudetName(judetCode);

    tooltip.innerHTML = `
      <strong>${judetName}</strong><br>
      Indice criminalitate: ${getCrimeRate(judetCode)}/10
    `;
    tooltip.style.display = "block";
  });

  path.addEventListener("mousemove", function (e) {
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

  path.addEventListener("mouseout", function () {
    tooltip.style.display = "none";
  });
});

const judetNames = {
  AB: "Alba",
  AR: "Arad",
  BV: "Brașov",
  // ... restul județelor
};

document.querySelectorAll("#features path").forEach((path) => {
  const code = path.id;
  const name = judetNames[code];

  if (!name) return;

  // Obține centrul geometriei pentru plasarea textului (approx)
  const bbox = path.getBBox();
  const x = bbox.x + bbox.width / 2;
  const y = bbox.y + bbox.height / 2;

  // Creează elementul <text>
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "10");
  text.setAttribute("fill", "#333");
  text.textContent = name;

  path.parentNode.appendChild(text);
});
