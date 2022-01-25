const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const buttonStart = document.getElementById("start");


let frames = 0;
let requestID;
let audio = new Audio ()
audio.src = "assets/audio/pop.mp3"
let audio1 = new Audio ()
audio1.src ="assets/audio/gameover.mp3"
let bullets =[]
const enemies =[]
const imageEnemies = ["assets/images/momia_v1.png","assets/images/momia_v2.png","assets/images/momiablanca_v1.png","assets/images/momiablanca_v2.png"]


// CLASES

class Background{
    constructor(){
     
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "assets/images/background3.png"
    }   

    //metodos

    draw() {
        this.x -= 2;
        if(this.x < -canvas.width){
            this.x = 0
        }


        ctx.drawImage(this.image,this.x,this.y, this.width,this.height)
        
        ctx.drawImage(
            this.image,
            this.x + this.width, 
            this.y ,
            this.width,
            this.height    
            )
    }

    gameOver(){
        ctx.fillStyle="red"
        ctx.font = "70px Arial"
        ctx.fillText("GAME OVER",50,325)
        audio1.play()
      }


    
}

class Luchador{
    constructor(x,y,w,h){
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.image = new Image()
      this.image.src = "assets/images/luchador.png"  
    }

  
    //metodos
    draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
  }


  class Enemy{
    constructor(x,y,w,h){
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.image = new Image()
      this.image.src = ""
    }

  
    //metodos
    draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
  }



class Silla {
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 50
        this.height = 50
        this.image = new Image()
        this.image.src = "assets/images/silla.png"
    }

    draw(){
        
        if(frames % 10 === 0){
            this.x +=5
        }
        
        ctx.drawImage(this.image,this.x,this.y, this.width, this.height)
    }


}





// INSTANCIAS

const background = new Background()
const luchador = new Luchador(100,450,90,120)
const silla = new Silla()


function startGame() {
    console.log("prueba de inicio de juego")
    requestID = requestAnimationFrame(updateCanvas)
}







function updateCanvas(){
    frames ++;
  
    ctx.clearRect(0,0,canvas.width, canvas.height)
    background.draw()
    luchador.draw()
    score()
    corazones()
    generateEnemies()
    drawEnemies()
    

if(requestID){
    requestID = requestAnimationFrame(updateCanvas)
    }
   
}



// iniciar juego con un boton

buttonStart.addEventListener("click",startGame)






// movimientos de 'el santo'
addEventListener("keydown",(event) => {
    //izquierda (flecha)
    if(event.keyCode === 37){
        if (luchador.x > 10){
          luchador.x -=20  
        }}
    //derecha (flecha)
    if(event.keyCode === 39){
        if (luchador.x < canvas.width-80){
          luchador.x +=20  
        }}
    //arriba (flecha)
    if(event.keyCode === 38){
        if (luchador.y > 70){
          luchador.y -=20  
        }}
  
        //abajo (flecha)
        if(event.keyCode === 40){
            if (luchador.y < canvas.height-120){
              luchador.y +=20  
            }}

    //disparar (space)
    if (event.keyCode === 32){
            console.log("se dispara")
            bullets.push(new Silla(luchador.x, luchador.y))
            audio.play()
        }
    })

// agregarle el conteo de score conforme pasa el tiempo
function score(){
    const puntos = Math.round(frames/25)
    ctx.fillStyle="white"
    ctx.font = '50px Arial';
    ctx.fillText(`Score ${puntos}`, 1150, 65);
  }

// dibujarle un corazoncito con las vidas restantes
  function corazones(){
    const vida = new Image()
    vida.src = "assets/images/vidas.png"
    ctx.drawImage(vida,0,0,120,75)
    ctx.fillStyle="white"
    ctx.font = '50px Arial';
    ctx.fillText(`X 10`, 110,60); // hay que meterle un if o un switch para que vayan bajando las vidas

  }







  // Generar enemigos
  function generateEnemies(){
   
    if(frames % 50===0 || frames % 100 === 0 || frames % 20 ===0){

        let y = Math.floor(Math.random() * (1000 - 10) ) + 10
        let imgRand = Math.floor(Math.random() * imageEnemies.length)
        const enemy = new Enemy (canvas.width,y,50,50,imageEnemies[imgRand])
        enemies.push(enemy)
    }
}

// Pintar enemigos
function drawEnemies(){

    enemies.forEach((enemy,index_enemy) => {
        enemy.draw()
    })}
//         //hacer collision
//             // if(mario.collision(enemy)){
//         //console.log("Me esta tocando")
//         // requestID = undefined
//         // fondo.gameOver()
//         // }
//         bullets.forEach((bullet,index_bullet) =>{
//             bullet.draw()
            
//             //validar si choca con un enemigo
//             if(enemy.collision(bullet)){
//                 enemies.splice(index_enemy,1)
//                 /*
//                 if (enemy.type === 2){
//                     score += 100
//                 }              

//                 */
//             }

//             //sacar la bala si se sale del canvas
//             if(bullet.x + bullet.width >= 800){
//                 bullets.splice(index_bullet,1)
//             }
//         })

//         //eliminar al enemigo si se sale del canvas
//         //para sacar al enemigo y evitar que el browser se alente y se coma toda la ram
//         //vamos a limpiar el array de los enemigos que ya no vemos en el canvas
//         if (enemy.x + enemy.width <= 0){
//             enemies.splice(index_enemy,1)
//         }


//     });
// }

