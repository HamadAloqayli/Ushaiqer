import "./style.css";

import Experience from "./Experience/Experience.js";

const mainButton = document.querySelector(".mainButton");
const cover = document.querySelector(".cover");
const welcomeCover = document.querySelector(".welcomeCover");
const continueButton = document.querySelector(".continue");
const clickBtn = document.querySelector(".clickBtn");
const numKeys = document.querySelector(".numKeys");
const clickBtnCover = document.querySelector(".clickBtnCover");
const progressHolder = document.querySelector(".progressHolder");
const progressText = document.querySelector(".progressText");
const progressValue = document.querySelector(".progressHolder progress");

const experience = new Experience(
  document.querySelector("canvas.webgl"),
  mainButton,
  cover,
  welcomeCover,
  continueButton,
  clickBtn,
  numKeys,
  clickBtnCover,
  progressHolder,
  progressText,
  progressValue
);
