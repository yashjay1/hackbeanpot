from flask import Flask, request, jsonify, redirect, url_for
from google.oauth2 import id_token
from google.auth.transport import requests
from google.oauth2.credentials import Credentials
from google.auth.exceptions import GoogleAuthError
from googleapiclient.discovery import build
import datetime
import os

app = Flask(__name__)

# Google Calendar API setup
API_SERVICE_NAME = 'calendar'
API_VERSION = 'v3'
CLIENT_SECRET_FILE = 'client_secret.json'  # Your client secret file obtained from Google Cloud Console

# Set the scopes required for Google Calendar API
SCOPES = ['https://www.googleapis.com/auth/calendar']

# Redirect URI for OAuth flow
REDIRECT_URI = 'localhost:8000'

# Load client secret
CLIENT_SECRETS_FILE = os.path.join(os.path.dirname(__file__), CLIENT_SECRET_FILE)


# Endpoint to add event to Google Calendar
@app.route('/add-event', methods=['POST'])
def add_event():
    try:
        # Obtain credentials from the POST request
        credentials = Credentials(token=request.json['token'],
                                  refresh_token=request.json['refresh_token'],
                                  token_uri=request.json['token_uri'],
                                  client_id=request.json['client_id'],
                                  client_secret=request.json['client_secret'],
                                  scopes=SCOPES)

        # Build the Google Calendar service
        service = build(API_SERVICE_NAME, API_VERSION, credentials=credentials)

        # Create event
        event = {
            'summary': request.json['summary'],
            'description': request.json.get('description', ''),
            'start': {
                'dateTime': request.json['start_datetime'],
                'timeZone': 'UTC',
            },
            'end': {
                'dateTime': request.json['end_datetime'],
                'timeZone': 'UTC',
            },
        }

        # Insert event
        event = service.events().insert(calendarId='primary', body=event).execute()

        return jsonify({'status': 'success', 'eventId': event['id']})

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=False)
