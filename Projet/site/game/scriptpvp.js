const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 800;

const startingPositions = [
    { x: 20, y: canvas.height },
    { x: 1480, y: canvas.height },
    { x: 300, y: canvas.height  },
    { x: 1100, y: canvas.height },
    { x: 580, y: canvas.height },
    { x: 880, y: canvas.height }
];

function getRandomStartingPosition() {
    return {
        x: Math.random() * canvas.width,
        y: -Math.random() * 5000,
    };
}
const weapons = [
    {
        name: "Pistolet",
        power: 8,
        color: "black",
        bulletSpeed: 20,
        radius: 4,
        maxBullets: 5,
        reloadingTime: 3000,
		broken: 0,
		maxbroken: 3,
		x : getRandomStartingPosition().x,
		y : getRandomStartingPosition().y,
		width : 30,
		height: 15,
		image: "images/pvp/pistolet.png",
		falling: true
    },
    {
        name: "shotgun",
        power: 22,
        color: "red",
        bulletSpeed: 20,
        radius: 9,
        maxBullets: 2,
        reloadingTime: 3000,
		broken: 0,
		maxbroken: 2,
		x : getRandomStartingPosition().x,
		y : getRandomStartingPosition().y,
		width : 40,
		height: 25,
		image: "images/pvp/shotgun.png",
		falling: true
    },
	{
        name: "sniper",
        power: 40,
        color: "pink",
        bulletSpeed: 35,
        radius: 3,
        maxBullets: 2,
        reloadingTime: 4000,
		broken: 0,
		maxbroken: 2,
		x : getRandomStartingPosition().x,
		y : getRandomStartingPosition().y,
		width : 40,
		height: 25,
		image: "images/pvp/sniper.png",
		falling: true
    },
	{
        name: "mitraillette",
        power: 5,
        color: "purple",
        bulletSpeed: 20,
        radius: 3,
        maxBullets: 10,
        reloadingTime: 2000,
		broken: 0,
		maxbroken: 3,
		x : getRandomStartingPosition().x,
		y : getRandomStartingPosition().y,
		width : 40,
		height: 25,
		image: "images/pvp/mitraillette.png",
		falling: true
    },
	{
        name: "Bazooka",
        power: 70,
        color: "yellow",
        bulletSpeed: 15,
        radius: 15,
        maxBullets: 1,
        reloadingTime: 4000,
		broken: 0,
		maxbroken: 2,
		x : getRandomStartingPosition().x,
		y : getRandomStartingPosition().y,
		width : 40,
		height: 25,
		image: "images/pvp/bazooka.png",
		falling: true
    },
	{
        name: "Pistolet",
        power: 8,
        color: "black",
        bulletSpeed: 20,
        radius: 4,
        maxBullets: 5,
        reloadingTime: 3000,
		broken: 0,
		maxbroken: 3,
		x : getRandomStartingPosition().x,
		y : getRandomStartingPosition().y,
		width : 40,
		height: 25,
		image: "images/pvp/pistolet.png",
		falling: true
    },


];

let players = [];
const maps = [

    [
        { x: 150, y: canvas.height - 100, width: 100, height: 20 },
		{ x: 550, y: canvas.height - 100, width: 100, height: 20 },
		{ x: 375, y: canvas.height - 225, width: 50, height: 20 },
		{ x: 850, y: canvas.height - 100, width: 100, height: 20 },
		{ x: 1250, y: canvas.height - 100, width: 100, height: 20 },
		{ x: 1075, y: canvas.height - 225, width: 50, height: 20 },
		{ x: 650, y: canvas.height - 225, width: 200, height: 20 },
		{ x: 175, y: canvas.height - 350, width: 50, height: 20 },
		{ x: 575, y: canvas.height - 350, width: 50, height: 20 },
		{ x: 350, y: canvas.height - 475, width: 100, height: 20 },
		{ x: 875, y: canvas.height - 350, width: 50, height: 20 },
		{ x: 1275, y: canvas.height - 350, width: 50, height: 20 },
		{ x: 1050, y: canvas.height - 475, width: 100, height: 20 },
		{ x: 700, y: canvas.height - 475, width: 100, height: 20 },
		{ x: 0, y: canvas.height - 475, width: 100, height: 20 },
		{ x: 1400, y: canvas.height - 475, width: 100, height: 20 },
		{ x: 250, y: canvas.height - 100, width: 20, height: 100 },
		{ x: 1250, y: canvas.height - 100, width: 20, height: 100 },
		{ x: 630, y: canvas.height - 225, width: 20, height: 130 },
		{ x: 850, y: canvas.height - 225, width: 20, height: 130 }

    ],
	[
		{ x: 150, y: canvas.height - 100, width: 100, height: 100 },
		{ x: 1250, y: canvas.height - 100, width: 100, height: 100 },
		{ x: 550, y: canvas.height - 100, width: 100, height: 100 },
		{ x: 850, y: canvas.height - 100, width: 100, height: 100 },
		{ x: 0, y: canvas.height - 400, width: 200, height: 70 },
		{ x: 1300, y: canvas.height - 400, width: 200, height: 70 },
		{ x: 350, y: canvas.height - 250, width: 100, height: 50 },
		{ x: 1050, y: canvas.height - 250, width: 100, height: 50 },
		{ x: 600, y: canvas.height - 400, width: 300, height: 100 },
		{ x: 200, y: canvas.height - 550, width: 1100, height: 10 },
	],
	[
		{ x: 100, y: canvas.height - 100, width: 200, height: 20 },
		{ x: 400, y: canvas.height - 200, width: 200, height: 20 },
		{ x: 700, y: canvas.height - 300, width: 200, height: 20 },
		{ x: 1000, y: canvas.height - 400, width: 200, height: 20 },
		{ x: 1300, y: canvas.height - 500, width: 200, height: 20 },
		{ x: 200, y: canvas.height - 600, width: 200, height: 20 },
		{ x: 600, y: canvas.height - 600, width: 200, height: 20 },
		{ x: 1000, y: canvas.height - 600, width: 200, height: 20 },

	],
	
	   [
        { x: 100, y: canvas.height - 100, width: 300, height: 50 },
        { x: 500, y: canvas.height - 200, width: 300, height: 50 },
        { x: 900, y: canvas.height - 300, width: 300, height: 50 },
        { x: 300, y: canvas.height - 500, width: 300, height: 50 },
        { x: 700, y: canvas.height - 450, width: 300, height: 50 },
        { x: 100, y: canvas.height - 600, width: 300, height: 50 },
        { x: 500, y: canvas.height - 700, width: 300, height: 50 },
		{ x: 1000, y: canvas.height - 600, width: 300, height: 50 },
    ],
	[
        { x: 745, y: 200, width: 10, height: 600 },
        { x: 0, y: canvas.height - 125, width: 100, height: 20 },
        { x: 1400, y: canvas.height - 125, width: 100, height: 20 },
        { x: 200, y: canvas.height - 250, width: 100, height: 20 },
        { x: 1200, y: canvas.height - 250, width: 100, height: 20 },
        { x: 400, y: canvas.height - 375, width: 100, height: 20 },
        { x: 1000, y: canvas.height - 375, width: 100, height: 20 },
		{ x: 800, y: canvas.height - 500, width: 100, height: 20 },
		{ x: 600, y: canvas.height - 500, width: 100, height: 20 },
		{ x: 710, y: canvas.height - 600, width: 70, height: 20 },
    ],



];

let currentMapIndex = 0;


const bullets = [];
let gameOver = false;

document.getElementById('startGame').addEventListener('click', () => {
	document.getElementById('choix').style.display = 'none';
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    initializePlayers(numPlayers);
    gameLoop();
});

function initializePlayers(num) {
    players = [];
    for (let i = 0; i < num; i++) {
        players.push(createPlayer(i));
    };
	startingPositions.push(
                { x: 20, y: canvas.height },
				{ x: 1480, y: canvas.height },
				{ x: 300, y: canvas.height  },
				{ x: 1100, y: canvas.height },
				{ x: 580, y: canvas.height },
				{ x: 880, y: canvas.height }
    );
}
function startMusique1() {
    audio = new Audio('/images/inactif.mp3');
    audio.loop = true;
audio.play();
}
function createPlayer(index) {
    const colors = ['orange', 'rouge', 'bleu', 'vert', 'noir', 'jsp']; 
    const images = ['images/pvp/player1.png', 'images/pvp/player2.png', 'images/pvp/player3.png', 'images/pvp/player4.png', 'images/pvp/player5.png', 'images/pvp/player6.png']; 
    const playert = ['images/pvp/player1.png', 'images/pvp/player2.png', 'images/pvp/player3.png', 'images/pvp/player4.png', 'images/pvp/player5.png', 'images/pvp/player6.png'];
	const playersniper = ['images/pvp/player1sniper.png', 'images/pvp/player2sniper.png', 'images/pvp/player3sniper.png', 'images/pvp/player4sniper.png', 'images/pvp/player5sniper.png', 'images/pvp/player6sniper.png'];
	const playerbazooka = ['images/pvp/player1bazooka.png', 'images/pvp/player2bazooka.png', 'images/pvp/player3bazooka.png', 'images/pvp/player4bazooka.png', 'images/pvp/player5bazooka.png', 'images/pvp/player6bazooka.png'];
	const playerpistolet = ['images/pvp/player1pistolet.png', 'images/pvp/player2pistolet.png', 'images/pvp/player3pistolet.png', 'images/pvp/player4pistolet.png', 'images/pvp/player5pistolet.png', 'images/pvp/player6pistolet.png'];
	const playershotgun = ['images/pvp/player1shotgun.png', 'images/pvp/player2shotgun.png', 'images/pvp/player3shotgun.png', 'images/pvp/player4shotgun.png', 'images/pvp/player5shotgun.png', 'images/pvp/player6shotgun.png'];
	const playermitraillette = ['images/pvp/player1mitraillette.png', 'images/pvp/player2mitraillette.png', 'images/pvp/player3mitraillette.png', 'images/pvp/player4mitraillette.png', 'images/pvp/player5mitraillette.png', 'images/pvp/player6mitraillette.png'];

	const positionIndex = Math.floor(Math.random() * startingPositions.length); 
    const startPosition = startingPositions.splice(positionIndex, 1)[0]; 
    const startX = startPosition.x;
    const startY = startPosition.y;
    const lastDirection = startX === 50 ? 'right' : startX === canvas.width - 100 ? 'left' : 'right'; 

    const img = new Image();
    img.src = images[index];
	const playerte = new Image();
    playerte.src = playert[index];
	const sniper = new Image();
    sniper.src = playersniper[index];
	const bazooka = new Image();
    bazooka.src = playerbazooka[index];
	const pistolet = new Image();
    pistolet.src = playerpistolet[index];
	const shotgun = new Image();
    shotgun.src = playershotgun[index];
	const mitraillette = new Image();
    mitraillette.src = playermitraillette[index];
	
    return {
        x: startX,
        y: startY,
        width: 42,
        height: 50,
        color: colors[index],
        speed: 7,
        dx: 0,
        dy: 0,
        gravity: 0.4,
        jumpPower: -11,
        grounded: false,
        health: 150,
        shieldActive: false,
        shieldRadius: 50,
        shieldCooldown: 5000,
        shieldLastUsed: 0,
        lastDirection: lastDirection,
        image: img, 
		textureplayer: playerte,
		playersniper:sniper,
		playerbazooka:bazooka,
		playerpistolet:pistolet,
		playershotgun:shotgun,
		playermitraillette:mitraillette,
        imageWidth: 50, 
        imageHeight: 50,
		bulletsLeft: 0,            
        reloading: false ,
		hasWeapon: false,
		arme: null,
		score:0,
    };
}

document.addEventListener('keydown', (e) => {
    players.forEach((player, index) => {
        handleKeyDown(e, player, index);
    });
});

document.addEventListener('keyup', (e) => {
    players.forEach((player, index) => {
        handleKeyUp(e, player, index);
    });
});

function handleKeyDown(e, player, index) {
    const controls = [
        { jump: 'z', left: 'q', right: 'd', shoot: ' ', shield: 'n' },
        { jump: 'ArrowUp', left: 'ArrowLeft', right: 'ArrowRight', shoot: '0', shield: '1' },
        { jump: '8', left: '4', right: '6', shoot: '+', shield: '-' },
        { jump: 'i', left: 'j', right: 'l', shoot: 'à', shield: ')' },
		{ jump: 't', left: 'f', right: 'h', shoot: 'è', shield: '_' },
        { jump: 'k', left: ',', right: ':', shoot: '!', shield: 'ù' }
    ];

    const control = controls[index];
    if (e.key === control.jump && player.grounded) {
        player.dy = player.jumpPower;
        player.grounded = false;
    }
    if (e.key === control.left) {
        player.dx = -player.speed;
        player.lastDirection = 'left';
    }
    if (e.key === control.right) {
        player.dx = player.speed;
        player.lastDirection = 'right';
    }
    if (e.key === control.shoot && player.hasWeapon) {
        shoot(player,player.arme);
    }
	if (e.key === control.shoot && !player.hasWeapon) {
        meleeAttack(player);
    }
    if (e.key === control.shield && !player.shieldActive && (Date.now() - player.shieldLastUsed) >= player.shieldCooldown) {
        player.shieldActive = true;
		const bouclier = new Audio('images/bouclier.mp3');
        bouclier.play();

        player.shieldLastUsed = Date.now();
        setTimeout(() => {
            player.shieldActive = false;
			

        }, 500); // Durée du bouclier actif (1 seconde)
    }
}
function meleeAttack(player) {
    const meleeRange = 50; 
    const meleeDamage = 5; 

    
    players.forEach(enemy => {
        if (enemy !== player) {
            const distanceX = Math.abs(player.x - enemy.x);
            const distanceY = Math.abs(player.y - enemy.y);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance <= meleeRange) {

                enemy.health -= meleeDamage;
            }
        }
    });
}
function handleKeyUp(e, player, index) {
    const controls = [
        { left: 'q', right: 'd' },
        { left: 'ArrowLeft', right: 'ArrowRight' },
        { left: '4', right: '6' },
        { left: 'j', right: 'l' },
		{ left: 'f', right: 'h' },
        { left: ',', right: ':' }
    ];

    const control = controls[index];
    if (e.key === control.left && player.dx < 0) {
        player.dx = 0;
    }
    if (e.key === control.right && player.dx > 0) {
        player.dx = 0;
    }
}

function shoot(player,arme) {
    if (player.bulletsLeft > 0 && !player.reloading && weapons[arme].broken < weapons[arme].maxbroken) { 
        let bulletSpeed = weapons[arme].bulletSpeed;
        let bulletDirection = player.lastDirection;

        bullets.push({
            x: player.x + player.width / 2,
            y: player.y + player.height / 2,
            radius: weapons[arme].radius,
            speedX: bulletDirection === 'right' ? bulletSpeed : -bulletSpeed,
            speedY: 0,
            color: weapons[arme].color,
            owner: player,
			damage: weapons[arme].power
        });

        player.bulletsLeft--; 

        const tire = new Audio('images/shoot.mp3');
        tire.play();

        if (player.bulletsLeft === 0 && weapons[arme].broken < weapons[arme].maxbroken) {
             
			weapons[arme].broken ++;
			reload(player);
			if (weapons[arme].broken >= weapons[arme].maxbroken) {
                respawnWeapon(weapons[arme]);
				const breakSound = new Audio('images/pvp/casser.mp3');
				breakSound.play();
            }
        }
		
		
    }
}
function reload(player) {
    if (weapons[player.arme].broken < weapons[player.arme].maxbroken) { 
        player.reloading = true; 
        setTimeout(() => {
            player.bulletsLeft = weapons[player.arme].maxBullets;  
            player.reloading = false; 
            const echargement2 = new Audio('images/rechargement2.mp3');
            echargement2.play();
        }, weapons[player.arme].reloadingTime); 
    }
}

function drawPlayers() {
    players.forEach(player => {
        if (player.health > 0) { 
            ctx.save(); 

            if (player.lastDirection === 'left') {
                ctx.translate(player.x + player.imageWidth, player.y);
                ctx.scale(-1, 1); 
                ctx.drawImage(player.image, 0, 0, player.imageWidth, player.imageHeight);
            } else {
                ctx.translate(player.x, player.y);
                ctx.drawImage(player.image, 0, 0, player.imageWidth, player.imageHeight);
            }

            ctx.restore(); 
			drawAmmoCount(player);
			drawHealthBar(player);
			drawWeaponInfo(player);
        }
    });
}
function drawAmmoCount(player) {
    const ammoX = player.x + player.width / 2;
    const ammoY = player.y - 20; 
    const pointRadius = 3; 
    const spacing = 8; 

    for (let i = 0; i < player.bulletsLeft; i++) {
        ctx.beginPath();
        ctx.arc(ammoX + i * spacing - (player.bulletsLeft - 1) * spacing / 2, ammoY, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }
}
function drawWeaponInfo(player) {
    if (player.hasWeapon) {
        const weapon = weapons[player.arme];
        const weaponInfoX = player.x -10;
        const weaponInfoY = player.y +10;

        const remainingUses = weapon.maxbroken - weapon.broken;
        const circleRadius = 3;
        const circlePadding = 5;

        ctx.fillStyle = 'black';
        for (let i = 0; i < remainingUses; i++) {
            const circleX = weaponInfoX;
            const circleY = weaponInfoY - (circleRadius * 2 + circlePadding) * i;
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawHealthBar(player) {
    const barWidth = player.width;
    const barHeight = 5;
    const barX = player.x;
    const barY = player.y - 10;

    
    ctx.fillStyle = 'grey';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    
    ctx.fillStyle = 'red';
    ctx.fillRect(barX, barY, (player.health / 150) * barWidth, barHeight);
}

function drawPlatforms() {
	const currentMap = maps[currentMapIndex];
    ctx.fillStyle = 'blue';
    currentMap.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function drawBullets() {
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bullet.color;
        ctx.fill();
        ctx.closePath();
    });
}

function updatePlayers() {
    players.forEach(player => updatePlayer(player));
    checkPlayerNearShield();
}

function drawShields() {
    players.forEach(player => {
        if (player.shieldActive) {
            drawShield(player);
        }
    });
}

function drawShield(player) {
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.shieldRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
}

function updatePlayer(player) {
    if (player.health <= 0) {
        player.x = -player.width; 
        player.y = -player.height;
        return; 
    }

    
    player.x += player.dx;
	const currentMap = maps[currentMapIndex];
    currentMap.forEach(platform => {
        
        if (player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y &&
            player.dx > 0) {
            
            player.x = platform.x - player.width;
			player.grounded = true;
        }

        
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y &&
            player.dx < 0) {
            
            player.x = platform.x + platform.width;
			player.grounded = true;
        }
    });

    
    player.y += player.dy;

    let onPlatform = false;
    currentMap.forEach(platform => {
        
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height &&
            player.dy >= 0) {
            onPlatform = true;
            player.grounded = true;
            player.dy = 0;
            player.y = platform.y - player.height;
        }

        
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y &&
            player.dy < 0) {
            player.dy = 0;
            player.y = platform.y + platform.height;
        }
    });

    if (!onPlatform && player.y + player.height < canvas.height) {
        player.grounded = false;
    }

    player.dy += player.gravity;

    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y + player.height >= canvas.height) {
        player.grounded = true;
        player.dy = 0;
        player.y = canvas.height - player.height;
    }
	if (!player.hasWeapon && isPlayerCollidingWithWeapon(player) === 0) {
        player.hasWeapon = true;
		player.arme = 0;
		player.bulletsLeft = weapons[player.arme].maxBullets;
        player.image = player.playerpistolet;
        weapons[player.arme].x = -100;
        weapons[player.arme].y = -100;
		const pickUpSound = new Audio('images/pvp/recuperation.mp3');
		pickUpSound.play();
    }
	if (!player.hasWeapon && isPlayerCollidingWithWeapon(player) === 1) {
        player.hasWeapon = true;
		player.arme = 1;
		player.bulletsLeft = weapons[player.arme].maxBullets;
        player.image = player.playershotgun;
        weapons[player.arme].x = -100;
        weapons[player.arme].y = -100;
		const pickUpSound = new Audio('images/pvp/recuperation.mp3');
		pickUpSound.play();
    }
	if (!player.hasWeapon && isPlayerCollidingWithWeapon(player) === 2) {
        player.hasWeapon = true;
		player.arme = 2;
		player.bulletsLeft = weapons[player.arme].maxBullets;
        player.image = player.playersniper;
        weapons[player.arme].x = -100;
        weapons[player.arme].y = -100;
		const pickUpSound = new Audio('images/pvp/recuperation.mp3');
		pickUpSound.play();
    }
	if (!player.hasWeapon && isPlayerCollidingWithWeapon(player) === 3) {
        player.hasWeapon = true;
		player.arme = 3;
		player.bulletsLeft = weapons[player.arme].maxBullets;
        player.image = player.playermitraillette;
        weapons[player.arme].x = -100;
        weapons[player.arme].y = -100;
		const pickUpSound = new Audio('images/pvp/recuperation.mp3');
		pickUpSound.play();
    }
	if (!player.hasWeapon && isPlayerCollidingWithWeapon(player) === 4) {
        player.hasWeapon = true;
		player.arme = 4;
		player.bulletsLeft = weapons[player.arme].maxBullets;
        player.image = player.playerbazooka;
        weapons[player.arme].x = -100;
        weapons[player.arme].y = -100;
		const pickUpSound = new Audio('images/pvp/recuperation.mp3');
		pickUpSound.play();
    }
	if (!player.hasWeapon && isPlayerCollidingWithWeapon(player) === 5) {
        player.hasWeapon = true;
		player.arme = 5;
		player.bulletsLeft = weapons[player.arme].maxBullets;
        player.image = player.playerpistolet;
        weapons[player.arme].x = -100;
        weapons[player.arme].y = -100;
		const pickUpSound = new Audio('images/pvp/recuperation.mp3');
		pickUpSound.play();
    }

	
	if (player.arme !== null && player.arme !== undefined && weapons[player.arme].broken === weapons[player.arme].maxbroken) {
		player.hasWeapon = false;
		player.bulletsLeft = 0;
		player.image = player.textureplayer;
}
	
}


function updateBullets() {
	const currentMap = maps[currentMapIndex];
    bullets.forEach(bullet => {
        bullet.x += bullet.speedX;

        players.forEach(player => {
            if (player.shieldActive && isCollidingWithShield(player, bullet)) {
                bullet.speedX *= -1;
            }
        });
    });
    bullets.forEach((bullet, index) => {
        currentMap.forEach(platform => {
            if (bullet.x + bullet.radius > platform.x && 
                bullet.x - bullet.radius < platform.x + platform.width &&
                bullet.y + bullet.radius > platform.y && 
                bullet.y - bullet.radius < platform.y + platform.height) {
                
                bullets.splice(index, 1);
            }
        });

        
        if (bullet.x + bullet.radius < 0 || bullet.x - bullet.radius > canvas.width) {
            
            bullets.splice(index, 1);
        }
    });
    checkBulletPlayerCollision();
}

function isCollidingWithShield(player, bullet) {
    const distanceX = bullet.x - (player.x + player.width / 2);
    const distanceY = bullet.y - (player.y + player.height / 2);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return distance < player.shieldRadius + bullet.radius;
}

function checkPlayerNearShield() {
    players.forEach(player => {
        players.forEach(otherPlayer => {
            if (player !== otherPlayer && player.shieldActive && isPlayerNearShield(player, otherPlayer)) {
                repelPlayerFromShield(player, otherPlayer);
            }
        });
    });
}

function isPlayerNearShield(player, otherPlayer) {
    const distanceX = player.x + player.width / 2 - (otherPlayer.x + otherPlayer.width / 2);
    const distanceY = player.y + player.height / 2 - (otherPlayer.y + otherPlayer.height / 2);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return distance < otherPlayer.shieldRadius + player.width / 2;
}

function repelPlayerFromShield(player, otherPlayer) {
    const repelForce = 100;
    const directionX = otherPlayer.x + otherPlayer.width / 2 - (player.x + player.width / 2); 
    const directionY = otherPlayer.y + otherPlayer.height / 2 - (player.y + player.height / 2); 
    const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

    const normalizedDirectionX = directionX / magnitude;
    const normalizedDirectionY = directionY / magnitude;

    otherPlayer.x += normalizedDirectionX * repelForce; 
    otherPlayer.y += normalizedDirectionY * repelForce; 
}


function checkBulletPlayerCollision() {
    bullets.forEach((bullet, bulletIndex) => {
        players.forEach(player => {
            if (bullet.owner !== player && bullet.x > player.x && bullet.x < player.x + player.width &&
                bullet.y > player.y && bullet.y < player.y + player.height) {
                player.health -= bullet.damage;
                bullets.splice(bulletIndex, 1);
            }
        });
    });

    checkGameOver();
}

function checkGameOver() {
    const alivePlayers = players.filter(player => player.health > 0);
    if (alivePlayers.length === 1) {
        gameOver = true;
        alivePlayers[0].score++;
        
        currentMapIndex ++;
	if (currentMapIndex < maps.length) {
		
        initializePlayers(players.length);
        resetWeapons(); 
		weapons.forEach(weapon => {respawnWeapon(weapon)});

		gameOver = false;
		
    }else {

            const maxScore = Math.max(...players.map(player => player.score));
            const potentialWinners = players.filter(player => player.score === maxScore);

            if (potentialWinners.length === 1) {
                
                const winner = potentialWinners[0];
                showGameOverMessage(winner);
            } else {
                
                showGameOverMessage(null);
            }
        }
		
    }
}

function resetWeapons() {
    weapons.forEach(weapon => {
        const newPosition = getRandomStartingPosition();
        weapon.x = newPosition.x;
        weapon.y = newPosition.y;
        weapon.broken = 0; 
    });
}

function showGameOverMessage(winner) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.font = '40px Arial';
	winner.score ++;
    if (winner) {
        ctx.fillText(`Game Over! Gagnant: ${winner.color} avec ${winner.score} points`, canvas.width / 2 - 600, canvas.height / 2);
    } 


    const reloadButton = document.createElement('button');
    reloadButton.innerText = 'Rejouer';
    reloadButton.style.position = 'absolute';
    reloadButton.style.left = `${canvas.width }px`;
    reloadButton.style.top = `${canvas.height }px`;
    reloadButton.style.fontSize = '20px';
    document.body.appendChild(reloadButton);

    reloadButton.addEventListener('click', () => {
        location.reload();
    });
}

function isPlayerCollidingWithWeapon(player) {

	if (
		player.x < weapons[0].x + weapons[0].width &&
        player.x + player.width > weapons[0].x &&
        player.y + player.height > weapons[0].y &&
        player.y < weapons[0].y + weapons[0].height
	) {return 0}
	if (
		player.x < weapons[1].x + weapons[1].width &&
        player.x + player.width > weapons[1].x &&
        player.y + player.height > weapons[1].y &&
        player.y < weapons[1].y + weapons[1].height
	) {return 1}
	if (
		player.x < weapons[2].x + weapons[2].width &&
        player.x + player.width > weapons[2].x &&
        player.y + player.height > weapons[2].y &&
        player.y < weapons[2].y + weapons[2].height
	) {return 2}
	if (
		player.x < weapons[3].x + weapons[3].width &&
        player.x + player.width > weapons[3].x &&
        player.y + player.height > weapons[3].y &&
        player.y < weapons[3].y + weapons[3].height
	) {return 3}
		if (
		player.x < weapons[4].x + weapons[4].width &&
        player.x + player.width > weapons[4].x &&
        player.y + player.height > weapons[4].y &&
        player.y < weapons[4].y + weapons[4].height
	) {return 4}
		if (
		player.x < weapons[5].x + weapons[5].width &&
        player.x + player.width > weapons[5].x &&
        player.y + player.height > weapons[5].y &&
        player.y < weapons[5].y + weapons[5].height
	) {return 5}

}



function drawWeapon() {
    weapons.forEach(weapon => {
		const img = new Image();
		img.src = weapon.image;
        ctx.drawImage(img, weapon.x, weapon.y, weapon.width, weapon.height);
    });
}

function respawnWeapon(weapon) {
    setTimeout(() => {
        weapon.x = getRandomStartingPosition().x;
        weapon.y = getRandomStartingPosition().y;
        weapon.broken = 0;
        weapon.falling = true;
    }, 1000); 
}

function updateWeapons() {
	const currentMap = maps[currentMapIndex];
    weapons.forEach(weapon => {
        if (weapon.falling) {
            weapon.y += 5; 


            currentMap.forEach(platform => {
                if (weapon.x < platform.x + platform.width &&
                    weapon.x + weapon.width > platform.x &&
                    weapon.y + weapon.height > platform.y &&
                    weapon.y < platform.y + platform.height) {
                    weapon.y = platform.y - weapon.height;
                    weapon.falling = false;
                }
            });

           
            if (weapon.y + weapon.height >= canvas.height) {
                weapon.y = canvas.height - weapon.height;
                weapon.falling = false;
            }
        }
    });
}
function nextMap() {
    currentMapIndex++;
    if (currentMapIndex >= maps.length) {
        currentMapIndex = 0; 
    }
}
function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayers();
        drawShields();
        drawPlatforms();
		drawWeapon();
        drawBullets();
        updatePlayers();
        updateBullets();
		updateWeapons();
        requestAnimationFrame(gameLoop);
    }
}


