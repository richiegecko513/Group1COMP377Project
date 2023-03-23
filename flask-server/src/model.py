import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# load data
song_data = pd.read_csv("../song_mood_detectionv1.csv")

song_data.dropna(inplace=True)

print(song_data.head())

X = song_data.drop(['mood', 'title', 'uri', 'artist'], axis=1)
y = song_data['mood']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = GradientBoostingClassifier(
    n_estimators=200,
    min_samples_split=5,
    min_samples_leaf=2,
    max_features='sqrt',
    max_depth=5,
    learning_rate=0.01,
    random_state=42
)

model.fit(X_train, y_train)

ypred = model.predict(X_test)

print(f'Gradient Boosting Classifier Report: {classification_report(y_test, ypred)}')
accuracy = accuracy_score(y_test, ypred)
print(f'Accuracy Score: {accuracy}')

joblib.dump(model, "predictor.pkl")
