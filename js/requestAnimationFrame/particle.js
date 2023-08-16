const canvas = document.querySelector("#canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");

const particles = [];

function Particle(x, y, speedX, speedY, radius, color) {
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.radius = radius;
  this.color = color;
}
console.log(canvas.width, canvas.height);
Particle.prototype.update = function () {
  this.x += this.speedX;
  this.y += this.speedY;

  if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
    this.speedX = -this.speedX;
  }

  if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
    this.speedY = -this.speedY;
  }
};

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
};

function createParticles() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = Math.random() * 4 - 2;
    const speedY = Math.random() * 4 - 2;
    const radius = Math.random() * 5 + 1;
    const color = getRandomColor();

    particles.push(new Particle(x, y, speedX, speedY, radius, color));
  }
}

function updateParticles() {
  particles.forEach((particle) => {
    particle.update();
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.draw();
  });

  updateParticles();
  requestAnimationFrame(drawParticles);
}

// 使用示例
createParticles();
drawParticles();

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
