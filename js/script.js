// script.js – makes the bar on the packing list grow

const bar = document.querySelector("#bar");
const boxes = document.querySelectorAll(".checklist input");

// Runs every time a box is ticked or unticked
function updateBar() {
  const ticked = document.querySelectorAll(".checklist input:checked").length;

  // Changes the CSS width of #bar, e.g. 3 of 5 ticked = 60%
  bar.style.width = (ticked / boxes.length) * 100 + "%";
}

for (const box of boxes) {
  box.addEventListener("change", updateBar);
}
