// Quanta is Soulbinder's homemade particle engine.
class Quanta {

    static fps = 60;

    static burst(props) {
        const canvas = getValueFromObject(props, "canvas", null);
        const color = getValueFromObject(props, "color", 'white');
        const amount = getValueFromObject(props, "amount", 200);
        const particleSize = getValueFromObject(props, "particleSize", 3);
        const duration = getValueFromObject(props, "duration", 1500);
        const fadeAwayRate = getValueFromObject(props, "fadeAwayRate", 0);
        const speed = getValueFromObject(props, "speed", {
            x: () => { return (-2 + Math.random() * 2) },
            y: () => { return (-2 + Math.random() * 10) }
        });
        const start = getValueFromObject(props, "start", {
            x: () => { return getRandomNumber(0, canvas.width) },
            y: () => { return canvas.height }
        })

        if(!canvas) throw new Error('Passed an unexisting Canvas to Quanta.');

        if(amount <= 0) return;
        let particles = [];
        for(let i = 0; i < amount; i++) {
            particles.push(new QuantaParticle({
                color: color,
                radius: particleSize,
                startX: start.x(),
                startY: start.y(),
                animationDuration: duration,
                speed: {
                    x: speed.x(),
                    y: speed.y(),
                }
            }));
        }
        
        Quanta.update({
            canvas: canvas,
            particles: particles,
            fadeAwayRate: fadeAwayRate,
        });
    }

    static update(props) {
        const canvas = getValueFromObject(props, "canvas", null);
        if(!canvas) throw new Error('Passed an unexisting Canvas to Quanta.');
        const ctx = canvas.getContext('2d');
        const fadeAwayRate = getValueFromObject(props, "fadeAwayRate", 0.009);
        let particles = getValueFromObject(props, "particles", []);

        let lastFrameTime = 0;
        const targetFrameTime = 1000 / Quanta.fps;

        ctx.globalAlpha = 1;
        function animate(currentTime) {
            const elapsed = currentTime - lastFrameTime;

            if(elapsed > targetFrameTime) {
                // Clear out the old particles
                if(typeof ctx !== 'undefined') {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.globalAlpha -= fadeAwayRate;
                }

                // Draw 
                for(let i = 0; i < particles.length; i++) {
                    let p = particles[i];

                    p.draw(ctx);

                    // Simple way to clean up if the last particle is done animating
                    if(i === particles.length - 1) {
                        let percent = (Date.now() - p.startTime) / p.animationDuration;
                        if(percent > 1) {
                            particles = [];
                        }
                    }
                }

                lastFrameTime = currentTime;
            }

            if(particles.length > 0) requestAnimationFrame(animate);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        requestAnimationFrame(animate);
    }
}

class QuantaParticle {
    constructor(props) {
        this.x = getValueFromObject(props, 'x', 0);
        this.y = getValueFromObject(props, 'y', 0);
        this.startX = getValueFromObject(props, 'startX', 0);
        this.startY = getValueFromObject(props, 'startY', 0);
        this.startTime = getValueFromObject(props, 'startTime', Date.now());
        this.maxlife = getValueFromObject(props, 'maxlife', 50 + Math.random() * 10);
        this.life = this.maxlife;
        this.speed = getValueFromObject(props, "speed", {
            x: -2 + Math.random() * 2,
            y: -2 + Math.random() * 10
        });
        this.acceleration = getValueFromObject(props, "acceleration", {
            x: 0,
            y: 0
        })
        this.curve = getValueFromObject(props, "curve", {
            factor: 0,
            amplitude: 0
        });
        this.origRadius = getValueFromObject(props, "radius", 1);
        this.radius = getValueFromObject(props, "radius", 1);
        this.color = getValueFromObject(props, "color", "#ccc");
        this.animationDuration = getValueFromObject(props, "animationDuration", 1000);
    }

    draw(ctx) {
        let p = this;

        if(p.life > 0 && p.radius > 0) {
            ctx.beginPath();
            ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Update
            p.life--;
            p.radius -= 0.05;
            p.speed.x += p.acceleration.x;
            p.speed.y += p.acceleration.y;
            p.startX += p.speed.x;
            p.startY += p.speed.y;

            if(p.curve.factor !== 0 && p.curve.amplitude !== 0) p.startX += p.curve.amplitude * Math.sin(p.curve.factor * p.startY * Math.PI);
        }
    }
}