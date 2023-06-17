import Phaser from 'phaser';

/**
 * Menu Scene
 */

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MenuScene',
        });

        this.menu = 'common';
        this.selectedOption = 0;
        this.cursors = null;
        this.buttons = null;
        this.backgroundMusic = null;
        this.scaleNotesUp = true;
        this.interval = null;
        this.notes = null;
    }

    create() {
        this.cameras.main.fadeIn(500);

        this.menuClick = this.sound.get('menuClick');
        this.menuLook = this.sound.get('menuLook');

        if (this.game.global.backgroundMusic === null) {
            this.backgroundMusic = this.sound.get('hurryUp');
            this.backgroundMusic.play();
            this.backgroundMusic.resume();
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        this.buttons = this.input.keyboard.addKeys({
            closeMenu: Phaser.Input.Keyboard.KeyCodes.M,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        this.background = this.add.image(0, -30, 'background').setScale(5);
        this.starsZero = this.add.image(1200, 0, 'starsZero').setScale(5);
        this.starsOne = this.add.image(1100, 30, 'starsOne').setScale(5);
        this.starsTwo = this.add.image(1000, 60, 'starsTwo').setScale(5);
        this.starsThree = this.add.image(900, 90, 'starsThree').setScale(5);
        this.starsFour = this.add.image(800, 110, 'starsZero').setScale(5);
        this.starsFive = this.add.image(1400, 70, 'starsOne').setScale(5);
        this.starsSix = this.add.image(1500, 10, 'starsTwo').setScale(5);
        this.starsSeven = this.add.image(700, -50, 'starsThree').setScale(5);
        this.starsEight = this.add.image(600, -70, 'starsZero').setScale(5);
        this.starsNine = this.add.image(300, 150, 'starsOne').setScale(5);
        this.starsTen = this.add.image(500, -20, 'starsTwo').setScale(5);
        this.starsEleven = this.add.image(-700, 100, 'starsThree').setScale(5);
        this.starsTwelve = this.add.image(-1000, -100, 'starsZero').setScale(5);
        this.starsThirteen = this.add.image(-0, 30, 'starsOne').setScale(5);
        this.starsFourteen = this.add.image(350, 60, 'starsTwo').setScale(5);
        this.starsFifteen = this.add.image(700, 80, 'starsThree').setScale(5);
        this.resumeGame = this.add.image(625, 150, 'resumeGame').setScale(3.5, 3);
        this.resumeGameSelected = this.add.image(625, 150, 'resumeGameSelected').setScale(3.9, 3.3).setVisible(false);
        this.newGame = this.add.image(625, 250, 'newGame').setScale(3.5, 3);
        this.newGameSelected = this.add.image(625, 250, 'newGameSelected').setScale(3.9, 3.3).setVisible(false);
        this.newGameQuestion = this.add.image(625, 260, 'newGameQuestion').setVisible(false).setDepth(1000).setScale(2);
        this.confirmNewGame = this.add.image(-1000, 370, 'confirmNewGame').setDepth(1100).setScale(2);
        this.confirmNewGameSelected = this.add.image(-1000, 370, 'confirmNewGameSelected').setVisible(false).setDepth(1100).setScale(2);
        this.rejectNewGame = this.add.image(-1000, 370, 'rejectNewGame').setDepth(1100).setScale(2);
        this.rejectNewGameSelected = this.add.image(-1000, 370, 'rejectNewGameSelected').setVisible(false).setDepth(1100).setScale(2);
        this.exitGame = this.add.image(625, 350, 'exitGame').setScale(3.5, 3);
        this.exitGameSelected = this.add.image(625, 350, 'exitGameSelected').setScale(3.9, 3.3).setVisible(false);
        this.soundOn = this.add.image(920, 500, 'soundOn');
        this.soundOff = this.add.image(920, 500, 'soundOff').setVisible(false);
        this.musicOn = this.add.image(1005, 500, 'musicOn');
        this.musicOff = this.add.image(1005, 500, 'musicOff').setVisible(false);
        this.dollar = this.add.image(1090, 500, 'dollar');

        this.notes = this.make.text({
            scale: 1,
            x: 230,
            y: 265,
            angle: -55,
            text: 'Developed by DeNdyy1945',
            style: {
                stroke: '#B5359C',
                strokeThickness: 5,
                fontFamily: 'Flexi_IBM_VGA_True',
                fontSize: 45,
                lineSpacing: 35,
                resolution: 20
            }
        }).setOrigin(0.5, 0.5);

        this.interval = setInterval(() => {
            if (this.scaleNotesUp) this.notes.setScale(this.notes.scale + 0.01);
            else this.notes.setScale(this.notes.scale - 0.01);
            if (this.notes.scale >= 1.1) this.scaleNotesUp = false;
            if (this.notes.scale <= 1) this.scaleNotesUp = true;
        }, 150)

        this.resumeGame.setInteractive().on('pointerover', () => this.selectedOption = 0);
        this.resumeGame.setInteractive().on('pointerout', () => this.setOutOption());
        this.resumeGame.setInteractive().on('pointerdown', () => {
            if (typeof (localStorage.getItem('level')) === 'string') this.buttons.enter.isDown = true;
        });
        this.newGame.setInteractive().on('pointerover', () => this.selectedOption = 1);
        this.newGame.setInteractive().on('pointerout', () => this.setOutOption());
        this.newGame.setInteractive().on('pointerdown', () => this.buttons.enter.isDown = true);
        this.confirmNewGame.setInteractive().on('pointerover', () => this.selectedOption = 0);
        this.confirmNewGame.setInteractive().on('pointerdown', () => this.buttons.enter.isDown = true);
        this.rejectNewGame.setInteractive().on('pointerover', () => this.selectedOption = 1);
        this.rejectNewGame.setInteractive().on('pointerdown', () => this.buttons.enter.isDown = true);
        this.exitGame.setInteractive().on('pointerover', () => this.selectedOption = 2);
        this.exitGame.setInteractive().on('pointerout', () => this.setOutOption());
        this.exitGame.setInteractive().on('pointerdown', () => window.location = 'https://www.google.com/');
        this.soundOn.setInteractive().on('pointerover', () => this.selectedOption = 3);
        this.soundOn.setInteractive().on('pointerout', () => this.setOutOption());
        this.soundOn.setInteractive().on('pointerdown', () => this.buttons.enter.isDown = true);
        this.soundOff.setInteractive().on('pointerover', () => this.selectedOption = 3);
        this.soundOff.setInteractive().on('pointerout', () => this.setOutOption());
        this.soundOff.setInteractive().on('pointerdown', () => this.buttons.enter.isDown = true);
        this.musicOn.setInteractive().on('pointerover', () => this.selectedOption = 4);
        this.musicOn.setInteractive().on('pointerout', () => this.setOutOption());
        this.musicOn.setInteractive().on('pointerdown', () => this.buttons.enter.isDown = true);
        this.musicOff.setInteractive().on('pointerover', () => this.selectedOption = 4);
        this.musicOff.setInteractive().on('pointerout', () => this.setOutOption());
        this.musicOff.setInteractive().on('pointerdown', () => this.buttons.enter.isDown = true);
        this.dollar.setInteractive().on('pointerover', () => this.selectedOption = 5);
        this.dollar.setInteractive().on('pointerout', () => this.setOutOption());
        this.dollar.setInteractive().on('pointerdown', () => this.buttons.enter.isDown = true);
    }

    update() {
        if (this.buttons.up.isDown || this.buttons.right.isDown || this.buttons.left.isDown ||
            this.buttons.down.isDown || this.cursors.left.isDown || this.cursors.right.isDown ||

            this.cursors.up.isDown || this.cursors.down.isDown) this.menuLook.play();

        if (typeof (localStorage.getItem('level')) === 'string') {
            if (this.buttons.enter.isDown && this.selectedOption !== -1) this.menuClick.play();
        } else {
            if (this.buttons.enter.isDown && this.selectedOption !== 0) this.menuClick.play();
        }

        if (this.game.global.playMusic) this.backgroundMusic.resume();
        else this.backgroundMusic.pause();

        if (this.buttons.enter.isDown && this.menu === 'common') {
            if (this.selectedOption === 0 && typeof (localStorage.getItem('level')) === 'string') {
                this.backgroundMusic.stop();
                clearInterval(this.interval);
                this.scene.stop();
                this.scene.run(localStorage.getItem('level'));
            }
            if (this.selectedOption === 1) {
                this.newGameQuestion.setVisible(true);
                this.confirmNewGame.x = 510;
                this.confirmNewGameSelected.x = 510;
                this.rejectNewGame.x = 740;
                this.rejectNewGameSelected.x = 740;
                this.exitGame.x = -1000;
                this.resumeGame.x = -1000;
                this.newGame.x = -1000;
                this.menu = 'newGameMenu'
                this.buttons.enter.isDown = false;
            }
            if (this.selectedOption === 2) {
                this.scene.stop();
                window.location = 'https://www.google.com/'
            };
            if (this.selectedOption === 3) {
                this.game.global.playSound = !this.game.global.playSound;
                this.setOutOption();
                this.buttons.enter.isDown = false;
            }
            if (this.selectedOption === 4) {
                this.game.global.playMusic = !this.game.global.playMusic;
                if (this.game.global.backgroundMusic !== null)
                    if (!this.game.global.playMusic) this.game.global.backgroundMusic.stop();
                this.setOutOption();
                this.buttons.enter.isDown = false;
            }
            if (this.selectedOption === 5) {
                window.open('https://ko-fi.com/dendyy1945');
                this.setOutOption();
            }
        }

        if (this.buttons.left.isDown) this.buttons.left.onUp(this.selectedOption -= 1);
        if (this.buttons.right.isDown) this.buttons.right.onUp(this.selectedOption += 1);
        if (this.buttons.up.isDown) this.buttons.up.onUp(this.selectedOption -= 1);
        if (this.buttons.down.isDown) this.buttons.down.onUp(this.selectedOption += 1);
        if (this.cursors.left.isDown) this.cursors.left.onUp(this.selectedOption -= 1);
        if (this.cursors.right.isDown) this.cursors.right.onUp(this.selectedOption += 1);
        if (this.cursors.down.isDown) this.cursors.down.onUp(this.selectedOption += 1);
        if (this.cursors.up.isDown) this.cursors.up.onUp(this.selectedOption -= 1);
        if (this.selectedOption === 0 && typeof (localStorage.getItem('level')) !== 'string') {

        }

        if (this.menu === 'common') {
            if (this.selectedOption === 0 && typeof (localStorage.getItem('level')) === 'string')
                this.resumeGameSelected.setVisible(true)
            else this.resumeGameSelected.setVisible(false);
            if (this.selectedOption === 1) this.newGameSelected.setVisible(true);
            else this.newGameSelected.setVisible(false);
            if (this.selectedOption === 2) this.exitGameSelected.setVisible(true);
            else this.exitGameSelected.setVisible(false);

            if (this.selectedOption === 3 && this.game.global.playSound) {
                this.soundOn.setVisible(true);
                this.soundOff.setVisible(false);
                this.soundOn.setScale(3.3);
            }
            if (this.selectedOption === 3 && !this.game.global.playSound) {
                this.soundOn.setVisible(false);
                this.soundOff.setVisible(true);
                this.soundOff.setScale(3.3);
            }
            if (this.selectedOption !== 3 && this.game.global.playSound) {
                this.soundOn.setVisible(true);
                this.soundOff.setVisible(false);
                this.soundOn.setScale(3)
            }
            if (this.selectedOption !== 3 && !this.game.global.playSound) {
                this.soundOn.setVisible(false);
                this.soundOff.setVisible(true);
                this.soundOff.setScale(3)
            }

            if (this.selectedOption === 4 && this.game.global.playMusic) {
                this.musicOn.setVisible(true);
                this.musicOff.setVisible(false);
                this.musicOn.setScale(3.3);
            }
            if (this.selectedOption === 4 && !this.game.global.playMusic) {
                this.musicOn.setVisible(false);
                this.musicOff.setVisible(true);
                this.musicOff.setScale(3.3);
            }
            if (this.selectedOption !== 4 && this.game.global.playMusic) {
                this.musicOn.setVisible(true);
                this.musicOff.setVisible(false);
                this.musicOn.setScale(3)
            }
            if (this.selectedOption !== 4 && !this.game.global.playMusic) {
                this.musicOn.setVisible(false);
                this.musicOff.setVisible(true);
                this.musicOff.setScale(3)
            }
            if (this.selectedOption === 5) { this.dollar.setScale(3.3); }
            else this.dollar.setScale(3);

            if (typeof (localStorage.getItem('level')) === 'string') {
                if (this.selectedOption > 5) this.selectedOption = -1;
                if (this.selectedOption < -1) this.selectedOption = 5;
            } else {
                if (this.selectedOption > 5) this.selectedOption = 0;
                if (this.selectedOption < 0) this.selectedOption = 5;
            }
        }

        if (this.menu === 'newGameMenu') {
            this.newGameQuestion.setVisible(true);
            if (this.buttons.enter.isDown) {
                if (this.selectedOption === 0) {
                    if (typeof (this.getSleepingScene()) === 'string')
                        this.scene.stop(this.getSleepingScene());
                    clearInterval(this.interval);
                    this.scene.stop();
                    this.menu = 'common';
                    this.backgroundMusic.stop();
                    this.scene.start('FirstLevel');
                } else {
                    this.newGameQuestion.setVisible(false);
                    this.confirmNewGame.x = -1000;
                    this.confirmNewGameSelected.x = -1000;
                    this.rejectNewGame.x = -1000;
                    this.rejectNewGameSelected.x = -1000;
                    this.exitGame.x = 625;
                    this.resumeGame.x = 625;
                    this.newGame.x = 625;
                    this.menu = 'common';
                    this.buttons.enter.isDown = false;
                }
            }
            if (this.selectedOption > 1) this.selectedOption = 0;
            if (this.selectedOption < 0) this.selectedOption = 1;

            if (this.selectedOption === 0) this.confirmNewGameSelected.setVisible(true);
            else this.confirmNewGameSelected.setVisible(false);

            if (this.selectedOption === 1) this.rejectNewGameSelected.setVisible(true);
            else this.rejectNewGameSelected.setVisible(false);
        }

        this.starsZero.x -= 0.3;
        this.starsOne.x -= 0.6;
        this.starsTwo.x -= 0.9;
        this.starsThree.x -= 0.9;
        this.starsFour.x -= 0.3;
        this.starsFive.x -= 0.6;
        this.starsSix.x -= 0.9;
        this.starsSeven.x -= 0.9;
        this.starsEight.x += 0.3;
        this.starsNine.x += 0.6;
        this.starsTen.x += 0.9;
        this.starsEleven.x += 0.9;
        this.starsTwelve.x += 0.3;
        this.starsThirteen.x += 0.6;
        this.starsFourteen.x += 0.9;
        this.starsFifteen.x += 0.9;

        if (this.starsZero.x < -1300) this.starsZero.x = 1900;
        if (this.starsOne.x < -1300) this.starsOne.x = 1900;
        if (this.starsTwo.x < -1300) this.starsTwo.x = 1900;
        if (this.starsThree.x < -1300) this.starsThree.x = 1900;
        if (this.starsFour.x < -1300) this.starsFour.x = 1900;
        if (this.starsFive.x < -1300) this.starsFive.x = 1900;
        if (this.starsSix.x < -1300) this.starsSix.x = 1900;
        if (this.starsSeven.x < -1300) this.starsSeven.x = 1900;
        if (this.starsEight.x > 2100) this.starsEight.x = -770;
        if (this.starsNine.x > 2100) this.starsNine.x = -770;
        if (this.starsTen.x > 2100) this.starsTen.x = -770;
        if (this.starsEleven.x > 2100) this.starsEleven.x = -770;
        if (this.starsTwelve.x > 2100) this.starsTwelve.x = -770;
        if (this.starsThirteen.x > 2100) this.starsThirteen.x = -770;
        if (this.starsFourteen.x > 2100) this.starsFourteen.x = -770;
        if (this.starsFifteen.x > 2100) this.starsFifteen.x = -770;

        if (this.buttons.closeMenu.isDown) {
            if (this.getSleepingScene() !== false) {
                this.menu = 'common';
                this.scene.stop();
                clearInterval(this.interval);
                this.backgroundMusic.stop();
                this.scene.run(this.getSleepingScene());
            } else this.buttons.closeMenu.isDown = false;
        }
    }

    getSleepingScene() {
        if (this.scene.isSleeping('FirstLevel')) return 'FirstLevel';
        else if (this.scene.isSleeping('SecondLevel')) return 'SecondLevel';
        else if (this.scene.isSleeping('ThirdLevel')) return 'ThirdLevel';
        else if (this.scene.isSleeping('FourthLevel')) return 'FourthLevel';
        else if (this.scene.isSleeping('FifthLevel')) return 'FifthLevel';
        else if (this.scene.isSleeping('SixthLevel')) return 'SixthLevel';
        else if (this.scene.isSleeping('SeventhLevel')) return 'SeventhLevel';
        else if (this.scene.isSleeping('EighthLevel')) return 'EighthLevel';
        else if (this.scene.isSleeping('NinthLevel')) return 'NinthLevel';
        else if (this.scene.isSleeping('FinalScene')) return 'FinalScene';
        else if (this.scene.isSleeping('HomeScene')) return 'HomeScene';
        else if (this.scene.isSleeping('ComputerScene')) return 'ComputerScene';
        else return false;
    }

    setOutOption() {
        if (typeof (localStorage.getItem('level')) === 'string') this.selectedOption = -1;
        else this.selectedOption = 0;
    }
}
