import { GameScene } from '../GameScene';

export class FifthLevel extends GameScene {
    constructor() {
        super('FifthLevel');

        this.portals.sixthLevel = 'SixthLevel';
    }

    init() {
        this.enemies = [];
        this.playerPoint = { x: 510, y: 1000 };
        this.slimePoint = { xMin: 525, xMax: 1007, yMin: 538, yMax: 1008 };
    }

    create() {
        this.backgroundMusic = this.game.global.backgroundMusic;
        if (this.backgroundMusic !== null)
            if (this.backgroundMusic.key !== 'trackTwo' && this.backgroundMusic.key !== 'infinityIsBeyond' &&
                this.backgroundMusic.key !== 'futureBattle') {
                this.backgroundMusic.stop();
                this.backgroundMusic = null;
            }

        super.create({
            tileKey: 'tilesSpace',
            mapKey: 'fifthLevel',
            tiledKey: 'cosmic-lilac-tiles'
        });

        for (let a = 0; a < 35; a++) {
            this.slime = this.add.rpgcharacter({
                x: super.getRandomNumber(this.slimePoint.xMin, this.slimePoint.xMax),
                y: super.getRandomNumber(this.slimePoint.yMin, this.slimePoint.yMax),
                image: 'slime',
                path: [
                    { x: super.getRandomNumber(this.slimePoint.xMin, this.slimePoint.xMax), y: super.getRandomNumber(this.slimePoint.yMin, this.slimePoint.yMax) },
                    { x: super.getRandomNumber(this.slimePoint.xMin, this.slimePoint.xMax), y: super.getRandomNumber(this.slimePoint.yMin, this.slimePoint.yMax) },
                    { x: super.getRandomNumber(this.slimePoint.xMin, this.slimePoint.xMax), y: super.getRandomNumber(this.slimePoint.yMin, this.slimePoint.yMax) },
                    { x: super.getRandomNumber(this.slimePoint.xMin, this.slimePoint.xMax), y: super.getRandomNumber(this.slimePoint.yMin, this.slimePoint.yMax) }
                ],
                speed: 50
            });

            this.physics.add.collider(this.slime, this.wallsLayer);
            this.physics.add.collider(this.slime, this.player, this.player.DoHit);

            this.enemies.push(this.slime);
        }
    }

    update() {
        if (this.totalCount === 8) {
            this.isDoorOpen = true;
            this.map.getTileAt(31, 31, false, 'Interior').visible = false;
        }

        super.update();
        this.enemies.forEach(npc => npc.update());
    }
}
