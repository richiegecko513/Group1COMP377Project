from config import config
from config.auth import authenticate
from flask import Flask

app = Flask(__name__)

sp = authenticate(client_id=config.CLIENT_ID, client_secret=config.CLIENT_SECRET)

app.route("/")
def index():
    return "Welcome to our Spotify app"


if __name__ == "__main__":
    app.debug = True
    app.run()