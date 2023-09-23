# Groove App
A spotify party music APP that allows a host to invite others to play pause and skip songs from multiple devices.

## Setup Instructions 
### Install required Python Modules

```bash
pip install django djangorestframework
```

### Spotify API key
As this app will require a API key from spotify you must obtain one from [developer.spotify](https://developer.spotify.com/) and add your Client ID & Client Secret to   >/spotify/credentials.py

### dotenv (Optional) 
Can also install python-dotenv to hide personal API key if needing to push to github

```bash
pip install python-dotenv
```