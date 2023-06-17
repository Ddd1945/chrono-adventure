/**
 * This Anims class is tightly coupled to the Game Scene class and used to 
 * seperate the sprite animation definitions into their own file.
 */
export class Anims {
	constructor(scene) {
		if (!scene) return;

		this.scene = scene;
	}

	create() {
		const anims = this.scene.anims;

		anims.create({
			key: 'astronaut-walk-left',
			frames: anims.generateFrameNumbers('astronaut', { prefix: 'astronaut-walk-left', start: 24, end: 29 }),
			frameRate: 7,
			repeat: -1,
		});
		anims.create({
			key: 'astronaut-walk-right',
			frames: anims.generateFrameNumbers('astronaut', { prefix: 'astronaut-walk-right', start: 8, end: 13 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'astronaut-walk-down',
			frames: anims.generateFrameNumbers('astronaut', { prefix: 'astronaut-walk-down', start: 0, end: 5 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'astronaut-walk-up',
			frames: anims.generateFrameNumbers('astronaut', { prefix: 'astronaut-walk-up', start: 16, end: 21 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'astronaut-idle',
			frames: anims.generateFrameNumbers('astronaut', { prefix: 'astronaut-idle', start: 28, end: 36 }),
			frameRate: 7,
			repeat: -1
		})
		anims.create({
			key: 'slime-walk-down',
			frames: anims.generateFrameNumbers('slime', { prefix: 'slime-walk-down', start: 0, end: 3 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'slime-walk-up',
			frames: anims.generateFrameNumbers('slime', { prefix: 'slime-walk-up', start: 0, end: 3 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'slime-walk-left',
			frames: anims.generateFrameNumbers('slime', { prefix: 'slime-walk-left', start: 0, end: 3 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'slime-walk-right',
			frames: anims.generateFrameNumbers('slime', { prefix: 'slime-walk-right', start: 0, end: 3 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'eye-walk-down',
			frames: anims.generateFrameNumbers('eye', { prefix: 'eye-walk-down', start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'eye-walk-up',
			frames: anims.generateFrameNumbers('eye', { prefix: 'eye-walk-up', start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'eye-walk-left',
			frames: anims.generateFrameNumbers('eye', { prefix: 'eye-walk-left', start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'eye-walk-right',
			frames: anims.generateFrameNumbers('eye', { prefix: 'eye-walk-right', start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'dude-walk-left',
			frames: anims.generateFrameNumbers('dude', { prefix: 'dude-walk-left', start: 3, end: 5 }),
			frameRate: 7,
			repeat: -1,
		});
		anims.create({
			key: 'dude-walk-right',
			frames: anims.generateFrameNumbers('dude', { prefix: 'dude-walk-right', start: 6, end: 8 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'dude-walk-down',
			frames: anims.generateFrameNumbers('dude', { prefix: 'dude-walk-down', start: 0, end: 2 }),
			frameRate: 7,
			repeat: -1
		});
		anims.create({
			key: 'dude-walk-up',
			frames: anims.generateFrameNumbers('dude', { prefix: 'dude-walk-up', start: 9, end: 11 }),
			frameRate: 7,
			repeat: -1
		});
	}
}
