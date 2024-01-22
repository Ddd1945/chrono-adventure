import Phaser from 'phaser';

/**
 * Boot scene
 */

export class BootScene extends Phaser.Scene {
	constructor() {
		super({ key: 'BootScene', });

		this.screenWidth = 1250;
		this.screenHeight = 570;
		this.progressBarWidth = 620;
		this.progressBarHeight = 100;
	}

	preload() {
		this.load.spritesheet('astronaut', 'assets/sprites/astronaut.png',
			{ frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('slime', 'assets/sprites/slime.png',
			{ frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('eye', 'assets/sprites/eye.png',
			{ frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('dude', 'assets/sprites/dude.png',
			{ frameWidth: 32, frameHeight: 32 });
		this.load.image('tilesSpace', 'assets/tilemaps/cosmic-lilac-tiles.png');
		this.load.image('tilesSpace', 'assets/tilemaps/cosmic-lilac-tiles.png');
		this.load.image('tilesHome', 'assets/tilemaps/pixel-cyberpunk-interior.png')
		this.load.tilemapTiledJSON('firstLevel', 'assets/tilemaps/FirstLevel.json');
		this.load.tilemapTiledJSON('secondLevel', 'assets/tilemaps/SecondLevel.json');
		this.load.tilemapTiledJSON('thirdLevel', 'assets/tilemaps/ThirdLevel.json');
		this.load.tilemapTiledJSON('fourthLevel', 'assets/tilemaps/FourthLevel.json');
		this.load.tilemapTiledJSON('fifthLevel', 'assets/tilemaps/FifthLevel.json');
		this.load.tilemapTiledJSON('sixthLevel', 'assets/tilemaps/SixthLevel.json');
		this.load.tilemapTiledJSON('seventhLevel', 'assets/tilemaps/SeventhLevel.json');
		this.load.tilemapTiledJSON('eighthLevel', 'assets/tilemaps/EighthLevel.json');
		this.load.tilemapTiledJSON('ninthLevel', 'assets/tilemaps/NinthLevel.json');
		this.load.tilemapTiledJSON('finalScene', 'assets/tilemaps/FinalScene.json');
		this.load.tilemapTiledJSON('homeScene', 'assets/tilemaps/HomeScene.json')
		this.load.image('intro', ('assets/images/boot/intro.png'));
		this.load.image('notebook', ('assets/images/computer/notebookThree.png'));
		this.load.image('notebookExitButton', ('assets/images/computer/notebook-exit-button.png'));
		this.load.image('notebookExitButtonSelected', ('assets/images/computer/notebook-exit-button-selected.png'));
		this.load.image('city', ('assets/images/credit/city.png'));
		this.load.image('car-0', ('assets/images/credit/car-zero.png'));
		this.load.image('car-2', ('assets/images/credit/car-two.png'));
		this.load.image('car-3', ('assets/images/credit/car-three.png'));
		this.load.image('car-4', ('assets/images/credit/car-four.png'));
		this.load.image('car-5', ('assets/images/credit/car-five.png'));
		this.load.image('car-6', ('assets/images/credit/car-six.png'));
		this.load.image('car-7', ('assets/images/credit/car-seven.png'));
		this.load.image('car-8', ('assets/images/credit/car-eight.png'));
		this.load.image('car-9', ('assets/images/credit/car-nine.png'));
		this.load.image('car-10', ('assets/images/credit/car-ten.png'));
		this.load.image('car-11', ('assets/images/credit/car-eleven.png'));
		this.load.image('car-12', ('assets/images/credit/car-twelve.png'));
		this.load.image('car-13', ('assets/images/credit/car-thirteen.png'));
		this.load.image('car-14', ('assets/images/credit/car-fourteen.png'));
		this.load.image('car-15', ('assets/images/credit/car-fifteen.png'));
		this.load.image('car-16', ('assets/images/credit/car-sixteen.png'));
		this.load.image('car-17', ('assets/images/credit/car-seventeen.png'));
		this.load.image('car-18', ('assets/images/credit/car-eighteen.png'));
		this.load.image('car-19', ('assets/images/credit/car-nineteen.png'));
		this.load.image('car-20', ('assets/images/credit/car-twenty.png'));
		this.load.image('car-21', ('assets/images/credit/car-twenty-one.png'));
		this.load.image('background', ('assets/images/menu/background.png'));
		this.load.image('starsZero', ('assets/images/menu/stars-zero.png'));
		this.load.image('starsOne', ('assets/images/menu/stars-one.png'));
		this.load.image('starsTwo', ('assets/images/menu/stars-two.png'));
		this.load.image('starsThree', ('assets/images/menu/stars-three.png'));
		this.load.image('resumeGame', ('assets/images/menu/resume-game.png'));
		this.load.image('resumeGameSelected', ('assets/images/menu/resume-game-selected.png'));
		this.load.image('newGame', ('assets/images/menu/new-game.png'));
		this.load.image('newGameSelected', ('assets/images/menu/new-game-selected.png'));
		this.load.image('newGameQuestion', ('assets/images/menu/new-game-question.png'));
		this.load.image('confirmNewGame', ('assets/images/menu/yes.png'));
		this.load.image('confirmNewGameSelected', ('assets/images/menu/yes-selected.png'));
		this.load.image('rejectNewGame', ('assets/images/menu/nope.png'));
		this.load.image('rejectNewGameSelected', ('assets/images/menu/nope-selected.png'));
		this.load.image('exitGame', ('assets/images/menu/exit-game.png'));
		this.load.image('exitGameSelected', ('assets/images/menu/exit-game-selected.png'));
		this.load.image('musicOn', ('assets/images/menu/music-on.png'));
		this.load.image('musicOff', ('assets/images/menu/music-off.png'));
		this.load.image('soundOn', ('assets/images/menu/sound-on.png'));
		this.load.image('soundOff', ('assets/images/menu/sound-off.png'));
		this.load.image('dollar', ('assets/images/menu/dollar.png'));
		this.load.image('brick', ('assets/images/game/brick.png'));
		this.load.audio('hurryUp', ('assets/audio/soundtrack/hurry-up.mp3'));
		this.load.audio('menuClick', ('assets/audio/sounds/menu/menu-click.mp3'));
		this.load.audio('menuLook', ('assets/audio/sounds/menu/menu-look.mp3'));
		this.load.audio('pickup', ('assets/audio/sounds/game/pickup.mp3'));
		this.load.audio('alarm', ('assets/audio/sounds/game/alarm.mp3'));
		this.load.audio('boost', ('assets/audio/sounds/game/acceleration.mp3'));
		this.load.audio('reload', ('assets/audio/sounds/game/reload.mp3'));
		this.load.audio('nextLevel', ('assets/audio/sounds/game/next-level.mp3'));
		this.load.audio('openDoor', ('assets/audio/sounds/game/open-door.mp3'));
		this.load.audio('mechanism', ('assets/audio/sounds/game/mechanism.mp3'));
		this.load.audio('morse', ('assets/audio/sounds/game/morse.mp3'));
		this.load.audio('repose', ('assets/audio/soundtrack/repose.mp3'));
		this.load.audio('ambientSpace', ('assets/audio/soundtrack/ambient-space.mp3'));
		this.load.audio('observation', ('assets/audio/soundtrack/observation.mp3'));
		this.load.audio('piano', ('assets/audio/soundtrack/piano.mp3'));
		this.load.audio('devotion', ('assets/audio/soundtrack/synth-kid-devotion.mp3'));
		this.load.audio('hope', ('assets/audio/soundtrack/synth-kid-hope-is-not-lost.mp3'));
		this.load.audio('toTheSpace', ('assets/audio/soundtrack/sci-fi.mp3'));
		this.load.audio('endGame', ('assets/audio/soundtrack/endgame.mp3'));
		this.load.audio('cactusDude', ('assets/audio/soundtrack/cactusdude.mp3'));
		this.load.audio('cactusDudeMenu', ('assets/audio/soundtrack/menu-soundtrack-by-cactusdude.mp3'));
		this.load.audio('parabola', ('assets/audio/soundtrack/parabola.mp3'));
		this.load.audio('spaceCrew', ('assets/audio/soundtrack/space-crew-find-a-way.mp3'));
		this.load.audio('spaceRiddle', ('assets/audio/soundtrack/space-riddle.mp3'));
		this.load.audio('trackOne', ('assets/audio/soundtrack/track-one.mp3'));
		this.load.audio('trackTwo', ('assets/audio/soundtrack/track-two.mp3'));
		this.load.audio('futureBattle', ('assets/audio/soundtrack/future-space-battle-planarian-bgm.mp3'));
		this.load.audio('billySacrifice', ('assets/audio/soundtrack/billy-sacrifice.mp3'));
		this.load.audio('mysteriousCavern', ('assets/audio/soundtrack/mysterious-cavern.mp3'));
		this.load.audio('farAway', ('assets/audio/soundtrack/dos-88-far-away.mp3'));
		this.load.audio('infinityIsBeyond', ('assets/audio/soundtrack/infinity-is-beyond.mp3'));
		this.load.audio('futureBeatsPops', ('assets/audio/soundtrack/future-beats-pops.mp3'));
		this.load.json('scriptdata', ('assets/data/script.json'));

		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(this.screenWidth / 2 - this.progressBarWidth / 2,
			this.screenHeight / 2 - this.progressBarHeight / 2,
			this.progressBarWidth, this.progressBarHeight);

		let loadingText = this.make.text({
			x: this.screenWidth / 2 + 15,
			y: this.screenHeight / 2 - this.progressBarHeight,
			text: 'Loading...',
			style: {
				fontFamily: 'Flexi_IBM_VGA_True',
				fontSize: '55px',
				fill: '#ffffff',
				lineSpacing: '10',
				resolution: 5
			}
		}).setOrigin(0.5, 0.5);

		let percentText = this.make.text({
			x: this.screenWidth / 2 + 5,
			y: this.screenHeight / 2 - this.progressBarHeight / 2 + 50,
			text: '0%',
			style: {
				fontFamily: 'Flexi_IBM_VGA_True',
				fontSize: '35px',
				fill: '#ffffff',
				lineSpacing: '10',
				resolution: 3
			}
		}).setOrigin(0.5, 0.5);

		let assetText = this.make.text({
			x: this.screenWidth / 2,
			y: this.screenHeight / 2 + this.progressBarHeight,
			text: '',
			style: {
				fontFamily: 'Flexi_IBM_VGA_True',
				fontSize: '30px',
				fill: '#ffffff',
				lineSpacing: '10',
				resolution: 5
			}
		}).setOrigin(0.5, 0.5);

		this.load.on('progress', (value) => {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect((this.screenWidth) / 2 - (this.progressBarWidth - 20) / 2,
				this.screenHeight / 2 - (this.progressBarHeight - 20) / 2,
				(this.progressBarWidth - 20) * value, this.progressBarHeight - 20
			);
		});

		this.load.on('fileprogress', (file) => assetText.setText('Loading asset: ' + file.key));
		this.load.on('complete', () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});
	}

	create() {
		this.sound.add('menuClick', { volume: 0.7 });
		this.sound.add('menuLook', { volume: 0.7 });
		this.sound.add('hurryUp', { loop: true, volume: 0.35 });
		this.sound.add('ambientSpace', { volume: 0.3 });
		this.sound.add('observation', { volume: 0.2 });
		this.sound.add('piano', { volume: 0.6 });
		this.sound.add('devotion', { volume: 0.15 });
		this.sound.add('hope', { volume: 0.15 });
		this.sound.add('toTheSpace', { volume: 0.5 });
		this.sound.add('cactusDude', { volume: 0.5 });
		this.sound.add('repose', { volume: 0.2 });
		this.sound.add('cactusDudeMenu', { volume: 0.35 });
		this.sound.add('spaceRiddle', { volume: 0.1 });
		this.sound.add('endGame', { volume: 0.3 });
		this.sound.add('parabola', { volume: 0.2 });
		this.sound.add('spaceCrew', { volume: 0.15 });
		this.sound.add('trackOne', { volume: 0.5 });
		this.sound.add('trackTwo', { volume: 0.5 });
		this.sound.add('futureBattle', { volume: 0.2 });
		this.sound.add('infinityIsBeyond', { volume: 0.25 });
		this.sound.add('billySacrifice', { volume: 0.1 });
		this.sound.add('mysteriousCavern', { volume: 0.2 });
		this.sound.add('futureBeatsPops', { volume: 0.35 });
		this.sound.add('pickup', { volume: 0.6 });
		this.sound.add('boost', { volume: 0.6 });
		this.sound.add('reload', { volume: 0.5 });
		this.sound.add('nextLevel', { volume: 0.6 });
		this.sound.add('openDoor', { volume: 0.8 });
		this.sound.add('mechanism', { volume: 0.65 });
		this.sound.add('morse', { volume: 1 });
		this.sound.add('alarm', { loop: true, volume: 0.2 });

		this.cameras.main.fadeIn(2000);
		setTimeout(() => { this.cameras.main.fadeOut(2000) }, 3500);
		setTimeout(() => { this.scene.start('MenuScene') }, 7000);
		this.intro = this.add.image(this.screenWidth / 2 + 80, this.screenHeight / 2 + 50, 'intro').setScale(2.5);
		setTimeout(() => this.scene.pause(), 6500);
	}
}
