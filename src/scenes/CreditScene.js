import Phaser from 'phaser';

/**
 * Credits Scene
 */

export class CreditScene extends Phaser.Scene {
    constructor() { super({ key: 'CreditScene' }); }

    init() {
        this.notes = '';
        this.traffic = [];
        this.direction = '';
        this.speed = 0;
        this.scaleNotesUp = true;
        this.interval = null;
    }

    create() {
        this.cameras.main.fadeIn(2000);
        if (this.game.global.backgroundMusic !== null) this.game.global.backgroundMusic.stop();
        this.game.global.backgroundMusic = this.sound.get('futureBeatsPops');
        this.game.global.backgroundMusic.play();


        this.city = this.add.tileSprite(625, 285, 0, 0, 'city').setScale(0.7, 0.5);

        for (let a = 0; a < 100; a++) {
            this.car = this.add.image(this.getRandomNumber(-30, 1300), this.getRandomNumber(10, 250),
                'car-' + Math.round(this.getRandomNumber(0, 21))).setScale(this.getRandomNumber(0.015, 0.06));

            if (this.getRandomNumber(1, 3) > 2) this.direction = 'right';
            else this.direction = 'left';

            this.speed = this.getRandomNumber(0.5, 1.5);

            this.traffic.push({ car: this.car, dir: this.direction, speed: this.speed });
        }

        setTimeout(() => this.createText('Developed by DeNdyy1945', 625, 265, -10, 2.1, 1500, 2500), 200);
        setTimeout(() => this.createText('With support of:', 625, 265, -5, 2.5, 1500, 2000), 5000);
        setTimeout(() => this.createText('VLAD, aka beer lover :D', 625, 265, -3, 2.1, 1500, 2000), 9000);
        setTimeout(() => this.createText('TIMA - guitar fan ^_^', 625, 265, -1, 2.1, 1500, 2000), 13000);
        setTimeout(() => this.createText('YASIN, aka Arabic Mike Tyson xD', 625, 265, -3, 1.75, 1500, 2000), 17000);
        setTimeout(() => this.createText('VOVA - just a cool dude :)', 625, 265, -5, 1.8, 1500, 2000), 21000);
        setTimeout(() => this.createText('VADIM - psychology guy :D', 625, 265, 2.3, 1.8, 1500, 2000), 25000);
        setTimeout(() => this.createText('LYOSHA - pushed me to learn programming =)', 625, 265, -5, 1.15, 1500, 2000), 29000);
        setTimeout(() => this.createText('ERBOL - the last standing man!', 625, 265, -3, 1.7, 1500, 2000), 33000);
        setTimeout(() => this.createText('Special thanks to:', 625, 265, -5, 2, 1500, 2000), 38000);
        setTimeout(() => this.createText('PetricakeGames for tileset and spritesheet\npetricakegames.itch.io', 625, 265, -3, 1.1, 1500, 2000), 42000);
        setTimeout(() => this.createText('DyLESTorm for spritesheet\nlivingtheindie.itch.io', 625, 265, -3, 1.5, 1500, 2000), 47000);
        setTimeout(() => this.createText('bl4ckbyrd for spritesheet\nbl4ckbyrd.itch.io ', 625, 265, -2, 1.5, 1500, 2000), 52000);
        setTimeout(() => this.createText('Wenrexa for images\nwenrexa.itch.io', 625, 265, -3, 1.5, 1500, 2000), 57000);
        setTimeout(() => this.createText('noazudo for images\nnoazudo.itch.io', 625, 265, -2, 1.5, 1500, 2000), 62000);
        setTimeout(() => this.createText('enjl for images\nenjl.itch.io', 625, 265, -3, 1.5, 1500, 2000), 67000);
        setTimeout(() => this.createText('FieraRyan for images\nfieraryan.itch.io', 625, 265, -3, 1.5, 1500, 2000), 72000);
        setTimeout(() => this.createText('CRAFTPIX.NET for images\ncraftpix.net', 625, 265, -3, 1.5, 1500, 2000), 77000);
        setTimeout(() => this.createText('noazudo for icons\nnoazudo.itch.io', 625, 265, -3, 1.5, 1500, 2000), 82000);
        setTimeout(() => this.createText('VileR for font\nfontesk.com/designer/viler ', 625, 265, -2, 1.5, 1500, 2000), 87000);
        setTimeout(() => this.createText('DavidKBD for soundtrack\ndavidkbd.itch.io', 625, 265, -1, 1.5, 1500, 2000), 92000);
        setTimeout(() => this.createText('planarian BGM for soundtrack\nplanarian-bgm.itch.io', 625, 265, -3, 1.5, 1500, 2000), 97000);
        setTimeout(() => this.createText('TrevorLentz for soundtrack\ntrevorlentz.itch.io', 625, 265, -2, 1.5, 1500, 2000), 102000);
        setTimeout(() => this.createText('DOS88 for soundtrack\ndos88.itch.io', 625, 265, 0, 1.5, 1500, 2000), 107000);
        setTimeout(() => this.createText('Magic Eyes for soundtrack\nmagic-eyes.itch.io', 625, 265, -1, 1.5, 1500, 2000), 112000);
        setTimeout(() => this.createText('Jim Hall for soundtrack\njhmakesgames.itch.io ', 625, 265, -2, 1.5, 1500, 2000), 117000);
        setTimeout(() => this.createText('alkakrab for soundtrack\nalkakrab.itch.io', 625, 265, -3, 1.5, 1500, 2000), 122000);
        setTimeout(() => this.createText('Chiphead64 for soundtrack\nchiphead64.itch.io', 625, 265, -2, 1.5, 1500, 2000), 127000);
        setTimeout(() => this.createText('David Harris for soundtrack\ndavid-harris.itch.io', 625, 265, -1, 1.5, 1500, 2000), 132000);
        setTimeout(() => this.createText('robotmeadows for soundtrack\nrobotmeadows.itch.io', 625, 265, -2, 1.5, 1500, 2000), 137000);
        setTimeout(() => this.createText('Rusted Music Studio for soundtrack\nrustedstudio.itch.io', 625, 265, -2, 1.5, 1500, 2000), 142000);
        setTimeout(() => this.cameras.main.fadeOut(5000), 145000);
        setTimeout(() => this.scene.start('MenuScene'), 155000);
    }

    update() {
        this.city.tilePositionX += 0.5;
        for (let a = 0; a < this.traffic.length; a++) {
            if (this.traffic[a].dir === 'right') this.traffic[a].car.x += this.traffic[a].speed;
            else this.traffic[a].car.x -= this.traffic[a].speed;
        }
        for (let a = 0; a < this.traffic.length; a++) {
            if (this.traffic[a].car.x > 1300) this.traffic[a].car.x = -30;
            if (this.traffic[a].car.x < -50) this.traffic[a].car.x = 1290;
        }

        if (this.notes !== '') this.notes.scale += 0.0015
    }

    getRandomNumber(min, max) { return Math.random() * (max - min) + min; }

    createText(text, x, y, angle, scale, fadeInSpeed, fadeOutSpeed) {
        this.notes = this.make.text({
            scale: scale,
            x: x,
            y: y,
            angle: angle,
            text: text,
            style: {
                stroke: '#B5359C',
                strokeThickness: 5,
                fontFamily: 'Flexi_IBM_VGA_True',
                fontSize: 45,
                lineSpacing: 15,
                resolution: 10
            }
        }).setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: this.notes,
            alpha: { from: 0, to: 1 },
            ease: 'Sine.InOut',
            duration: fadeInSpeed,
        });

        setTimeout(() => {
            this.tweens.add({
                targets: this.notes,
                alpha: { from: 1, to: 0 },
                ease: 'Sine.InOut',
                duration: fadeOutSpeed + 500,
            });
        }, fadeOutSpeed);
    }
}
