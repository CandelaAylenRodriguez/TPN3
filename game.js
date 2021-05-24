var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
    },
    scene: [scene1, scene2, scene3]
};

var game = new Phaser.Game(config);

var score;
var gameOver;
var player;
var stars;
var bombs;
var platforms;
var cursors;
var scoreText;
var timedEvent;
var tiempo;
var tiempotext;
var level = 0;
var play;