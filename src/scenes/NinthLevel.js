import { GameScene } from '../GameScene';

export class NinthLevel extends GameScene {
	constructor() {
		super('NinthLevel');

		this.portals.finalScene = 'FinalScene';
	}

	init() {
		this.enemies = [];
		this.playerPoint = { x: 359, y: 1465 };
		this.key = '';
		this.eyePoint = [
			{ xMin: 711, xMax: 725, yMin: 1300, yMax: 1255 },
			{ xMin: 1097, xMax: 1130, yMin: 1425, yMax: 1430 },
			{ xMin: 348, xMax: 505, yMin: 495, yMax: 515 }
		];
		this.slimePoint = [
			{ xMin: 907, xMax: 1135, yMin: 415, yMax: 482 },
			{ xMin: 907, xMax: 1135, yMin: 415, yMax: 482 },
			{ xMin: 907, xMax: 1135, yMin: 415, yMax: 482 },
			{ xMin: 493, xMax: 645, yMin: 1411, yMax: 1509 },
			{ xMin: 493, xMax: 645, yMin: 1411, yMax: 1509 },
			{ xMin: 493, xMax: 645, yMin: 1411, yMax: 1509 },
			{ xMin: 493, xMax: 645, yMin: 1411, yMax: 1509 },
			{ xMin: 493, xMax: 645, yMin: 1411, yMax: 1509 },
			{ xMin: 493, xMax: 645, yMin: 1411, yMax: 1509 },
			{ xMin: 493, xMax: 645, yMin: 1411, yMax: 1509 },
			{ xMin: 940, xMax: 1080, yMin: 749, yMax: 813 },
			{ xMin: 940, xMax: 1080, yMin: 749, yMax: 813 },
			{ xMin: 940, xMax: 1080, yMin: 749, yMax: 813 },
			{ xMin: 1178, xMax: 1466, yMin: 1191, yMax: 1223 },
		];
	}

	create() {
		super.create({
			tileKey: 'tilesSpace',
			mapKey: 'ninthLevel',
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
		if (this.map.getTileAt(75, 85, false, 'Interior').properties.mechanism && !this.key.includes('0'))
			this.key += '0';
		if (this.map.getTileAt(77, 85, false, 'Interior').properties.mechanism && !this.key.includes('1'))
			this.key += '1';
		if (this.map.getTileAt(79, 85, false, 'Interior').properties.mechanism && !this.key.includes('2'))
			this.key += '2';
		if (this.map.getTileAt(81, 85, false, 'Interior').properties.mechanism && !this.key.includes('3'))
			this.key += '3';
		if (this.map.getTileAt(83, 85, false, 'Interior').properties.mechanism && !this.key.includes('4'))
			this.key += '4';
		if (this.map.getTileAt(85, 85, false, 'Interior').properties.mechanism && !this.key.includes('5'))
			this.key += '5';
		if (this.map.getTileAt(87, 85, false, 'Interior').properties.mechanism && !this.key.includes('6'))
			this.key += '6';
		if (this.map.getTileAt(89, 85, false, 'Interior').properties.mechanism && !this.key.includes('7'))
			this.key += '7';
		if (this.map.getTileAt(91, 85, false, 'Interior').properties.mechanism && !this.key.includes('8'))
			this.key += '8';
		if (this.map.getTileAt(93, 85, false, 'Interior').properties.mechanism && !this.key.includes('9'))
			this.key += '9';

		if (this.map.getTileAt(36, 71, false, 'Interior').properties.mechanism &&
			this.map.getTileAt(23, 56, false, 'Interior').x !== 0) {
			this.map.getTileAt(37, 50, false, 'Interior').visible = false;
			this.map.getTileAt(37, 50, false, 'Interior').x = 0;
			this.map.getTileAt(23, 56, false, 'Interior').visible = false;
			this.map.getTileAt(23, 56, false, 'Interior').x = 0;
		}

		if (this.map.getTileAt(31, 52, false, 'Interior').properties.mechanism &&
			this.map.getTileAt(21, 22, false, 'Interior').properties.mechanism &&
			this.map.getTileAt(21, 38, false, 'Interior').properties.mechanism &&
			this.map.getTileAt(44, 55, false, 'Interior').properties.mechanism &&
			this.map.getTileAt(90, 22, false, 'Interior').properties.mechanism &&
			this.map.getTileAt(68, 32, false, 'Interior').properties.mechanism &&
			this.map.getTileAt(44, 74, false, 'Interior').properties.mechanism &&
			this.map.getTileAt(84, 92, false, 'Interior').x !== 0) {
			this.map.getTileAt(85, 92, false, 'Interior').visible = false;
			this.map.getTileAt(85, 92, false, 'Interior').x = 0;
			this.map.getTileAt(84, 92, false, 'Interior').visible = false;
			this.map.getTileAt(84, 92, false, 'Interior').x = 0;
		}

		if (this.totalCount === 82 && this.key === '1985') {
			this.isDoorOpen = true;
			this.map.getTileAt(75, 79, false, 'Interior').visible = false;
		} else {
			this.isDoorOpen = false;
			this.map.getTileAt(75, 79, false, 'Interior').visible = true;
		}

		super.update();

		this.enemies.forEach(npc => npc.update());
		for (let a = 0; a < this.eyePoint.length; a++) this.enemies[a].DoPursue(this.player, 100);
	}
}
