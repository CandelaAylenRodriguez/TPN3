class scene3 extends Phaser.Scene {
    constructor() {
      super("creditos");
    }

    preload ()
    {
      this.load.image('logo2D', 'assets/logo2D.png');   
    }
    
    create() {
      this.add.image(400, 300, 'menu');

      var puntajefinal = this.add.text(0, 0, "Puntos: " + score,  { fontFamily: 'Arial Black', fontSize: 70, color: '#FFA500' });
    
      Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(400, 300, 800, 600));

      var restartButton = this.add.text(270,350 , 'Volver a Jugar', { fontFamily: 'Arial Black', fontSize: 30, color: '#FF4500' })
      .setInteractive()
      .on('pointerdown', () => this.reiniciar() );
    }

    reiniciar() {
      this.scene.start('juego');
    }

    
}
  