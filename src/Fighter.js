import Sprite from './Sprite.js';
import keys from './keys.js';

const gravity = 0.7;

class Fighter extends Sprite {
    constructor({
        ctx,
        name,
        healthSelector,
        position,
        velocity,
        size,
        color,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined, damage: 10, hitFrame: 0 },
        keyMap = { left: undefined, right: undefined },
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        });

        this.ctx = ctx;
        this.name = name;
        this.healthSelector = healthSelector;
        this.position = position;
        this.velocity = velocity;
        this.size = size;
        this.lastKey = null;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
            damage: attackBox.damage,
            hitFrame: attackBox.hitFrame,
        };
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;
        this.keyMap = keyMap;

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
    }

    update() {
        this.draw();
        if (!this.dead) {
            this.animateFrames();
        }

        // move & jump
        this.move();
        this.jump();

        // attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // draw attack box area
        // this.ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.size.height + this.velocity.y >= this.ctx.canvas.height - 96) {
            this.velocity.y = 0;
            // this.position.y = 330;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.switchSprite('attack1');
        this.isAttacking = true;
    }

    takeHit(damage) {
        this.health -= damage;

        if (this.health <= 0) {
            this.switchSprite('death');
        } else {
            this.switchSprite('takeHit');
        }
    }

    move() {
        if (keys[this.keyMap.left].pressed && this.lastKey === this.keyMap.left) {
            this.velocity.x = -5;
            this.switchSprite('run');
        } else if (keys[this.keyMap.right].pressed && this.lastKey === this.keyMap.right) {
            this.velocity.x = 5;
            this.switchSprite('run');
        } else {
            this.velocity.x = 0;
            this.switchSprite('idle');
        }
    }

    jump() {
        if (this.velocity.y < 0) {
            this.switchSprite('jump');
        } else if (this.velocity.y > 0) {
            this.switchSprite('fall');
        }
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true;
            }
            return;
        }

        // overriding all other animations with the attack animation
        if (
            this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax - 1
        ) {
            return;
        }

        // override when fighter gets  hit
        if (
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        ) {
            return;
        }

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            default:
                break;
        }
    }
}

export default Fighter;
