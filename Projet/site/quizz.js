const questions = [
    {
        question: "Qu'est-ce que c'est qu'un tremblement de terre ?",
        optionA: "Le voisin d'en haut qui a sauté trop fort",
        optionB: "La fin du monde",
        optionC: "Des vibrations du sol",
        optionD: "Une fontaine qui va exploser",
        correctOption: "optionC"
    },

    {
        question: "Comment sont répartis les séismes sur Terre ?",
        optionA: "au niveau des fosses océaniques et des dorsales et des chaines de montagnes",
        optionB: "au niveau des fosses océaniques",
        optionC: "des dorsales",
        optionD: "des chaines de montagnes",
        correctOption: "optionA"
    },

    {
        question: "Combien de plaques techtoniques représentent 95% de la surface de la Terre ?",
        optionA: "4",
        optionB: "15",
        optionC: "6",
        optionD: "7",
        correctOption: "optionD"
    },

    {
        question: "Comment évolue la vitesse des ondes sismiques en milieu océanique ?",
        optionA: "Ça stagne ou augmente entre 0 et 100 km puis diminue",
        optionB: "Ça stagne",
        optionC: "Pourquoi ça devrait évolue ?",
        optionD: "Ça augmente",
        correctOption: "optionA"
    },

    {
        question: "Comment appelles t-on le fait que deux plaques tectoniques s'ecartent?",
        optionA: "la divergeance",
        optionB: "la divergence",
        optionC: "la convergence",
        optionD: "la subduction",
        correctOption: "optionB"
    },

    {
        question: "Quelle est l'une des mesures de sécurité qu'il faut entreprendre lors d'un tremblement de terre ?",
        optionA: "Crier",
        optionB: "Paniquer",
        optionC: "Se mettre sous une table",
        optionD: "Rester sans rien faire",
        correctOption: "optionC"
    },

    {
        question: "Quel pays a le plus de tremblement de terrre?",
        optionA: "Japon",
        optionB: "Turquie",
        optionC: "Philippines",
        optionD: "Chine",
        correctOption: "optionD"
    },

    {
        question: "Quelle est la moyenne de morts par an entre 2000 et 2016 à cause des séismes ?",
        optionA: "92000",
        optionB: "600",
        optionC: "80000",
        optionD: "50000",
        correctOption: "optionA"
    },

    {
        question: "Quelle a été la magnitude du séisme au CHILI en 1960 ?",
        optionA: "4.1",
        optionB: "-6.5",
        optionC: "17",
        optionD: "9.5",
        correctOption: "optionD"
    },

    {
        question: "Quelle sont les chances de survie à un séisme ?",
        optionA: "+ de 50%",
        optionB: "3%",
        optionC: "6%",
        optionD: "74% lors des premières 20h",
        correctOption: "optionD"
    },

    {
        question: "Est-ce que je suis remboursé pour les dommages créés sur ma propriété suite à un séisme ?",
        optionA: "Il y a très peu de chance",
        optionB: "Non",
        optionC: "Pour usage non professionnel, une franchise de 380 euros s'applique",
        optionD: "Pas du tout",
        correctOption: "optionC"
    },

    {
        question: "Quelle types de batiments pour se proteger ?",
        optionA: "Des batiments fait en béton armé et métal ",
        optionB: "Des batiments fait en bois ",
        optionC: "Cela n'existe pas",
        optionD: "Des batiments sans fondement",
        correctOption: "optionA"
    },


    {
        question: "Est-ce que j'ai le droit d'utiliser le téléphone lors d'un séisme ?",
        optionA: "Oui, c'est notre allié",
        optionB: "Non, ça peut etre dangereux",
        optionC: "Non, car les lignes seront coupé",
        optionD: "Non, car les lignes des secours seront saturé",
        correctOption: "optionB"
    },

    {
        question: "Qui faut-il contacter lors d'un tremblement de terre ?",
        optionA: "Le 18 ou le 112",
        optionB: "Le 19",
        optionC: "Le 196",
        optionD: "Le 114",
        correctOption: "optionA"
    },

    {
        question: "Que faire si je vois une victime ensevelie  ?",
        optionA: "Ne pas la dégager sauf s'il ya urgence (arret cardiaque)",
        optionB: "La dégager",
        optionC: "Partir en courant",
        optionD: "Ne rien faire",
        correctOption: "optionA"
    },

    {
        question: "Quelle est l'une des origines des tremblements de terre ?",
        optionA: "Le frottement de deux plaques",
        optionB: "Une forte pluie",
        optionC: "Une innondation",
        optionD: "Une journée trop chaude",
        correctOption: "optionA"
    },

    {
        question: "Avec qu'elle échelle mesure t'on l'intensité des séismes ?",
        optionA: "Richter",
        optionB: "de travaille",
        optionC: "un sismographe",
        optionD: "crinolines",
        correctOption: "optionA"
    },

    {
        question: "Quelle est l'un des endroits où il faut aller lors d'un séisme ?",
        optionA: "Se rendre dans une zone libre(champ,stade)",
        optionB: "Sous un arbre",
        optionC: "A coter d'un poto éléctrique",
        optionD: "Sous un mur non porteur",
        correctOption: "optionA"
    },

    {
        question: "Comment pouvons-nous être informés d'un tremblement de terre ?",
        optionA: "Activer l'alerte de séisme sur notre téléphone",
        optionB: "Ne rien faire",
        optionC: "Désactiver les alertes d'urgence sans fil",
        optionD: "Activer tout et n'importe quoi sur son téléphone",
        correctOption: "optionA"
    },

    {
        question: "Quel est l'un des risques des séismes ?",
        optionA: "Mourir",
        optionB: "S'envoler",
        optionC: "Se noyer",
        optionD: "Kidnappé par des aliens",
        correctOption: "optionA"
    },

    {
        question: "Quelle est l'un des comportements à avoir après un tremblement de terre ?",
        optionA: "entre dans un édifice endommagé",
        optionB: "en cas d'évacuation, regagner son domicile",
        optionC: "utilisez des allumettes",
        optionD: "enfiler un long pantalon avec des manches longues, des chaussures fermées et des gants de travail",
        correctOption: "optionD"
    },

    {
        question: "Quand c'est passé le séisme de magnitude 9.2 en Alaska ?",
        optionA: "2000",
        optionB: "1964",
        optionC: "1890",
        optionD: "1985",
        correctOption: "optionB"
    },

    {
        question: "Comment s'appelle le créateur du sismographe ?",
        optionA: "Zhang Heng",
        optionB: "Jackie Chan",
        optionC: "Chuck Norris",
        optionD: "Lu Han",
        correctOption: "optionA"
    },

    {
        question: "Qu'est-ce que ce sont les ondes S ?",
        optionA: "Des ondes primaires",
        optionB: "Des ondes superficielles",
        optionC: "Des ondes transversales",
        optionD: "Des ondes à la surface",
        correctOption: "optionC"
    },

    {
        question: "Qu'est-ce qu'a causé le séisme au large du Japon le 11 mars 2011 ?",
        optionA: "Un glissement de terrain",
        optionB: "Une inondation",
        optionC: "Une tempête",
        optionD: "Une fusion des trois réacteurs",
        correctOption: "optionD"
    }

]


let shuffledQuestions = [] // endroit vide pour contenir les questions sélectionnées mélangées parmi toutes les questions disponibles

function handleQuestions() { 
    //fonction pour mélanger et choisir 10 questions vers le tableau shuffledQuestions
//que 10 questions seront traités par session 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //contient le numéro de la question actuelle
let playerScore = 0  //Détient le score du joueur
let wrongAttempt = 0 //Nombre de mauvaises réponses choisies par le joueur
let indexNumber = 0 //sera utilisé pour afficher la question suivante

// Fonction d’affichage de la question suivante dans le tableau vers dom
//Gère également l’affichage des joueurs et des informations de quiz sur le dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //récupère la question actuelle
    const currentQuestionAnswer = currentQuestion.correctOption //récupère la réponse à la question actuelle
    const options = document.getElementsByName("option"); //récupère tous les éléments dans le dom avec le nom de 'option' (dans ce cas, radio inputs)    
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })

    //Vérification pour s’assurer qu’une entrée radio a été vérifiée ou qu’une option a été choisie
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //Vérification si la case d’option cochée est identique à la réponse
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //Ajout au score du joueur
            indexNumber++ //ajouter 1 à l’index ça doit donc afficher la question suivante..
            //Définir pour retarder le numéro de la question jusqu’au chargement de la question suivante
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //ajoute 1 a mauvaise reponse
            indexNumber++
            //Défini pour retarder le numéro de la question jusqu’au chargement de la question suivante
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//appelé quand le next button est appelé
function handleNextQuestion() {
    checkForAnswer() //Vérifie si le joueur a choisi la bonne ou la mauvaise option
    unCheckRadioButtons()
    //retarde l’affichage de la question suivante pendant une seconde, afin que les questions ne se précipitent pas sur le joueur.
    setTimeout(() => {
        if (indexNumber <= 9) {
//Affiche la question suivante tant que le numéro d’index n’est pas supérieur à 9, il faut se souvenir que le numéro d’index commence à 0, donc l’index 9 est la question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//Fin de partie si le nombre d’index est supérieur à 9, ce qui signifie que nous sommes déjà à la 10e question
        }
        resetOptionBackground()
    }, 1000);
}

//Définit l’arrière-plan des options à Null après l’affichage des bonnes / mauvaises couleurs
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// décocher tous les radio buttons pour la question suivante
    function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// fonction lorsque toutes les questions sont répondues
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // jugement de l'ordi sur le joueur
    if (playerScore <= 3) {
        remark = "Score bas, relie la doc."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Niveau intermédiaire, Tu peux faire mieux."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, continue ton bon travail."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//Ferme la fenêtre modale de score, réinitialise le jeu et choisit d'autres questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//fonction pour fermer la fenêtre modal d’avertissement
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

