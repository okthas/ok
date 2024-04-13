// main menu

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
    x: 300,
    y: canvas.height-50, // 50 = player.side
    stamina: 100,
    mstamina: 100,
    height: 50, // player.width * sprite.height / sprite.width
    width: 50, // set value
};    
player.mxp = 9+player.lvl**2;

function drawMenu() {
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "100px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("CAT", canvas.width / 4 + 30, 150);

    drawButton(canvas.width / 4 + 50, canvas.height / 2, 400, 100, "", startGame, !gameStarted);
}

function drawButton(x, y, width, height, text, onClick, enabled) {
    ctx.fillStyle = enabled ? "#333" : "#ccc"; // different color for disabled button
    ctx.fillRect(x, y, width, height);

    ctx.font = "70px Arial";
    ctx.fillStyle = "#fa6";
    ctx.fillText(text, x + 100, y + 70);

    const clickHandler = function (event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        if (enabled && clickX > x && clickX < x + width && clickY > y && clickY < y + height) {
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
    startAnimating(60)
}

// !main menu; general map

function selectEnemy() {
    // determines what enemy will spawn depending on where the player is located + other stuff maybe
}
function enemySpawn(player) {
    let enemy = {
        type: ["Zombie"],
        hp: undefined,
        mhp: undefined,
        str: undefined
    };
    monsterName = enemy.type(selectEnemy());
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

// !general map

let toggle = true
function leveling(toggle, player) {
    while (player.xp >= player.mxp && toggle) {
        if (player.lvl == 9) {
            return player.mxp = 0, 
            toggle = false,
            player.lvl += 1,
            player.mhp += 5,
            player.hp = player.mhp,
            player.skillpoint += 1,
            player.xp -= player.mxp
        }
        return player.lvl += 1,
        player.mhp += 5,
        player.hp = player.mhp,
        player.skillpoint += 1,
        player.xp -= player.mxp


}}

//movement

var velY = 0,
    velX = 0,
    speed = 3, // max speed
    friction = 0.93, // friction
    direction = "Right",
    jumpMultiplier = 0
;

// !movement; sprite

// https://www.youtube.com/watch?v=CY0HE277IBM

const playerImage = new Image()
playerImage.src = ""

let sprite = {
    width: 0, //imagewidth / amount of images     imagewidth / sprite width = amount of sprites
    height: 0, // same except height
    frameY: 0, // this will determine what kind of animation will be displayed
    frameX: 0, // this will determine which part of the animation thats being played that the player is on
}

function text(sentence) {
    for (i=0; i<sentence.length; i++) {
        // return sentence[>i].stack // you get the idea, it will then run the same sentence except with one less letter/space/number/other characters in the update() function
    }
}

// !sprite; overdone platform bs

let platforms = {
    platform0: createPlatform(600, canvas.height-100, 100, 100) // x, y, width, height
} 
function checkCollision(velX, velY, platform) {
    return (player.y - velY + player.height >= platform.y &&
    player.y - velY <= platform.y + platform.height &&
    player.x + velX + player.width >= platform.x &&
    player.x + velX <= platform.x + platform.width)
} function moveSurroundings(velX, platform) {
    return platform.x -= velX
} function createPlatform(x, y, width, height) {
    let platform = {
        x: x,
        y: y,
        width: width,
        height: height,
    }; return platform
} function renderPlatform(platform) {
    ctx.fillStyle = "#404040";
    ctx.fillRect(platform.x,platform.y,platform.width,platform.height); 
    // hitBox(checkCollision(platform), platform)
} 

// !overdone platform bs; animation

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
        leveling(toggle, player);
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
        drawMenu();
    }
    if ((keys.ShiftLeft && keys.leftClick) || (keys.ShiftRight && keys.leftClick) || attackCharge > 0){
        keys.Space = false;
        keys.KeyA = false;
        keys.KeyD = false;
        keys.ControlLeft = false;
        if (attackCharge < 50 && ((keys.ShiftLeft && keys.leftClick) || (keys.ShiftRight && keys.leftClick))) {
            attackCharge++;
        }
        if (attackCharge >= 20 && attackCharge < 50) {
            ctx.fillStyle = "#fcc";
            ctx.fillRect(player.x-10,player.y-15,attackCharge*1.4,5);
        } else if (attackCharge == 50) {
            ctx.fillStyle = "#f55";
            ctx.fillRect(player.x-10,player.y-15,attackCharge*1.4,5);
        } else {
            ctx.fillStyle = "#ddd";
            ctx.fillRect(player.x-10,player.y-15,attackCharge*1.4,5);
        }
        console.log(attackCharge);
    }
    if (!keys.leftClick || (!keys.ShiftRight && !keys.ShiftLeft)) {
        if (attackCharge > 0 && attackCharge < 15) {
            if (player.stamina > 10) {
                player.stamina-=10
        }} if (attackCharge > 20 && attackCharge < 50) {
            if (player.stamina > 15) {
                if (direction == "Right") {
                    player.stamina-=25;
                    velX = 7;
                }
                if (direction == "Left") {
                    player.stamina-=25;
                    velX = -7;
        }}} else if (attackCharge == 50) {
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
    if (keys.ControlLeft && player.stamina > 20) {
        if (direction == "Right" && velX <= 3 && velX >= 0) {
            velX = 20;
        } else if (direction == "Left" && velX >= -3 && velX <= 0) {
            velX = -20;
        }
        if (velX == 20) {
            player.stamina -= 20;
        } else if (velX == -20) {
            player.stamina -= 20;
    }}
    if ((player.y <= canvas.height-player.height && player.y >= canvas.height - player.height - 1) || checkCollision(velX, -1, platforms.platform0)) { // easier way to control all platforms later
        if (keys.Space) { velY = 14 }
        jumpMultiplier = 0
    }
    if (player.y < canvas.height - player.height && !checkCollision(0, -0.2, platforms.platform0) && !keys.Space) {
        velY--
    }
    if (keys.Space) {
        if (jumpMultiplier >= 50 || velY < 0) { velY-- } // gravity 
        else {            
            velY -= 0.03
            jumpMultiplier++
    }}
    if (keys.KeyD) {
        if (velX < speed) {
            velX+=2;
            direction = "Right";
    }}
    if (keys.KeyA) {
        if (velX > -speed) {
            velX-=2;
            direction = "Left";
    }}
    let velX2 = velX,
        velY2 = velY;
    
    for (i=0;i<platforms.length;i++) {
        if (platforms["platform"+i].x < 0 || platforms["platform"+i].x > canvas.width) { i = platforms.length + 1 } // <= idk if this works, i still only have 1 item in platforms
        else {} // run "while (true)" thing beneath
    }

    while (true) { // if velX or velY causes the player to go into the platform then velX/velY is reduced until it would no longer collide
        if (!checkCollision(velX, velY, platforms.platform0)) { break } 
        else { // also only run this if the platform is within the canvas borders (otherwise the game will lag)
            for (i=0;i<100;i++) {
                if (!checkCollision(0, velY, platforms.platform0)) { i = 201 }
                velY-=0.2
            } if (i == 100) { velY = velY2 }
            if (!checkCollision(velX, velY, platforms.platform0)) { break }
            for (i=0;i<100;i++) {
                if (!checkCollision(velX, 0, platforms.platform0)) { i = 201 }
                velX+=0.2
            } if (i == 100) { velX = velX2 }
            if (!checkCollision(velX, velY, platforms.platform0)) { break }
            for (i=0;i<100;i++) {
                if (!checkCollision(0, velY, platforms.platform0)) { i = 201 }
                velY+=0.2
            } if (i == 100) { velY = velY2 }
            if (!checkCollision(velX, velY, platforms.platform0)) { break }
            for (i=0;i<100;i++) {
                if (!checkCollision(velX, 0, platforms.platform0)) { i = 201 }
                velX-=0.2
            } if (i == 100) { velX = velX2 }
            if (!checkCollision(velX, velY, platforms.platform0)) { break }
    }} if (checkCollision(0,-1,platforms.platform0)) { velX-=0.2 } // counteract gliding (caused by who knows what) so now the platform works exactly how i need it to
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // replace with:
    ctx.drawImage(playerImage, sprite.frameX * sprite.width, sprite.frameY * sprite.height, sprite.width, sprite.height, player.x, player.y, player.width, player.height)
    
    if (((player.x > 800 && velX > 0) || (player.x < 400 && velX < 0)) && player.x > platforms.platform0.x - 300) { moveSurroundings(velX, platforms.platform0); velX = 0 } // for bigger maps

    // apply some friction to y velocity
    player.y -= velY;
    velY *= friction;

    // apply some friction to x velocity
    player.x += velX;
    velX *= friction;

    renderPlatform(platforms.platform0)

    // bounds checking
    if (player.x > canvas.width-player.width) {
        player.x = canvas.width-player.width;
    } else if (player.x < 0) {
        player.x = 0;
    } else if (player.y > canvas.height-player.height) { // there's a problem where if you jump in the corner of the map then the character falls through the ground
        player.y = canvas.height-player.height;
    }
}}
keys = {
    "KeyA": false,
    "KeyD": false,
    "Space": false,
    "ControlLeft": false,
    "Escape": false,
    "leftClick": false,
    "ShiftLeft": false, 
    "ShiftRight": false, 
}
// key events
document.body.addEventListener("keydown", function (e) {
    keys[e.code] = true;
    console.log(e.code)
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

// !fighting !animation

drawMenu(); 