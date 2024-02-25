// chrome.deskCapture.chooseDesktopMedia(['screen', 'window', 'tab'], f);

// function findString(id) {
//     chrome.tabs.captureVisibleTab(getString);
// }

// function getString(img) {

// }

async function getString(imageurl) {
    try {
        const response = await fetch('https://api.ocr.space/parse/imageurl?apikey=K82187279788957&url=' + imageurl);
        const result = await response.json();
        text = result['ParsedResults'][0]['ParsedText'];
        // text = result['ParsedText'];
        console.log(result);
        // console.log(response);
        // console.log(json);
        console.log(text);
        findDate(text);
    } catch (error) {
        console.error(error);
    };
};

function getDate(str) {
    const regex = /\b\d{1,2}\/\d{1,2}\/\b/;
    const match = str.match(regex);
    
    if (match) {
      console.log('Date: ' + match[0]);
    //   return match[0];
    } else {
      console.log('No date found. Looking in string format ...');
      // Look for instance of month
      getMonth(str);
    }
}

function getMonth(str) {
    const regex = /\b(?:January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)\s+\d{1,2}(?:st|nd|rd|th)?\b/gi;
    const matches = str.match(regex);

    if (matches) {
        console.log('Date: ' + matches); // Output: ['January 1st, 2022', 'Feb 15, 2023']
    } else {
        console.log('No dates found');
    }
}