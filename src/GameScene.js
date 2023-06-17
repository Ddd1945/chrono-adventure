import Phaser from 'phaser';
import { Anims } from './anims';

/**
 * Parent class for all playable scenes
 */

export class GameScene extends Phaser.Scene {
	constructor(sceneName) {
		super({
			key: sceneName
		});

		this.cursors = null;
		this.buttons = null;
		this.player = null;
		this.totalCount = 0;
		this.isDoorOpen = false;
		this.doorJustActivated = false;
		this.playerPoint = null;
		this.isMechanism = false;
		this.isAcceleration = true;
		this.portals = {};
		this.animsManager = new Anims(this);
		this.accelerationTimer = null;
		this.dialogTimer = null;
	}

	init() {
		this.map;
		this.tileset;
		this.backgroundLayer;
		this.wallsLayer;
		this.topInteriorLayer;
		this.interiorLayer;
		this.overheadLayer;
		this.topOverheadLayer;
		this.scriptLayer;
		this.objectLayer;
	}

	create(settings) {
		this.accelerationTimer = this.time.addEvent({ delay: 1500, loop: true, paused: true });
		this.dialogTimer = this.time.addEvent({ delay: 1600, paused: true });

		localStorage.setItem('level', this.scene.key);

		this.pickup = this.sound.get('pickup', { volume: 0.6 });
		this.boost = this.sound.get('boost', { volume: 0.6 });
		this.reload = this.sound.get('reload', { volume: 0.6 });
		this.nextLevel = this.sound.get('nextLevel', { volume: 0.5 });
		this.openDoor = this.sound.get('openDoor', { volume: 0.6 });
		this.mechanism = this.sound.get('mechanism', { volume: 0.8 });
		this.morse = this.sound.get('morse', { volume: 1 });

		this.cursors = this.input.keyboard.createCursorKeys();

		this.buttons = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			openMenu: Phaser.Input.Keyboard.KeyCodes.M
		});

		if (this.scene.key !== 'HomeScene')
			window.player = this.player = this.add.rpgcharacter({
				x: this.playerPoint.x,
				y: this.playerPoint.y,
				name: 'astronaut',
				image: 'astronaut',
				speed: 80
			});
		else window.player = this.player = this.add.rpgcharacter({
			x: this.playerPoint.x,
			y: this.playerPoint.y,
			name: 'dude',
			image: 'dude',
			speed: 80
		});

		this.map = this.make.tilemap({ key: settings.mapKey });

		const tileset = this.map.addTilesetImage(settings.tiledKey, settings.tileKey);

		this.backgroundLayer = this.map.createLayer('Background', tileset, 0, 0);
		this.wallsLayer = this.map.createLayer('Walls', tileset, 0, 0);
		this.interiorLayer = this.map.createLayer('Interior', tileset, 0, 0);
		if (this.scene.key === 'HomeScene') {
			this.topInteriorLayer = this.map.createLayer('TopInterior', tileset, 0, 0);
			this.topInteriorLayer.setCollisionByProperty({ collide: true });
			this.physics.add.collider(this.player, this.topInteriorLayer, this.HitInteractiveLayer.bind(this));
		}
		this.overheadLayer = this.map.createLayer('Overhead', tileset, 0, 0);
		if (this.scene.key === 'HomeScene') this.topOverheadLayer = this.map.createLayer('TopOverhead', tileset, 0, 0);
		this.scriptLayer = this.map.createLayer('Script', tileset, 0, 0);
		this.objectLayer = this.map.getObjectLayer('Script');

		this.interiorLayer.setCollisionByProperty({ collide: true });
		this.wallsLayer.setCollisionByProperty({ collide: true });

		this.player.setDepth(10);
		this.overheadLayer.setDepth(20);

		this.physics.add.collider(this.player, this.wallsLayer, this.HitInteractiveLayer.bind(this));
		this.physics.add.collider(this.player, this.interiorLayer, this.HitInteractiveLayer.bind(this));

		if (this.objectLayer && this.objectLayer.objects) {
			this.objectLayer.objects.forEach(
				(object) => {
					let tmp = this.add.rectangle((object.x + (object.width / 2)), (object.y + (object.height / 2)), object.width, object.height);
					tmp.properties = object.properties.reduce(
						(obj, item) => Object.assign(obj, { [item.name]: item.value }), {}
					);

					this.physics.world.enable(tmp, 0);
					tmp.body.setBounce(10);
					this.physics.add.collider(this.player, tmp, this.HitScript, null, this);
				}
			);
		}

		this.player.setDepth(10);

		const camera = this.cameras.main;
		camera.setZoom(2, 2)
		camera.startFollow(this.player, false, 1, 1);
		camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

		this.animsManager.create();

		this.script = this.cache.json.get('scriptdata');
	}

	update() {
		if (this.game.global.playMusic && this.game.global.backgroundMusic === null ||
			this.game.global.playMusic && this.game.global.backgroundMusic !== null &&
			!this.game.global.backgroundMusic.isPlaying) {
			if (this.scene.key === 'FirstLevel' || this.scene.key === 'SecondLevel' ||
				this.scene.key === 'ThirdLevel' || this.scene.key === 'SeventhLevel') {
				let num = this.getRandomNumber(0, 6);

				if (num === 0) this.game.global.backgroundMusic = this.sound.get('toTheSpace');
				else if (num === 1) this.game.global.backgroundMusic = this.sound.get('spaceRiddle');
				else if (num === 2) this.game.global.backgroundMusic = this.sound.get('cactusDude');
				else if (num === 3) this.game.global.backgroundMusic = this.sound.get('mysteriousCavern');
				else if (num === 4) this.game.global.backgroundMusic = this.sound.get('ambientSpace');
				else if (num === 5) this.game.global.backgroundMusic = this.sound.get('piano');
				else this.game.global.backgroundMusic = this.sound.get('repose');
			} else if (this.scene.key === 'FourthLevel' || this.scene.key === 'SixthLevel' ||
				this.scene.key === 'NinthLevel') {
				let num = this.getRandomNumber(0, 11);

				if (num === 0) this.game.global.backgroundMusic = this.sound.get('toTheSpace');
				else if (num === 1) this.game.global.backgroundMusic = this.sound.get('spaceRiddle');
				else if (num === 2) this.game.global.backgroundMusic = this.sound.get('cactusDude');
				else if (num === 3) this.game.global.backgroundMusic = this.sound.get('farAway');
				else if (num === 4) this.game.global.backgroundMusic = this.sound.get('mysteriousCavern');
				else if (num === 5) this.game.global.backgroundMusic = this.sound.get('ambientSpace');
				else if (num === 6) this.game.global.backgroundMusic = this.sound.get('observation');
				else if (num === 7) this.game.global.backgroundMusic = this.sound.get('piano');
				else if (num === 8) this.game.global.backgroundMusic = this.sound.get('observation');
				else if (num === 9) this.game.global.backgroundMusic = this.sound.get('devotion');
				else if (num === 10) this.game.global.backgroundMusic = this.sound.get('hope');
				else this.game.global.backgroundMusic = this.sound.get('repose');
			} else if (this.scene.key === 'FifthLevel' || this.scene.key === 'EighthLevel') {
				let num = this.getRandomNumber(0, 2);

				if (num === 0) this.game.global.backgroundMusic = this.sound.get('trackTwo');
				else if (num === 1) this.game.global.backgroundMusic = this.sound.get('infinityIsBeyond');
				else this.game.global.backgroundMusic = this.sound.get('futureBattle');
			} else {
				this.game.global.backgroundMusic = this.sound.get('piano');
			}

			if (this.game.global.backgroundMusic !== null) this.game.global.backgroundMusic.play();
		}

		if (this.game.global.backgroundMusic !== null) {
			if (!this.game.global.playMusic && this.game.global.backgroundMusic.isPlaying) this.game.global.backgroundMusic.pause();
			if (this.game.global.playMusic && !this.game.global.backgroundMusic.isPlaying) this.game.global.backgroundMusic.resume();
		}

		if (this.isDoorOpen && !this.doorJustActivated) {
			if (this.game.global.playSound && this.scene.key !== 'HomeScene') this.openDoor.play();
			this.doorJustActivated = true;
		}

		if (this.buttons.openMenu.isDown) {
			if (this.scene.isActive('ComputerScene')) this.scene.stop('ComputerScene');
			this.scene.switch('MenuScene');
		}

		if (this.DddDialog.visible) {
			if (this.dialogTimer.getElapsedSeconds() === 0) this.dialogTimer.paused = false;
			if (this.dialogTimer.getOverallProgress() >= 1.5) this.dialogTimer.paused = true;
			this.input.keyboard.on('keydown', () => {
				if (this.dialogTimer.getElapsedSeconds() >= 1.5) {
					this.DddDialog.display(false);
					this.dialogTimer.reset({ delay: 1600, loop: false, paused: true });
				}
			})

			return false;
		}

		if (this.buttons.left.isDown || this.cursors.left.isDown) {
			this.player.SetInstruction({ action: 'walk', option: 'left' });

			if (this.scene.key !== 'HomeScene' && this.scene.key !== 'FinalScene') {
				let tmp = this.add.sprite(this.player.x + 12, this.player.y, 'brick');
				this.physics.world.enable(tmp, 1);
				this.physics.add.collider(this.player, tmp, this.HitInteractiveLayer.bind(this));
			}
		} else if (this.buttons.right.isDown || this.cursors.right.isDown) {
			this.player.SetInstruction({ action: 'walk', option: 'right' });

			if (this.scene.key !== 'HomeScene' && this.scene.key !== 'FinalScene') {
				let tmp = this.add.sprite(this.player.x - 12, this.player.y, 'brick');
				this.physics.world.enable(tmp, 1);
				this.physics.add.collider(this.player, tmp, this.HitInteractiveLayer.bind(this));
			}
		} else if (this.buttons.down.isDown || this.cursors.down.isDown) {
			this.player.SetInstruction({ action: 'walk', option: 'down' });

			if (this.scene.key !== 'HomeScene' && this.scene.key !== 'FinalScene') {
				let tmp = this.add.sprite(this.player.x, this.player.y - 12, 'brick');
				this.physics.world.enable(tmp, 1);
				this.physics.add.collider(this.player, tmp, this.HitInteractiveLayer.bind(this));
			}
		} else if (this.buttons.up.isDown || this.cursors.up.isDown) {
			this.player.SetInstruction({ action: 'walk', option: 'up' });

			if (this.scene.key !== 'HomeScene' && this.scene.key !== 'FinalScene') {
				let tmp = this.add.sprite(this.player.x, this.player.y + 12, 'brick');
				this.physics.world.enable(tmp, 1);
				this.physics.add.collider(this.player, tmp, this.HitInteractiveLayer.bind(this));
			}
		}

		if (this.accelerationTimer.getElapsedSeconds() < 0.3) {
			this.player.tint = '0xffffff';
			this.accelerationTimer.paused = true;
		}

		if (this.accelerationTimer.getElapsedSeconds() > 0.1) {
			this.accelerationTimer.paused = false;
			this.player.tint = '0xffcc99';
			this.isAcceleration = false;
		}

		if (this.accelerationTimer.getElapsedSeconds() > 1.5) this.accelerationTimer.reset({ delay: 1500, loop: true });

		if (this.accelerationTimer.getElapsedSeconds() < 0.3 && this.cursors.space.isDown &&
			!this.DddDialog.visible && this.scene.key !== 'HomeScene') {
			this.accelerationTimer.paused = false;
			if (this.game.global.playSound) this.boost.play();
			this.player.speed = 300;
		} else this.player.speed = 80;

		this.player.update();
		return true;
	}

	HitInteractiveLayer(player, target) {
		if (target.properties === undefined) {
			if (this.scene.key !== 'HomeScene') {
				this.totalCount = 0;
				this.doorJustActivated = false;
				this.isDoorOpen = false;
				if (this.game.global.playSound) this.reload.play();
				this.scene.restart();
			}
		} else {
			if (target.properties.isFinal) {
				if (this.isDoorOpen) this.scene.start('CreditScene');
			}
			if (target.properties.isComputer) {
				this.topOverheadLayer.visible = false;
				this.isDoorOpen = true;
				this.scene.run('ComputerScene');
			}
			if (target.properties.mechanism === false) {
				target.visible = false;
				target.x = 0;
				target.properties.mechanism = true;
				if (this.game.global.playSound) this.mechanism.play();
			}
			if (target.properties.data === true) {
				if (this.game.global.playSound) this.pickup.play();
				target.visible = false;
				target.x = 0;
				this.totalCount += 1;
				target.properties.data = false;
			}
			if (target.properties.morse) this.morse.play();
			if (target.properties.portal && this.portals[target.properties.portal] && this.isDoorOpen) {
				if (this.game.global.playSound) this.nextLevel.play();
				this.scene.start(this.portals[target.properties.portal], { origin: this.scene.key });
				this.totalCount = 0;
				this.isDoorOpen = false;
			}
		}
	}

	getRandomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

	startHomeScene() { this.scene.start('HomeScene') }

	HitScript(player, target) {
		if (target.properties.name && !this.DddDialog.visible) {
			this.player.DoHalt();
			this.DddDialog.setText(this.script[player.name][target.properties.name], player.x, player.y);
		}
	}
}
