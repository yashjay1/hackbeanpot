document.getElementById('calendarAdd').addEventListener('click', captureClick);

// function captureClick() {
//     chrome.deskCapture.chooseDesktopMedia(["tab"], Tab, findString);
// }
const year = 2024;

function captureClick(id) {
    chrome.tabs.captureVisibleTab(getString);
    console.log('Image id:' + id);
}

// function getString(img) {

// }

async function getString(imageBase64URI) {
    try {
        const formData = new FormData();
        formData.append('base64Image', imageBase64URI);
        
        const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            headers: {
              'apikey': 'K82187279788957'
            },
            body: formData
          })
          

        const result = await response.json();
        text = result['ParsedResults'][0]['ParsedText'];
        // text = result['ParsedText'];
        console.log(result);
        // console.log(response);
        // console.log(json);
        console.log(text);
        getDate(text);
    } catch (error) {
        console.error(error);
    };
};

function getDate(str) {
    const regex = /\b\d{1,2}\/\d{1,2}\b/;
    const match = str.match(regex);
    console.log('Match' + match);
    
    if (match) {
        // var dateStr = match[0] + '/' + year + ' 12:00:00';
        // var date = new Date(dateStr);
        // console.log(date);
        // var monthDay = (date.getMonth().toString(), date.getDay().toString());
        var date = match[0].split('/');
        // var dateIos = date.toISOString();
        console.log('Date: ' + date[0] + date[1]);
        return date;
    //   return match[0].split('/'); // should pass method to popupp.js
    } else {
      console.log('No date found. Looking in string format ...');
      // Look for instance of month
      getMonth(str);
    }
}

function getMonth(str) {
    const regex = /\b(?:January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)\s+\d{1,2}(?:st|nd|rd|th)?\b/gi;
    const matches = str.match(regex);

    console.log('Matches' + matches);
    if (matches) {
        var dateStr = matches[0] + ', ' + year + ' 12:00:00';
        console.log(dateStr);
        // var date = new Date(dateStr);
        // console.log(date);
        // console.log(date.getMonth);
        // console.log(date.getDay)
        // var dateWithTimeZone = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        // var dateIos = dateWithTimeZone.toISOString();

        var monthMap = {
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12
          };
          
          // Parse the date string into a Date object
          var dateParts = dateStr.split(' ');
          var month = monthMap[dateParts[0]];
          var day = parseInt(dateParts[1].replace(',', ''));
        //   var year = parseInt(dateParts[2]);
        //   var time = dateParts[3];
        //   var date = new Date(year, month, day);
          console.log(month);
          console.log(day);

        var monthDay = [month, day];
        console.log('Date: ' + monthDay[0] + ' ' + monthDay[1]); // Output: ['January 1st, 2022', 'Feb 15, 2023']
        return monthDay;
    } else {
        console.log('No dates found');
    }
}