import { GameScene } from '../GameScene';

export class ThirdLevel extends GameScene {
	constructor() {
		super('ThirdLevel');

		this.portals.fourthLevel = 'FourthLevel';
	}

	init() {
		this.enemies = [];
		this.playerPoint = { x: 1080, y: 1136 };
		this.slimePoint = [
			{ xMin: 900, xMax: 929, yMin: 1195, yMax: 1255 },
			{ xMin: 1128, xMax: 1239, yMin: 1230, yMax: 1271 },
			{ xMin: 906, xMax: 998, yMin: 928, yMax: 965 },
			{ xMin: 1108, xMax: 1245, yMin: 986, yMax: 1044 }
		];
	}

	create() {
		super.create({
			tileKey: 'tilesSpace',
			mapKey: 'thirdLevel',
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


			this.physics.add.collider(this.slime, this.wallsLayer, this.slime.DoHitWall);
			this.physics.add.collider(this.slime, this.player, this.player.DoHit);

			this.enemies.push(this.slime);
		});
	}

	update() {
		if (this.totalCount === 50) {
			this.isDoorOpen = true;
			this.map.getTileAt(81, 51, false, 'Interior').visible = false;
		}

		super.update();

		this.enemies.forEach(npc => npc.update());
	}
}
