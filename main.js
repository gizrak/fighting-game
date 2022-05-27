import Sprite from './src/Sprite.js';
import Fighter from './src/Fighter.js';
import Game from './src/Game.js';
import keys from './src/keys.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
    ctx: ctx,
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './images/background.png',
});
console.log(background);

const shop = new Sprite({
    ctx: ctx,
    position: {
        x: 680,
        y: 250,
    },
    imageSrc: './images/shop.png',
    scale: 1.8,
    framesMax: 6,
});
console.log(shop);

const player = new Fighter({
    ctx: ctx,
    name: 'player',
    healthSelector: '#playerHealth',
    position: {
        x: 50,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    size: {
        width: 60,
        height: 150,
    },
    color: 'red',
    imageSrc: './images/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157,
    },
    sprites: {
        idle: {
            imageSrc: './images/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './images/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './images/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './images/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './images/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './images/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4,
        },
        death: {
            imageSrc: './images/samuraiMack/Death.png',
            framesMax: 6,
        },
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50,
        },
        width: 160,
        height: 50,
        damage: 20,
        hitFrame: 4,
    },
    keyMap: {
        left: 'a',
        right: 'd',
    },
});
console.log(player);

const enemy = new Fighter({
    ctx: ctx,
    name: 'enemy',
    healthSelector: '#enemyHealth',
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    size: {
        width: 80,
        height: 120,
    },
    color: 'blue',
    imageSrc: './images/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 197,
    },
    sprites: {
        idle: {
            imageSrc: './images/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './images/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './images/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './images/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './images/kenji/Attack1.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './images/kenji/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './images/kenji/Death.png',
            framesMax: 7,
        },
    },
    attackBox: {
        offset: {
            x: -170,
            y: 20,
        },
        width: 170,
        height: 50,
        damage: 20,
        hitFrame: 2,
    },
    keyMap: {
        left: 'ArrowLeft',
        right: 'ArrowRight',
    },
});
console.log(enemy);

const game = new Game(player, enemy, 60);
console.log(game);
game.decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    game.update();
}
animate();

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'w':
                player.velocity.y = -20;
                break;
            case ' ':
                player.attack();
                break;
            default:
                break;
        }
    }

    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowUp':
                enemy.velocity.y = -20;
                break;
            case 'ArrowDown':
                enemy.attack();
                break;
            default:
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

        default:
            break;
    }
});
