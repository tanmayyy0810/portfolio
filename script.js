// Interactive Mouse-Reactive Starfield
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Track mouse for parallax effect
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        // Base drift speed
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        // Calculate parallax movement based on mouse position
        let dx = (mouseX - canvas.width / 2) * 0.0005;
        let dy = (mouseY - canvas.height / 2) * 0.0005;

        this.x += this.baseSpeedX + dx;
        this.y += this.baseSpeedY + dy;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize stars
for (let i = 0; i < 250; i++) {
    stars.push(new Star());
}

function animate() {
    // Slight trailing effect for the background
    ctx.fillStyle = 'rgba(5, 5, 10, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// Window Resize Handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Audio & Interaction Logic
const track = document.getElementById('interstellar-track');
const audioToggle = document.getElementById('audio-toggle');
const hyperBtn = document.getElementById('hyperspace-btn');
let isPlaying = false;

track.volume = 0.4; // Set a cinematic background volume

function toggleAudio() {
    if (!isPlaying) {
        track.play();
        if (audioToggle) {
            audioToggle.innerText = "Mute Audio 🔇";
            audioToggle.style.borderColor = "var(--neon-purple)";
            audioToggle.style.color = "var(--neon-purple)";
        }
        isPlaying = true;
    } else {
        track.pause();
        if (audioToggle) {
            audioToggle.innerText = "Engage Audio 🎵";
            audioToggle.style.borderColor = "var(--glass-border)";
            audioToggle.style.color = "var(--text-light)";
        }
        isPlaying = false;
    }
}

// Play audio via top button
if (audioToggle) {
    audioToggle.addEventListener('click', toggleAudio);
}

// Hyperspace Button Effect + Audio Trigger
hyperBtn.addEventListener('click', () => {
    if (!isPlaying) toggleAudio();
    
    hyperBtn.innerText = "Warp Speed Active...";
    hyperBtn.style.background = "var(--neon-purple)";
    hyperBtn.style.color = "#fff";
    
    // Temporarily speed up stars for hyperspace effect
    stars.forEach(star => {
        star.baseSpeedX *= 10;
        star.baseSpeedY *= 10;
    });

    setTimeout(() => {
        hyperBtn.innerText = "Initiate Hyperspace";
        hyperBtn.style.background = "transparent";
        hyperBtn.style.color = "var(--neon-purple)";
        // Reset speed
        stars.forEach(star => {
            star.baseSpeedX /= 10;
            star.baseSpeedY /= 10;
        });
    }, 2000);
});