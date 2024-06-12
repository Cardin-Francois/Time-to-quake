# -*- coding: utf-8 -*-
"""
Created on Sun Apr  7 14:19:27 2024

@author: Val
"""

def end(startime):
    endtime = startime

    """en fonction du jour, si il est à la fin d'un mois, d'une année et en fonction du nombre de jours dans le mois, 
    on n'effectue des oppérations différentes qui visent toutes à ajouter un jour """
    if endtime[5:7] == "12" and endtime[-2::] == "31":
        year = str(int(endtime[0:4]) + 1)
        endtime = year + "-01-01"
    elif endtime[5:7] in ["01","03","05","07","08","10"] and endtime[-2::] == "31":
       if int(endtime[5:7]) < 9:
           mois = "0" + str(int(endtime[5:7]) + 1)
           endtime = endtime[0:5] + mois + "-01"
       else: 
           mois =  str(int(endtime[5:7]) + 1)
           endtime = endtime[0:5] + mois + "-01"
    elif endtime[5:7] in ["04","06","09","11"] and endtime[-2::] == "30":
        if int(endtime[5:7]) < 9:
            mois = "0" + str(int(endtime[5:7]) + 1)
            endtime = endtime[0:5] + mois + "-01"
        else: 
            mois =  str(int(endtime[5:7]) + 1)
            endtime = endtime[0:5] + mois + "-01"
    elif endtime[5:7] == "02" and endtime[-2::] == "29" and endtime[0:5] in ["2000","2004","2008","2012","2016","2020","2024","2028"]:
        mois = "0" + str(int(endtime[5:7]) + 1)
        endtime = endtime[0:5] + mois + "-01"
    elif endtime[5:7] == "02" and endtime[-2::] == "28":
        mois = "0" + str(int(endtime[5:7]) + 1)
        endtime = endtime[0:5] + mois + "-01"
    else:
        if int(endtime[-2::]) < 9 :
            jour = "0" + str(int(endtime[-2::]) + 1)
            endtime = endtime[0:-2]+ jour
        else:
            jour = str(int(endtime[-2::]) + 1)
            endtime = endtime[0:-2]+ jour
    return endtime