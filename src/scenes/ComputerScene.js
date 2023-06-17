import Phaser from 'phaser';

/**
 * Computer Scene
 */

export class ComputerScene extends Phaser.Scene {
    constructor() { super({ key: 'ComputerScene' }); }

    create() {
        this.notebook = this.add.image(625, 285, 'notebook').setScale(0.65, 0.52);
        this.notebookExitButton = this.add.image(1200, 55, 'notebookExitButton').setScale(0.8);
        this.notebookExitButtonSelected = this.add.image(1200, 55, 'notebookExitButtonSelected').setScale(0.8).setVisible(false);

        this.notebookExitButton.setInteractive().on('pointerout', () => this.notebookExitButtonSelected.setVisible(false));
        this.notebookExitButton.setInteractive().on('pointerdown', () => this.scene.stop());
        this.notebookExitButton.setInteractive().on('pointerover', () => this.notebookExitButtonSelected.setVisible(true));

        this.date = this.make.text({
            x: 700,
            y: 18,
            text: '',
            style: {
                fontFamily: 'Flexi_IBM_VGA_True',
                fontSize: '18px',
                fill: '#f1f1f1',
                lineSpacing: '35',
                resolution: 20
            }
        }).setOrigin(0.5, 0.5);

        this.cameras.main.fadeIn(1000);
    }

    update() {
        this.input.keyboard.on('keydown', () => { this.scene.stop(); })
        this.date.setText(new Date().toLocaleString());
    }
}
