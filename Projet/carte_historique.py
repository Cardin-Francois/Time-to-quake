# -*- coding: utf-8 -*-

import datetime#permet de manipuler les dates et les heures
import folium#Folium est un puissant outil car il rend possible la conception de cartes interactives.
import folium.plugins# plugins de folium
import branca.colormap as cm#branca permet d'avoir une echelle de couleurs
import donnees#permet de récuperer les données
    
    
def cree_carte(plaques_tectoniques):
    min_lon, max_lon = -200, 200#on établie les bords de la cartes 
    min_lat, max_lat = -100, 100
   
   
    carte = folium.Map(max_bounds=True,location=[0, 0], zoom_start=2, tiles="Esri WorldImagery",
                      min_lon=min_lon, max_lon=max_lon,min_lat=min_lat,max_lat=max_lat,min_zoom=2)#initialisation de la carte en utilisant des tuiles d’imagerie satellite, et limitant la zone visible aux continents. 


    
    
    plaques = folium.FeatureGroup(name='Plaques Tectoniques')#on crée une entité pour les plaques tectonique
    folium.GeoJson(plaques_tectoniques).add_to(plaques)# On met les données geographique des plaques dans la carte 
    carte.add_child(plaques)#on ajoute les  plaques tectoniques à notre carte.
    
    points = []
    
    couleurs = cm.LinearColormap(["blue","green", "yellow","orange","red"], index=[0, 0.1, 0.25,0.42,0.6])#on associe des valeurs au couleur grace à cm.LinearColormap 
    couleurs.caption = "Profondeur"
    carte.add_child(couleurs.scale(0, 150))#ça ajoute à la carte une échelle colorée allant de 0 à 150 pour le niv de profondeur

    startime = '2010-01-01'#date du début du tri
    endtime = '2024-02-01'#date de la fin du tri
     
    seismes = donnees.donnees_seismes(startime,endtime,6) 
    
    for seisme in seismes["features"]:
        magnitude = seisme["properties"]["mag"]#on récupère la magnitude
        coordonnee = seisme["geometry"]["coordinates"]#on obtient les données geographique
        location = [coordonnee[0], coordonnee[1]]#on crée un tableau location avec les coordonnées de longitude et de latitude
        profondeur = coordonnee[2]#on obtient la profondeur du séisme 
        date_seisme = seisme["properties"]["time"] / 1000.0  
        date = datetime.datetime.utcfromtimestamp(date_seisme).strftime('%Y-%m-%d %H:%M:%S UTC')#On convertis la date du séisme (en millisecondes) en une date lisible 
        date = date[:10]# on la limite pour que ça affiche uniquement l’année, le mois et le jour.
        popup_text = f'''<p>Date : {date} <br> Magnitude : {magnitude} <br> Profondeur : {profondeur} km</p>'''#on crée le texte pour la fenetre popup
        color = couleurs(profondeur/100)#On détermine la couleur du marqueur en fonction de la profondeur du séisme.
        points.append({"time": date, "popup": popup_text, "coordinates": location,'color': color})#on ajoute le seisme traité à l'ensemble
        
        
    features = [#on range les seismes
    {
        "type": "Feature",
        "geometry": {#les coordonnées géographique du séisme latitude et longitude
            "type": "Point",
            "coordinates": point["coordinates"],
        },
        "properties": {#données de séismes
            "time": point["time"],#date et heure du séisme
            "popup": point["popup"],#le contenu de la fenetre popup
            "style": {#dico vide pour le style
                "color": ""},
            "icon": 'circle',#le marqueur en forme de cercle
            'iconstyle': {#carctéristiques du marqueur comme la couleur de remplissage, l’opacité, le rayon, etc.
                    'fillColor': point["color"],
                    'fillOpacity': 0.8,
                    'stroke': 'true',
                    'radius': magnitude*2
            },
        },
    }
    for point in points
]
    
    
    folium.plugins.TimestampedGeoJson(#affiche les séismes sur la carte en fonction de leur date.
    {"type": "FeatureCollection", "features": features},
    period="P1M",#La fréquence des s de données (ici, 1 mois).
    add_last_point=True,#le dernier poin est inclus dans l'animation
    auto_play=False,#l'annimation ne démarre pas automatiquement
    loop=False,#l'annimation ne se répète pas en boucle
    max_speed=1,#la vitess max 1fps 
    loop_button=True,#bouton pour activer/desactiver la boucle quand on veut
    date_options="YYYY/MM/DD",#c'est le format de comment on affiche la date
    time_slider_drag_update=True,#ça permet aux utilisateurs de faire glisser le curseur de temps pour explorer les séismes
    duration="P2M",#durée totale de l'annimation ici 2 mois
    ).add_to(carte)
    
    carte.add_child(folium.LayerControl())#on ajoute un contrôle de calques à la carte pour permettre aux utilisateurs de basculer entre les couches (séismes, plaques tectoniques, etc.)


    return carte,features
    
def retour_accueil(): #fonction pour afficher un bouton sur la carte permettant de retourner dans l'accueil
    html_button = '<button onclick="window.location.href=\'https://tremblement-du-monde.com/\'" style="position: absolute; top: 10px; left: 45%; z-index: 1000; font-size: 16px; padding: 10px 12px;">Retour à l\'Accueil</button>'
    carte.get_root().html.add_child(folium.Element(html_button))  
    
plaques = donnees.donnees_plaques()

carte,features = cree_carte(plaques)
retour_accueil()
carte.save("carte.html")