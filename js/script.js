// =========================================================
// script.js – Skärgårdsguiden
// Samma fil laddas på alla sidor. Packlistan finns bara på
// en sida, så jag kollar alltid att elementen finns innan
// jag gör något med dem. Annars blir det fel i konsolen.
// =========================================================


// ---------- 1. Menyn på mobilen ----------

const menyKnapp = document.querySelector("#meny-knapp");
const meny = document.querySelector("#meny");

menyKnapp.addEventListener("click", () => {
  // toggle lägger till klassen om den saknas, annars tar den bort den.
  // Den skickar också tillbaka true/false så jag vet om menyn är öppen.
  const arOppen = meny.classList.toggle("oppen");

  // Talar om för skärmläsare om menyn är öppen eller stängd
  menyKnapp.setAttribute("aria-expanded", arOppen);
});


// ---------- 2. Kvällsläge ----------

const kvallKnapp = document.querySelector("#kvall-knapp");

// Byter mellan dag och kväll. Själva färgerna ligger i CSS:en (body.kvall).
function sattKvallslage(pa) {
  document.body.classList.toggle("kvall", pa);
  kvallKnapp.textContent = pa ? "Dagsläge" : "Kvällsläge";
  kvallKnapp.setAttribute("aria-pressed", pa);
}

// localStorage sparar valet i webbläsaren, annars skulle
// sidan bli ljus igen varje gång man klickar till en ny sida
sattKvallslage(localStorage.getItem("kvall") === "ja");

kvallKnapp.addEventListener("click", () => {
  const blirKvall = !document.body.classList.contains("kvall");
  sattKvallslage(blirKvall);
  localStorage.setItem("kvall", blirKvall ? "ja" : "nej");
});


// ---------- 3. Packlistan (bara på packlista.html) ----------

const stapel = document.querySelector("#stapel");
const raknare = document.querySelector("#raknare");
const rutor = document.querySelectorAll(".packlista input");

function uppdateraPacklistan() {
  // Räknar hur många rutor som är ibockade just nu
  const antal = document.querySelectorAll(".packlista input:checked").length;
  const procent = (antal / rutor.length) * 100;

  // Här ändras CSS-egenskapen width direkt på elementet med id="stapel"
  stapel.style.width = `${procent}%`;

  if (antal === rutor.length) {
    raknare.textContent = "Allt är packat. Trevlig tur!";
  } else {
    raknare.textContent = `${antal} av ${rutor.length} saker packade`;
  }
}

// Finns stapeln på sidan? Då är vi på packlistan.
if (stapel) {
  for (const ruta of rutor) {
    ruta.addEventListener("change", uppdateraPacklistan);
  }
}
