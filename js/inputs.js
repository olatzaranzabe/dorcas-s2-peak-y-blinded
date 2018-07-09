//get image

var fr = new FileReader();

var uploadBtn = document.querySelector('.item__button-file');
var fileField = document.querySelector('#image');
var profileImage = document.querySelector('.personal-image');

function getImage(e){
  var myFile = e.currentTarget.files[0];
  fr.addEventListener('load', writeImage);
  fr.readAsDataURL(myFile);
}

function writeImage() {
  profileImage.src= fr.result;
}

function fakeFileClick() {
  fileField.click();
}

fileField.addEventListener('change', getImage);
uploadBtn.addEventListener('click', fakeFileClick);

//input name y role

var nameField = document.querySelector('.form-field--name');
var roleField = document.querySelector('.form-field--role');

function writeData(event) {
  var guiltyElement = event.currentTarget;
  var targetID = guiltyElement.getAttribute('data-donde');

  document.querySelector('#' + targetID).innerHTML = guiltyElement.value;
}

nameField.addEventListener('keyup', writeData);
roleField.addEventListener('keyup', writeData);

//redes sociales

var mailField = document.querySelector('.form-field--mail');
var telField = document.querySelector('.form-field--tel');
var linField = document.querySelector('.form-field--lin');
var ghField = document.querySelector('.form-field--gh');

function writeSocialMedia(event) {
  var guiltyElement = event.currentTarget;
  var targetID = guiltyElement.getAttribute('data-donde');
  var inputID = guiltyElement.getAttribute('id');
  var linkID = document.querySelector('#' + targetID);

  if (inputID==='mail'){
    linkID.href = 'mailto:' + guiltyElement.value;
    linkID.title = guiltyElement.value;
    linkID.classList.remove('contact__link--inactive');
    linkID.classList.add('contact__link--active');
  } else if (inputID === 'telephone'){
    linkID.href = 'tel:' + guiltyElement.value;
    linkID.title = guiltyElement.value;
    linkID.classList.remove('contact__link--inactive');
    linkID.classList.add('contact__link--active');
  } else if  (inputID === 'linkedin'){
    linkID.href = 'https://linkedin.com/in/' + guiltyElement.value;
    linkID.title = 'https://linkedin.com/in/' + guiltyElement.value;
    linkID.classList.remove('contact__link--inactive');
    linkID.classList.add('contact__link--active');
  } else if (inputID === 'github') {
    linkID.href = 'https://github.com/' + guiltyElement.value;
    linkID.title = 'https://github.com/' + guiltyElement.value;
    linkID.classList.remove('contact__link--inactive');
    linkID.classList.add('contact__link--active');
  }
}

mailField.addEventListener('change', writeSocialMedia);
telField.addEventListener('change', writeSocialMedia);
linField.addEventListener('change', writeSocialMedia);
ghField.addEventListener('change', writeSocialMedia);
