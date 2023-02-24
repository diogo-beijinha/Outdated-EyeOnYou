import pickle
import matplotlib.pyplot as plt

import pandas as pd

objects = pd.read_pickle(r'ref_name.pkl')

for key, value in objects.items():
    print(key, ':', value)
