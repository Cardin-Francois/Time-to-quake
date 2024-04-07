<?php
// Vérifie si la variable est bien envoyée 
if(isset($_POST['variable'])) {
    // Récupère la variable envoyée par JavaScript
    $a = $_POST['variable']; 
    exec("python carte_jour.py $a", $variable); // Exécute le script python avec la variable a en argument
    // Termine l'exécution du script PHP
    exit(); 
}

?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta name="description" content="Time to Quake ! est le site qui répétorie tout les tremblements du monde en temps réel et historique. Le site présente de la documentation et un quizz !"/>
  <meta name="google-site-verification" content="HZIIzMEuHZb--5cwvp6iQH_PAUP8t1Eg5WL0TNvbfFc" />
  <title>Accueil</title>
  <link href="style_hub.css" rel="stylesheet" type="text/css" />
  <link rel="shortcut icon" href="images/icone.png"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> <!-- importe la librairie ajax pour javascript -->
</head>

<body>
  <H1>Time To Quake !</H1>
  <H2>Cartes :</H2>
  <a href="carte-en-temps-réel.html">Carte en Temps Réel</a><br>
  <a href="carte-historique.html">Carte Historique</a><br>
  <a onclick="envoyerVariable()">Carte par jour</a> <!-- transforme l'élément en un bouton -->
  <H2>Documentation :</H2>
  <a href="noyau-terre.html">Noyau de la Terre</a><br>
  <a href="Les-tremblements-de-terre.html">Les Outils Technologiques</a><br>
  <a href="Les-tremblements-de-terre-2.html">Les Tremblements de Terre</a>
  <H2>Autres :</H2>
  <a href="quizz.html">Quizz </a><br>
  <a href="statistiques.html">Statistiques</a>
  <script>
      function envoyerVariable() {
          // Définit la variable JavaScript
          var maVariable = prompt("Rentrez une date sous cette forme","2008-07-26");
          // Envoie la variable à PHP via AJAX
          $.ajax({
              url: '<?php echo $_SERVER['PHP_SELF']; ?>', // URL de ce script
              type: 'POST',
              data: { variable: maVariable },
              
              }
          });
      <!--
      window.location.replace("carte.html"); // Redirige vers la page crée 
      -->
        }
    
  </script>
</body>
</html>