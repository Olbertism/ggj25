
export class MapObstacles extends Phaser.GameObjects.GameObject{

    private obstacles: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene) {
        super(scene, 'MapObstacles');

        this.scene = scene;
        this.obstacles = this.scene.physics.add.staticGroup();

    }

    preload() {}


    createObstacles(): Phaser.GameObjects.Group {

        // Create obstacles
        const b1 = this.obstacles.create(375, 180, "obstacle", undefined, false);
        const b2 = this.obstacles.create(120, 1420, "obstacle", undefined, false);
        const b3 = this.obstacles.create(1000, 1955, "obstacle", undefined, false);
        const b4 = this.obstacles.create(1550, 50, "obstacle", undefined, false);
        const b5 = this.obstacles.create(1900, 1750, "obstacle", undefined, false);
        const b6 = this.obstacles.create(1700, 1820, "obstacle", undefined, false);
        const f1 = this.obstacles.create(1550, 420, "obstacle", undefined, false);
        const f2 = this.obstacles.create(1925, 320, "obstacle", undefined, false);
        const f3 = this.obstacles.create(340, 785, "obstacle", undefined, false);
        const f4 = this.obstacles.create(355, 660, "obstacle", undefined, false);
        const f5 = this.obstacles.create(435, 585, "obstacle", undefined, false);
        const f6 = this.obstacles.create(790, 585, "obstacle", undefined, false);
        const f7 = this.obstacles.create(1010, 405, "obstacle", undefined, false);
        const f8 = this.obstacles.create(850, 540, "obstacle", undefined, false);
        const f9 = this.obstacles.create(910, 470, "obstacle", undefined, false);
        const f10 = this.obstacles.create(270, 1875, "obstacle", undefined, false);
        const h1 = this.obstacles.create(1655, 650, "obstacle", undefined, false);
        const h2 = this.obstacles.create(720, 1410, "obstacle", undefined, false);
        const h3 = this.obstacles.create(720, 1655, "obstacle", undefined, false);
        const h4 = this.obstacles.create(525, 1315, "obstacle", undefined, false);
        const h5 = this.obstacles.create(525, 1675, "obstacle", undefined, false);
        const h6 = this.obstacles.create(345, 1500, "obstacle", undefined, false);
        const o1 = this.obstacles.create(500, 1500, "obstacle", undefined, false);
        const o2 = this.obstacles.create(680, 1370, "obstacle", undefined, false);

        // set sizes
        b1.setSize(750, 360 );
        b2.setSize(240, 1160 );
        b3.setSize(2000, 90 );
        b4.setSize(900, 100 );
        b5.setSize(200, 400 );
        b6.setSize(200, 200 );
        f1.setSize(900, 100 );
        f2.setSize(150, 100 );
        f3.setSize(260, 150 );
        f4.setSize(190, 100 );
        f5.setSize(140, 50 );
        f6.setSize(100, 50 );
        f7.setSize(200, 30 );
        f8.setSize(60, 30 );
        f9.setSize(80, 130 );
        f10.setSize(110, 100 );
        h1.setSize(690, 360 );
        h2.setSize(20, 190 );
        h3.setSize(20, 60 );
        h4.setSize(410, 10 );
        h5.setSize(410, 10 );
        h6.setSize(50, 380 );
        o1.setSize(80, 80 );
        o2.setSize(50, 60 );

        return this.obstacles;
    }


}