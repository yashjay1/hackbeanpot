document.getElementById('link').addEventListener('click', captureClick);

// function captureClick() {
//     chrome.deskCapture.chooseDesktopMedia(["tab"], Tab, findString);
// }

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
      console.log('Date: ' + match[0]);
    //   return match[0];
    } else {
      console.log('No date found. Looking in string format ...');
      // Look for instance of month
      getMonth(str);
    }
}

function getMonth(str) {
    const regex = /\b(?:January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)\s+\d{1,2}\b/gi;
    const matches = str.match(regex);

    console.log('Matches' + matches);
    if (matches) {
        console.log('Date: ' + matches[0]); // Output: ['January 1st, 2022', 'Feb 15, 2023']
    } else {
        console.log('No dates found');
    }
}