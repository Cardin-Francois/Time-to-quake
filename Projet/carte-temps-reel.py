# -*- coding: utf-8 -*-
import requests  #Permet de recupérer les données par une requete http
import folium#Folium est un puissant outil car il rend possible la conception de cartes interactives.
import donnees#permet de récuperer les données
import branca.colormap as cm#branca permet d'avoir une echelle de couleurs
import taille_cercle
from branca.element import Template, MacroElement
from datetime import datetime


def donnees_seisme():
    url = "https://www.seismicportal.eu/fdsnws/event/1/query?format=json&limit=500"
    
    
    reponse = requests.get(url)#recupere les données des seismes

    if reponse.status_code == 200:
        
        data = reponse.json()#on transforme la réponse en fichier json 
        return data


def cree_carte(seismes,plaques_tectoniques):
    min_lon, max_lon = -200, 200#on établie les bords de la cartes pour que l'utilisateurs n'en voie pas plusieurs
    min_lat, max_lat = -100, 100
   
    
    
    carte = folium.Map(max_bounds=True,location=[0, 0], zoom_start=2, tiles="Esri WorldImagery",
                      min_lon=min_lon, max_lon=max_lon,min_lat=min_lat,max_lat=max_lat,min_zoom=2)#initialisation de la carte en utilisant des tuiles d’imagerie satellite, et limitant la zone visible aux continents. 
    
    couleurs = cm.LinearColormap(["blue","green", "yellow","orange","red"], index=[0, 0.1, 0.25,0.42,0.6])#on associe des valeurs au couleur grace à cm.LinearColormap 
    couleurs.caption = "Profondeur"
    carte.add_child(couleurs.scale(0, 150))#ça ajoute à la carte une échelle colorée allant de 0 à 150 correspondant à la profondeur
    
    plaques = folium.FeatureGroup(name='Plaques Tectoniques', show = False)#on crée un groupe d'entité pour les plaques tectonique
    folium.GeoJson(plaques_tectoniques).add_to(plaques)# On met les données geographique des plaques dans la carte 
    carte.add_child(plaques)#on ajoute les plaques tectoniques à notre carte
    
    
    
    for seisme in seismes["features"]:
        magnitude = seisme["properties"]["mag"]#on récupère la magnitude
        coordonnee = seisme["geometry"]["coordinates"]#on obtient les données geographique
        location = (coordonnee[1], coordonnee[0])#on prend les coordonnées longitude latitude
        profondeur = -coordonnee[2]#on inverse les coordonnées verticales
        date = seisme["properties"]["time"] 
        
        date, temps = date.split('T')#on divise la chaine de caractère en 2 patie : l'heure et la date
        
        temps = temps[:5] + " UTC"#on supprime les 4 derniers carctères et on les remplace par UTC
        
        
        popup_text = f'''Date : {date}<br> Heure : {temps} <br> Magnitude : {magnitude} <br> Profondeur : {profondeur} km'''#on crée une chaine de caractère qui servira de contenu dans la fenetre popup avec:le temps,la magnitudeet la profondeur
        iframe = folium.IFrame(popup_text,width=200,height=80)#on definit la largeur et la hauteur de la fenetre popup
        popup = folium.Popup(iframe,max_width=300,max_height=100)#on cree le popup sur la carte puis on définit la longueur max et la largeur max

        folium.CircleMarker(#on cree un marqueur en forme de cercle sur la carte
            location=location,#on spécifie la position du séisme
            radius= taille_cercle.cercle(magnitude),#le rayon du cercle est proportionnelle à la magnitude du séisme fois 2
            color=couleurs(profondeur/100),#La couleur du cercle est déterminée par la profondeur du séisme
            fill_color= couleurs(profondeur/100),#la couleur de remplissage est basse sur la coleur de profondeur
            
            
            popup=popup,#le popup affichera les données du séisme
        ).add_to(carte)
    
    
    

    
    carte.add_child(folium.LayerControl())#gestion des calques
    
    return carte

def retour_accueil(): #fonction pour afficher un bouton sur la carte permettant de retourner dans l'accueil
    html_button = '<button onclick="window.location.href=\'https://tremblement-du-monde.com/\'" style="position: absolute; top: 10px; left: 45%; z-index: 1000; font-size: 16px; padding: 10px 12px;">Retour à l\'Accueil</button>'
    carte.get_root().html.add_child(folium.Element(html_button)) 
    

def derniers_seismes(seismes):
    html = f'''
    <H1 style="position: absolute;top: 80%;left: 3%;z-index: 1000;font-size: 20px;padding: 10px 12px;color:red;"> Les 5 derniers séismes : </H1>'''
    for i in range(5):
        seisme = seismes["features"][i]
        magnitude = seisme["properties"]["mag"]
        date = seisme["properties"]["time"]
        date, temps = date.split('T')#on divise la chaine de caractère en 2 patie : l'heure et la date
        temps = temps[:5] + " UTC"#on supprime les 4 derniers carctères et on les remplace par UTC
        location = seisme["properties"]["flynn_region"]
        html += f'''<H5 style="position: absolute;
        top: {i*2+84}%;
        left: 4%; z-index: 1000;
        font-size: 16px;
        padding: 10px 12px;
        ">• {location}, {date}, {temps}, magnitude : {magnitude}</H5>'''

    carte.get_root().html.add_child(folium.Element(html))
    

seismes = donnees_seisme()
plaques = donnees.donnees_plaques()
carte = cree_carte(seismes, plaques)
template = """
{% macro html(this, kwargs) %}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Carte temps réel</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
  <script>
  $( function() {
    $( "#maplegend" ).draggable({
                    start: function (event, ui) {
                        $(this).css({
                            right: "auto",
                            top: "auto",
                            bottom: "auto"
                        });
                    }
                });
});

  </script>
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
      <th><p id = "caca">Magitude < 2 </p></th>
      <th><div id="moncercle1"></div></th>
    </tr>
    <tr>
      <th><p id = "caca">Magitude entre 2 et 4 </p></th>
      <th><div id="moncercle2"></div></th>
    </tr>
    <tr>
      <th><p id = "caca">Magitude entre 4 et 6 </p></th>
      <th><div id="moncercle3"></div></th>
    </tr>
    <tr>
      <th><p id = "caca">Magitude > 6 </p></th>
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

retour_accueil()
derniers_seismes(seismes)

heure_actuelle = str(datetime.now())

html = f'''
    <H1 style="position: absolute;top: 2%;left: 5%; font-family: Arial;z-index: 1000;font-size: 20px;padding: 10px 12px;color:red;font-weight: bold;">Carte mise à jour le {heure_actuelle[8:10]}{heure_actuelle[4:8]}{heure_actuelle[:4]} à {heure_actuelle[10:16]} UTC </H1>'''
carte.get_root().html.add_child(folium.Element(html))

carte.save("carte_temps_reel.html")#la carte est enregistré comme carte_temps_reel.html
