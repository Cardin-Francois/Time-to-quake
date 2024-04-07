# -*- coding: utf-8 -*-
"""
Created on Sat Mar 16 16:06:16 2024

@author: Val
    """

def cercle(mag):
    if mag <= 2:
        return 5
    elif mag > 2 and mag <= 4:
        return 10
    elif mag > 4 and mag <= 6:
        return 20
    else:
        return 30
    
