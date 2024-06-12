const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 800;


const player = {
    x: 50,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    dx: 0,
    dy: 0,
    gravity: 0.4,
    jumpPower: -10,
	reloading: false ,
	bulletsLeft: 0,
    grounded: false 
};

const platforms = [
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
];

const weapon = {
    x: 750, 
    y: canvas.height - 500, 
    width: 30,
    height: 30,
	maxBullets: 5,
    reloadingTime: 3000,
    hasWeapon: false 
};

let lastDirection = 'right'; 

const bullets = []; 

let shieldActive = false;
let shieldRadius = 100;
let shieldCooldown = 5000; 
let shieldLastUsed = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'z' && player.grounded) {
        player.dy = player.jumpPower;
        player.grounded = false;
    }
    if (e.key === 'q') {
        player.dx = -player.speed;
        lastDirection = 'left'; 
    }
    if (e.key === 'd') {
        player.dx = player.speed;
        lastDirection = 'right'; 
    }
    if (e.key === ' ' && weapon.hasWeapon) {
        shoot(); 

    }
	if (e.key === 'n' && !shieldActive && (Date.now() - shieldLastUsed) >= shieldCooldown) {
        shieldActive = true;
		const bouclier = new Audio('images/bouclier.mp3');
        bouclier.play();
        shieldLastUsed = Date.now();
        setTimeout(() => {
            shieldActive = false;
        }, 250); 
    }
});
function drawShield() {
    if (shieldActive) {
        ctx.beginPath();
        ctx.arc(player.x + player.width / 2, player.y + player.height / 2, shieldRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
    }
}
function shoot() {
    let bulletSpeed = 8;
    let bulletDirection = lastDirection; 

	if (player.bulletsLeft > 0 && !player.reloading){
		
		if (bulletDirection === 'right') {
			bullets.push({
				x: player.x + player.width / 2,
				y: player.y + player.height / 2,
				radius: 5,
				speedX: bulletSpeed, 
				speedY: 0, 
				color: 'yellow'
			});
		} else if (bulletDirection === 'left') {
			bullets.push({
				x: player.x + player.width / 2,
				y: player.y + player.height / 2,
				radius: 5,
				speedX: -bulletSpeed, 
				speedY: 0, 
				color: 'yellow'
			});
		}
		const tire = new Audio('images/shoot.mp3');
		tire.play();
		player.bulletsLeft--;
		if (player.bulletsLeft === 0){
			reload();
		}
	}
}
function reload() {

	player.reloading = true; 
	setTimeout(() => {
		player.bulletsLeft = 5;  
		player.reloading = false; 
		const echargement2 = new Audio('images/rechargement2.mp3');
		echargement2.play();
	}, 3000); 

}
document.addEventListener('keyup', (e) => {
    if (e.key === 'q' && player.dx < 0) {
        player.dx = 0;
    }
    if (e.key === 'd' && player.dx > 0) {
        player.dx = 0;
    }
});

function drawPlayer() {
    const texturePlayerNoWeapon = new Image();
    texturePlayerNoWeapon.src = "images/player.png";

    const texturePlayerWithWeapon = new Image();
    texturePlayerWithWeapon.src = "images/playerarme.png";

    let texturePlayer = texturePlayerNoWeapon; 

    if (weapon.hasWeapon) {
        texturePlayer = texturePlayerWithWeapon; 
    }

    
    if (lastDirection === 'right') {
        ctx.drawImage(texturePlayer, player.x, player.y, player.width, player.height);
    } else {
        
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(texturePlayer, -player.x - player.width, player.y, player.width, player.height);
        ctx.restore();
    }
	drawHealthBar();
	drawAmmoCount();
}

function drawAmmoCount() {
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

function drawPlatforms() {
    ctx.fillStyle = 'blue';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function drawWeapon() {
	const textureweapon = new Image();
	textureweapon.src = "images/arme.png"
    if (!weapon.hasWeapon) {
        ctx.drawImage(textureweapon, weapon.x, weapon.y, weapon.width, weapon.height);
    }
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
function drawHealthBar() {
    const barWidth = player.width;
    const barHeight = 5;
    const barX = player.x;
    const barY = player.y - 10;


    ctx.fillStyle = 'grey';
    ctx.fillRect(barX, barY, barWidth, barHeight);


    ctx.fillStyle = 'red';
    ctx.fillRect(barX, barY, (playerHealth / 1000) * barWidth, barHeight);
}
function updatePlayer() {
    
    player.x += player.dx;

    platforms.forEach(platform => {
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
    platforms.forEach(platform => {
        
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

    
    if (player.x < weapon.x + weapon.width &&
        player.x + player.width > weapon.x &&
        player.y + player.height > weapon.y &&
        player.y < weapon.y + weapon.height) {
        weapon.hasWeapon = true;
		player.bulletsLeft = 5;;
        weapon.x = -100; 
        weapon.y = -100;
    }
}
function updateBullets() {
    bullets.forEach(bullet => {
        bullet.x += bullet.speedX; 
        bullet.y += bullet.speedY; 
    });


    bullets.forEach((bullet, index) => {
		platforms.forEach(platform => {
            if (bullet.x + bullet.radius > platform.x && 
                bullet.x - bullet.radius < platform.x + platform.width &&
                bullet.y + bullet.radius > platform.y && 
                bullet.y - bullet.radius < platform.y + platform.height) {

                bullets.splice(index, 1);
            }
        });
        if (bullet.x + bullet.radius < 0 || bullet.x - bullet.radius > canvas.width ||
            bullet.y + bullet.radius < 0 || bullet.y - bullet.radius > canvas.height) {
            bullets.splice(index, 1);
        }
    });
}

class Monster {
    constructor(x, y, width, height, color, speed, health) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.health = health;
        this.dy = 0; 
        this.jumpPower = -10; 
        this.gravity = 0.4; 
        this.grounded = false; 
    }

    draw() {
        const texturemonstre = new Image();
		texturemonstre.src = "images/monstre.png"
        ctx.drawImage(texturemonstre, this.x, this.y, this.width, this.height);
		
		
    }
	drawhealth() {
		ctx.fillStyle = 'grey';
		ctx.fillRect(this.x, (this.y -10), this.width, 5);


		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, (this.y -10), (this.health / monsterHealth)*this.width, 5);
	}
	
    followPlayer() {

        if (player.x < this.x) {
            this.x -= this.speed;
        } else {
            this.x += this.speed;
        }


        if (player.y < this.y && this.grounded) {
            this.dy = this.jumpPower;
            this.grounded = false;
        }


        this.y += this.dy;
        this.dy += this.gravity;


        platforms.forEach(platform => {
            if (this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y + this.height > platform.y &&
                this.y < platform.y + platform.height) {
                this.grounded = true;
                this.dy = 0;
                this.y = platform.y - this.height;
            }
        });


        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }


        if (this.y + this.height >= canvas.height) {
            this.grounded = true;
            this.dy = 0;
            this.y = canvas.height - this.height;
        }
    }

    takeDamage(damage) {

        this.health -= damage;


        if (this.health <= 0) {
            return true; 
        } else {
            return false; 
        }
    }
}


const monsters = [];
const numMonsters = 8;
const monsterWidth = 50;
const monsterHeight = 50;
const monsterColor = 'blue';
const monsterSpeed = 2;
const monsterHealth = 100;
let score = 0;
function generateMonsters() {
    for (let i = 0; i < (Math.floor(Math.random() * 8) + 2); i++) {
        const x = Math.random() * (canvas.width - monsterWidth);
        const y = Math.random() * (canvas.height - monsterHeight);
        const monster = new Monster(x, y, monsterWidth, monsterHeight, monsterColor, monsterSpeed, monsterHealth);
        monsters.push(monster);
    }
}

function regenerateMonsters() {
    monsters.length = 0; 
    generateMonsters(); 
}

function updateMonsters() {
    monsters.forEach(monster => {
        monster.followPlayer(); 
		monster.drawhealth();
    });
	checkGameOver();
}

function drawMonsters() {
    monsters.forEach(monster => {
        monster.draw(); 
    });
}

function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        monsters.forEach((monster, monsterIndex) => {
            if (bullet.x > monster.x && bullet.x < monster.x + monster.width &&
                bullet.y > monster.y && bullet.y < monster.y + monster.height) {

                if (monster.takeDamage(20)) { 
                    monsters.splice(monsterIndex, 1); 
					score += 1;
                }
                bullets.splice(bulletIndex, 1); 
            }
        });
    });
}

function checkGameOver() {
    if (monsters.length === 0) {
        regenerateMonsters(); 
    }
}
function repelMonsters() {
    if (shieldActive) {
        monsters.forEach(monster => {
            const distX = monster.x + monster.width / 2 - (player.x + player.width / 2);
            const distY = monster.y + monster.height / 2 - (player.y + player.height / 2);
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < shieldRadius + monster.width / 2) {
                const angle = Math.atan2(distY, distX);
                monster.x += Math.cos(angle) * 200;
                monster.y += Math.sin(angle) * 200;
            }
        });
    }
}
let playerHealth = 1000; 
let gameOver = false; 

function checkMonsterPlayerCollision() {
    monsters.forEach(monster => {
        if (player.x < monster.x + monster.width &&
            player.x + player.width > monster.x &&
            player.y < monster.y + monster.height &&
            player.y + player.height > monster.y) {

            playerHealth -= 1; 
            if (playerHealth <= 0) {
                gameOver = true;
            }
        }
    });
}

function drawHUD() {

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
	
	ctx.fillText('Score: ' + score, 10, 60);


    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 150, canvas.height / 2);
		demanderEnregistrementScore();
    }
}

function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
		drawShield();
        drawPlatforms();
        drawWeapon();
        drawBullets();
        drawMonsters();
        updatePlayer();
        updateBullets();
        updateMonsters();
        checkCollisions();
		repelMonsters();
        checkMonsterPlayerCollision(); 
        drawHUD(); 
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();

function demanderEnregistrementScore() {
    const enregistrerScore = confirm('Voulez-vous enregistrer votre score ?');
    if (enregistrerScore) {
        const pseudo = prompt('Veuillez entrer votre pseudo :');
        if (pseudo) {
            enregistrerScoreFichier(pseudo);
        } else {
            alert('Pseudo invalide. Score non enregistré.');
        }
    }
}

function enregistrerScoreFichier(pseudo) {
    const data = {
        pseudo: pseudo,
        score: score
    };
	fetch('enregistrer_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            alert('Score enregistré avec succès!');
        } else {
            alert('Erreur lors de l\'enregistrement du score.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

}
