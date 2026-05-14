// MAIN PARTICLE BACKGROUND
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 250; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    d: Math.random() * 1.5 + 0.5,
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,255,200,0.6)";

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  update();
}

function update() {
  particles.forEach((p) => {
    p.y -= p.d;

    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }
  });
}

setInterval(draw, 20);

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// LOADING SCREEN PARTICLES
const loaderCanvas = document.getElementById("loaderCanvas");
const loaderCtx = loaderCanvas.getContext("2d");

loaderCanvas.width = window.innerWidth;
loaderCanvas.height = window.innerHeight;

let loaderParticles = [];

for (let i = 0; i < 200; i++) {
  loaderParticles.push({
    x: Math.random() * loaderCanvas.width,
    y: Math.random() * loaderCanvas.height,
    r: Math.random() * 2 + 0.5,
    d: Math.random() * 1.5 + 0.5,
  });
}

function drawLoaderParticles() {
  loaderCtx.clearRect(0, 0, loaderCanvas.width, loaderCanvas.height);
  loaderCtx.fillStyle = "rgba(0,255,200,0.6)";

  loaderParticles.forEach((p) => {
    loaderCtx.beginPath();
    loaderCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    loaderCtx.fill();
  });

  updateLoaderParticles();
}

function updateLoaderParticles() {
  loaderParticles.forEach((p) => {
    p.y -= p.d;
    if (p.y < 0) {
      p.y = loaderCanvas.height;
      p.x = Math.random() * loaderCanvas.width;
    }
  });
}

setInterval(drawLoaderParticles, 20);

window.addEventListener("resize", () => {
  loaderCanvas.width = window.innerWidth;
  loaderCanvas.height = window.innerHeight;
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }, 3000);
});
