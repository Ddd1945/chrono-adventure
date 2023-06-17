import { GameScene } from '../GameScene';

export class FirstLevel extends GameScene {
	constructor() {
		super('FirstLevel');
		this.portals.secondLevel = 'SecondLevel';
	}

	init() { this.playerPoint = { x: 765, y: 768 }; }

	create() {
		super.create({
			tileKey: 'tilesSpace',
			mapKey: 'firstLevel',
			tiledKey: 'cosmic-lilac-tiles'
		});
	}

	update() {
		if (this.totalCount === 1) {
			this.isDoorOpen = true;
			this.map.getTileAt(47, 43, false, 'Interior').visible = false;
		}
		super.update();
	}
}
