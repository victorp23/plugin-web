import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

def train_model():
    base_path = os.path.dirname(__file__)
    file_path = os.path.join(base_path, 'cve.csv')

    df = pd.read_csv(file_path)

    # Convertir categorías a valores numéricos
    df['cwe_code'] = df['cwe_code'].astype(int)
    df['cvss'] = df['cvss'].astype(float)

    X = df[['cvss', 'cwe_code']]
    y = df['cwe_name']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    model_path = os.path.join(base_path, 'vulnerability_model.pkl')
    joblib.dump(model, model_path)
    print("Model trained and saved successfully.")

train_model()
