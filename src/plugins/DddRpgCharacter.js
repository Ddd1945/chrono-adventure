import Phaser from 'phaser';

/**
 * Parent class for all npc
 */

export class RpgCharacter extends Phaser.GameObjects.Sprite {
    constructor({ scene, x, y, image, name, path, speed }) {
        super(scene, x, y, image);
        this.path = path || false;
        this.waypoint = 0;
        this.isHit = -1;
        this.name = name || "anonymous";
        this.speed = speed;
        this.image = image;
        this.direction = null;
        this.isPursue = false;
        this.instructions = [];
        scene.physics.world.enable(this, 0);
        scene.add.existing(this);
    }

    update() {
        if (this.isHit > 0) this.isHit--;
        else if (this.isHit === 0) {
            this.isHit = -1;
        } else {
            this.body.setVelocity(0);
            if (!this.isPursue) if (this.path) this.DoPatrol();
            this.DoInstructions();
            if (this.body && this.body.velocity.x == 0 && this.body.velocity.y == 0) {
                if (this.direction !== null && this.name === 'astronaut') {
                    {
                        if (this.direction === 'left') this.setTexture("astronaut", 26)
                        else if (this.direction === 'right') this.setTexture("astronaut", 8);
                        else if (this.direction === 'up') this.setTexture("astronaut", 16);
                        else this.setTexture("astronaut", 0);
                    }
                }
                if (this.direction !== null && this.name === 'dude') {
                    {
                        if (this.direction === 'left') this.setTexture("dude", 4)
                        else if (this.direction === 'right') this.setTexture("dude", 7);
                        else if (this.direction === 'up') this.setTexture("dude", 10);
                        else this.setTexture("dude", 1);
                    }
                }
            }
        }
    }

    DoHalt() {
        this.body.setVelocity(0);
        this.anims.stopAfterRepeat(0);
    }

    SetInstruction(instruction) {
        if (!instruction.action) return;
        if (instruction.action == 'walk' && !instruction.option) return;
        this.instructions.push(instruction);
    }

    DoInstructions() {
        while (this.instructions.length > 0) {
            let instruction = this.instructions.pop();
            switch (instruction.action) {
                case 'walk':
                    this.DoWalk(instruction.option);
                    break;
            }
        }
    }

    DoWalk(direction) {
        switch (direction) {
            case 'left':
                this.body.setVelocityX(-this.speed);
                this.direction = 'left';
                break;
            case 'right':
                this.body.setVelocityX(this.speed);
                this.direction = 'right';
                break;
            case 'up':
                this.body.setVelocityY(-this.speed);
                this.direction = 'up';
                break;
            case 'down':
                this.body.setVelocityY(this.speed);
                this.direction = 'down';
                break;
        }

        this.body.velocity.normalize().scale(this.speed);

        if (this.body.velocity.y < 0) this.anims.play(this.image + '-walk-up', true);
        else if (this.body.velocity.y > 0) this.anims.play(this.image + '-walk-down', true);
        else if (this.body.velocity.x < 0) this.anims.play(this.image + '-walk-left', true);
        else if (this.body.velocity.x > 0) this.anims.play(this.image + '-walk-right', true);
    }

    DoPatrol() {
        if (!this.body) return;
        if (this.isHit >= 0) return;

        this.body.setVelocity(0);

        if (this.x >= this.path[this.waypoint].x - 5 && this.x <= this.path[this.waypoint].x + 5 &&
            this.y >= this.path[this.waypoint].y - 5 && this.y <= this.path[this.waypoint].y + 5) {
            this.waypoint++;
            if (this.waypoint >= this.path.length) this.waypoint = 0;
        }

        if (this.x < this.path[this.waypoint].x - 5) this.SetInstruction({ action: 'walk', option: 'right' });
        else if (this.x > this.path[this.waypoint].x + 5) this.SetInstruction({ action: 'walk', option: 'left' });
        else this.x = this.path[this.waypoint].x;

        if (this.y < this.path[this.waypoint].y - 5) this.SetInstruction({ action: 'walk', option: 'down' });
        else if (this.y > this.path[this.waypoint].y + 5) this.SetInstruction({ action: 'walk', option: 'up' });
        else this.y = this.path[this.waypoint].y;
    }

    DoPursue(target, range) {
        if (target !== 'undefined' && this.body !== 'undefined')
            if (target.x < this.body.x + range && target.x > this.body.x - range &&
                target.y < this.body.y + range && target.y > this.body.y - range) {
                this.isPursue = true;
                if (this.body.x <= target.body.x) this.SetInstruction({ action: 'walk', option: 'right' });
                if (this.body.x >= target.body.x) this.SetInstruction({ action: 'walk', option: 'left' });
                if (this.body.y <= target.body.y) this.SetInstruction({ action: 'walk', option: 'down' });
                if (this.body.y >= target.body.y) this.SetInstruction({ action: 'walk', option: 'up' });
            } else this.isPursue = false;
    }

    DoHit(source, target) {
        target.isHit = 1;
        target.body.setVelocity(-(source.x - target.x) * 10, -(source.y - target.y) * 20);
        source.body.setVelocity(0);
    }
}

export class DddRpgCharacterPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        pluginManager.registerGameObject('rpgcharacter', this.createRpgCharacter);
    }

    createRpgCharacter(params) {
        return new RpgCharacter({ scene: this.scene, ...params });
    }
}
