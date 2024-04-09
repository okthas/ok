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
    skillpoint: 0,
    x: canvas.width/2,
    y: canvas.height-50, // 50 = player.side
    stamina: 100,
    mstamina: 100,
    height: 50,
    width: 50,
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

var stop = false;
var frameCount = 0;
// var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    update();
}

function startGame() {
    gameStarted = true; // Set gameStarted to true when the game starts
    drawMenu(); // Redraw the menu to disable the button

    // Call your main() function here, or include its logic directly
    player.mxp = 9+player.lvl**2;
    startAnimating(60) // doesnt work
}

// chat gpt menu: end

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
}}

function leveling(player) {
    while (player.xp >= player.mxp) {
        if (player.lvl == 50) {
            return player.xp = player.mxp
        }
        player.lvl += 1;
        player.mhp += 5
        player.hp = player.mhp
        player.skillpoint += 1
        player.xp -= player.mxp
}}

//movement

var velY = 0,
    velX = 0,
    speed = 3, // max speed
    friction = 0.93, // friction
    velJ = 10;
    direction = "Right";



// overdone platform bs

let platforms = {
    platform0: createPlatform(600, 400, 100, 100) // x, y, width, height
}

function checkCollision(platform) {
    return (player.y + player.height >= platform.y &&
            player.y <= platform.y + platform.height &&
            player.x + player.width >= platform.x &&
            player.x <= platform.x + platform.width);
} function hitBox(Collision, platform) {
    if (Collision) {
        if (player.x > platform.x - player.width && player.x < platform.x + platform.width && player.y > platform.y - player.height) {
            player.y = platform.y - player.height
        }
        // make new conditions
}} function createPlatform(x, y, width, height) {
    let platform = {
        x: x,
        y: y,
        width: width,
        height: height,
    }; return platform
} function renderPlatform(platform) {
    ctx.fillStyle = "#404040";
    ctx.fillRect(platform.x,platform.y,platform.width,platform.height); 
    hitBox(checkCollision(platform), platform)
} function collisionUltra(platforms) {
    for ( i=0; i<platforms.length; i++ ) {
        if (checkCollision(platforms["platform"+i])) {
            return true
}}}

    function update() {
           
        // request another frame

        requestAnimationFrame(update);

        // calc elapsed time since last loop

        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            // Put your drawing code here
        ctx.clearRect(0, 0, 1080, 1080);
    
        // player stamina bar
        ctx.fillStyle = "#fff";
        ctx.fillRect(20,60,player.mstamina,10);
        ctx.fillStyle = "#00f";
        ctx.fillRect(20,60,player.stamina,10);
        
        // player hp bar
        ctx.fillStyle = "#fff";
        ctx.fillRect(20,20,player.mhp*20,10);
        ctx.fillStyle = "#f00";
        ctx.fillRect(20,20,player.hp*20,10);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(`${player.hp}/${player.mhp}`, 220, 30);

        if (player.xp >= player.mxp) {
            leveling(player);
            player.mxp = 9+player.lvl**2;
        };
        if (false) { // chest function
            chest(player)
        };
        // console.log(player.hp)
        if (player.hp <= 0) {
            ctx.fillStyle = "#222";
            ctx.fillRect(0,0,canvas.width,canvas.height)
            ctx.font = "70px Arial";
            ctx.fillStyle = "#d11";
            ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2 - 50);
            return null;
        }
                    
        if (keys.Escape) { // idk how ths works
            pause();
        }
        if(keys.leftClick){
            keys.Space = false;
            keys.KeyA = false;
            keys.KeyD = false;
            keys.ControlLeft = false;
            if (attackCharge < 70) {
                attackCharge++;
            }
            if (attackCharge >= 15 && attackCharge < 35) {
                ctx.fillStyle = "#fc0";
                ctx.fillRect(player.x-10,player.y-15,attackCharge,5);
            } else if (attackCharge >= 35 && attackCharge < 70) {
                ctx.fillStyle = "#f80";
                ctx.fillRect(player.x-10,player.y-15,attackCharge,5);
            } else if (attackCharge == 70) {
                ctx.fillStyle = "#f00";
                ctx.fillRect(player.x-10,player.y-15,attackCharge,5);
            } else {
                ctx.fillStyle = "#fff";
                ctx.fillRect(player.x-10,player.y-15,attackCharge,5);
            }
            console.log(attackCharge);
        }
        if (keys.leftClick == false) {
            if (attackCharge > 15 && attackCharge < 35) {
                if (player.stamina > 10) {
                    if (direction == "Right") {
                        player.stamina-=10;
                        velX = 5;
                    }
                    if (direction == "Left") {
                        player.stamina-=10;
                        velX = -5;
                }}
            } else if (attackCharge >= 35 && attackCharge < 70) {
                if (player.stamina > 20) {
                    if (direction == "Right") {
                        player.stamina-=20;
                        velX = 10;
                    }
                    if (direction == "Left") {
                        player.stamina-=20;
                        velX = -10;
                }}
            } else if (attackCharge == 70) {
                if (player.stamina > 50) {
                    if (direction == "Right") {
                        player.stamina-=50;
                        velX = 20;
                    }
                    if (direction == "Left") {
                        player.stamina-=50;
                        velX = -20;
                }}
            }
            attackCharge = 0;
        }
        if (player.stamina < player.mstamina) {
            player.stamina += player.mstamina*0.0025;
        }
        if (keys.ControlLeft) {
            if (player.stamina > 20) {
                if (direction == "Right" && velX <= 3 && velX >= 0) {
                    velX = 20;
                } else if (direction == "Left" && velX >= -3 && velX <= 0) {
                    velX = -20;
                }
                if (velX == 20) {
                    player.stamina -= 20;
                } else if (velX == -20) {
                    player.stamina -= 20;
        }}}
        if (player.y == canvas.height-player.height || checkCollision(platforms.platform0)) { // easier way to control all platforms later
            velJ = 10;
        }
        if (player.y < canvas.height - player.height && !checkCollision(platforms.platform0) && !keys.Space) {
            velJ-- 
            velY == velJ
        } // it doesn't work at all, it did kind of b4
        // if ((player.y == 299.619 && player.x > platform.x + platform.width || player.x < platform.x - player.width) || (velJ < 0 && keys.Space)) { keys.Space == false }
        if (keys.Space) {
            velJ-= 0.3;
            velY = velJ;
        }
        if (keys.KeyD) {
            if (velX < speed) {
                velX++;
                direction = "Right";
        }}
        if (keys.KeyA) {
            if (velX > -speed) {
                velX--;
                direction = "Left";
        }}

        // apply some friction to y velocity
        velY *= friction;
        player.y -= velY;

        // apply some friction to x velocity
        velX *= friction;
        player.x += velX;

        // bounds checking
        if (player.x > canvas.width-player.width) {
            player.x = canvas.width-player.width;
        } else if (player.x < 0) {
            player.x = 0;
        } else if (player.y > canvas.height-player.height) {
            player.y = canvas.height-player.height;
        }

        ctx.fillStyle = "#000000";
        ctx.fillRect(player.x, player.y, player.width, player.height);

        renderPlatform(platforms.platform0)
    }}
keys = {
    "KeyA": false,
    "KeyD": false,
    "Space": false,
    "ControlLeft": false,
    "Escape": false,
    "leftClick": false,
}
// key events
document.body.addEventListener("keydown", function (e) {
    keys[e.code] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.code] = false;
});

// movement

// fighting

let attackCharge = 0;
document.body.addEventListener("mousedown", function (e) {
    keys.leftClick = true;
});
document.body.addEventListener("mouseup", function (e) {
    keys.leftClick = false;
    
});

// fighting

function pause() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "#000"; // idk how dis works tbhh
    ctx.fillRect(0,0,1080,1080);
}

drawMenu(); // idk where its supposed 2 b tbh