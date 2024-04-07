# -*- coding: utf-8 -*-
import requests

def donnees_plaques():
    
    url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"#URL à interroger
    reponse = requests.get(url)#on utilise le module requests pour l'url et on recupère les données de plaques tectoniques
    
    if reponse.status_code == 200:
        
        data = reponse.json() #on utilise le fichier json
        return data   
    
    
    
def donnees_seismes(starttime,endtime,minmagnitude):   
    url = 'https://earthquake.usgs.gov/fdsnws/event/1/query'#URL à interroger
    
    
    parametres = {
        'format': 'geojson',  #on demande les données en format geojson
        'starttime': starttime ,#on specifie la date et l’heure de début pour la recherche des séismes.
        'endtime':endtime,#on specifie la date et l’heure de la fin pour la recherche des séismes.
        'minmagnitude': minmagnitude, # on définit la magnitude minimale a integrer dans les resultat 
        'orderby': 'time' #on trie les séismes par ordre chronologique
    }
    
    
    reponse = requests.get(url, params=parametres)#On fait une requête HTTP, les paramètres de la requetes sont spécifié par (paramètres)et la requete est récupéré sous forme d'objet Response
    
    
    if reponse.status_code == 200:
        
        data = reponse.json()#on convertit la réponse en format JSON
        return data

