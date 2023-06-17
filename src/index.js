import 'phaser';
import { FirstLevel } from './scenes/FirstLevel';
import { SecondLevel } from './scenes/SecondLevel';
import { ThirdLevel } from './scenes/ThirdLevel';
import { FourthLevel } from './scenes/FourthLevel';
import { FifthLevel } from './scenes/FifthLevel';
import { SixthLevel } from './scenes/SixthLevel';
import { SeventhLevel } from './scenes/SeventhLevel';
import { EighthLevel } from './scenes/EighthLevel';
import { NinthLevel } from './scenes/NinthLevel';
import { FinalScene } from './scenes/FinalScene';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { HomeScene } from './scenes/HomeScene';
import { ComputerScene } from './scenes/ComputerScene';
import { CreditScene } from './scenes/CreditScene';
import { DddRpgCharacterPlugin } from './plugins/DddRpgCharacter';
import { DddDialog } from './plugins/DddDialog';


const gameConfig = {
	type: Phaser.AUTO,
	width: 1250,
	height: 570,
	parent: 'phaser-game',
	dom: {
		createContainer: true
	},
	antialias: false,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	plugins: {
		global: [
			{ key: 'DddRpgCharacterPlugin', plugin: DddRpgCharacterPlugin, start: true }
		],
		scene: [
			{ key: 'DddDialog', plugin: DddDialog, mapping: 'DddDialog' }
		]
	},
	scene: [
		BootScene,
		MenuScene,
		FirstLevel,
		SecondLevel,
		ThirdLevel,
		FourthLevel,
		FifthLevel,
		SixthLevel,
		SeventhLevel,
		EighthLevel,
		NinthLevel,
		FinalScene,
		HomeScene,
		ComputerScene,
		CreditScene
	]
};

const phaserGame = new Phaser.Game(gameConfig);

phaserGame.global = {
	playSound: true,
	playMusic: true,
	backgroundMusic: null
}
