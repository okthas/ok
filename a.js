// chat gpt menu: start
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameStarted = false; // Variable to track whether the game has started

let player = {
    name: "_",
    hp: 10,
    mhp: 10,
    str: 1,
    inv: [],
    lvl: 1,
    xp: 0,
    mxp: undefined,
    stamina: 10,
    skillpoint: 0,
    x: 500,
    y: 550
};    

function drawMenu() {
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("terraria but bad", canvas.width / 4 + 30, canvas.height / 4 + 50);

    drawButton(canvas.width / 4 + 50, canvas.height / 2, "start", startGame, !gameStarted);
}

function drawButton(x, y, text, onClick, enabled) {
    ctx.fillStyle = enabled ? "#3498db" : "#ccc"; // Use a different color for disabled button
    ctx.fillRect(x, y, 200, 50);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(text, x + 50, y + 30);

    const clickHandler = function (event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        if (enabled && clickX > x && clickX < x + 200 && clickY > y && clickY < y + 50) {
            onClick();
            canvas.removeEventListener("click", clickHandler); // Remove the event listener after the button is clicked
        }
    };

    canvas.addEventListener("click", clickHandler);
}

function startGame() {
    gameStarted = true; // Set gameStarted to true when the game starts
    drawMenu(); // Redraw the menu to disable the button

    // Call your main() function here, or include its logic directly
    main();

    // You can add additional logic here for starting the game.
}

// chat gpt menu: end
// will probably replace later when i know more

function enemySpawn(player) {
    let enemy = {
        type: ["Zombie"],
        hp: undefined,
        mhp: undefined,
        str: undefined
    };
    monsterName = enemy.type(select());
    if (monsterName === "Zombie") {    
        monster.mhp = 9 + player.lvl;
        monster.str = player.lvl;
    };
    if (monsterName === undefined) {    // else where ??? it doesntt work ,...
        monster.mhp;
        monster.str;
    };
    monster.hp = monster.mhp
}

function chest(player) {
    let chest = {
        type: undefined,
        capacity: undefined
    };
    let item = {
        name: undefined,
        attribute: undefined,
        specialAbility: undefined,
        lvl: player.lvl
    };
    player.inventory.append(item.name, item.lvl)
}

function select() { // will spawn enemies depending on the coordinates when i have a map
    if (true) {
        return null
    };
}

function leveling(player) {
    while (player.xp >= player.mxp) {
        if (player.lvl = 50) {
            break;
        };
        player.lvl += 1;
        player.mhp += 5
        player.hp = player.mhp
        player.skillpoint += 1
        player.xp -= player.mxp
    };
}

//movement

var velY = 0,
    velX = 0,
    speed = 3, // max speed
    friction = 0.9, // friction
    velJ = 10;
    direction = "Right";
    
    function update() {
        ctx.clearRect(0, 0, 1080, 1080);
        if (player.xp >= player.mxp) {
            leveling(player);
            player.mxp = 9+player.lvl**2;
        };
        if (false) { // chest function
            chest(player)
        };
        console.log(player.hp)
        if (player.hp <= 0) {
            ctx.fillStyle = "#000";
            ctx.fillRect(canvas.width/4+25,canvas.height/4,300,70)
            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("Game Over!", canvas.width / 4 + 30, canvas.height / 4 + 50);
        }
        requestAnimationFrame(update);
        if (keys["Escape"]) {
            pause();
        }
        if (keys["ControlLeft"]) {
            // if ( you have the teleport ability ) {
            //     if (direction == "Right" && velX <= 3 && velX >= 0) {
            //         player.X += 30;
            //     } else if (direction == "Left" && velX >= -3 && velX <= 0) {
            //         player.X -= 30;
            //     } else {
            if (direction == "Right" && velX <= 3 && velX >= 0) {
                velX = 20;
            } else if (direction == "Left" && velX >= -3 && velX <= 0) {
                velX = -20;
            }
            // }
        }
        if (player.y == 550) {
            velJ =10;
        }
        // check the keys and do the movement.
        if (player.y < 550 && keys["Space"] == false) {
            velJ--;
            velY = velJ;
        }
        if (keys["Space"]) {
            if (player.y > 300) {
                if (velJ < 0) {
                    velJ -= 0.2;
                } else {velJ -= 0.3;}
                velY = velJ;
            } else {
                velJ--;
                velY = velJ;
            }
            console.log(player.y)
        }
        if (keys["KeyD"]) {
            if (velX < speed) {
                velX++;
                direction = "Right";
            }
        }
        if (keys["KeyA"]) {
            if (velX > -speed) {
                velX--;
                direction = "Left";
            }
        }

        // apply some friction to y velocity.
        velY *= friction;
        player.y -= velY;

        // apply some friction to x velocity.
        velX *= friction;
        player.x += velX;

        // bounds checking
        if (player.x >= 1030) {
            player.x = 1030;
        } else if (player.x <= 0) {
            player.x = 0;
        } else if (player.y >= 550) {
            player.y = 550;
        }

        // do the drawing
        // ctx.beginPath();
        ctx.fillStyle = "#000000";
        // console.log(keys["Space"]);
        ctx.fillRect(player.x, player.y, 50, 50);
        
        // platforms
        
        platform = {
            x: 600,
            y: 500,
            width: 100,
            height: 100,
        };

        ctx.fillStyle = "#404040";
        ctx.fillRect(platform.x,platform.y,platform.width,platform.height);

        if (player.x >= platform.x-50 && player.y > platform.y-45 && player.x < platform.x+platform.width-5 && player.y < platform.y+platform.height-5) { // create actual hitboxes later
            velX = -1;
            // player.x = platform.x-50;
        } 
        if (player.x >= platform.x-45 && player.y > platform.y-45 && player.x < platform.x+platform.width && player.y < platform.y+platform.height-5) { // create actual hitboxes later
            velX = 1;
            // player.x = platform.x+platform.width;
        } 
        if (player.y > platform.y-50 && player.x > platform.x-50 && player.x < platform.x+platform.width && player.y < platform.y+platform.height) { // create actual hitboxes later
            velJ = 1;
            // player.y = platform.y-50;
        } 
        // if (player.y < platform.y && player.x > platform.x-50 && player.x < platform.x+platform.width && player.y > platform.y+platform.height+5) { // create actual hitboxes later
        //     velJ = -5;
        // } 

        // platforms

        console.log(direction);
    }
keys = {
    "KeyA": false,
    "KeyD": false,
    "Space": false,
    "ControlLeft": false,
    "Escape": false,
}
// key events
document.body.addEventListener("keydown", function (e) {
    console.log(e);
    keys[e.code] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.code] = false;
});

// movement

function pause() {
    ctx.fillStyle = "#000"; // idk how dis works tbhh
    ctx.fillRect(0,0,1080,1080);
}

function main() {
    player.mxp = 9+player.lvl**2;

    console.log("tst"); // this 2
    // player.hp = 0; // remove later
    
    update();
    
}
drawMenu(); // idk where its supposed 2 b tbh