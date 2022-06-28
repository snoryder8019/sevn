/** @type {HTMLCanvasElement}*/

//const bFX = document.getElementById('backgroundFX');
const canvas = document.getElementById('bkgdCanvas');
const ctx = canvas.getContext('2d');

canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

class Core {
  constructor (x,y){
      this.x=x;
    this.y=y;
    this.speedX = Math.random()*4-2;
    this.speedY = Math.random()*4-2;
    this.maxSize = Math.random() * 7 +5;
    this.size = Math.random() * 1+2;
    this.va = Math.random()* .22 + 0.05
    this.angle =Math.random()*6.2;
  }
  update(){
    this.x +=this.speedX + Math.sin(this.angle);
    this.y +=this.speedY + Math.sin(this.angle);
    this.size +=this.va;
    this.angle +=this.va;
    //console.log('checking if statement')
    if(this.size < this.maxSize){
      //console.log('if logic')
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size, 0, Math.PI *2);
      ctx.fillStyle = 'hsl(190,100%,50%)';
      ctx.fill();
      ctx.stroke();
      requestAnimationFrame(this.update.bind(this));
    }
  }
}
window.addEventListener('mousemove', function(e){
 // console.log('listenerAdded')
  const core = new Core(e.x,e.y);
  core.update();
});
