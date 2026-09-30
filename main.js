// --- Canvas Heart Particles ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const hearts = [];

class Heart {
    constructor() {
        this.reset();
        // Initially distribute them across the screen vertically
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 15 + 8; // Size between 8 and 23
        this.speed = Math.random() * 2 + 1; // Speed between 1 and 3
        this.opacity = Math.random() * 0.5 + 0.3; // Opacity between 0.3 and 0.8
        
        // Array of romantic pastel colors
        const colors = [
            `rgba(255, 182, 193, ${this.opacity})`, // LightPink
            `rgba(255, 105, 180, ${this.opacity})`, // HotPink
            `rgba(255, 192, 203, ${this.opacity})`, // Pink
            `rgba(255, 228, 225, ${this.opacity})`  // MistyRose
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random horizontal sway factor
        this.sway = Math.random() * 0.05 + 0.02;
        this.swayPhase = Math.random() * Math.PI * 2;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        // Heart curve calculations
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        ctx.bezierCurveTo(
            this.x, this.y, 
            this.x - this.size / 2, this.y, 
            this.x - this.size / 2, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y, 
            this.x, this.y, 
            this.x, this.y + topCurveHeight
        );
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        // Wiggle/Sway effect
        this.x += Math.sin(this.y * this.sway + this.swayPhase) * 1.5;

        // Reset if it goes off screen
        if (this.y > canvas.height + this.size) {
            this.reset();
        }
        this.draw();
    }
}

function initHearts() {
    // Create 45 hearts
    for (let i = 0; i < 45; i++) {
        hearts.push(new Heart());
    }
}

function animateHearts() {
    requestAnimationFrame(animateHearts);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => heart.update());
}

// Start canvas animation
initHearts();
animateHearts();


// --- UI Interactions ---
const welcomeScene = document.getElementById('welcomeScene');
const cardScene = document.getElementById('cardScene');
const birthdayCard = document.getElementById('birthdayCard');
const bgMusic = document.getElementById('bgMusic');

// Handle click on welcome card
welcomeScene.addEventListener('click', () => {
    // 1. Hide welcome scene
    welcomeScene.classList.add('hidden');
    
    // 2. Play background music
    bgMusic.volume = 0.6; // Not too loud
    bgMusic.play().catch(err => {
        console.log('Audio playback prevented by browser policy:', err);
    });

    // 3. Show the 3D card scene after a short fade-out delay
    setTimeout(() => {
        cardScene.classList.remove('hidden');
    }, 600);
});

// Handle clicking the 3D card to open/close
birthdayCard.addEventListener('click', function() {
    this.classList.toggle('open');
});
