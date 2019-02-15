'use strict';

function Animal(animal) {
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.title = animal.title;
  this.description = animal.description;
  this.image_url = animal.image_url;
}

Animal.allAnimals = [];

Animal.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  let animalClone = $('div[class="clone"]');

  let animalHtml = $('#photo-template').html();

  animalClone.html(animalHtml);
  animalClone.find('h2').text(this.keyword);
  animalClone.find('img').attr('src', this.image_url);
  animalClone.find('p').text(this.description);
  animalClone.removeClass('clone');
  animalClone.attr('class', this.keyword);
}

Animal.prototype.renderSelChange = function () {
  console.log('ranrenderSelChange');
  $('select').append('<option class="clone"></option>');
  let optClone = $('option[class="clone"]');

  optClone.attr('value', this.keyword);
  optClone.text(this.keyword);
  optClone.removeClass('clone');
}

const jsonDataOne = 'data/page-1.json'
const jsonDataTwo = 'data/page-2.json';
let currentJsonData = jsonDataOne;

Animal.readJson = (jsonPage) => {
  $.get(jsonPage)
    .then(data => {
      data.forEach(obj => {
        Animal.allAnimals.push(new Animal(obj));
      })
    })
    .then(Animal.loadAnimals)
};

Animal.loadAnimals = () => {
  console.log('loaded animals');
  Animal.allAnimals.forEach(animal => animal.render())
  Animal.allAnimals.forEach(animal => animal.renderSelChange())
}

// Animal.switchGallery = () => {
//   console.log('fired switchGallery()');
//   console.log('currentJsonData:', currentJsonData);

// }

$('select[name="animals"]').on('change', function () {
  let $selection = $(this).val();
  $('div').hide()
  $(`div[class="${$selection}"]`).show()
})

// SWITCH WHICH GALLERY IS DISPLAYS ON PAGE
$('.switch-button').on('click', function () {
  console.log('heard click');
  Animal.allAnimals = []; // empties the allAnimals array
  $('div').remove(); // deletes all divs from the page
  // Clear the page
  Animal.readJson(jsonDataTwo); // calls the readJson again, on the other page

})

$(() => Animal.readJson(jsonDataOne));
