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
    x: canvas.width/2,
    y: canvas.height-50, // 50 = player.side
    stamina: 100,
    mstamina: 100,
    side: 50,
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
    player.mxp = 9+player.lvl**2;
    update();

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
    friction = 0.93, // friction
    velJ = 10;
    direction = "Right";
    
    function update() {
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
        requestAnimationFrame(update);
        if (keys["Escape"]) { // idk how ths works
            pause();
        }
        if(keys["1"]){
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
        if (keys["1"] == false) {
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
        if (keys["ControlLeft"]) {
            // if ( you have the teleport ability ) {
            //     if (direction == "Right" && velX <= 3 && velX >= 0) {
            //         player.X += 30;
            //     } else if (direction == "Left" && velX >= -3 && velX <= 0) {
            //         player.X -= 30;
            //     } else {
            if (player.stamina > 20) {
                if (direction == "Right" && velX <= 3 && velX >= 0) {
                    velX = 20;
                } else if (direction == "Left" && velX >= -3 && velX <= 0) {
                    velX = -20;
                }
                if (velX == 20) {
                    player.stamina -= 20;
                    // player.hp--;
                } else if (velX == -20) {
                    player.stamina -= 20;
                    // player.hp--;
            }}
            // }
        }
        if (player.y == canvas.height-player.side) {
            velJ = 10;
        }
        // check the keys and do the movement.
        if (player.y < canvas.height-player.side && keys["Space"] == false) {
            velJ--;
            velY = velJ;
        }
        if (keys["Space"]) {
            if (velJ < 0) {
                if (velJ < 0) {
                    velJ -= 0.2;
                } else {velJ -= 0.3;}
                velY = velJ;
            } else {
                velJ-= 0.3;
                velY = velJ;
            }
            // console.log(player.y)
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
        if (player.x >= canvas.width-player.side) {
            player.x = canvas.width-player.side;
        } else if (player.x <= 0) {
            player.x = 0;
        } 
        else if (player.y >= canvas.height-player.side) {
            player.y = canvas.height-player.side;
        }

        // do the drawing
        // ctx.beginPath();
        ctx.fillStyle = "#000000";
        // console.log(keys["Space"]);
        ctx.fillRect(player.x, player.y, player.side, player.side);
        
        // platforms
        
        platform = {
            x: 600,
            y: 400,
            width: 100,
            height: 100,
        };

        ctx.fillStyle = "#404040";
        ctx.fillRect(platform.x,platform.y,platform.width,platform.height);

        if (player.x >= platform.x-50 && player.y > platform.y-45 && player.x < platform.x+platform.width-5 && player.y < platform.y+platform.height-5) { // create actual hitboxes later
            // velX = -1;
            // player.hp--;
            player.x = platform.x-50;
        } 
        if (player.x >= platform.x-45 && player.y > platform.y-45 && player.x < platform.x+platform.width && player.y < platform.y+platform.height-5) { // create actual hitboxes later
            // velX = 1;
            player.x = platform.x+platform.width;
        } 
        if (player.y > platform.y-50 && player.x > platform.x-50 && player.x < platform.x+platform.width && player.y < platform.y+platform.height) { // create actual hitboxes later
            // velJ = 1;
            player.y = platform.y-50;
        } 
        if (player.y < platform.y && player.x > platform.x-50 && player.x < platform.x+platform.width && player.y > platform.y+platform.height+5) { // create actual hitboxes later
            // velJ = -5;
        } 

        class Box {
        
        constructor({
            position = { x: 500, y: 600 },
            color = 'red',
            width = 100,
            height = 100,
            velocity = { x: 0, y: 0 },
        }) {
            this.position = position
            this.width = width
            this.height = height
            this.color = color
            this.velocity = velocity
        }

        draw() {
            ctx.fillStyle = this.color
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        }

        // get canvas center
        const center = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        }

        // instantiate box with left offset
        const box1 = new Box({
        position: {
            x: center.x - 150,
            y: center.y - 50,
        },
        color: 'red',
        velocity: {
            x: 70,
        },
        })

        // instantiate box with right offset
        const box2 = new Box({
        position: {
            x: center.x + 50,
            y: center.y - 50,
        },
        color: 'blue',
        })

        function collision({ box1, box2 }) {
        return (
            box1.position.x + box1.width >= box2.position.x && // box1 right collides with box2 left
            box2.position.x + box2.width >= box1.position.x && // box2 right collides with box1 left
            box1.position.y + box1.height >= box2.position.y && // box1 bottom collides with box2 top
            box2.position.y + box2.height >= box1.position.y // box1 top collides with box2 bottom
        )
        }
        
        let frame = 0

        setInterval(() => {
        frame++

        // draw boxes
        box1.draw()
        box2.draw()

        // update x position before render
        box1.position.x += box1.velocity.x

        // detect for collision (will they collide and should we render the next frame?)
        if (collision({ box1, box2 })) {
            box1.velocity.x = 0
            box1.position.x = box2.position.x - box2.width - 1
        }
        }, 1000)

        // platforms

        // console.log(direction);
        // console.log(keys["1"])
    }
keys = {
    "KeyA": false,
    "KeyD": false,
    "Space": false,
    "ControlLeft": false,
    "Escape": false,
    "1": false,
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
    keys["1"] = true;
});
document.body.addEventListener("mouseup", function (e) {
    keys["1"] = false;
    
});

// fighting

function pause() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "#000"; // idk how dis works tbhh
    ctx.fillRect(0,0,1080,1080);
}

drawMenu(); // idk where its supposed 2 b tbh