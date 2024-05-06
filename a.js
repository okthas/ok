// main menu

let canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth 
ctx.canvas.height = canvas.width/2.3

let gameStarted = false; // Variable to track whether the game has started

function kill() {return player.hp = 0}
function stats(hp, str, stamina) {
    return player.hp = hp, player.mhp = hp, player.str = str, player.stamina = stamina, 
    player.mstamina = stamina
}
function position(x, y) {return player.x = x, player.y = y}
function inventory(item) {player.inv.append(item)}

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
    y: canvas.height-50, // 50 = player.height
    stamina: 100,
    mstamina: 100,
    height: 50, // player.width * sprite.height / sprite.width
    width: 50, // set value
}; player.mxp = 9+player.lvl**2

function redetermineObjects() { // always update when you add more objects
    return rats = {
        rat0: createPlatform(1700, canvas.height-20, 30, 20) // x, y
    },
    platforms = {
        platform0: createPlatform(600, canvas.height-50, 150, 50), // x, y, width, height
        platform1: createPlatform(820, canvas.height-80, 100, 80),
    }
}
function increaseScreenSize() {return canvas.height*=1.2, canvas.width*=1.2, redetermineObjects(), screen()} 
function reduceScreenSize() {return canvas.height/=1.2, canvas.width/=1.2, redetermineObjects(), screen()}
function screen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawButton(canvas.width / 5 + canvas.width/18, canvas.height/2.5, canvas.width/9, canvas.height/7, "+", increaseScreenSize, true, "#00f", "#fff");
    drawButton(canvas.width / 5 + canvas.width/18, canvas.height/1.8, canvas.width/9, canvas.height/7, "-", reduceScreenSize, true, "#00f", "#fff");
    ctx.font = `${canvas.width/22.5}px Arial`;
    ctx.fillStyle = "#333";
    ctx.fillText(`height: ${canvas.height}, width: ${canvas.width}`, canvas.width/30, canvas.height/3.3);
}

function keybindings() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = `${canvas.width/100}px Arial`;
    ctx.fillStyle = "#333";
    ctx.fillText(`Jump: Space (hold/press)`, canvas.width/30, canvas.height/8);
    ctx.fillText(`Attack: LMB (press)`, canvas.width/30, canvas.height/8 + canvas.width/50);
    ctx.fillText(`Dash: ctrl (press)`, canvas.width/30, canvas.height/8 + 2 * canvas.width/50);
    ctx.fillText(`Pounce/Charged Attack: Shift + LMB (hold)`, canvas.width/30, canvas.height/8 + 3 * canvas.width/50);
    ctx.fillText(`Go Left: A (hold)`, canvas.width/30, canvas.height/8 + 4 * canvas.width/50);
    ctx.fillText(`Go Right: D (hold)`, canvas.width/30, canvas.height/8 + 5 * canvas.width/50);
}

function gameplay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawButton(canvas.width / 5 + 50, 200, 400, 70, "keybindings", keybindings, true, "#00f", "#fff");
    canvas.removeEventListener("click"); // , clickHandler
}

function drawMenu(menu) {
    if (menu) { // pause menu
        ctx.font = `${canvas.height/6}px Arial`;
        ctx.fillStyle = "#333";
        ctx.fillText("settings", canvas.width / 4 + canvas.height/22, 150);

        drawButton(canvas.width / 5 + canvas.height/15, canvas.height/2.5, canvas.height/1.8, canvas.height/10, "screensize", screen, true, "#00f", "#fff");
        drawButton(canvas.width / 5 + canvas.height/15, canvas.height/1.8, canvas.height/1.8, canvas.height/10, "gameplay", gameplay, true, "#00f", "#fff");
    } else {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "100px Arial";
        ctx.fillStyle = "#333";
        ctx.fillText("CAT", canvas.width / 4 + 30, 150);

        drawButton(canvas.width / 4 + 50, canvas.height / 2, 400, 100, "", startGame, !gameStarted, "#333", "#fa6");
}}

function drawButton(x, y, width, height, text, onClick, enabled, color, textColor) {
    ctx.fillStyle = enabled ? color : "#000"; // different color for disabled button
    ctx.fillRect(x, y, width, height);

    ctx.font = `${height/1.3}px Arial`;
    ctx.fillStyle = textColor;
    ctx.fillText(text, x + width/8, y + height/1.3);

    const clickHandler = function (event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        if (enabled && clickX > x && clickX < x + width && clickY > y && clickY < y + height) {
            onClick();
            // let els = getEventListeners(canvas).click
            // els = []
            canvas.removeEventListener("click", clickHandler); // Remove the event listener after the button is clicked
            // console.log(`removing ${text}`)
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
function enemySpawn(player) { // might delete these and have set values instead of random spawns
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

function renderRat(rat) {
    ctx.fillStyle = "#f00";
    ctx.fillRect(rat.x,rat.y,rat.width,rat.height); 
} 

let rats = {
    rat0: createPlatform(1700, canvas.height-20, 30, 20) // x, y, width, height
}

let checkpoints = {
    checkpoint0: createPlatform(1400, canvas.height-60, 15, 60)
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
    jumpMultiplier = 0,
    dashTimer = 0,
    dashController = false,
    ratRunToggle = false,
    sound = 0,
    menu = false,
    pressCounter = 0,
    h = false,
    counter = 0
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
    platform0: createPlatform(600, canvas.height-50, 150, 50), // x, y, width, height
    platform1: createPlatform(820, canvas.height-80, 100, 80),
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
} 

// !overdone platform bs; animation

function update() {  
    // request another frame

    if (pressCounter > 0) {
        pressCounter++
        if (pressCounter == 10) {pressCounter = 0}
    }  if (!keys.Escape) {h = true}
    if (keys.Escape && pressCounter == 0 && h) { // idk how ths works
        h = false
        if (!menu) {menu = true; drawMenu(menu)} else {menu = false}
        pressCounter = 1
    }

    requestAnimationFrame(update);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval && !menu) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    

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
        leveling(toggle, player)
        player.mxp = 9+player.lvl**2
    }
    // console.log(player. hp)
    if (player.hp <= 0) {
        player.y = -500
        counter++
        // console.log(counter)
        ctx.font = "70px Arial";
        ctx.fillStyle = "#d11";
        ctx.fillText("You Died", canvas.width / 3, canvas.height / 3);
        ctx.font = "40px Arial";
        ctx.fillStyle = "#000";
        if (counter < 60) {
            ctx.fillText("Respawning in... 3", canvas.width / 3, canvas.height / 2);
        } else if (counter > 60 && counter < 120) {
            ctx.fillText("Respawning in... 2", canvas.width / 3, canvas.height / 2);
        } else if (counter > 120 && counter < 180) {
            ctx.fillText("Respawning in... 1", canvas.width / 3, canvas.height / 2);
        } else if (counter == 180) {
            ctx.fillText("Respawning in... 0", canvas.width / 3, canvas.height / 2);
            counter = 0
            player.y = canvas.height-player.height
            distance = checkpoints.checkpoint0.x - player.x // make it change so the player can go to different checkpoints + add respawn effects (particles)
            moveSurroundings(distance, platforms["platform"+0])
            moveSurroundings(distance, platforms["platform"+1])
            moveSurroundings(distance, rats["rat"+0])
            moveSurroundings(distance, checkpoints["checkpoint"+0])
            player.hp = player.mhp
    }}
    
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
    }}
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
    if (dashController) {
        dashTimer++
        if (dashTimer == 30) { dashController = false; dashTimer = 0 } // dashtimer determines how many frames the player has to wait between each dash
    }
    if (dashTimer == 0 && keys.ControlLeft && player.stamina > 30) {
        if (direction == "Right") {
            velX = 20;
        } else if (direction == "Left") {
            velX = -20;
        }
        dashController = true
        player.stamina -= 30;
    }
    if ((player.y <= canvas.height-player.height && player.y >= canvas.height - player.height - 1) || checkCollision(velX, -1, platforms["platform"+0]) || checkCollision(velX, -1, platforms["platform"+1])) { // easier way to control all platforms later
        if (keys.Space) { velY = 14 }
        jumpMultiplier = 0
    }
    if (player.y < canvas.height - player.height && !checkCollision(0, -0.2, platforms["platform"+0]) && !checkCollision(0, -0.2, platforms["platform"+1]) && !keys.Space) { // for loop inside () idk how to do that yet
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

    for (j=0;j<2;j++) { // bigger 'for' loop for all platforms
        if (platforms["platform"+j].x < 0 || platforms["platform"+j].x > canvas.width) {
            // console.log(`${platforms["platform"+j]} is out of bounds and will not be rendered`)
        }
        else {while (true) { // if velX or velY causes the player to go into the platform then velX/velY is reduced until it would no longer collide
            if (!checkCollision(velX, velY, platforms["platform"+j])) { break } 
            else { // also only run this if the platform is within the canvas borders (otherwise the game will lag)
                for (i=0;i<100;i++) {
                    if (!checkCollision(0, velY, platforms["platform"+j])) { i = 201 }
                    velY-=0.2
                } if (i == 100) { velY = velY2 }
                if (!checkCollision(velX, velY, platforms["platform"+j])) { break }
                for (i=0;i<100;i++) {
                    if (!checkCollision(velX, 0, platforms["platform"+j])) { i = 201 }
                    velX+=0.2
                } if (i == 100) { velX = velX2 }
                if (!checkCollision(velX, velY, platforms["platform"+j])) { break }
                for (i=0;i<100;i++) {
                    if (!checkCollision(0, velY, platforms["platform"+j])) { i = 201 }
                    velY+=0.2
                } if (i == 100) { velY = velY2 }
                if (!checkCollision(velX, velY, platforms["platform"+j])) { break }
                for (i=0;i<100;i++) {
                    if (!checkCollision(velX, 0, platforms["platform"+j])) { i = 201 }
                    velX-=0.2
                } if (i == 100) { velX = velX2 }
                if (!checkCollision(velX, velY, platforms["platform"+j])) { break }
            }}
    
            if (checkCollision(0,-1,platforms["platform"+j])) { velX-=0.2 } // counteract gliding (caused by who knows what) so now the platform works exactly how i need it to, sometimes it works without it idk y

    }}
    let g = true
    if (((player.x > canvas.width/1.7 && velX > 0) || (player.x < canvas.width/3 && velX < 0)) && player.x > platforms.platform0.x - 200) { 
        moveSurroundings(velX, platforms["platform"+0])
        moveSurroundings(velX, platforms["platform"+1])
        moveSurroundings(velX, rats["rat"+0])
        moveSurroundings(velX, checkpoints["checkpoint"+0])
        g = false
        velX *= friction 
    } // for bigger maps, no friction on platforms, when velX on player = 0 then dash cost infinite stamina
    ctx.fillStyle = "#000000";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // replace with:
    ctx.drawImage(playerImage, sprite.frameX * sprite.width, sprite.frameY * sprite.height, sprite.width, sprite.height, player.x, player.y, player.width, player.height)
    

    // apply some friction to y velocity
    player.y -= velY;
    velY *= friction; 

    // apply some friction to x velocity
    if (g) {player.x += velX; velX *= friction}

    sound = velX**2 + velY * 30
    
    for (i=0;i<2;i++) { // 2 = max number platform +1, we have platform 0 and 1 rn
        if (platforms["platform"+i].x + platforms["platform"+i].width > 0 && platforms["platform"+i].x < canvas.width) {
            renderPlatform(platforms["platform"+i])
    }} 
    for (i=0;i<1;i++) { // 2 = max number platform +1, we have platform 0 and 1 rn
        if (rats["rat"+i].x + rats["rat"+i].width > 0 && rats["rat"+i].x < canvas.width) {
            renderRat(rats["rat"+i])
    }}

    // rat detection system
    
    if ((player.x > rats.rat0.x - 80 - sound && player.x < rats.rat0.x + 80 - sound) || ratRunToggle) {
        ratRunToggle = true
        if (rats.rat0.x > canvas.width) {rats.rat0.y = -500} // if the mouse is out of bounds then it escaped succesfully from the player
        if (player.x < rats.rat0.x) {rats.rat0.x += 6.5}
        else {rats.rat0.x -= 6.5}
    }

    // !rat detection system; bounds checking

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
    // console.log(e.code)
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