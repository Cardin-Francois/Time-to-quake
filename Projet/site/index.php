<?php
// Vérifie si la variable est bien envoyée 
if(isset($_POST['variable'])) {
    // Récupère la variable envoyée par JavaScript
    $a = $_POST['variable'];
    // une commande qui execute le script python
    exec("python3 /var/www/html/carte_jour.py $a");
    // Termine l'exécution du script PHP
    exit(); 
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Accueil</title>
  <link href="style_hub.css" rel="stylesheet" type="text/css" />
  <link rel="shortcut icon" href="images/icone.png"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>
  <H1>Time To Quake !</H1>

  <div>
  <div class="conteneur">
  <div class="contenu">
  <h2>Les Cartes</h2> 
  
  
  <p>Sur notre site, vous trouverez trois types de cartes sismologiques. La première, en temps réel, vous permet de suivre les secousses sismiques au fur et à mesure qu'elles se produisent dans le monde entier. La deuxième, historique, offre un aperçu des séismes passés, vous permettant de retracer l'activité sismique depuis 2002. Enfin, notre troisième carte vous permet de spécifier une date précise et de visualiser les tremblements de terre enregistrés à cette période.</p>
	</div>
	</div>
  <div class="card-group">
    <div class="card">
      <a href="carte-en-temps-réel.html">
        
        <div class="card-content" >
		<img src="images/carte.jpg">
          <h2>Carte en Temps Réel</h2>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="carte-historique.html">
        
        <div class="card-content">
		<img src="images/carte.jpg">
          <h2>Carte Historique</h2>
        </div>
      </a>
    </div>
    <div class="card">
      <a onclick="envoyerVariable()">
        
        <div class="card-content">
		<img src="images/carte.jpg">
          <h2>Carte par Jour</h2>
        </div>
      </a>
    </div>
	</div>
	</div>
	<div>
	<div class="conteneur">
  <div class="contenu">
  <h2>La Documentation</h2> 
  
  
  <p>Plongez dans notre collection de ressources documentaires pour explorer en profondeur divers aspects de la sismologie. Des explications sur les outils technologiques tels que le sismographe, à l'histoire des découvertes majeures dans le domaine.
  </p>
	</div>
	</div>
	<div class="card-group">
    <div class="card">
      <a href="noyau-terre.html">
        
        <div class="card-content">
		<img src="images/noyau-terrestre.jpeg">
          <h2>Noyau de la Terre</h2>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="Les-tremblements-de-terre.html">
        
        <div class="card-content">
		<img src="images/sismographe.jpg">
          <h2>Les Outils Technologiques</h2>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="Les-tremblements-de-terre-2.html">
        
        <div class="card-content">
		<img src="images/seisme.jpg">
          <h2>Les Tremblements de Terre</h2>
        </div>
      </a>
    </div>
	</div>
	</div>
	<div>
	<div class="conteneur">
  <div class="contenu">
  <h2>Autres</h2> 
  
  <h3>Statistiques sismologiques :</h3> 
  <p>Explorez nos données statistiques en temps réel et historiques pour obtenir des informations approfondies sur l'activité sismique. De l'épicentre aux profondeurs, en passant par l'intensité des tremblements de terre, notre site vous fournit des analyses détaillées pour enrichir votre compréhension des phénomènes sismiques.</p>
	<h3>Quiz interactif :</h3> 
	<p>Testez vos connaissances avec notre quiz interactif sur la sismologie. Notre quiz vous offre une occasion amusante d'approfondir vos connaissances</p>
	</div>
	</div>
	<div class="card-group">
    <div class="card">
      <a href="quizz.html">
        
        <div class="card-content">
		<img src="images/quizz.avif">
          <h2>Quizz</h2>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="statistiques.html">
        
        <div class="card-content">
		<img src="images/Statistics.jpg">
          <h2>Statistiques</h2>
        </div>
      </a>
    </div>
	<div class="card">
      <a href="simu/Simu.html">
        
        <div class="card-content">
		<img src="images/Simulation.webp">
          <h2>Simulation</h2>
        </div>
      </a>
    </div>
  </div>
</div>

<div>
<div class="conteneur">
  <div class="contenu">
  <h2>Jeux</h2> 
	</div>
	</div>
<div class="card-group">
<div class="card">
      <a href="demineur.html">
        
        <div class="card-content">
		<img src="images/demineur.jpeg">
          <h2>Démineur</h2>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="classement/classement.html">
        
        <div class="card-content">
		<img src="images/classement.jpg">
          <h2>Classement du Démineur</h2>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="game/game.html">
        
        <div class="card-content">
		<img src="images/fps.jpg">
          <h2>jeu de tir</h2>
        </div>
      </a>
    </div>

</div>

</div>
  <H2>Répertoire github :</H2>
  <a href='https://github.com/Cardin-Francois/Time-to-quake' target="_blank"> 
    <img src='images/telecharger.png' width='100' height='100'>
  </a>
<script>
    function envoyerVariable() {
        // Afficher le message de chargement
        document.getElementById("loading-message").style.display = "block";

        // Définit la variable JavaScript
        var maVariable = prompt("Rentrez une date sous cette forme","2008-07-26");
		
		if (maVariable === null) {
            // Cacher le message de chargement
            document.getElementById("loading-message").style.display = "none";
            return; // Sortir de la fonction
        }
		
        // Envoie la variable à PHP via AJAX
        $.ajax({
            url: '<?php echo $_SERVER['PHP_SELF']; ?>', // URL du script actuel
            type: 'POST',
            data: { variable: maVariable },
            success: function(response) {
                // Affiche la réponse de PHP dans la console du navigateur
                console.log('Réponse de PHP : ' + response);
            }
        });

        // Rediriger vers la page carte.html après 5 secondes
        setTimeout(function() {
            window.location.replace("carte-jour.html");
        }, 5000); // 5000 millisecondes = 5 secondes
    }
  </script>

  <!-- Afficher le message de chargement -->
  <div id="loading-message" style="display: none;position: fixed; top: 50%; left: 50%;transform: translate(-50%, -50%);">
    <img src="images/chargement.gif" alt="Chargement en cours...">
  </div>
</body>
</html>
