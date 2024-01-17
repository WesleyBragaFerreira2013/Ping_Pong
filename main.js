class Ball {
    constructor(ball) {
        this.positionX = float(width/2);
        this.positionY = float(height/2);
        this.speedX = random([-5, -3, 3, 5]);
        this.speedY = random([-5, -3, 3, 5]);
        this.diameter = 15;
        this.game = game;
    }

    centralize() {
        this.positionX = float(width/2);
        this.positionY = float(height/2);
    }

    draw() {
        circle(this.positionX, this.positionY, this.diameter);
    }

    move() {
        this.positionX = this.positionX + this.speedX;
        this.positionY = this.positionY + this.speedY;
    }

    checkBoard() {
        if (this.positionX - this.diameter/2 <= 0) {
            this.game.score(2);
            this.game.stop();
        }
        if (this.positionX + this.diameter/2 >= width) {
            this.game.score(1);
            this.game.stop();
        }

        if (this.positionY - this.diameter/2 <= 0) {
            this.speedY *= -1;
        }
        if (this.positionY + this.diameter/2 >= height) {
            this.speedY *= -1;
        }
    }

    checkColisionPlay(player) {
        this.yLower = player.positionY;
        this.yBigger = player.positionY + player.height;

        if (player.id == 1) {
            this.xReferences = player.positionX + player.width;

            if (this.positionX - this.diameter/2 <= this.xReferences && this.positionX - this.diameter/2 > 0) {
                if (this.positionY >= this.yLower && this.positionY <= this.yBigger) {
                    this.speedX *= -1;
                }
            }
        }
        else {
            this.xReferences = player.positionX;

            if (this.positionX + this.diameter/2 >= this.xReferences && this.positionX < width) {
                if (this.positionY >= this.yLower && this.positionY <= this.yBigger) {
                    this.speedX *= -1;
                }
            }
        }
    }
}

class player {
    constructor(typePlayer) {
        this.id = typePlayer;
        this.width = 20;
        this.height = 100
        if (this.id == 1) {
            this.positionX = 50;
        }
        else {
            this.positionX = width - this.width - 50;
        }
        this.positionY = height/2;
        this.speedY = 10;
    }

    draw() {
        rect(this.positionX, this.positionY, this.width, this.height);
    }

    move() {
        if (this.id == 1) {
            if (keyIsDown(87)) {
                if (this.positionY > 0) {
                    this.positionY -= this.speedY;
                }
                else {
                    this.positionY = 0;
                }
            }
            if (keyIsDown(83)) {
                this.positionY += this.speedY;
                if (this.positionY + this.height > height) {
                    this.positionY = height - this.height;
                }
            }
        }
        else {
            if (keyIsDown(UP_ARROW)) {
                if (this.positionY > 0) {
                    this.positionY -= this.speedY;
                }
                else {
                    this.positionY = 0;
                }
            }
            if (keyIsDown(DOWN_ARROW)) {
                this.positionY += this.speedY;
                if (this.positionY + this.height > height) {
                    this.positionY = height - this.height;
                }
            }
        }
    }
}

class Game {
    constructor() {
        this.running = false;
        this.pointsPlayer1 = 0;
        this.pointsPlayer2 = 0;
    }

    stop() {
        this.running = false;
    }

    start() {
        this.ball.centralize();
        this.running = true;
    }

    score(points) {
        if (points == 1) {
            this.pointsPlayer1++;
        }
        else if (points == 2) {
            this.pointsPlayer2++;
        }
        document.getElementById("point").innerHTML ="Pontos do Jogador 1: " + this.pointsPlayer1 + " | Pontos do jogador 2: " + this.pointsPlayer2;
    }

    resetPoints() {
        this.pointsPlayer1 = this.pointsPlayer2 = 0;
    }

    setBall(ball) {
        this.ball = ball;
    }
}

function setup() {
    canvas = createCanvas(1200, 541);
    canvas.position(0, 40);

    game = new Game();
    ball = new Ball(game);
    player1 = new player(1);
    player2 = new player(2);
    game.setBall(ball);
}

function draw() {
    background(0, 0, 0);
    player1.draw();
    player2.draw();

    if (game.running == true) {
    ball.move();
    ball.draw();
    ball.checkBoard();
    ball.checkColisionPlay(player1);
    ball.checkColisionPlay(player2);

    player1.move();
    player2.move();
    }
    else {
        if (keyIsDown(ENTER)) {
            game.start();
        }
    }
}