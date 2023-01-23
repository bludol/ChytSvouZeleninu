var canvas;
var context;
var keyPressed = {};
var score = 0;
var movingSpeed = 5;
var lives = 3;
var dead;
var candySprite;
var veggieSprite;
var hardCandySprite;
var cottonSprite;
var bagSprite;
var bkgSprite;
var music;
var ding;
var error;
var highScore = localStorage.getItem('highscore') || 0;
//Vytvoření proměnných

var bag = {
	posX: 200,
	posY: 370,
	disWidth: 100,
	disHeight: 130,
};
//vlastnosti sáčku

var veggie = {
	posX: 150,
	posY: -25,
	disWidth: 60,
	disHeight: 60,
};
//vlastnosti zeleniny

var candy = {
	posX: 330,
	posY: -25,
	disWidth: 50,
	disHeight: 80,
}
//vlastnosti čokolády

var hardCandy = {
	posX: 260,
	posY: -25,
	disWidth: 80,
	disHeight: 40,
}
//Vlastnosti cukrátka

var cotton = {
	posX: 80,
	posY: -25,
	disWidth: 60,
	disHeight: 90,
}
//vlastnosti cukrové vaty

window.onload = init;

let cukrarnaImg = new Image(50, 50); 
cukrarnaImg.src = 'img/CandyShop.jpg';
console.log(cukrarnaImg);
//nastavení obrázku na pozadí (zobrazí se až na konci hry)

function init(){
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    var x = canvas.width / 2;
	var y = canvas.height / 2;
	// x a y se nastaví na 1/2 plátna
    context.font = "20px Verdana";
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('Vyhýbej se nezdravému jídlu',x,200);
    context.fillText('Sbírej pouze zdravé jídlo', x,222);
    context.fillText('Sbírej zeleninu!', x, 244);
    context.fillText('Použíj šipky pro pohyb ', x, 276);
    context.fillText('klikni kamkoli pro začátek.', x, 320);
	// vypsání základních informací
    canvas.addEventListener('mousedown', chooseDifficulty, false);
    candySprite = document.getElementById('candy');
    veggieSprite = document.getElementById('veggie');
    hardCandySprite = document.getElementById('hardCandy');
    cottonSprite = document.getElementById('cotton');
    bagSprite = document.getElementById('bag');
    bkgSprite = document.getElementById('background');
    error = document.getElementById('error');
    window.onkeydown = keydown;
    window.onkeyup = keyup;
}

function chooseDifficulty(){
	context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);
	$('.myButtonE').css('display', 'inline-block');
	$('.myButtonH').css('display', 'inline-block');
	context.font = "30px Verdana";
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('Vyber si obtížnost.',250,250);
}
//Funkce zařizující výběr obtížnosti

function drawEasy(){
	//Jednoduchá obtíznost (pouze zelenina a 1 sladkost)
	$('.myButtonE').css('display', 'none');
	$('.myButtonH').css('display', 'none');
	canvas.removeEventListener('mousedown', chooseDifficulty, false);
	if(!dead){
		//když hráč není mrtev. Provedou se funkce na vykreslení
    	context.drawImage(bkgSprite, 0, 0, 500, 500);
		context.drawImage(bagSprite,bag.posX, bag.posY, bag.disWidth, bag.disHeight);
		context.drawImage(veggieSprite,veggie.posX, veggie.posY, veggie.disWidth, veggie.disHeight);
		context.drawImage(candySprite,candy.posX, candy.posY, candy.disWidth, candy.disHeight);
		context.font = "17px Verdana";
	    context.fillStyle = 'red';
	    context.fillText('Score: ' + score, 40, 20);
	    context.fillText('Lives: ' + lives, 40, 37);
		//výpis životů a score 

	    veggie.posY = veggie.posY + movingSpeed;
	    candy.posY = candy.posY + movingSpeed;

		if(keyPressed[39]) {
			bag.posX = bag.posX + movingSpeed;
	    }
	    if(keyPressed[37]){
	        bag.posX = bag.posX - movingSpeed;
		}
		//pohyb tašky
		checkCollision();
		requestAnimationFrame(drawEasy);
	}
}

function drawHard(){
	//Těžká obtížnost. (3 sladkosti 1 zelenina)
	$('.myButtonE').css('display', 'none');
	$('.myButtonH').css('display', 'none');
	canvas.removeEventListener('mousedown', chooseDifficulty, false);
	if(!dead){
		//když hráč není mrtev. Provedou se funkce na vykreslení
    	context.drawImage(bkgSprite, 0, 0, 500, 500);
		context.drawImage(bagSprite,bag.posX, bag.posY, bag.disWidth, bag.disHeight);
		context.drawImage(veggieSprite,veggie.posX, veggie.posY, veggie.disWidth, veggie.disHeight);
		context.drawImage(candySprite,candy.posX, candy.posY, candy.disWidth, candy.disHeight);
		context.drawImage(hardCandySprite,hardCandy.posX, hardCandy.posY, hardCandy.disWidth, hardCandy.disHeight);
		context.drawImage(cottonSprite,cotton.posX, cotton.posY, cotton.disWidth, cotton.disHeight);
		context.font = "17px Verdana";
	    context.fillStyle = 'red';
	    context.fillText('Score: ' + score, 40, 20);
	    context.fillText('Lives: ' + lives, 40, 37);
//výpis životů a score 
	    veggie.posY = veggie.posY + movingSpeed;
	    candy.posY = candy.posY + movingSpeed;
	    hardCandy.posY = hardCandy.posY + movingSpeed;
	    cotton.posY	= cotton.posY + movingSpeed;

		if(keyPressed[39]) {
			bag.posX = bag.posX + movingSpeed;
	    }
	    if(keyPressed[37]){
	        bag.posX = bag.posX - movingSpeed;
		}
		checkCollision();
		requestAnimationFrame(drawHard);
	}
}

function checkCollision(){
	if(bag.posX+bag.disWidth == canvas.width){
		bag.posX = bag.posX-5;
	}
	if(bag.posX == 0){
		bag.posX = bag.posX+5;
	}
	if(veggie.posY+veggie.disHeight == bag.posY && bag.posX < veggie.posX+veggie.disWidth && veggie.posX< bag.posX+bag.disWidth){
		var randVegX = Math.floor((Math.random() * 440) + 1);
		veggie.posX = randVegX;
		veggie.posY = -25;
    	score++;
    	//Zkontrolování kolize tašky s zeleninou. a přidání score
    }
    if(veggie.posY+veggie.disHeight == canvas.height){
		var randVegX = Math.floor((Math.random() * 440) + 1);
		veggie.posX = randVegX;
		veggie.posY = -25;
		lives--;
		if(lives == -1){
			dead = true;
			gameOver();
		}
		//Kontrola kolize země a zeleniny (odebrání životů. Případně konec hry)
    }
    if(candy.posY+candy.disHeight == bag.posY && bag.posX < candy.posX && candy.posX+candy.disWidth< bag.posX+bag.disWidth){
		var randCanX = Math.floor((Math.random() * 440) + 1);
		candy.posX = randCanX;
		candy.posY = -25;
    	lives--;
    	if(lives == -1){
			dead = true;
			gameOver();
		}
		//kontrola kolize tašky a sladkosti. (Odebere život. Když se dotkne. Případně ukončí hru. Když dojdou životy)
    }
    if(candy.posY+candy.disHeight == canvas.height){
		var randCanX = Math.floor((Math.random() * 440) + 1);
		candy.posX = randCanX;
		candy.posY = -25;
    }

    if(hardCandy.posY+hardCandy.disHeight == bag.posY && bag.posX < hardCandy.posX && hardCandy.posX+hardCandy.disWidth< bag.posX+bag.disWidth){
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		hardCandy.posX = randCanX2;
		hardCandy.posY = -25;
    	lives--;
    	if(lives == -1){
			dead = true;
			gameOver();
		}
		//kontrola kolize tašky a sladkosti. (Odebere život. Když se dotkne. Případně ukončí hru. Když dojdou životy)
    }
    if(hardCandy.posY+hardCandy.disHeight == canvas.height){
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		hardCandy.posX = randCanX2;
		hardCandy.posY = -25;
    }

    if(cotton.posY+cotton.disHeight == bag.posY && bag.posX < cotton.posX && cotton.posX+cotton.disWidth< bag.posX+bag.disWidth){
		var randCanX3 = Math.floor((Math.random() * 440) + 1);
		cotton.posX = randCanX3;
		cotton.posY = -25;
    	lives--;
    	if(lives == -1){
			dead = true;
			gameOver();
		}
		//kontrola kolize tašky a sladkosti. (Odebere život. Když se dotkne. Případně ukončí hru. Když dojdou životy)
    }
    if(cotton.posY+cotton.disHeight == canvas.height){
		var randCanX3 = Math.floor((Math.random() * 440) + 1);
		cotton.posX = randCanX3;
		cotton.posY = -25;
    }
}


function gameOver(){
	//Funkce ukončující hru
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	//nastavení x a y na 1/2 (na střed)
		context.fillRect(0,0,canvas.width,canvas.height);
		context.drawImage(cukrarnaImg, 0, 0, canvas.width, canvas.height);   
		context.font = "40px Verdana";
		context.fillStyle = 'black';
		context.fillText('Konec Hry', x,200);
		context.fillStyle = 'black';
		context.fillText('Konečné Skóre: ' + score, x,250);
		if(score > highScore){
			highScore = score;
			localStorage.setItem('highscore', highScore);
			context.fillText('Nejvyšší Skóre: ' + highScore, x,300);
			alert("Nové Nejvyšší Skóre!");
		}
		else{
			context.fillText('Nejvyšší Skóre: ' + highScore, x,300);
		}
		$('.myButtonR').css('display', 'inline-block');
	//vypsání score a podobně
}

function replay(){
	location.reload();
}
//Funkce na opětovné spuštění hry

function keydown(e) {
    keyPressed[e.keyCode] = true;
}

function keyup(e) {
    keyPressed[e.keyCode] = false;
}
//funkce na pohyb 