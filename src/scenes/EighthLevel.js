import { GameScene } from '../GameScene';

export class EighthLevel extends GameScene {
	constructor() {
		super('EighthLevel');

		this.portals.ninthLevel = 'NinthLevel';
	}

	init() {
		this.enemies = [];
		this.playerPoint = { x: 584, y: 538 };
		this.slimePoint = { xMin: 525, xMax: 1007, yMin: 538, yMax: 1008 };
		this.eyePoint = { xMin: 519, xMax: 1007, yMin: 538, yMax: 1034 };
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
			mapKey: 'eighthLevel',
			tiledKey: 'cosmic-lilac-tiles'
		});

		this.eye = this.add.rpgcharacter({
			x: super.getRandomNumber(this.eyePoint.xMin, this.eyePoint.xMax),
			y: super.getRandomNumber(this.eyePoint.yMin, this.eyePoint.yMax),
			image: 'eye',
			path: [
				{ x: super.getRandomNumber(this.eyePoint.xMin, this.eyePoint.xMax), y: super.getRandomNumber(this.eyePoint.yMin, this.eyePoint.yMax) },
				{ x: super.getRandomNumber(this.eyePoint.xMin, this.eyePoint.xMax), y: super.getRandomNumber(this.eyePoint.yMin, this.eyePoint.yMax) },
				{ x: super.getRandomNumber(this.eyePoint.xMin, this.eyePoint.xMax), y: super.getRandomNumber(this.eyePoint.yMin, this.eyePoint.yMax) },
				{ x: super.getRandomNumber(this.eyePoint.xMin, this.eyePoint.xMax), y: super.getRandomNumber(this.eyePoint.yMin, this.eyePoint.yMax) }
			],
			speed: 70
		});

		this.physics.add.collider(this.eye, this.wallsLayer);
		this.physics.add.collider(this.eye, this.interiorLayer);
		this.physics.add.collider(this.eye, this.player, this.player.DoHit);

		this.enemies.push(this.eye);

		for (let a = 0; a < 30; a++) {
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
		if (this.totalCount === 13) {
			this.isDoorOpen = true;
			this.map.getTileAt(64, 31, false, 'Interior').visible = false;
		}

		super.update();
		this.enemies.forEach(npc => npc.update());
		this.enemies[0].DoPursue(this.player, 100);
	}
}
