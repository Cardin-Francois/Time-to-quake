import datetime#permet de manipuler les dates et les heures
import folium#Folium est un puissant outil car il rend possible la conception de cartes interactives.
import folium.plugins# plugins de folium
import branca.colormap as cm#branca permet d'avoir une echelle de couleurs
from branca.element import Template, MacroElement
import donnees#permet de récuperer les données
from temps import end
import sys
import taille_cercle

def cree_carte(plaques_tectoniques):
    min_lon, max_lon = -200, 200#on établie les bords de la cartes 
    min_lat, max_lat = -100, 100


    carte = folium.Map(max_bounds=True,location=[0, 0], zoom_start=2, tiles="Esri WorldImagery",
                      min_lon=min_lon, max_lon=max_lon,min_lat=min_lat,max_lat=max_lat,min_zoom=2)#initialisation de la carte en utilisant des tuiles d’imagerie satellite, et limitant la zone visible aux continents. 




    plaques = folium.FeatureGroup(name='Plaques Tectoniques')#on crée une entité pour les plaques tectonique
    folium.GeoJson(plaques_tectoniques).add_to(plaques)# On met les données geographique des plaques dans la carte 
    carte.add_child(plaques)#on ajoute les  plaques tectoniques à notre carte.


    couleurs = cm.LinearColormap(["blue","green", "yellow","orange","red"], index=[0, 0.1, 0.25,0.42,0.6])#on associe des valeurs au couleur grace à cm.LinearColormap 
    couleurs.caption = "Profondeur"
    carte.add_child(couleurs.scale(0, 150))#ça ajoute à la carte une échelle colorée allant de 0 à 150 pour le niv de profondeur

    startime = sys.argv[1] # on récupère l'argument donnée lors de l'execution de la commande par le fichier php
    endtime = end(startime)#on crée la date de fin avec une série de portes logiques

    seismes = donnees.donnees_seismes(startime,endtime,2) 
    for seisme in seismes["features"]:
        magnitude = seisme["properties"]["mag"]#on récupère la magnitude
        coordonnee = seisme["geometry"]["coordinates"]#on obtient les données geographique
        location = (coordonnee[1], coordonnee[0])#on prend les coordonnées longitude latitude
        profondeur = coordonnee[2]#on inverse les coordonnées verticales
        date1 = seisme["properties"]["time"] 
        
        date1 /= 1000.0
        date2 = datetime.datetime.utcfromtimestamp(date1).strftime('%Y-%m-%d %H:%M:%S UTC')#On convertis la date du séisme (en millisecondes) en une date lisible 
        date = date2[:10]
        heure = date2[10:16] + " UTC"
        popup_text = f'''Date : {date}<br>Heure : {heure}<br>Magnitude : {magnitude}<br>Profondeur : {profondeur} km'''#on crée une chaine de caractère qui servira de contenu dans la fenetre popup avec:le temps,la magnitudeet la profondeur
        iframe = folium.IFrame(popup_text,width=200,height=80)#on definit la largeur et la hauteur de la fenetre popup
        popup = folium.Popup(iframe,max_width=300,max_height=100)#on cree le popup sur la carte puis on définit la longueur max et la largeur max

        folium.CircleMarker(#on cree un marqueur en forme de cercle sur la carte
            location=location,#on spécifie la position du séisme
            radius= taille_cercle.cercle(magnitude),#le rayon du cercle dépent de sa magnitude
            color=couleurs(profondeur/100),#La couleur du cercle est déterminée par la profondeur du séisme
            fill_color= couleurs(profondeur/100),#la couleur de remplissage est basse sur la coleur de profondeur


            popup=popup,#le popup affichera les données du séisme
        ).add_to(carte)
    return carte,startime

def retour_accueil(): #fonction pour afficher un bouton sur la carte permettant de retourner dans l'accueil
    html_button = '<button onclick="window.location.href=\'https://tremblement-du-monde.com/\'" style="position: absolute; top: 10px; left: 45%; z-index: 1000; font-size: 16px; padding: 10px 12px;">Retour à l\'Accueil</button>'
    carte.get_root().html.add_child(folium.Element(html_button))  

plaques = donnees.donnees_plaques()

carte,startime = cree_carte(plaques)
retour_accueil()
# on crée la légende sous la forme d'une mini page html avec un cercle de chaque taille par magnitude
template = """
{% macro html(this, kwargs) %}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Carte par jour</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="shortcut icon" href="images/icone.png"/>

</head>
<body>


<div id='maplegend' class='maplegend' 
    style='position: absolute; z-index:9999; border:2px solid grey; background-color:rgba(255, 255, 255, 0.8);
     border-radius:6px; padding: 10px; font-size:14px; right: 20px; bottom: 20px;'>

<div class='legend-title'><H3>Légende :</H3></div>
<div class='legend-scale'>
  <ul class='legend-labels'>
    <table id = "tab">
    <tr>
      <th><p>Magitude < 2 </p></th>
      <th><div id="moncercle1"></div></th> 
    </tr>
    <tr>
      <th><p>Magitude entre 2 et 4 </p></th>
      <th><div id="moncercle2"></div></th>
    </tr>
    <tr>
      <th><p>Magitude entre 4 et 6 </p></th>
      <th><div id="moncercle3"></div></th>
    </tr>
    <tr>
      <th><p>Magitude > 6 </p></th>
      <th><div id="moncercle4"></div></th>
    </tr>

  </ul>
</div>
</div>

</body>
</html>

<style type='text/css'>
  .maplegend .legend-title {
    text-align: left;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 90%;
    }
  .maplegend .legend-scale ul {
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
    float: left;
    list-style: none;
    }
  .maplegend .legend-source {
    font-size: 80%;
    color: #777;
    clear: both;
    }
  .maplegend a {
    color: #777;
    }
  #moncercle1{
    background:#d80e18;
    border-radius:50%;
    width:10px;
    height:10px;
    border:2px solid #930396; 
  }
  #moncercle2{
    background:#d80e18;
    border-radius:50%;
    width:20px;
    height:20px;
    border:2px solid #930396; 
  }
  #moncercle3{
    background:#d80e18;
    border-radius:50%;
    width:40px;
    height:40px;
    border:2px solid #930396; 
  }
  #moncercle4{
    background:#d80e18;
    border-radius:50%;
    width:60px;
    height:60px;
    border:2px solid #930396; 
</style>
{% endmacro %}"""

macro = MacroElement()
macro._template = Template(template)
carte.get_root().add_child(macro)

html = f'''
    <H1 style="position: absolute;top: 2%;left: 5%; font-family: Arial;z-index: 1000;font-size: 20px;padding: 10px 12px;color:red;font-weight: bold;">Carte de {startime} </H1>'''
carte.get_root().html.add_child(folium.Element(html))

carte.save("/var/www/html/carte-jour.html")
