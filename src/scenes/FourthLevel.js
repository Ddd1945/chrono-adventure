import { GameScene } from '../GameScene';

export class FourthLevel extends GameScene {
	constructor() {
		super('FourthLevel');

		this.portals.fifthLevel = 'FifthLevel';
	}

	init() {
		this.enemies = [];

		this.playerPoint = { x: 630, y: 690 };

		this.slimePoint = [
			{ xMin: 945, xMax: 1019, yMin: 629, yMax: 876 },
			{ xMin: 945, xMax: 1019, yMin: 629, yMax: 876 },
			{ xMin: 945, xMax: 1019, yMin: 629, yMax: 876 },
			{ xMin: 923, xMax: 1000, yMin: 493, yMax: 550 },
			{ xMin: 923, xMax: 1000, yMin: 493, yMax: 550 },
		];
	}

	create() {
		super.create({
			tileKey: 'tilesSpace',
			mapKey: 'fourthLevel',
			tiledKey: 'cosmic-lilac-tiles'
		});

		this.slimePoint.forEach(npc => {
			this.slime = this.add.rpgcharacter({
				x: npc.xMin,
				y: npc.yMin,
				name: 'slime',
				image: 'slime',
				path: [
					{ x: super.getRandomNumber(npc.xMin, npc.xMax), y: super.getRandomNumber(npc.yMin, npc.yMax) },
					{ x: super.getRandomNumber(npc.xMin, npc.xMax), y: super.getRandomNumber(npc.yMin, npc.yMax) },
					{ x: super.getRandomNumber(npc.xMin, npc.xMax), y: super.getRandomNumber(npc.yMin, npc.yMax) },
					{ x: super.getRandomNumber(npc.xMin, npc.xMax), y: super.getRandomNumber(npc.yMin, npc.yMax) }
				],
				speed: 50
			});

			this.physics.add.collider(this.slime, this.wallsLayer);
			this.physics.add.collider(this.slime, this.player, this.player.DoHit);
			this.enemies.push(this.slime);
		});
	}

	update() {
		if (this.totalCount === 85) {
			this.isDoorOpen = true;
			this.map.getTileAt(59, 64, false, 'Interior').visible = false;
		}

		super.update();
		this.enemies.forEach(npc => npc.update());
	}
}
