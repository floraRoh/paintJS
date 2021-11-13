"use strict";

let painting = false;
let filling = false;
const canvas = document.querySelector("#paint");
const color = document.querySelectorAll(".colors_li");
const range = document.querySelector("#colorRange");
const fillBtn = document.querySelector("#fillBtn");
const saveBtn = document.querySelector("#saveBtn");
const resetBtn = document.querySelector("#resetBtn");
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
function handleWaterMark() {
  const watermark = "Hwonny";
  const x = canvas.width - 200;
  const y = canvas.height - 30;
  canvasContext.font = "50px Malgun Gothic";
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.2)";
  canvasContext.fillText(watermark, x, y);
}

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
    fillBtn.classList.remove("black");
    filling = false;
  } else {
    fillBtn.innerHTML = "FILL";
    fillBtn.classList.add("black");
    filling = true;
  }
}

function handleCanvasClick() {
  if (filling) {
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
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
function handleCanvasReset(event) {
  event.preventDefault();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.beginPath();
  handleWaterMark();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", strartPaining);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCanvasDefence);
  handleWaterMark();
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
if (resetBtn) {
  resetBtn.addEventListener("click", handleCanvasReset);
}

// 화면 사이즈
if (window.innerWidth <= 600){
  canvas.width = window.outerWidth * 0.8;
  canvas.height = window.outerHeight * 0.5;
}