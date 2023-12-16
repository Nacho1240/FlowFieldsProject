const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//canvas settings
//fillstyle is the color of the shape
ctx.fillStyle = 'white';
//strokestyle is the color of the stroke
ctx.strokeStyle = 'white';
//linewidth is the width of the stroke
ctx.lineWidth = 1;

class Particle{
    //i pass the efect to be referenced by the particle its like a pointer
    constructor(effect){
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.w);
        this.y = Math.floor(Math.random() * this.effect.h);
    }

    draw(ctx){
        //fill rect is to draw a rectangle on the position x, y with the width and height passed as parameters
        //x and y are random values between 0 and the width and height of the canvas
        ctx.fillRect(this.x, this.y, 10, 10);

    }

}

//class to do the effect (in this case to do the flow field effect)
class Effect{

    constructor(w, h){
        this.w = w;
        this.h = h;
        this.particles = [];
        this.numberParticles = 100;
        effect.init();
    }

    init(){
        //create the particles
        for(let i = 0; i < this.numberParticles; i++){
            this.particles.push(new Particle(this));           
        }
    }

    render(ctx){
        this.particles.forEach(particle => {
            particle.draw(ctx);
        });
    }
}

const effect = new Effect(canvas.width, canvas.height);
effect.render(ctx);