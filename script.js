"use strict";

let painting = false;
let filling = false;
const canvas = document.querySelector("#paint");
const color = document.querySelectorAll(".colors_li");
const range = document.querySelector("#colorRange");
const fillBtn = document.querySelector("#fillBtn");
const saveBtn = document.querySelector("#saveBtn");
const canvasContext = canvas.getContext("2d");
const INITIAL_COLOR = "#000000";
const INITIAL_SIZE = 600;

canvas.width = INITIAL_SIZE;
canvas.height = INITIAL_SIZE;
canvasContext.strokeStyle = INITIAL_COLOR;
canvasContext.fillStyle = INITIAL_COLOR;
canvasContext.lineWidth = 5;
canvasContext.lineJoin = "round";
canvasContext.lineCap = "round";

// canvas에 그리기
function stopPainting() {
  painting = false;
}
function strartPaining() {
  painting = true;
}
function onMouseMove(event) {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  if (!painting) {
    canvasContext.beginPath();
    canvasContext.moveTo(mouseX, mouseY);
  } else {
    canvasContext.lineTo(mouseX, mouseY);
    canvasContext.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", strartPaining);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// 브러쉬 관련 변경
function handleChangeColor(event) {
  const bgColor = event.target.style.backgroundColor;
  canvasContext.strokeStyle = bgColor;
  canvasContext.fillStyle = bgColor;
}
function handleRangeBrush(event) {
  console.log(event.target.value);
  canvasContext.lineWidth = event.target.value;
}

function handleCanvasFill() {
  if (filling) {
    fillBtn.innerHTML = "FILL";
    filling = false;
  } else {
    fillBtn.innerHTML = "PAINT";
    filling = true;
  }
}

function handleCanvasClick() {
  if (filling) {
    canvasContext.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
  }
}

if (color) {
  Array.from(color).forEach((color) => {
    color.addEventListener("click", handleChangeColor);
  });
}
if (range) {
  range.addEventListener("input", handleRangeBrush);
}

if (fillBtn) {
  fillBtn.addEventListener("click", handleCanvasFill);
}
// document
//   .querySelector("#colorBtn button:first-child")
//   .addEventListener("click", changeColor("paintBg"));
