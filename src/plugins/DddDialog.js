import Phaser from 'phaser';

export class DddDialog extends Phaser.Plugins.ScenePlugin {

	constructor(scene, pluginManager) {
		super(scene, pluginManager);
		this.scene = scene;
		this.systems = scene.sys;

		this.borderThickness = 5;
		this.borderColor = 0xff00ff;
		this.borderAlpha = 1;
		this.windowAlpha = 1;
		this.windowColor = 0x000000;
		this.windowWidth = 470;
		this.windowHeight = 68;
		this.padding = 7;
		this.dialogSpeed = 55;
		this.scrollFactor = 1; //scrollFactor of 0 fixes to the camera

		// if the dialog window is shown
		this.visible = false;
		// the text that will be displayed in the window
		this.graphics = {
			background: null,
			text: null
		};
	}

	//  Called when the Plugin is booted by the PluginManager.
	boot() { this.display(false); }

	// Hide/Show the dialog window
	display(showMe) {
		if (typeof showMe === 'undefined') this.visible = !this.visible;
		else this.visible = showMe;
		if (this.graphics.text) this.graphics.text.visible = this.visible;
		if (this.graphics.background) this.graphics.background.visible = this.visible;

		if (!this.visible) {
			if (this.graphics.text) this.graphics.text.destroy();
			if (this.graphics.background) this.graphics.background.destroy();
			if (this.timedEvent) this.timedEvent.remove();
		}
	}

	// Sets the text for the dialog window
	setText(text, posX, posY) {
		this._drawBackground(posX, posY);
		this._drawText(posX, posY);

		if (!text || !text.split) return;

		this.display(true);

		const charArray = text.split('');

		this.graphics.text.setText('');

		this.timedEvent = this.scene.time.addEvent({
			delay: 300 - (this.dialogSpeed * 5),
			callback: (charArray) => {
				this.graphics.text.setText(this.graphics.text.text + charArray[this.graphics.text.text.length]);
				if (this.graphics.text.text.length === charArray.length) {
					this.timedEvent.remove();
				}
			},
			args: [charArray],
			callbackScope: this,
			loop: true
		});
	}

	// Calculates where to place the dialog window based on the game size
	_calculateWindowDimensions(posX, posY) {
		var x = posX - 235
		var y = posY + 55;
		var width = this.windowWidth;
		var height = this.windowHeight;
		return {
			x,
			y,
			width,
			height
		};
	}

	// Creates the dialog window
	_drawBackground(posX, posY) {
		let dimensions = this._calculateWindowDimensions(posX, posY);
		this.graphics.background = this.scene.add.graphics().setScrollFactor(this.scrollFactor);

		this.graphics.background.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
		this.graphics.background.fillStyle(this.windowColor, this.windowAlpha);
		this.graphics.background.strokeRoundedRect(dimensions.x, dimensions.y, dimensions.width, dimensions.height, 5);
		this.graphics.background.fillRoundedRect(dimensions.x, dimensions.y, dimensions.width, dimensions.height, 5);

		// Ensure the dialog box renders above everything else
		this.graphics.background.setDepth(1000);
	}

	// Creates text holder within the dialog window
	_drawText(posX, posY) {
		let dimensions = this._calculateWindowDimensions(posX, posY);
		let x = dimensions.x + this.padding * 1.1;
		let y = dimensions.y + 5
		let text = '';

		this.graphics.text = this.scene.make.text({
			x,
			y,
			text,
			style: {
				wordWrap: { width: dimensions.width - this.padding },
				fontFamily: 'Flexi_IBM_VGA_True',
				fontSize: '12px',
				lineSpacing: '10',
				resolution: 10
			}
		});

		// Ensure the dialog text renders above the background
		this.graphics.text.setDepth(1010);
	}
}
