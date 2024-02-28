// Function to add an event to Google Calendar using the Flask API
async function addEventToGoogleCalendar(eventDetails, credentials) {
    try {
        const response = await fetch('http://127.0.0.1:5000/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...eventDetails,
                ...credentials,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Event added successfully:', data);
        } else {
            console.error('Failed to add event:', data.message);
        }
    } catch (error) {
        console.error('Error adding event:', error);
    }
}

// Example event details
const eventDetails = {
    summary: 'Meeting with John',
    start_datetime: '2024-02-25T10:00:00',
    end_datetime: '2024-02-25T11:00:00',
    description: 'Discuss project details',
};

// Example OAuth credentials obtained from the frontend
const credentials = {
    token: 'AIzaSyDX6tLyA2EOP0Hgpb4tlp53x_8Ej64XAfc',
    refresh_token: 'refresh_token_here',
    token_uri: 'http://localhost:8000',
    client_id: '443298021481-j21naaku21api7kt0102687unu7reeqc.apps.googleusercontent.com',
    client_secret: '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',
};

// Call the function to add the event to Google Calendar
addEventToGoogleCalendar(eventDetails, credentials);
