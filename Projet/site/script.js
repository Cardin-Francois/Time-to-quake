//QUIZZ


// Fonction pour calculer le score/bonne réponse du quizz
function quizz() {
	// variable contenant les réponses correctes pour chaque question
	const reponses = {
		q1: "b",
		q2: "c",
		q3: "b",
		q4: "c",
		q5: "b",
		q6: "a",
		q7: "a",
		q8: "b"
	};

	let score = 0;  // Initialisation du score
	
	// Boucle à travers chaque question et ses choix de réponse
	for (const question in reponses) {
		// récupération de l'élément radio sélectionné par l'utilisateur pour la question actuelle
		const radioSelectionne = document.querySelector(`input[name=${question}]:checked`);
		if (radioSelectionne) {
			// Si une réponse a été sélectionnée
			if (radioSelectionne.value === reponses[question]) {
				// Si la réponse est correcte, colorer en vert
				radioSelectionne.parentElement.classList.add('correct');
				score++;
			} else {
				// Si la réponse est incorrecte on la colore en rouge
				radioSelectionne.parentElement.classList.add('incorrect');
				// Trouver la bonne réponse et la colore en vert
				const correctRadio = document.querySelector(`input[name=${question}][value=${reponses[question]}]`);
				correctRadio.parentElement.classList.add('correct');
			}
		}
	}
	// Affichage du résultat
	document.getElementById("resultat").textContent = `Vous avez obtenu ${score} bonne réponses sur ${Object.keys(reponses).length}.`;
}



const periode = 600000;
let inactiviter;
let audio;

// Fonction pour rediriger vers inactif1 ou inactif2
function redirigerInactif() {
    const pagesInactives = ['inactif1.html', 'inactif2.html'];
    const pageAleatoire = pagesInactives[Math.floor(Math.random() * pagesInactives.length)];
    const courant = window.location.pathname;
    if (!courant.includes('inactif1.html') && !courant.includes('inactif2.html')) {
        window.location.href = pageAleatoire;
    }
}

// Fonction pour rediriger vers index.html
function redirigerindex() {
	if (audio) {
	audio.pause();}
    audio = new Audio('/images/inactif3.mp3'); 
    audio.play();
    audio.onended = function() { //quand l'audio est fini on renvoie vbers la page index
        window.location.href = '/index.php';
    };
}

// Fonctions pour démarrer la lecture de la musique
function startMusique1() {
    audio = new Audio('images/inactif.mp3');
    audio.loop = true;
    audio.play();
}
function startMusique2() {
    audio = new Audio('images/inactif2.mp3');
    audio.loop = true;
    audio.play();
}
function startMusique3() {
    audio = new Audio('/error404/error404.mp3');
    audio.loop = true;
    audio.play();
}
// Réinitialiser le timer d'inactivité
function resetTemps() {
    clearTimeout(inactiviter);
    inactiviter = setTimeout(redirigerInactif, periode);
}

// Initialisation du timer
function initInactiviter() {
    resetTemps(); // Démarre le timer dès que la page est chargée
	
    // détecte l'activité de l'utilisateur
    document.onmousemove = resetTemps;
    document.onkeypress = resetTemps;
}


// Initialise le timer au chargement de la page
window.onload = initInactiviter;

// Afficher l'heure actuelle
function mettretemps() {
    const mtn = new Date();
    const heures = mtn.getHours().toString().padStart(2, '0');
    const minutes = mtn.getMinutes().toString().padStart(2, '0');
    const secondes = mtn.getSeconds().toString().padStart(2, '0');
    document.getElementById('temps').textContent = `Il est ${heures}:${minutes}:${secondes}`;
}
if (window.location.pathname.includes('inactif1.html') || window.location.pathname.includes('inactif2.html')) {
    setInterval(mettretemps, 1000); // Mettre à jour l'horloge chaque seconde
}







//DEMINEUR

// DEMINEUR

const plateau = document.getElementById('plateau');
const demarrerBtn = document.getElementById('demarrer');
let explosion = new Audio("/error404/explosion.mp3");
let decouverte = new Audio("/error404/decouverte.mp3");
let drapeau = new Audio("/error404/drapeau.mp3");
let victoire = new Audio("/error404/victoire.mp3");

let config = {
    lignes: 10,
    colonnes: 10,
    mines: 10
};
let tempsEcoule = 0;
let intervalleTemps;

function demarrerChronometre() {
    intervalleTemps = setInterval(() => {
        tempsEcoule++;
        document.getElementById('chronometre').textContent = `Temps écoulé: ${tempsEcoule} secondes`;
    }, 1000); // Mettre à jour toutes les secondes
}

function arreterChronometre() {
    clearInterval(intervalleTemps);
}
function definirNiveau(niveau) {
    switch(niveau) {
        case 'facile':
            config = { lignes: 10, colonnes: 10, mines: 10 };
            break;
        case 'moyen':
            config = { lignes: 15, colonnes: 15, mines: 30 };
            break;
        case 'difficile':
            config = { lignes: 20, colonnes: 20, mines: 85 };
            break;
        default:
            alert('Niveau non valide, veuillez choisir entre facile, moyen ou difficile.');
            return false;
    }
    return true;
}

// Fonction pour créer une grille
function creerPlateau() {
    plateau.style.gridTemplateRows = `repeat(${config.lignes}, 1fr)`;
    plateau.style.gridTemplateColumns = `repeat(${config.colonnes}, 1fr)`;
    plateau.innerHTML = '';
    for (let i = 0; i < config.lignes; i++) {
        for (let j = 0; j < config.colonnes; j++) {
            const cellule = document.createElement('div');
            cellule.classList.add('cellule');
            cellule.dataset.ligne = i;
            cellule.dataset.colonne = j;
            plateau.appendChild(cellule);
        }
    }
}


// Fonction pour placer aléatoirement des mines
function placerMines() {
    const mines = [];
    while (mines.length < config.mines) {
        const ligne = Math.floor(Math.random() * config.lignes);
        const colonne = Math.floor(Math.random() * config.colonnes);
        // Vérifier si une bombe est déjà présente à ces coordonnées
        if (!mines.some(mine => mine.ligne === ligne && mine.colonne === colonne)) {
            mines.push({ ligne, colonne });
        }
    }

    mines.forEach(mine => {
        const cellule = document.querySelector(`[data-ligne="${mine.ligne}"][data-colonne="${mine.colonne}"]`);
        cellule.classList.add('mine');
    });

    return mines; // Retourne les coordonnées des mines
}

// Fonction pour révéler toutes les cellules avec les nombres autour des mines
function revelerToutesCellules(mines) {
    const cellules = document.querySelectorAll('.cellule');
    cellules.forEach(cellule => {
        if (cellule.classList.contains('revelee')) return; // Si la cellule est déjà révélée, ne rien faire
        const ligne = parseInt(cellule.dataset.ligne);
        const colonne = parseInt(cellule.dataset.colonne);
        const minesAutour = mines.filter(mine =>
            Math.abs(mine.ligne - ligne) <= 1 && Math.abs(mine.colonne - colonne) <= 1
        ).length;
        if (cellule.classList.contains('mine')) {
            cellule.textContent = '💣';
            cellule.classList.add('explosee');
            explosion.play();
        } else {
            cellule.textContent = minesAutour || '';
        }
        cellule.classList.add('revelee');
    });
    // Recharge la page après un court délai
    setTimeout(() => {
        window.location.reload();
    }, 5000); // Délai en millisecondes (ici 2000 ms soit 2 secondes)
}


// Fonction pour révéler les cases vides adjacentes
function revelerCasesAdjacentes(videCellule, mines) {
    const aExplorer = [videCellule];

    while (aExplorer.length > 0) {
        const cellule = aExplorer.pop();
        const ligne = parseInt(cellule.dataset.ligne);
        const colonne = parseInt(cellule.dataset.colonne);

        const minesAutour = mines.filter(mine =>
            Math.abs(mine.ligne - ligne) <= 1 && Math.abs(mine.colonne - colonne) <= 1
        ).length;

        cellule.textContent = minesAutour || '';
        cellule.classList.add('revelee');

        if (minesAutour === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const adjLigne = ligne + i;
                    const adjColonne = colonne + j;
                    if (adjLigne >= 0 && adjLigne < config.lignes && adjColonne >= 0 && adjColonne < config.colonnes) {
                        const adjCellule = document.querySelector(`[data-ligne="${adjLigne}"][data-colonne="${adjColonne}"]`);
                        if (adjCellule && !adjCellule.classList.contains('revelee') && !adjCellule.classList.contains('mine') && !adjCellule.classList.contains('drapeau')) {
                            aExplorer.push(adjCellule);
                            adjCellule.classList.add('revelee'); // Marquer comme révélée pour éviter les boucles infinies
                        }
                    }
                }
            }
        }
    }
}
function demanderEnregistrementScore() {
    const enregistrerScore = confirm('Félicitations ! Vous avez gagné ! Voulez-vous enregistrer votre score ?');
    if (enregistrerScore) {
        const pseudo = prompt('Veuillez entrer votre pseudo :');
        if (pseudo) {
            enregistrerScoreFichier(pseudo);
        } else {
            alert('Pseudo invalide. Score non enregistré.');
        }
    }
}
// Fonction pour vérifier la victoire
function verifierVictoire() {
    const cellules = document.querySelectorAll('.cellule');
    const totalCellules = config.lignes * config.colonnes;
    const cellulesRevelees = document.querySelectorAll('.cellule.revelee').length;
    if (cellulesRevelees === (totalCellules - config.mines)) {
		arreterChronometre()
        victoire.play();
		demanderEnregistrementScore();
         setTimeout(() => {
            location.reload();
        }, 5000); // Recharge la page après 5 secondes
    }
}


function enregistrerScoreFichier(pseudo) {
    const difficulte = getDifficulte();
    const data = {
        pseudo: pseudo,
        tempsEcoule: tempsEcoule,
        difficulte: difficulte
    };
	fetch('/error404/enregistrer_score.php', {
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

function getDifficulte() {
    let difficulte = '';
    if (config.lignes === 10 && config.colonnes === 10 && config.mines === 10) {
        difficulte = 'facile';
    } else if (config.lignes === 15 && config.colonnes === 15 && config.mines === 30) {
        difficulte = 'moyen';
    } else if (config.lignes === 20 && config.colonnes === 20 && config.mines === 85) {
        difficulte = 'difficile';
    }
    return difficulte;
}

function getNomFichier(difficulte) {
    return `${difficulte}.json`;
}
// Fonction pour démarrer le jeu
function demarrerJeu() {
    const niveau = prompt('Choisissez un niveau de difficulté: facile, moyen, difficile');
    if (!definirNiveau(niveau)) return;

    plateau.style.display = 'grid';

    creerPlateau();
    const mines = placerMines(); // Placer les mines et récupérer leurs coordonnées
	demarrerChronometre();
    // Ajouter un gestionnaire d'événements pour gérer les clics gauche sur les cellules
    plateau.addEventListener('click', function(e) {
		
        const cellule = e.target;
        if (!cellule.classList.contains('cellule')) return;
        if (cellule.classList.contains('revelee') || cellule.classList.contains('drapeau')) return; // Si la case est déjà révélée ou marquée d'un drapeau, ne rien faire
        cellule.classList.add('revelee');
        if (cellule.classList.contains('mine')) {
			arreterChronometre()
            cellule.classList.add('explosee'); // Marquer la cellule avec une bombe révélée en rouge
            cellule.textContent = '💣';

            revelerToutesCellules(mines); // Révéler toutes les cellules avec les nombres autour des mines
        } else {
            const ligne = parseInt(cellule.dataset.ligne);
            const colonne = parseInt(cellule.dataset.colonne);
            const minesAutour = mines.filter(mine =>
                Math.abs(mine.ligne - ligne) <= 1 && Math.abs(mine.colonne - colonne) <= 1
            ).length;
            cellule.textContent = minesAutour || ''; // Texte de la cellule: si mines autour est défini par une alors on renvoie une chaîne vide (|| veut dire ou)
            decouverte.play();
            if (minesAutour === 0) {
                revelerCasesAdjacentes(cellule, mines);
            }

            verifierVictoire(); // Vérifier la victoire après chaque révélation
        }
    });

    // Ajouter un gestionnaire d'événements pour gérer les clics droits sur les cellules
    plateau.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // Empêcher le menu contextuel par défaut
        const cellule = e.target;
        if (!cellule.classList.contains('cellule')) return;
        if (cellule.classList.contains('revelee')) return; // Si la case est déjà révélée, ne rien faire
        if (cellule.classList.contains('drapeau')) {
            cellule.classList.remove('drapeau');
            cellule.textContent = '';
        } else {
            cellule.classList.add('drapeau');
            cellule.textContent = '🚩';
            drapeau.play();
        }
    });

    demarrerBtn.removeEventListener('click', demarrerJeu); // Le bouton ne relancera pas le jeu, il faut recharger la page.
}

demarrerBtn.addEventListener('click', demarrerJeu);
