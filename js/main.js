let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hueRotate = document.querySelector("#hueRotate");

let upload = document.querySelector("#upload");
let download = document.querySelector("#download");
let img = document.querySelector("#img");

let resetAll = document.querySelector("#resetAll");
let imgBox = document.querySelector(".img-box");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const defaultValues = {
  saturate: "100",
  contrast: "100",
  brightness: "100",
  sepia: "0",
  grayscale: "0",
  blur: "0",
  hueRotate: "0",
};

function resetValue() {
  ctx.filter = "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  saturate.value = defaultValues.saturate;
  contrast.value = defaultValues.contrast;
  brightness.value = defaultValues.brightness;
  sepia.value = defaultValues.sepia;
  grayscale.value = defaultValues.grayscale;
  blur.value = defaultValues.blur;
  hueRotate.value = defaultValues.hueRotate;
}

upload.onchange = function () {
  if (!upload.files[0] || !upload.files[0].type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  resetValue();

  download.style.display = "block";
  resetAll.style.display = "block";
  imgBox.style.display = "block";

  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };

  img.onerror = function () {
    alert("Error loading the image. Please try another file.");
    resetValue();
  };
};

function applyFilters() {
  ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

let icoResetFilter = document.querySelectorAll(".reset");

icoResetFilter.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter;
    const inputElement = document.getElementById(filter);
    if (inputElement) {
      inputElement.value = defaultValues[filter];
      applyFilters();
    }
  });
});

let filters = document.querySelectorAll("ul li input");

filters.forEach((input) => {
  input.addEventListener("input", applyFilters);
});

// ResetAll
resetAll.addEventListener("click", () => {
  resetValue();
});

// Download
download.addEventListener("click", () => {
  download.href = canvas.toDataURL("image/jpeg"); // default value png
});
