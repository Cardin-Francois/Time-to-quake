# -*- coding: utf-8 -*-
import matplotlib.pyplot as plt
import requests  #Permet de recupérer les données par une requete http
from datetime import datetime

def donnees_seisme():
    url = "https://www.seismicportal.eu/fdsnws/event/1/query?format=json&limit=500"
    
    
    reponse = requests.get(url)#recupere les données des seismes

    if reponse.status_code == 200:
        
        data = reponse.json()#on transforme la réponse en fichier json 
        return data

def donnees_seismes1(starttime, endtime, minmagnitude):   
    url = 'https://earthquake.usgs.gov/fdsnws/event/1/query'  # URL à interroger
    
    parametres = {
        'format': 'geojson',  # On demande les données en format geojson
        'starttime': starttime,  # On spécifie la date et l'heure de début pour la recherche des séismes.
        'endtime': endtime,  # On spécifie la date et l'heure de la fin pour la recherche des séismes.
        'minmagnitude': minmagnitude,  # On définit la magnitude minimale à intégrer dans les résultats 
        'orderby': 'time'  # On trie les séismes par ordre chronologique
    }
    
    reponse = requests.get(url, params=parametres)  # On fait une requête HTTP
    if reponse.status_code == 200:
        data = reponse.json()  # On convertit la réponse en format JSON
        return data
    else:
        print("Erreur lors de la récupération des données.")
        return None
    
def graphique_seisme_magnitude(data):
    magnitudes = [float(seisme['properties']['mag']) for seisme in data['features']]
    plt.hist(magnitudes, bins=20, color='blue', alpha=0.7)
    plt.xlabel('Magnitude')
    plt.ylabel('Nombre de séismes')
    plt.title('Répartition des magnitudes des 500 derniers séismes')
    plt.grid(True)
    plt.savefig('magnitudes.png')
    plt.show()

def graphique_seisme_profondeur(data):
    profondeurs = [float(seisme['geometry']['coordinates'][2]) for seisme in data['features']]
    plt.hist(profondeurs, bins=20, color='green', alpha=0.7)
    plt.xlabel('Profondeur (km)')
    plt.ylabel('Nombre de séismes')
    plt.title('Répartition des profondeurs des 500 derniers séismes')
    plt.grid(True)
    plt.savefig('profondeurs.png')
    plt.show()


def plot_seismes_magtemps(data):
    magnitudes = []
    temps = []
    for feature in data['features']:
        magnitude = feature['properties']['mag']
        time = feature['properties']['time']
        temps.append(datetime.fromtimestamp(time / 1000))  # Convertir le temps en format lisible
        magnitudes.append(magnitude)
    
    plt.figure(figsize=(10, 6))
    plt.plot(temps, magnitudes, 'o', color='blue', markersize=4)
    plt.xlabel('Temps')
    plt.ylabel('Magnitude')
    plt.title('Magnitude des séismes au fil du temps (2014-2024)')
    plt.grid(True)
    plt.savefig('histoire.png')
    plt.show()

def plot_seismes_histogramme(data):
    magnitudes = []
    for feature in data['features']:
        magnitude = feature['properties']['mag']
        magnitudes.append(magnitude)
    
    plt.figure(figsize=(10, 6))
    plt.hist(magnitudes, bins=20, color='blue', edgecolor='black', alpha=0.7)
    plt.xlabel('Magnitude')
    plt.ylabel('Nombre de séismes')
    plt.title('Distribution des magnitudes des séismes (2014-2024)')
    plt.grid(True)
    plt.savefig('histogramme.png')
    plt.show()
    
def plot_seismes(data):
    # Récupérer les données par mois
    conteurs_mois = {}
    for feature in data['features']:
        time = feature['properties']['time'] / 1000  # Convertir le temps 
        mois = datetime.utcfromtimestamp(time).strftime('%Y-%m') 
        if mois in conteurs_mois:
            conteurs_mois[mois] += 1
        else:
            conteurs_mois[mois] = 1
    
    mois = sorted(conteurs_mois.keys())
    conteurs = [conteurs_mois[i] for i in mois]
    
    # Récupérer les données par année
    annees_conteurs = {}
    for feature in data['features']:
        time = feature['properties']['time'] / 1000  # Convertir le temps
        annee = datetime.utcfromtimestamp(time).strftime('%Y') 
        if annee in annees_conteurs:
            annees_conteurs[annee] += 1
        else:
            annees_conteurs[annee] = 1
    

    plt.figure(figsize=(12, 6))
    
    # Graphique des séismes par mois
    plt.plot(mois, conteurs, marker='.', linestyle='-', color='red', label='Séismes par mois')
    plt.ylabel('Nombre de séismes')
    plt.title('Nombre de séismes par mois')
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.xticks([])  # ne pas afficher la légende de l'axe des abscisses
    
    # Créer le deuxième axe des abscisses pour les années
    plt2 = plt.twiny()
    annees = sorted(list(annees_conteurs.keys()))
    plt2.bar([2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024], [annees_conteurs[annee] for annee in annees], color='blue', alpha=0.5, label='Séismes par année')  # Superposer le diagramme à barres
    plt2.set_xlabel('Année')
    
    
    plt.savefig('courbe.png')
    plt.show()
    
def get_continent(lat, lon):
    if -180 <= lon <= 180 and -90 <= lat <= 90:  # Vérifier si les coordonnées sont valides
        if 50 <= lat <= 70 and -180 <= lon <= 180:  # Europe
            return 'Europe'
        elif -25 <= lat <= 50 and -100 <= lon <= 40:  # Amérique
            return 'Amérique'
        elif -40 <= lat <= -25 and -100 <= lon <= -30:  # Afrique
            return 'Afrique'
        elif -60 <= lat <= -40 and -70 <= lon <= 180:  # Antarctique
            return 'Antarctique'
        elif -10 <= lat <= 20 and 70 <= lon <= 100:  # Asie
            return 'Asie'
        elif -40 <= lat <= -10 and 100 <= lon <= 180:  # Australie
            return 'Australie'
        else:
            return 'Océan'
    else:
        return 'Inconnu'
    
def plot_seismes_par_continent(data):
    continents_counts = {}
    for feature in data['features']:
        geometry = feature['geometry']
        if 'coordinates' in geometry:
            coordinates = geometry['coordinates']
            
            lon, lat = coordinates[:2]  # Latitude et longitude
            continent = get_continent(lat, lon)
            if continent in continents_counts:
                continents_counts[continent] += 1
            else:
                continents_counts[continent] = 1
    
    # Création du diagramme en camembert
    plt.figure(figsize=(8, 8))
    plt.pie(continents_counts.values(), labels=continents_counts.keys(), autopct='%1.1f%%', startangle=140)
    plt.title('Répartition des séismes par continent')
    plt.savefig('représentation.png')
    plt.show()
    
startime = '2014-01-01'
endtime = '2024-02-01'
seismes1 = donnees_seismes1(startime,endtime,5.0)    
seismes = donnees_seisme()
 
plot_seismes_magtemps(seismes1)   
graphique_seisme_magnitude(seismes)
graphique_seisme_profondeur(seismes)
plot_seismes_histogramme(seismes1)
plot_seismes(seismes1)
plot_seismes_par_continent(seismes1)