class Game {
    constructor(player, enemy, timer = 60) {
        this.player = player;
        this.enemy = enemy;
        this.timer = timer;
        this.timerId = null;
    }

    update() {
        this.decideAttack(player, enemy);
        this.decideAttack(enemy, player);
        this.decideFinish();
    }

    decideAttack(attacker, defender) {
        // detect for collision & enemy gets hit
        if (
            this.rectangularCollision({ rect1: attacker, rect2: defender }) &&
            attacker.isAttacking &&
            attacker.framesCurrent === attacker.attackBox.hitFrame
        ) {
            console.log('attack!!');
            defender.takeHit(attacker.attackBox.damage);
            attacker.isAttacking = false;
            gsap.to(defender.healthSelector, {
                width: defender.health + '%',
            });
        }

        // if misses
        if (attacker.isAttacking && attacker.framesCurrent === attacker.attackBox.hitFrame) {
            attacker.isAttacking = false;
        }
    }

    decideFinish() {
        if (this.enemy.health <= 0 || this.player.health <= 0) {
            this.determineWinner({ player: this.player, enemy: this.enemy });
        }
    }

    determineWinner({ player, enemy }) {
        clearTimeout(this.timerId);
        document.querySelector('#displayText').style.display = 'flex';
        if (player.health === enemy.health) {
            document.querySelector('#displayText').innerHTML = 'Draw!';
        } else if (player.health > enemy.health) {
            document.querySelector('#displayText').innerHTML = 'You win!';
        } else {
            document.querySelector('#displayText').innerHTML = 'You lose!';
        }
    }

    rectangularCollision({ rect1, rect2 }) {
        return (
            rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
            rect1.attackBox.position.x <= rect2.position.x + rect2.size.width &&
            rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
            rect1.attackBox.position.y <= rect2.position.y + rect2.size.height
        );
    }

    decreaseTimer() {
        if (this.timer > 0) {
            this.timerId = setTimeout(() => {
                this.decreaseTimer();
            }, 1000);
            this.timer -= 1;
            document.querySelector('#timer').innerHTML = this.timer;
        }

        if (this.timer === 0) {
            this.determineWinner({ player, enemy });
        }
    }
}
