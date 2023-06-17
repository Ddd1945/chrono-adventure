import { GameScene } from '../GameScene';

export class SixthLevel extends GameScene {
	constructor() {
		super('SixthLevel');
		this.portals.seventhLevel = 'SeventhLevel';
	}

	init() {
		this.enemies = [];
		this.playerPoint = { x: 1010, y: 950 };
		this.eyePoint = [
			{ xMin: 1046, xMax: 1185, yMin: 730, yMax: 823 },
			{ xMin: 1182, xMax: 1230, yMin: 569, yMax: 620 }
		];

		this.slimePoint = [
			{ xMin: 1081, xMax: 1315, yMin: 1175, yMax: 1322 },
			{ xMin: 1081, xMax: 1315, yMin: 1175, yMax: 1322 },
			{ xMin: 1081, xMax: 1315, yMin: 1175, yMax: 1322 },
			{ xMin: 1081, xMax: 1315, yMin: 1175, yMax: 1322 },
			{ xMin: 1081, xMax: 1315, yMin: 1175, yMax: 1322 },
			{ xMin: 966, xMax: 1010, yMin: 1115, yMax: 1270 },
			{ xMin: 966, xMax: 1010, yMin: 1115, yMax: 1270 },
			{ xMin: 620, xMax: 788, yMin: 492, yMax: 566 },
			{ xMin: 620, xMax: 788, yMin: 492, yMax: 566 },
			{ xMin: 620, xMax: 788, yMin: 492, yMax: 566 },
		];
	}

	create() {
		super.create({
			tileKey: 'tilesSpace',
			mapKey: 'sixthLevel',
			tiledKey: 'cosmic-lilac-tiles'
		});

		this.eyePoint.forEach(npc => {
			this.eye = this.add.rpgcharacter({
				x: npc.xMin,
				y: npc.yMin,
				name: 'eye',
				image: 'eye',
				path: [
					{ x: super.getRandomNumber(npc.xMin, npc.xMax), y: super.getRandomNumber(npc.yMin, npc.yMax) },
					{ x: super.getRandomNumber(npc.xMin, npc.xMax), y: super.getRandomNumber(npc.yMin, npc.yMax) },
					{ x: super.getRandomNumber(npc.xMin, npc.xMax), y: super.getRandomNumber(npc.yMin, npc.yMax) },
					{ x: super.getRandomNumber(npc.xMin, npc.xMax), y: super.getRandomNumber(npc.yMin, npc.yMax) }
				],
				speed: 85
			});

			this.physics.add.collider(this.eye, this.wallsLayer);
			this.physics.add.collider(this.eye, this.player, this.player.DoHit);

			this.enemies.push(this.eye);
		});

		this.slimePoint.forEach(npc => {
			this.slime = this.add.rpgcharacter({
				x: npc.xMin,
				y: npc.yMax,
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
		if (this.totalCount === 56) {
			this.isDoorOpen = true;
			this.map.getTileAt(38, 28, false, 'Interior').visible = false;
		}

		if (this.map.getTileAt(71, 77, false, 'Interior').properties.mechanism &&
			!this.map.getTileAt(39, 53, false, 'Interior').x !== 0) {
			this.map.getTileAt(39, 53, false, 'Interior').visible = false;
			this.map.getTileAt(39, 53, false, 'Interior').x = 0;
			this.map.getTileAt(40, 53, false, 'Interior').visible = false;
			this.map.getTileAt(40, 53, false, 'Interior').x = 0;
		}

		super.update();
		this.enemies.forEach(npc => npc.update());
		for (let a = 0; a < this.eyePoint.length; a++) this.enemies[a].DoPursue(this.player, 100);
	}
}
