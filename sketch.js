const log = console.log;

log('sketch');

const canvas = document.querySelector('#canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext('2d');

const zoomInButton = document.querySelector('.zoom.in');
const zoomOutButton = document.querySelector('.zoom.out');

document.addEventListener('click',clickEvent);

const newOrigin = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

ctx.translate(newOrigin.x,newOrigin.y);
ctx.scale(1,-1);

const originalScaleFactor = 64;
let scaleFactor = originalScaleFactor;
// let fontSize = scaleFactor/2;
let fontSize = 18;

class Equation{
    constructor(a,b,c,color){
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = color;
    }

    createGraph(){

        log(this.a,this.b,this.c);

        const slope = -(this.a/this.b);
        const intercept = -(this.c/this.b);

        const scaledIntercept = intercept * scaleFactor;

        log(slope,scaledIntercept);
    
        const eqnLine = new Path2D();
    
        for(let i = 0; i < canvas.width/2; i += 1){
            
            const x1 = i;
            const y1 = slope*(x1) + scaledIntercept;
            // log(y1);
    
            const x2 = i + 1;
            const y2 = slope*(x2) + scaledIntercept;
    
            eqnLine.moveTo(x1,y1);
            eqnLine.lineTo(x2,y2);
        }
    
        for(let i = 0; i > -canvas.width/2; i -= 1){
            
            const x1 = i;
            const y1 = slope*(x1) + scaledIntercept;
            // log(y1);
    
            const x2 = i - 1;
            const y2 = slope*(x2) + scaledIntercept;
    
            eqnLine.moveTo(x1,y1);
            eqnLine.lineTo(x2,y2);
        }
    
        const points = new Path2D();
    
        for(let i = 0; i < canvas.width/2; i += scaleFactor){
            const x1 = i;
            const y1 = slope*(x1) + scaledIntercept;

            // log(y1);
    
            points.arc(x1,y1,2,0,2*Math.PI);
        }
        for(let i = 0; i > -canvas.width/2; i -= scaleFactor){
            const x1 = i;
            const y1 = slope*(x1) + scaledIntercept;
    
            points.arc(x1,y1,2,0,2*Math.PI);
        }
    
        // ctx.scale(1,-1);
        ctx.strokeStyle = this.color;
        ctx.stroke(eqnLine);
    
        ctx.fillStyle = this.color;
        ctx.fill(points);
    }
    
}

const inputA1 = document.querySelector('.input.a1'); 
const inputB1 = document.querySelector('.input.b1'); 
const inputC1 = document.querySelector('.input.c1'); 

const inputA2 = document.querySelector('.input.a2'); 
const inputB2 = document.querySelector('.input.b2'); 
const inputC2 = document.querySelector('.input.c2');



inputA1.value = 1;
inputB1.value = 1;
inputC1.value = 0;

inputA2.value = -1;
inputB2.value = 1;
inputC2.value = 0;

const color1 = 'rgba(225, 255, 0, 0.7)';
const color2 = 'rgba(0, 255, 0, 0.7)';

const equation1 = new Equation(inputA1.value,inputB1.value,inputC1.value,color1);
const equation2 = new Equation(inputA2.value,inputB2.value,inputC2.value,color2);

function createAxes(){
    const xAxis = new Path2D(); 
    xAxis.moveTo(0 - canvas.width/2, 0);
    xAxis.lineTo(canvas.width/2,0);

    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.stroke(xAxis);

    const yAxis = new Path2D(); 

    yAxis.moveTo(0,0 - canvas.height/2);
    yAxis.lineTo(0,canvas.height/2);

    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.stroke(yAxis);
}

function createStrokes(){
    const xStrokes = new Path2D();

    for(let i = 0; i < canvas.width/2; i += originalScaleFactor){
        xStrokes.moveTo(i,0);
        xStrokes.lineTo(i,-5);
        xStrokes.moveTo(i,0);
        xStrokes.lineTo(i,5);
    }
    
    for(let i = 0; i > -canvas.width/2; i -= originalScaleFactor){
        xStrokes.moveTo(i,0);
        xStrokes.lineTo(i,-5);
        xStrokes.moveTo(i,0);
        xStrokes.lineTo(i,5);
    }
    
    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.stroke(xStrokes);

    const yStrokes = new Path2D();

    for(let i = 0; i < canvas.height/2; i += originalScaleFactor){
        yStrokes.moveTo(0,i);
        yStrokes.lineTo(-5,i);
        yStrokes.moveTo(0,i);
        yStrokes.lineTo(5,i);
    }
    
    for(let i = 0; i > -canvas.height/2; i -= originalScaleFactor){
        yStrokes.moveTo(0,i);
        yStrokes.lineTo(-5,i);
        yStrokes.moveTo(0,i);
        yStrokes.lineTo(5,i);
    }
    
    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.stroke(yStrokes);
}

function createLabels(){
    // numbers on x
    ctx.scale(1,-1);
    for(let i = originalScaleFactor; i < canvas.width/2; i += originalScaleFactor){
        ctx.fillStyle = 'rgb(250, 192, 192)';
        ctx.font = `${fontSize}px serif`;
        ctx.fillText(`${i/scaleFactor}`,i-3,25);
    }

    // numbers on -x
    for(let i = -originalScaleFactor; i > -canvas.width/2; i -= originalScaleFactor){
        ctx.fillStyle = 'rgb(250, 192, 192)';
        ctx.font = `${fontSize}px serif`;
        ctx.fillText(`${i/scaleFactor}`,i-6,25);
    }

    // due to scaling
    // numbers on -y
    for(let i = originalScaleFactor; i < canvas.height/2; i += originalScaleFactor){
        ctx.fillStyle = 'rgb(250, 192, 192)';
        ctx.font = `${fontSize}px serif`;
        ctx.fillText(`${-i/scaleFactor}`,-30,i+5);
    }

    // numbers on y
    for(let i = -originalScaleFactor; i > -canvas.height/2; i -= originalScaleFactor){
        ctx.fillStyle = 'rgb(250, 192, 192)';
        ctx.font = `${fontSize}px serif`;
        ctx.fillText(`${-i/scaleFactor}`,-25,i+5);
    }

    ctx.scale(1,-1);
}

function findIntersection(eq1,eq2){
    const a1 = eq1.a;
    const b1 = eq1.b;
    const c1 = eq1.c;

    const a2 = eq2.a;
    const b2 = eq2.b;
    const c2 = eq2.c;

    log(eq1.a);
    
    // solution of linear equations by cross-multiplication
    // if b2a1 - b1a2 != 0
    // x = (b1c2 - b2c1) / (b2a1 - b1a2)
    // y = (c1a2 - c2a1) / (b2a1 - b1a2)

    if((b2*a1 - b1*a2) != 0){
        const x = (b1*c2 - b2*c1) / (b2*a1 - b1*a2);
        const y = (c1*a2 - c2*a1) / (b2*a1 - b1*a2);

        log('sol: ',x,y);

        drawIntersection(x,y);

    }
}

function drawIntersection(x,y){
    const scaledX = x * scaleFactor;
    const scaledY = y * scaleFactor;

    log('scaled sol:',scaledX,scaledY);

    const intersection = new Path2D();
    intersection.arc(scaledX,scaledY,4,0,2*Math.PI);

    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.fill(intersection);

    ctx.scale(1,-1);
    ctx.font = '20px serif';

    // rounding off to 2 decimal places

    x = Math.round(100 * x)/100;
    y = Math.round(100 * y)/100;

    ctx.fillText(`(${x},${y})`,scaledX + 10,-scaledY-5);
    ctx.scale(1,-1);
}

function animate(){
    ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);

    createAxes();
    createStrokes();
    createLabels();
    equation1.createGraph();
    equation2.createGraph();

    findIntersection(equation1,equation2);

    log(scaleFactor);

    if(scaleFactor == 2 * originalScaleFactor){
        zoomInButton.disabled = true;
    }
    else{
        zoomInButton.disabled = false;
    }
    if(scaleFactor == 2){
        zoomOutButton.disabled = true;
    }
    else{
        zoomOutButton.disabled = false;
    }
}

animate();


function clickEvent(event){
    if(event.target.classList == 'zoom in'){
        scaleFactor *= 2;

        animate();
    } 

    if(event.target.classList == 'zoom out'){
        scaleFactor /= 2;

        animate(); 
    }

    if(event.target.classList == 'create-button'){
        equation1.a = inputA1.value;
        equation1.b = inputB1.value;
        equation1.c = inputC1.value;

        equation2.a = inputA2.value;
        equation2.b = inputB2.value;
        equation2.c = inputC2.value;

        animate();
    }
}








