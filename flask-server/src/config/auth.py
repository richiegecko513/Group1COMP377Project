import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


# authenticates the client and returns Spotify API object
def authenticate(client_id, client_secret):
    client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    return sp
