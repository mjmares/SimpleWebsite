const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");
let particlesArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle canvas resizing
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.life = 50;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 1;
        if (this.life <= 0) {
            this.size -= 0.1;
        }
    }

    draw() {
        if (this.size > 0) { // Ensure size is positive before drawing
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}

// Create particles at mouse position
function createParticles(e) {
    const mouseX = e.x;
    const mouseY = e.y;
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle(mouseX, mouseY));
    }
}

// Animate particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray = particlesArray.filter(p => p.size > 0);

    for (let particle of particlesArray) {
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animate);
}

// Add mousemove event listener
window.addEventListener("mousemove", createParticles);

// Start animation
animate();
