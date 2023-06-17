import { GameScene } from '../GameScene';

export class HomeScene extends GameScene {
    constructor() { super('HomeScene'); }

    init() { this.playerPoint = { x: 663, y: 791 }; }

    create() {
        this.cameras.main.fadeIn(1500, 255, 255, 255);

        super.create({
            tileKey: 'tilesHome',
            mapKey: 'homeScene',
            tiledKey: 'PixelCyberpunkInterior'
        });
    }

    update() { super.update(); }
}
