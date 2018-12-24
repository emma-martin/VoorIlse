'use strict';

console.log('>> Ready :)');

const complimentEl = document.querySelector('.compliment');
const puppyImg = document.querySelector('.img');

const btnCompliment = document.querySelector('.btn');
// const complimentJson = require('./assets/json/compliment.json');
// console.log(complimentJson);
const urlCompliment = './assets/json/compliment.json';
const urlPuppies = 'https://random.dog/woof.json';

function getCompliment(){
  fetch(urlCompliment)
    .then(response => response.json())
    .then(function(data){
      const compliment = data.feed.entry[getRandom()].gsx$compliments.$t;
      complimentEl.innerHTML = `${compliment}`;
    })
    .then(fetch(urlPuppies)
      .then(response => response.json())
      .then(function(data){
        const puppy = data.url;
        puppyImg.src = puppy;
      })
    );
}

function getRandom(){
  return Math.floor(Math.random() * 39);
}

btnCompliment.addEventListener('click', getCompliment);

