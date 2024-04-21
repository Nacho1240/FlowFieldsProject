const canvas = document.getElementById('canvas');
//const zoomInput = document.getElementById('zoom');
//const curveInput = document.getElementById('curve');

//set the context of the canvas to 2d
const ctx = canvas.getContext('2d');

//set the width and height of the canvas to the width and height of the window
//obiously you can set to an specific value
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//i commented this because i wanted to play with the values of zoom and curve with an input on real time
//zoomInput.addEventListener('change', function () {
//    effect.zoom = parseFloat(zoomInput.value);
//    effect.init();
//});

//curveInput.addEventListener('change', function () {
//    effect.curve = parseInt(curveInput.value);
//    effect.init();
//});

//canvas settings
//fillstyle is the color of the shape
ctx.fillStyle = 'white';
//strokestyle is the color of the stroke
ctx.strokeStyle = 'white';
//linewidth is the width of the stroke
ctx.lineWidth = 1;

//class to do the particles
class Particle{
    //i pass the efect to be referenced by the particle its like a pointer
    constructor(effect){
        this.effect = effect;
        //the x and y are random values between 0 and the width and height of the canvas
        this.x = Math.floor(Math.random() * this.effect.w);
        this.y = Math.floor(Math.random() * this.effect.h);

        //i dont put any value on here because i change this on the update method
        this.xSpeed;
        this.ySpeed;

        //this set a modifier to the speed of the particle
        this.SpeedModifier = Math.floor(Math.random() * 3 + 1);

        //this is the history of the particle (the path that the particle has done)
        this.history = [{x: this.x, y: this.y}];
        //this is the max history of the particle (the max length of the history)
        this.maxHistory = Math.floor(Math.random() * 200 + 10);
        //set the angle to 0 because this is gonna to be used on the effect class
        this.angle = 0;

        //max time of life of the particle
        this.timer = this.maxHistory * 2;
    }

    draw(ctx){
        //fill rect is to draw a rectangle on the position x, y with the width and height passed as parameters
        //x and y are random values between 0 and the width and height of the canvas
        ctx.fillRect(this.x, this.y, 1, 1);

        //beginPath is to start a path (like a line)
        ctx.beginPath();
        //moveTo is to move the path to a position x, y
        ctx.moveTo(this.history[0].x, this.history[0].y);

        //this is to make the path behind the particle (the history)
        for(let i = 0; i < this.history.length; i++){
            ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        //stroke makes the stroke of the path
        ctx.stroke();
    }

    update(){
        //everytime the particle is updated the timer is decreased by one
        this.timer--;

        //if the timer is greater than 1 the particle is updated (is to control the death of the particle)
        if(this.timer >= 1){
            //this is to get the index of the flow field array
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);

            //this calculates the position of the particle on the flow field matrix)
            let index = x + y * this.effect.cols ;

            //this set the angle of the particle to the angle of the flow field  on that specific cell
            let angle = this.effect.flowField[index];

            //on the standars i put here cos on x and sin on y but i am playing with other values
            this.xSpeed = Math.cos(angle);
            this.ySpeed = Math.cos(angle);

            //on here the x speed and the y speed is multiplied by the speed modifier to randomize even more the speed and direction of the particle
            this.x += this.xSpeed * this.SpeedModifier;
            this.y += this.ySpeed * this.SpeedModifier;

            /*this.angle += 0.5;
            this.x += this.xSpeed + Math.sin(this.angle) * 2;
            this.y += this.ySpeed + Math.cos(this.angle) * 2;*/

            //insert into the history array the last position of the particle to make the path
            this.history.push({x: this.x, y: this.y});

            //if the history is greater than the max history the first position of the history is deleted
            if(this.history.length > this.maxHistory){
                this.history.shift();
            }
        } else if(this.history.length > 1){
            //if the timer is less than 1 and the history is greater than 1 the first position of the history is deleted (to delete the path of the particle)
            this.history.shift();
        }else{
            //if the timer is less than 1 and the history is less than 1 the particle is reseted
            this.reset();
        }    
    }

    //reset method that set the particle to the initial values
    reset(){
        //reset the particle to a random position on x and y 
        this.x = Math.floor(Math.random() * this.effect.w);
        this.y = Math.floor(Math.random() * this.effect.h);
        //reset the history of the particle (because the particle is reseted)
        this.history = [{x: this.x, y: this.y}];
        //reset the timer
        this.timer = this.maxHistory * 2;
    }
}

//class to do the effect (in this case to do the flow field effect)
class Effect{

    constructor(w, h){
        //standard values tht dont have to be changed
        this.w = w;
        this.h = h;
        this.particles = [];
        this.cols;
        this.rows;
        this.flowField = [];

        //values to play width
        this.numberParticles = 900;
        this.cellSize = 20;
        this.zoom = 0.13;
        this.curve = 12;

        //the initialice function
        this.init();
    }

    init(){
        //create the flow field
        this.rows = Math.floor(this.h / this.cellSize);
        this.cols = Math.floor(this.w / this.cellSize);
        this.flowField = [];

        //this for do all the magic, the for is going through all the rows and cols and calculate the angle (like in a matrix)
        //and then push it to the flowField array (calculate the angle with cos and sin). i have to try with random values.
        //all the function to see on the flow field has to be here
        for(let j = 0; j < this.rows; j++){
            for(let i = 0; i < this.cols; i++){
                let angle = (Math.cos(i * this.zoom) + Math.sin(j * this.zoom)) * this.curve;
                this.flowField.push(angle);
            }
        }

        //create the particles
        for(let i = 0; i < this.numberParticles; i++){
            this.particles.push(new Particle(this));           
        }
    }

    //render the particles
    render(ctx){
        this.particles.forEach(particle => {
            particle.draw(ctx);
            particle.update();
        });
    }
}

//create an effect object
const effect = new Effect(canvas.width, canvas.height);

//this is a recursive function that calls animate over and over again to make the animation
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render(ctx);
    requestAnimationFrame(animate);
}

//call the animate function
animate();