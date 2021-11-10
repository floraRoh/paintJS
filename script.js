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

canvas.fillStyle = "#ffffff";
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

const watermark = "Hwonny";
const txt_info = canvasContext.measureText(watermark);
const x = canvas.width - canvas.width / 2;
const y = canvas.height - canvas.height / 2;
canvasContext.font = "40px Malgun Gothic";
canvasContext.fillStyle = "rgba(255, 0, 0, 0.2)";
canvasContext.fillText(watermark, x, y);

// 브러쉬 관련 변경
function handleChangeColor(event) {
  const bgColor = event.target.style.backgroundColor;
  canvasContext.strokeStyle = bgColor;
  canvasContext.fillStyle = bgColor;
}
function handleRangeBrush(event) {
  canvasContext.lineWidth = event.target.value;
}

function handleCanvasFill() {
  if (filling) {
    fillBtn.innerHTML = "PAINT";
    filling = false;
  } else {
    fillBtn.innerHTML = "FILL";
    filling = true;
  }
}

function handleCanvasClick() {
  if (filling) {
    canvasContext.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
  }
}
function handleCanvasDefence(event) {
  event.preventDefault();
}
function handleSaveClick(event) {
  const image = canvas.toDataURL("image/jpg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paint.jpg";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", strartPaining);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCanvasDefence);
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

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
// document
//   .querySelector("#colorBtn button:first-child")
//   .addEventListener("click", changeColor("paintBg"));
