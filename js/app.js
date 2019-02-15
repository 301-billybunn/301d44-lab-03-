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


$('select[name="animals"]').on('change', function () {
  let $selection = $(this).val();
  $('div').hide()
  $(`div[class="${$selection}"]`).show()
})

function switchEventHandler() {
  console.log('heard click');
  let buttonId = event.target.id;
  Animal.allAnimals = []; // empties the allAnimals array
  $('div').remove(); // deletes all divs from the page
  $('option').remove(); // removes all option elements from the page
  $('select').append('<option value="default">Filter by Keyword</option>'); // adds default option
  if (buttonId === 'gallery-one') Animal.readJson(jsonDataOne)
  if (buttonId === 'gallery-two') Animal.readJson(jsonDataTwo)
}


// SWITCH WHICH GALLERY IS DISPLAYS ON PAGE
$('.switch-button').on('click', switchEventHandler)

$(() => Animal.readJson(jsonDataOne));
