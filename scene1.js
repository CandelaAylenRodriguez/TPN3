class scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    preload ()
    {
      this.load.image('menu', './/assets/menu.jpg');
      this.load.image('play', './/assets/play.png'); 
      this.load.image('fondo', './/assets/fondo.png');
      this.load.image('plataforma', './/assets/plataforma.png');
      this.load.image('fresa', './/assets/fresa.png');
      this.load.image('bomba', './/assets/bomb.png');
      this.load.spritesheet('limita', './/assets/Limita.png', { frameWidth: 32, frameHeight: 48 });      
    }

    create() {
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('limita', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'limita', frame: 4 } ],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('limita', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

        
      this.add.image(400, 300, 'menu').setScale(1)
      var play = this.add.image(400, 300, 'play').setScale(1)
      play.setInteractive()
      play.on('pointerdown', () => this.scene.start('juego') );
    }
}
