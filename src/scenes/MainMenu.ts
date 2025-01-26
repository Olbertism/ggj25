import { GameObjects, Scene } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    start: GameObjects.Text;
    message: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'menuBg');
        this.background.setScale(0.5, 0.5)

        this.title = this.add.text(230,130, 'SCP-9786', {
            fontFamily: 'Courier New',  fontStyle:'bold', fontSize: 38, color: '#424270'
        });

        this.logo = this.add.image(320, 350, 'logo');

        this.message = this.add.text(690, 250, 'Anomaly SCP-9786 detected. Unit-23 deployed to investigate.\n' +
            'Classification pending. Proceed with caution.',
            {
            fontFamily: 'Courier New', fontSize: 28, color: '#424270',

            wordWrap: {width: 300}
        }).setOrigin(0.5);

        this.start = this.add.text(690, 450, 'Click to start', {
            fontFamily: 'Courier New', fontSize: 28, color: '#424270',
            stroke: '#8877f1', strokeThickness: 2,
            align: 'center',
            wordWrap: {width: 280}
        }).setOrigin(0.5);


        this.input.once('pointerdown', () => {

            this.scene.start('Intro');

        });
    }
}
