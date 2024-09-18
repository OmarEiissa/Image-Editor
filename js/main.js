let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hueRotate = document.querySelector("#hue-rotate");

let upload = document.querySelector("#upload");
let download = document.querySelector("#download");
let img = document.querySelector("#img");

let resetAll = document.querySelector("#resetAll");
let imgBox = document.querySelector(".img-box");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function resetValue() {
  ctx.filter = "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

window.onload = function () {
  download.style.display = "none";
  resetAll.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = function () {
  if (upload.files[0].type.startsWith("image/")) {
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
  } else {
    alert("Please select an image file");
  }
};

let filters = document.querySelectorAll("ul li input");

filters.forEach((fi) => {
  fi.addEventListener("input", function () {
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
  });
});

// ResetAll
resetAll.addEventListener("click", () => {
  resetValue();
});

// Download
download.addEventListener("click", () => {
  download.href = canvas.toDataURL("image/jpeg"); // default value png
});
