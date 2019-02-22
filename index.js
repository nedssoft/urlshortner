
const apiKey = 'AIzaSyCqGkpKKwsVry7GWx8Opw2u9meUmvGwQwg';
const url = 'https://www.googleapis.com/urlshortener/v1/url';

const inputField = document.querySelector('#input');
const expandButton = document.querySelector('#expand');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#result');


async function expandUrl() {
  const urlToExpand = url + '?shortUrl=' + inputField.value + '&key=' + apiKey;
  try {
    let response = await fetch(urlToExpand);
    if (response.ok) {
      let jsonResponse = await response.json();
      responseField.insertAdjacentHTML('beforeend','<p> Your expanded URL is </p><p>' + jsonResponse.longUrl+ '</p>');
      responseField.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
}

async function shortenUrl() {
  const urlToShorten = inputField.value;
  const urlWithKey = url + '?key=' + apiKey;
  try {
    let response = await fetch(urlWithKey, {
      method: 'POST',
      body: JSON.stringify({longUrl: urlToShorten}),
      headers: {
        "Content-type": "application/json"
      }
    });
    if (response.ok) {
      let jsonResponse = await response.json();
      responseField.insertAdjacentHTML('beforeend','<p> Your shortened URL is </p><p>' + jsonResponse.id + '</p>');
      responseField.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
}

expandButton.addEventListener('click', (e) =>{
  e.preventDefault();
  responseField.style.display = 'none';
  responseField.innerHTML = '';
  expandUrl();

});
shortenButton.addEventListener('click', (e) =>{
  e.preventDefault();
  responseField.style.display = 'none';
  responseField.innerHTML = '';
  shortenUrl();
});