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
    while (player.xp > player.mxp) {
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

function moveLeft(player) {
    if (player.x <= 0){
        return null;
    };
    player.x -= 10;
}

function moveRight(player) {
    if (player.x >= 1030) {
        return null;
    };
    player.x += 10;
}

function drawGame(player) {
    ctx.fillStyle = "#ffffff"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(player.x,player.y,50,50)  
}

// movement

function main() {
    ctx.fillStyle = "#ffffff"; // replaced for the actual game later on
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    player.mxp = 9+player.lvl**2;

    console.log("tst"); // this 2
    player.hp = 0; // remove later
    while (player.hp > 0) { 
        drawGame(player);
        
        if (player.xp >= player.mxp) {
            leveling(player);
            player.mxp = 9+player.lvl**2;
        };
        if (false) { // chest function
            chest(player)
        };
    };
}

// function jump(){
//     player.y += 20;
//     var seconds = 0;

//     function incrementSeconds() {
//         seconds += 1;
//     }

//     var cancel = setInterval(incrementSeconds, 1000);
//     if (seconds == 10) {
//         player.y -= 20;
//     };
// }

drawMenu(); // idk where its supposed 2 b tbh

let isJumping = false;
let spaceHoldStatus = false;
document.addEventListener("keydown", (e) => {
    let a = 1;
    if (e.key == "a"){
        moveLeft(player);
    };
    if (e.key == "d"){
        moveRight(player);
    };
    // if (e.key == " "){
    //     jump();
    // };
    console.log(e);
    drawGame(player);
// copied from internet (altered)
    
    if(e.key===" "){
        if(isJumping===false && spaceHoldStatus===false){
            spaceHoldStatus = true;
            isJumping = true;
            function jump(jumpDuration, jumpHeight, multiplier){
                if(multiplier>5){
                    return;
                }
                TweenMax.to(player.y, jumpDuration*multiplier, {
                    y:jumpHeight*multiplier,
                    ease:Power3.easeOut,
                    onComplete:function(){
                        // end jump
                        TweenMax.to(player.y, (jumpDuration*multiplier)*.8, { // tweenmax??
                            y:0, 
                            ease:Power1.easeIn,
                            onComplete:function(){
                                isJumping = false;
                            }
                        });            
                    }
                });
                // continue adjusting height of jump if spacebar is held
                TweenMax.delayedCall(.06, function(){
                    if(spaceHoldStatus===true){    
                        multiplier += 1;
                        if(multiplier<=5){
                            jump(jumpDuration, jumpHeight, multiplier);
                        };
                    }            
                });   
            }      
            jump(.05, -30, 1);
        }
    }
})
document.addEventListener('keyup', (e) => {
    if (e.key === " "){
        spaceHoldStatus = false;
    };
});

// copied from internet (altered)