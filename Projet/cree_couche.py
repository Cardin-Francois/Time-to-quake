# -*- coding: utf-8 -*-

import datetime#permet de manipuler les dates et les heures
import folium#Folium est une des nombreuses bibliothèques open source complémentaires de Python.C'est un puissant outil car il rend possible la conception de cartes interactives.

def cree_couche(seismes,carte,nom):
    
    couche = folium.FeatureGroup(name=nom)
    
    for seisme in seismes["features"]:
        magnitude = seisme["properties"]["mag"]#on récupère la magnitude
        coordonnee = seisme["geometry"]["coordinates"]#on obtient les données geographique
        location = (coordonnee[1], coordonnee[0])#on prend les coordonnées longitude latitude
        date_seisme = seisme["properties"]["time"] / 1000.0  
        date = datetime.datetime.utcfromtimestamp(date_seisme).strftime('%Y-%m-%d %H:%M:%S UTC')#On convertis la date du séisme (en millisecondes) en une date lisible 
        popup_text = f'''Magnitude : {magnitude}<br>
        Date : {date}'''#on crée le texte pour la fenetre popup
        iframe = folium.IFrame(popup_text,width=200,height=80)#on definit la largeur et la hauteur de la fenetre popup
        popup = folium.Popup(iframe,max_width=300,max_height=100)#on cree le popup sur la carte puis on définit la longueur max et la largeur max
        folium.CircleMarker(#on cree un marqueur en forme de cercle sur la carte
            location=location,#on spécifie la position du séisme
            radius=magnitude*1.5,#le rayon du cercle est proportionnelle à la magnitude du séisme fois 1.5
            color='purple',#la couleur du cercle est definie comme violet
            fill=True,#çaindique que le cercle doit être rempli 
            fill_color='darkred',#La couleur de remplissage du cercle est définie comme rouge foncé (dark red)
            popup = popup).add_to(couche)#le pop up peut contenir plus d'information et le tout est ajouter à une couche
    
    return couche
    

