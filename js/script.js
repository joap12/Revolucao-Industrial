let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;
let acertos = 0;
let level = 0;
let velocidade = 500; // Velocidade mínima
let velocidadeLevel = 200;
let foodSameSnake = 0;

const sound = new Audio('sound.mp3')
const nakuludu = new Audio('nakuludu.mp3')

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function foodNotOnSnake(){
    if (food.x) {
        prevFoodX = food.x;
    }

    if (food.y){
        prevFoodY = food.y;
    }

    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
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

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
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
       
        

    level += 1;
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
                    sound.play();
                  Swal.fire({
                    icon: 'success',
                    title: 'Parabéns Você Acertou a Questão',
                    html: `A primeira vez, que o capitalismo foi empregado em sociedade, foi na <b>revolução industrial</b>, onde se desenvolveu até os dias atuais.`,
                    footer: '<img src="https://www.otempo.com.br/image/contentid/policy:1.2627146:1646655744/image.jpg?f=3x2&w=1200&$p$f$w=a9f248b" height="225px">'
                    })
                  acertos++;
                }
                else {
                    nakuludu.play();
                  Swal.fire({  
                    icon: 'error',
                    title: 'Que Pena, Você Errou a Questão',
                    html: `O período do <b>${color}</b>, não coincide, com o tempo da <b>revolução industrial</b>.`,
                    footer: '<img src="https://img.ifunny.co/images/c519bf7599080a0d7fcf8d8b79a2119a0939a617713bd35c98932293766e7e89_1.jpg" height="225px">'
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
                    sound.play();
                  Swal.fire({
                    icon: 'success',
                    title: 'Parabéns Você Acertou a Questão',
                    html: `Maquinofatura é a indústria mecanizada, que surgiu com a evolução das manufaturas na <b>revolução industrial</b>, com a introdução de motores a vapor para movimentar as máquinas que dependiam da força humana, dos animais, dos ventos ou da água.`,
                    footer: '<img src="https://www.otempo.com.br/image/contentid/policy:1.2627146:1646655744/image.jpg?f=3x2&w=1200&$p$f$w=a9f248b" height="225px">'
                    })
                  acertos++;
                }
                else {
                    nakuludu.play();
                  Swal.fire({  
                    icon: 'error',
                    title: 'Que Pena, Você Errou a Questão',
                    html: `"<b>${color}</b>" não está correta!`,
                    footer: '<img src="https://img.ifunny.co/images/c519bf7599080a0d7fcf8d8b79a2119a0939a617713bd35c98932293766e7e89_1.jpg" height="225px">'
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
                    sound.play();
                  Swal.fire({
                    icon: 'success',
                    title: 'Parabéns Você Acertou a Questão',
                    html: `A Revolução Industrial, foi um período que teve início, a partir da segunda metade do século XVIII.`,
                    footer: '<img src="https://www.otempo.com.br/image/contentid/policy:1.2627146:1646655744/image.jpg?f=3x2&w=1200&$p$f$w=a9f248b" height="225px">'
                    })
                  acertos++;
                }
                else {
                    nakuludu.play();
                  Swal.fire({  
                    icon: 'error',
                    title: 'Que Pena, Você Errou a Questão',
                    html: `O século <b>"${color}"</b>, não teve ligação com o início da <b>revolução industrial</b>.`,
                    footer: '<img src="https://img.ifunny.co/images/c519bf7599080a0d7fcf8d8b79a2119a0939a617713bd35c98932293766e7e89_1.jpg" height="225px">'
                     })
                }    
            })();
        }
        else{
            popup('success', 'Parabéns', 'Você ganhou o jogo!', false);
            
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

