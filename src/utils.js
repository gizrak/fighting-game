// function rectangularCollision({ rect1, rect2 }) {
//     return (
//         rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
//         rect1.attackBox.position.x <= rect2.position.x + rect2.size.width &&
//         rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
//         rect1.attackBox.position.y <= rect2.position.y + rect2.size.height
//     );
// }

// let timer = 60;
// let timerId;
// function decreaseTimer() {
//     if (timer > 0) {
//         timerId = setTimeout(decreaseTimer, 1000);
//         timer -= 1;
//         document.querySelector('#timer').innerHTML = timer;
//     }

//     if (timer === 0) {
//         game.determineWinner({ player, enemy, timerId });
//     }
// }
