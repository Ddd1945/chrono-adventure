import { GameScene } from '../GameScene';

export class SeventhLevel extends GameScene {
	constructor() {
		super('SeventhLevel');
		this.portals.eighthLevel = 'EighthLevel';
	}

	init() {
		this.key = '';
		this.playerPoint = { x: 761, y: 824 };
	}

	create() {
		this.backgroundMusic = this.game.global.backgroundMusic;
		if (this.backgroundMusic !== null)
			if (this.backgroundMusic.key !== 'toTheSpace' && this.backgroundMusic.key !== 'cactusDude' &&
				this.backgroundMusic.key !== 'mysteriousCavern' && this.backgroundMusic.key !== 'ambientSpace' &&
				this.backgroundMusic.key !== 'piano' && this.backgroundMusic.key !== 'repose' && 
				this.backgroundMusic.key !== 'spaceRiddle') {
				this.backgroundMusic.stop();
				this.backgroundMusic = null;
			}

		super.create({
			tileKey: 'tilesSpace',
			mapKey: 'seventhLevel',
			tiledKey: 'cosmic-lilac-tiles'
		});
	}

	update() {
		if (this.map.getTileAt(39, 47, false, 'Interior').properties.mechanism && !this.key.includes('0'))
			this.key += '0';
		if (this.map.getTileAt(41, 47, false, 'Interior').properties.mechanism && !this.key.includes('1'))
			this.key += '1';
		if (this.map.getTileAt(43, 47, false, 'Interior').properties.mechanism && !this.key.includes('2'))
			this.key += '2';
		if (this.map.getTileAt(45, 47, false, 'Interior').properties.mechanism && !this.key.includes('3'))
			this.key += '3';
		if (this.map.getTileAt(47, 47, false, 'Interior').properties.mechanism && !this.key.includes('4'))
			this.key += '4';
		if (this.map.getTileAt(49, 47, false, 'Interior').properties.mechanism && !this.key.includes('5'))
			this.key += '5';
		if (this.map.getTileAt(51, 47, false, 'Interior').properties.mechanism && !this.key.includes('6'))
			this.key += '6';
		if (this.map.getTileAt(53, 47, false, 'Interior').properties.mechanism && !this.key.includes('7'))
			this.key += '7';
		if (this.map.getTileAt(55, 47, false, 'Interior').properties.mechanism && !this.key.includes('8'))
			this.key += '8';
		if (this.map.getTileAt(57, 47, false, 'Interior').properties.mechanism && !this.key.includes('9'))
			this.key += '9';

		if (this.key === '2531') {
			this.isDoorOpen = true;
			this.map.getTileAt(58, 41, false, 'Interior').visible = false;
		} else {
			this.map.getTileAt(58, 41, false, 'Interior').visible = true;
			this.isDoorOpen = false;
		}

		super.update();
	}
}
