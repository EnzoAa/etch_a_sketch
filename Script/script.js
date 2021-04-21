// Global Variables
const grid = document.getElementById("grid");
const btn = document.getElementById("btn");
var max = 0;
var min = 0;
var gridSize = 20;
var selectedMode = "black";
//-- Grid and square creation
function gridCreation() {
  let realSize = Math.pow(gridSize, 2);
  grid.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
  grid.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";
  for (let i = 0; i < realSize; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.style.cssText = "padding: 1px;border:1px solid black;";
    grid.appendChild(square);
  }
}
//-- Adding event listeners to buttons
btn.addEventListener("click", getColor, false);
//-- Color change
function getColor(e) {
  let colorSelection = e.target.id;
  selectedMode = colorSelection;
  if (colorSelection == "black") {
    max = 0;
    min = 0;
  } else if (colorSelection == "rainbow") {
    max = 256;
    min = 1;
  } else if (colorSelection == "erase") {
    max = 256;
    min = 255;
  } else if (colorSelection == "restart") {
    removeSquares();
    gridCreation();
    gridColor();
  }
}
//-- Rgb number
function rgbNumber() {
  let number = Math.floor(Math.random() * (max - min) + min);
  return number;
}
//-- Colloring to the squares
function gridColor() {
  let gridArray = document.getElementsByClassName("square");
  for (let i = 0; i < gridArray.length; i += 1) {
    gridArray[i].addEventListener("mouseenter", function (e) {
      const initialColor = e.target.style.backgroundColor;
      const colorString = initialColor.slice(4, -1).split(",");
      const red = colorString[0] || 255;
      const green = colorString[1] || 255;
      const blue = colorString[2] || 255;

      selectedMode == "gradient"
        ? (e.target.style.backgroundColor = `rgb(${red - red * 0.1}, ${
            green - green * 0.1
          }, ${blue - blue * 0.1})`)
        : (e.target.style.backgroundColor = `rgb(${rgbNumber()}, ${rgbNumber()}, ${rgbNumber()})`);
    });
  }
}
//-- Remove squares
function removeSquares() {
  const father = document.getElementById("grid");
  while (father.firstChild) {
    father.removeChild(father.firstChild);
  }
  gridSize = prompt("Chose your grid size");
}
gridCreation();
gridColor();
