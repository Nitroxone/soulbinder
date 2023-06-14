class Particle {
    constructor(x, y, vx, vy, life, maxlife) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.maxlife = maxlife;

        this.id = null;
        this.gravity = null;
    }
}
class ParticleLine {
    constructor(x, vx, life, maxlife) {
        this.id = null;
        this.x = x;
        this.vx = vx;
        this.life = life;
        this.maxlife = maxlife;
    }
}

function getTooltipParticlesCanvas(item) {
    // creating the canvas 
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 232;
    canvas.height = 60;
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";
    //canvas.style.border = "1px dashed grey";
    canvas.id = 'tooltipparticles-' + item.id;

    // particles
    let particles = {},
    lines = {},
    lineIndex = 0,
    particleIndex = 0,
    psettings = {
        density: getParticleDensity(item.rarity),
        particleSize: 1.3,
        startingX: () => { return getRandomNumber(canvas.width / 3, canvas.width / 3 * 2)},
        startingY: () => { return canvas.height},
        gravity: getParticleGravity(item.rarity),
        fillStyle: getRarityColorCode(item.rarity),
    },
    lsettings = {
        density: 2,
        startingX: () => { return getRandomNumber(canvas.width / 2 - 15, canvas.width / 2 + 15)},
        fillStyle: hexToRGBA(getRarityColorCode(item.rarity), getRandomNumber(0.2, 0.7)),
    };


    ctx.filter = 'blur(0.5px)';
    // handling particles
    clearInterval(this.particlesTooltipCanvasInterval);
    this.particlesTooltipCanvasInterval = setInterval(() => {
        for(let i = 0; i < psettings.density; i++) {
            if(Math.random() > 0.97) {
                let particle = new Particle(psettings.startingX(), psettings.startingY(), getParticleVelocityX(item.rarity), -getParticleVelocityY(item.rarity), 0, getParticleLifetime(item.rarity));
                particleIndex++;
                particles[particleIndex] = particle;
                particle.id = particleIndex;
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);  
        for(let i in particles) {
            let me = particles[i];
            me.x += me.vx;
            me.y += me.vy;

            // adjust for gravity
            me.vy += psettings.gravity;

            // age the particle
            me.life++;

            // if particle is old, goes in the chamber for renewal
            if(me.life >= me.maxlife) delete particles[me.id];

            // create shapes
            ctx.fillStyle = psettings.fillStyle;
            // draw
            ctx.beginPath();
            ctx.arc(me.x, me.y, psettings.particleSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }, 30);

    domWhat('iconcloud-' + item.id).appendChild(canvas);
}