import { GameScene } from '../GameScene';

export class SecondLevel extends GameScene {
	constructor() {
		super('SecondLevel');

		this.portals.thirdLevel = 'ThirdLevel';
	}

	init() {
		this.enemies = [];
		this.playerPoint = { x: 680, y: 650 };
		this.slimePoint = [
			{ xMin: 639, xMax: 800, yMin: 719, yMax: 720 },
			{ xMin: 860, xMax: 905, yMin: 726, yMax: 803 }
		];
	}

	create() {
		super.create({
			tileKey: 'tilesSpace',
			mapKey: 'secondLevel',
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

			this.physics.add.collider(this.slime, this.player, this.player.DoHit);

			this.enemies.push(this.slime);
		});
	}

	update() {
		if (this.totalCount === 15) {
			this.isDoorOpen = true;
			this.map.getTileAt(49, 39, false, 'Interior').visible = false;
		}

		super.update();

		this.enemies.forEach(npc => npc.update());
	}
}
