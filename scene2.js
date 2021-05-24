class scene2 extends Phaser.Scene {
    constructor() {
    super('juego');
    }

    create ()
    {
        this.add.image(400, 300, 'fondo');

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 590, "plataforma").setScale(2).refreshBody();
        platforms.create(600, 480, "plataforma");
        platforms.create(50, 390, "plataforma");
        platforms.create(500, 250, "plataforma");
        platforms.create(-60, 150, "plataforma");

        player = this.physics.add.sprite(100, 450, 'limita');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        

        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        }
            
        stars = this.physics.add.group({
            key: 'fresa',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
            child.x += Phaser.Math.FloatBetween(-15, 15) 
            if (Phaser.Math.FloatBetween(0, 1) > 0.5){
                child.score = 15;
                child.setTint(0x00FF00);
            } 
            else
            {
                child.score = 10;
            }
            

        });

        bombs = this.physics.add.group();

        scoreText = this.add.text(300, 16,  "Puntos: 0 ", { font: '25px Arial Black', fill: '#FF0000', });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        score = 0;
        gameOver = false;

        tiempo = 30
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        tiempotext = this.add.text(600, 16, 'Tiempo: ', { font: '25px Arial Black', fill: '#FF0000', });

        this.jumps = 0;
    }

    update ()
    {
        if (gameOver)
        {       
            return
        }
        
        
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        score += star.score
        scoreText.setText("Puntos: " + score);

        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomba');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

            level += 1
            tiempo = 30 - level;
        }
    }

    hitBomb (player, bomb)
    {
        this.gameOver()
    }

    gameOver() {        
        gameOver = true;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { font: '50px Arial Black', fill: '#FF0000', })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('creditos'));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));    
    }
    
    onSecond() {
        if (! gameOver)
        {       
            tiempo = tiempo - 1; 
            tiempotext.setText('Tiempo: ' + tiempo);
            if (tiempo == 0) {
                timedEvent.paused = true;
                this.gameOver()
            }            
        }

    }



}