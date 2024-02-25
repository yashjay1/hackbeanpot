// const url = 'https://ocrly-image-to-text.p.rapidapi.com/?imageurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F1b%2Fe6%2F421be6184e75937bb223c764ecbc2f2e.jpg&filename=sample.jpg';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3e2ff03defmsh3d6add1ab647943p1a2187jsn7b64c12439f4',
// 		'X-RapidAPI-Host': 'ocrly-image-to-text.p.rapidapi.com'
// 	}
// };

async function fetchData(imageurl) {
try {
	const response = await fetch('https://api.ocr.space/parse/imageurl?apikey=K82187279788957&url=' + imageurl);
	const result = await response.json();
    text = result['ParsedResults'][0]['ParsedText'];
    // text = result['ParsedText'];
	console.log(result);
    // console.log(response);
    // console.log(json);
    console.log(text);
    return text;
} catch (error) {
	console.error(error);
};
};

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('link');
    // onClick's logic below:
    link.addEventListener('click', function() {
        // document.getElementById("id ").textContent = "test";
        url = 'https://www.southernliving.com/thmb/85KWhAViXk-7EsJWYvNBtOXYolI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SL-RomanticMessages--4_butterflies-3ae0a1e2abcc45de8301651c7c23af8b.jpg'
        console.log(fetchData(url));
    });
});

