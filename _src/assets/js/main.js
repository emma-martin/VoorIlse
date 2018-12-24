'use strict';

const card = document.querySelector('.card');
const btnCompliment = document.querySelector('.btn');
const urlCompliment = './assets/json/compliment.json';
const urlPuppies = 'https://random.dog/woof.json';

//DOM elements (h2 compliment img puppy)
function createElement(tag, newClass){
  const newEl = document.createElement(tag);
  newEl.classList.add(newClass);
  return newEl;
}

function createText(text){
  const newText = document.createTextNode(text);
  return newText;
}

function uniteElementText(tag, newClass, text){
  const newTitle = createElement(tag, newClass);
  const newTextEl = createText(text);
  newTitle.appendChild(newTextEl);
  return newTitle;
}

function createImg(src, alt){
  const image = createElement('img', 'img');
  image.setAttribute('src', src);
  image.setAttribute('alt', alt);
  return image;
}

function createVideo(src){
  const newVid = createElement('video', 'video');
  newVid.setAttribute('autoplay','');
  const vidSource = createElement('source');
  vidSource.setAttribute('src', src);
  vidSource.setAttribute('type', 'video/mp4');
  newVid.appendChild(vidSource);
  return newVid;
}

card.innerHTML = `<h1 class="title--intro">Cosas bonitas para Ilse</h1>`;
function getCompliment(){
  card.innerHTML = '';
  fetch(urlCompliment)
    .then(response => response.json())
    .then(function(data){
      const compliment = data.feed.entry[getRandom()].gsx$compliments.$t;
      const newCompliment = uniteElementText('h3', 'title', compliment);
      card.appendChild(newCompliment);
    })
    .then(fetch(urlPuppies)
      .then(response => response.json())
      .then(function(data){
        const puppy = data.url;
        if(puppy.includes('.mp4')){
          const newVidPup = createVideo(puppy);
          card.appendChild(newVidPup);
        }else {
          const newPup = createImg(puppy, 'puppy for Ilse');
          card.appendChild(newPup);
        }
      })
    );
}

function getRandom(){
  return Math.floor(Math.random() * 39);
}

btnCompliment.addEventListener('click', getCompliment);

