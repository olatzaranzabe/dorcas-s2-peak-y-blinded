'use strict';
const listOfChosenSelects = document.getElementsByTagName('select');
const submitButton = document.querySelector('#submit');
const responseURL = document.querySelector('.response');
const buttonTwitter = document.querySelector('.btn-twitter');
const linkTwitter = document.querySelector('.link-twitter');
const form = document.querySelector('#form');
const cardCreated = document.querySelector('.card-created');
//let fr = new FileReader();
let twitterURL;

submitButton.addEventListener('click', loadPhoto);

function sendData () {
  const inputs = Array.from(form.elements);
  const json = getJSONFromInputs(inputs);
  json.skills = [];
  console.log('json', json);
  for(let i = 0; i < listOfChosenSelects.length; i++) {
    json.skills.push(listOfChosenSelects[i].value);
  }
  json.photo = fr.result;
  console.log('json justo antes enviar datos', json);
  const jsonFromLocalStorage = JSON.parse(localStorage.getItem('jsonToSend'));
  console.log('jasonFromLocal', jsonFromLocalStorage);
  if(JSON.stringify(json) === JSON.stringify(jsonFromLocalStorage)){
    const urlFromStorage = JSON.parse(localStorage.getItem('cardURL'));
    responseURL.innerHTML = '<a href=' + urlFromStorage + '>' + urlFromStorage + '</a>';
    twitterURL = urlFromStorage;
    cardCreated.classList.remove('hidden__item');
  } else {
    sendRequest(json);
  }
}

function loadPhoto(){
  const myFile = document.querySelector('#image').files[0];
  fr.addEventListener('load', sendData);
  fr.readAsDataURL(myFile);
}

function getJSONFromInputs(inputs){
  return inputs.reduce(function (acc, val) {

    if (val.type==='radio' && val.checked===true) {
      acc[val.name] = val.value;
    }
    if ((val.nodeName !== 'BUTTON') && (val.nodeName !== 'FIELDSET') && (val.type!=='radio') ){
      acc[val.name] = val.value;
    }
    return acc;
  }, {});
}

function sendRequest(json){
  localStorage.setItem('jsonToSend',JSON.stringify(json));
  fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'content-type': 'application/json'
    },
  })

    .then(function(resp) {
      return resp.json(); })
    .then(function(result) {
      console.log('result',result);
      showURL(result); })
    .catch(function(error) {
      console.log(error);
    });
}

function showURL(result){
  if(result.success){
    localStorage.setItem('cardURL',JSON.stringify(result.cardURL));
    responseURL.innerHTML = '<a href=' + result.cardURL + '>' + result.cardURL + '</a>';
  }else{
    responseURL.innerHTML = 'ERROR:' + result.error;
  }
  cardCreated.classList.remove('hidden__item');
  twitterURL = result.cardURL;

  if (submitButton.classList.contains('btn-card')) {
    submitButton.classList.remove('btn-card');
    submitButton.classList.add('btn-card--inactive');
  }
}

function shareOnTwitter() {
  linkTwitter.href = 'https://twitter.com/intent/tweet?url=' + twitterURL + '&text=Acabo%20de%20crear%20mi%20tarjeta%20con%20Font%20Awesome%20de%20Peak-y-blinded&hashtags=WomenInTech';
}

buttonTwitter.addEventListener('click', shareOnTwitter);
