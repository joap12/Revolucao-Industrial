let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

// create the unit
let box = 32;

// Questions Reply's

const q1 = 'A primeira vez, que o capitalismo foi empregado em sociedade, foi na <b>revolução industrial</b>, onde se desenvolveu até os dias atuais.';
const q2 = 'Maquinofatura é a indústria mecanizada, que surgiu com a evolução das manufaturas na <b>revolução industrial</b>, com a introdução de motores a vapor para movimentar as máquinas que dependiam da força humana, dos animais, dos ventos ou da água.';
const q3 = 'A Revolução Industrial, foi um período que teve início, a partir da segunda metade do século XVIII.';
const q4 = 'A <b>revolução industrial</b> ao todo, teve 3 fases sendo divididas entre: 1º(1750-1850); 2º(1850-1950); 3º(1950-Atualidade).';
const q5 = 'A era vitoriana foi o período do reinado da rainha Vitória, de junho de 1837 até sua morte em janeiro de 1901.';
const q6 = '';
const q7 = '';



// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const certo = '<img src="https://www.otempo.com.br/image/contentid/policy:1.2627146:1646655744/image.jpg?f=3x2&w=1200&$p$f$w=a9f248b" height="225px">';
const errado = '<img src="https://img.ifunny.co/images/c519bf7599080a0d7fcf8d8b79a2119a0939a617713bd35c98932293766e7e89_1.jpg" height="225px">';
// load audio files

let acerto = new Audio();
let erro = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

acerto.src = "audio/acerto.mp3";
erro.src = "audio/erro.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// create the food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}
// create the score var

let score = 0;

// create the hits var

let acertos = 0;

// control the snake
let direction;

function criarBG(){
    context.drawImage(ground,0,0)
    //context.fillStyle = "lightgreen";
    //context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.drawImage(foodImg, food.x, food.y);
    //context.fillStyle = "red";
    //context.fillRect(food.x, food.y, box, box);
}

function foodNotOnSnake(){
    if (food.x) {
        prevFoodX = food.x;
    }

    if (food.y){
        prevFoodY = food.y;
    }

    food.x = Math.floor(Math.random() * 17 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 3) * box;
    console.log (prevFoodX, prevFoodY, food.x, food.y);
    if (prevFoodY === food.y && prevFoodX === food.x) {
        foodNotOnSnake();
    } else {
        snake.forEach(function(el){
            if(((el.x === food.x) && (el.y === food.y))) {
                foodNotOnSnake();
            }
        });
    }
}

document.addEventListener('keydown', update);

function update (event) {
    if (event.keyCode == 37 && direction != "right") direction = 'left';
    if (event.keyCode == 38 && direction != "down") direction = 'up';
    if (event.keyCode == 39 && direction != "left") direction = 'right';
    if (event.keyCode == 40 && direction != "up") direction = 'down';
}

function iniciarJogo(){

    if (snake[0].x > 17 * box && direction == "right") snake[0].x = 1*box;
    if (snake[0].x < 1*box && direction == "left") snake[0].x = 17 * box;
    if (snake[0].y > 17 * box && direction == "down") snake[0].y = 3*box;
    if (snake[0].y < 3*box && direction == "up") snake[0].y = 17 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over');
            setTimeout(refresh, 3000); 
           function refresh(){
               window.location.reload();
            }
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'right') snakeX += box;
    if (direction == 'left') snakeX -= box;
    if (direction == 'up') snakeY -= box;
    if (direction == 'down') snakeY += box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        
        foodNotOnSnake();

    score += 10;
        if(score == 10){
            (async () => {
                const inputOptions = new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      'anarcocapitalismo': 'Anarcocapitalismo',
                      'feudalismo': 'Feudalismo',
                      'c': 'Capitalismo',
                      'mercantilismo': 'Mercantilismo'
                    })
                  }, 1000)
                })
                const { value: color } = await Swal.fire({
                  title: 'Questão 1',
                  text: 'Qual era a ideologia política, que estava se moldando na revolução industrial?',
                  input: 'radio',
                  inputOptions: inputOptions,
                  customClass: { popup: 'format-pre'},
                  inputValidator: (value) => {
                    if (!value) {
                      return 'Você precisa escolher alguma alternativa!'
                    }
                  }
                })
                if (color == 'c') {
                    acerto.play();
                  Swal.fire({
                    icon: 'success',
                    title: 'Parabéns Você Acertou a Questão',
                    html: `A primeira vez, que o capitalismo foi empregado em sociedade, foi na <b>revolução industrial</b>, onde se desenvolveu até os dias atuais.`,
                    footer: `${certo}`
                    })
                  acertos++;
                }
                else {
                    erro.play();
                  Swal.fire({  
                    icon: 'error',
                    title: 'Que Pena, Você Errou a Questão',
                    html: `O período do <b>${color}</b>, não coincide, com o tempo da <b>revolução industrial</b>.`,
                    footer: `${errado}`
                })
               }
                
            })();
        }
        else if(score == 20){
            (async () => {
                const inputOptions = new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      'Manufatura': 'Manufatura',
                      'b': 'Maquinofatura ',
                      'Artesanato': 'Artesanato',
                      'Nenhuma das alternativas anteriores': 'Nenhuma das alternativas anteriores'
                    })
                  }, 1000)
                })
                const { value: color } = await Swal.fire({
                  title: 'Questão 2',
                  text: 'Qual sistema de produção, que surgiu, na revolução industrial?',
                  input: 'radio',
                  inputOptions: inputOptions,
                  customClass: { popup: 'format-pre'},
                  inputValidator: (value) => {
                    if (!value) {
                        return 'Você precisa escolher alguma alternativa!'
                    }
                  }
                })
                
                if (color == 'b') {
                    acerto.play();
                  Swal.fire({
                    icon: 'success',
                    title: 'Parabéns Você Acertou a Questão',
                    html: `Maquinofatura é a indústria mecanizada, que surgiu com a evolução das manufaturas na <b>revolução industrial</b>, com a introdução de motores a vapor para movimentar as máquinas que dependiam da força humana, dos animais, dos ventos ou da água.`,
                    footer: `${certo}`
                    })
                  acertos++;
                }
                else {
                    erro.play();
                  Swal.fire({  
                    icon: 'error',
                    title: 'Que Pena, Você Errou a Questão',
                    html: `"<b>${color}</b>" não está correta!`,
                    footer: `${errado}`
                     })
                }    
            })();
            }
        else if(score == 30){
            (async () => {
                const inputOptions = new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      'a': 'XVIII',
                      'XIII': 'XIII',
                      'XXI': 'XXI',
                      'XV': 'XV'
                    })
                  }, 1000)
                })
                const { value: color } = await Swal.fire({
                  title: 'Questão 3',
                  text: 'Qual século iniciou-se o desenvolvimento da revolução industrial?',
                  input: 'radio',
                  inputOptions: inputOptions,
                  customClass: { popup: 'format-pre'},
                  inputValidator: (value) => {
                    if (!value) {
                        return 'Você precisa escolher alguma alternativa!'
                    }
                  }
                })
                
                if (color == 'a') {
                    acerto.play();
                  Swal.fire({
                    icon: 'success',
                    title: 'Parabéns Você Acertou a Questão',
                    html: `A Revolução Industrial, foi um período que teve início, a partir da segunda metade do século XVIII.`,
                    footer: `${certo}`
                  })
                  acertos++;
                }
                else {
                    erro.play();
                  Swal.fire({  
                    icon: 'error',
                    title: 'Que Pena, Você Errou a Questão',
                    html: `O século <b>"${color}"</b>, não teve ligação com o início da <b>revolução industrial</b>.`,
                    footer: `${errado}`
                  })
                }    
            })();
        }
        else if(score == 40){
          (async () => {
            const inputOptions = new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  'a': '3',
                  '1': '1',
                  '2': '2',
                  'Nenhuma das alternativas anteriores': 'Nenhuma das alternativas anteriores'
                })
              }, 1000)
            })
            const { value: color } = await Swal.fire({
              title: 'Questão 4',
              text: 'Quantas fases, a revolução industrial, teve até os dias atuais?',
              input: 'radio',
              inputOptions: inputOptions,
              customClass: { popup: 'format-pre'},
              inputValidator: (value) => {
                if (!value) {
                    return 'Você precisa escolher alguma alternativa!'
                }
              }
            })
            
            if (color == 'a') {
                acerto.play();
              Swal.fire({
                icon: 'success',
                title: 'Parabéns Você Acertou a Questão',
                html: `A <b>revolução industrial</b> ao todo, teve 3 fases sendo divididas entre: 1º(1750-1850); 2º(1850-1950); 3º(1950-Atualidade)`,
                footer: `${certo}`
              })
              acertos++;
            }
            else {
                erro.play();
              Swal.fire({  
                icon: 'error',
                title: 'Que Pena, Você Errou a Questão',
                html: `${color}, está incorreta!`,
                footer: `${errado}`
              })
            }    
        })();
        }
        else if(score == 50){  
    (async () => {
      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'Elizabeth II': 'Elizabeth II',
            'Ana Bolena': 'Ana Bolena',
            'Maria': 'Maria',
            'd': 'Vitória'
          })
        }, 1000)
      })
      const { value: color } = await Swal.fire({
        title: 'Questão 5',
        text: 'Quem reinava a Inglaterra durante o período, conhecido como "Era Vitoriana"?',
        input: 'radio',
        inputOptions: inputOptions,
        customClass: { popup: 'format-pre'},
        inputValidator: (value) => {
          if (!value) {
              return 'Você precisa escolher alguma alternativa!'
          }
        }
      })
      
      if (color == 'd') {
          sound.play();
        Swal.fire({
          icon: 'success',
          title: 'Parabéns Você Acertou a Questão',
          html: ``,
          footer: `${certo}`
          })
        acertos++;
      }
      else {
          nakuludu.play();
        Swal.fire({  
          icon: 'error',
          title: 'Que Pena, Você Errou a Questão',
          html: ``,
          footer: `${errado}`
           })
      }    
  })();
        }
        else{
          Swal.fire({  
            icon: 'Sucess',
            title: 'Parabéns!',
            html: `Pontuação:${score}<br>Acertos:${acertos}`,
            showConfirmButton: false
             })
            
            setTimeout(refresh, 10000); 
            function refresh(){
                window.location.reload();
                 }
             }

        var inputPontuacao = document.getElementById("pontuacao");
        inputPontuacao.value = score;
        
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function velocidadeCobrinha(velocity){
    clearInterval(jogo);
    jogo = setInterval(iniciarJogo, velocity);
}
 function popup(icon, questao, pergunta, botao){
     Swal.fire({
         icon: icon,
         title: questao,
         text: pergunta,
        showConfirmButton: botao
     });
 }

let jogo = setInterval(iniciarJogo, 100);