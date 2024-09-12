// filters
let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hueRotate = document.querySelector("#hue-rotate");

// btn img
let upLoud = document.querySelector("#upLoud");
// btn filters
let download = document.querySelector("#download");
let resetAll = document.querySelector("#reset");

//
// btn reset
let reset = document.querySelectorAll(".reset");

// img div
let imgBox = document.querySelector(".img-box");
// img
let img = document.querySelector("#img");
// img canvas
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
  // imgBox.style.display = "none";

  //
  // reset.forEach((r) => {
  //   r.style.display = "none";
  // });
};

upLoud.onchange = function () {
  resetValue();

  download.style.display = "block";
  resetAll.style.display = "block";
  imgBox.style.display = "block";
  reset.forEach((r) => {
    r.style.display = "block";
  });

  let file = new FileReader();
  file.readAsDataURL(upLoud.files[0]);
  file.onload = function () {
    img.src = file.result;
  };

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

// saturate.addEventListener("input", function () {
//   img.style.filter = `saturate(${saturate.value}%)`
// })

// contrast.addEventListener("input", function () {
//   img.style.filter = `contrast(${contrast.value}%)`
// })

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

// download
download.onclick = function () {
  download.href = canvas.toDataURL("image/jpeg"); // defult value png
};

//
//
//

function reseti(i) {
  for (let i = 0; i < reset.length; i++) {
    reset[i].onclick = function () {
      saturate.value = "10";
      contrast.value = "10";
      brightness.value = "10";
      sepia.value = "10";
      grayscale.value = "10";
      blur.value = "10";
      hueRotate.value = "10";
    };
  }
}

// function reseti(i) {
//   reset[i].onclick = function () {
//     saturate.value = "10";
//     ctx.filter = `saturate(${saturate.value}%)`;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };
//   reset[i].onclick = function () {
//     contrast.value = "10";
//     ctx.filter = `contrast(${contrast.value}%)`;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };
//   reset[i].onclick = function () {
//     brightness.value = "10";
//     ctx.filter = `brightness(${brightness.value}%)`;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };
//   reset[i].onclick = function () {
//     sepia.value = "10";
//     ctx.filter = `sepia(${sepia.value}%)`;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };
//   reset[i].onclick = function () {
//     grayscale.value = "10";
//     ctx.filter = `grayscale(${grayscale.value}%)`;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };
//   reset[i].onclick = function () {
//     blur.value = "10";
//     ctx.filter = `blur(${blur.value}%)`;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };
//   reset[i].onclick = function () {
//     hueRotate.value = "10";
//     ctx.filter = `hueRotate(${hueRotate.value}%)`;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };
// }

let allLi = document.querySelectorAll(".filters ul li span");

for (let i = 0; i < allLi.length; i++) {
  allLi[
    i
  ].innerHTML = `<button class="reset" onclick="reseti()">Reset</button>`;
  // let btn = document.createElement("button")
  // btn.innerHTML = "Reset"
  // btn.className = "reset"
  // btn. = "gg"

  // allLi[i].appendChild(btn)
}

// allLi.forEach((li) => {
//   let btn = document.createElement("button")
//   btn.className = "reset"
//   btn.innerHTML = "Reset"
//   btn.onclick=function () {
//     console.log("hh");
//   }

//   li.append(btn)

//   // li.append(`<button class="reset" onclick="reseti()">Reset</button>`)
// })
