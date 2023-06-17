import { GameScene } from '../GameScene';

export class FinalScene extends GameScene {
	constructor() { super('FinalScene'); }

	init() { this.playerPoint = { x: 1532, y: 1388 }; }

	create() {
		if (this.game.global.playMusic === false) this.game.global.playMusic = true;
		this.backgroundMusic = this.game.global.backgroundMusic;
		if (this.backgroundMusic !== null) {
			this.backgroundMusic.stop();
			this.backgroundMusic = null;
		}

		super.create({
			tileKey: 'tilesSpace',
			mapKey: 'finalScene',
			tiledKey: 'cosmic-lilac-tiles'
		});

		setTimeout(() => {
			this.alarm = this.sound.get('alarm').play();
			this.cameras.main.fadeOut(9000)
		}, 20000);
		setTimeout(() => { this.sound.get('alarm').pause(); }, 28000)
		setTimeout(() => super.startHomeScene(), 29630);
	}

	update() {
		setTimeout(() => this.cameras.main.flash(1000), 20000)
		super.update();
	}
}
