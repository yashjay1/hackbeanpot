// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

function setAlarm(event) {
    const minutes = parseFloat(event.target.value);
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.alarms.create({ delayInMinutes: minutes });
    chrome.storage.sync.set({ minutes: minutes });
    window.close();
}

function addEvent() {
    console.log("in add event");
    const token = gapi.client.getToken();
    if (token !== null) {
        const event = {
            'summary': 'Test event',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2024-02-24T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2024-02-24T19:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            }
        };
        const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        // Execute the request
        request.execute(function(event) {
            console.log('Event created: ' + event.htmlLink);
        });
    }
}
document.getElementById('calendarAdd').addEventListener('click', addEvent);