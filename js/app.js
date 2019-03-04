'use strict';

// Helper function to filter for unique values
const filterForUnique = (arr) => arr.filter((value, index, arr) => arr.indexOf(value) === index);


Animal.allAnimals = []; // Array to hold animal objects
Animal.keywords = []; // Array to hold animal keywords

// Constructor for each animal obj
function Animal(animal, gallery) {
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.title = animal.title;
  this.description = animal.description;
  this.image_url = animal.image_url;
  this.gallery = gallery;
  Animal.allAnimals.push(this); // each animal obj gets pushed to the allAnimals array
  Animal.keywords.push(this.keyword); // each keyword gets pushed to the keywords
  Animal.keywords = filterForUnique(Animal.keywords); // filters keywords for unique values only
}

// Prototype function to create DOM variables for each animal
Animal.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  let animalClone = $('div[class="clone"]');

  let animalHtml = $('#photo-template').html();

  animalClone.html(animalHtml);
  animalClone.find('h2').text(this.keyword);
  animalClone.find('img').attr('src', this.image_url);
  animalClone.find('p').text(this.description);
  animalClone.removeClass('clone');
  animalClone.addClass(this.keyword);
  animalClone.addClass(this.gallery);
}

// Takes JSON data, runs each JSON obj through a constructor, and invokes loadAnimals()
Animal.readJson = (jsonPage) => {
  $.get(jsonPage)
    .then(data => data.forEach(obj => new Animal(obj, jsonPage)))
    .then(Animal.loadAnimals)
};

// Renders animal images and select options IF not already on the page
Animal.loadAnimals = () => {
  console.log('fired loadAnimals()');
  if (Animal.allAnimals.length > $('div').length) Animal.allAnimals.forEach(animal => animal.render());
  if (Animal.keywords.length > $('option').length) Animal.renderSelectOptions(Animal.keywords);
}

// Renders all options for drop-down select box
Animal.renderSelectOptions = function (arr) {
  for (let i = 0; i < Animal.keywords.length; i++) {
    $('select').append('<option class="clone"></option>');
    let optClone = $('option[class="clone"]');
    optClone.attr('value', arr[i]);
    optClone.text(arr[i]);
    optClone.removeClass('clone');
  }
}

// jQuery events

// Filters animals displayed with select box change
$('select[name="animals"]').on('change', function () {
  let $selection = $(this).val();
  if ($selection === 'default') { // Show everything if default option is selected again
    $('div').show()
  } else { // Hide all animals and show only animals with the selected keyword
    $('div').hide()
    $(`div.${$selection}`).show()
  }
})

// SWITCH WHICH GALLERY IS DISPLAYS ON PAGE
$('.switch-button').on('click', function () {
  console.log('fired switchEventHandler()');
  let buttonId = event.target.id;
  console.log(buttonId);

  // if (buttonId === 'gallery-one') {
  //   $('div[class=data/page-2.json').hide();
  //   $('div[class=data/page-1.json').show();
  // }
  // if (buttonId === 'gallery-two') {
  //   $('div[class="data/page-1.json"]').hide();
  //   $('div[class="data/page-2.json"]').show();
  // }
})

// function switchEventHandler() {
//   console.log('heard click');
//   let buttonId = event.target.id;
//   Animal.allAnimals = []; // empties the allAnimals array
//   $('div').remove(); // deletes all divs from the page
//   $('option').remove(); // removes all option elements from the page
//   $('select').append('<option value="default">Filter by Keyword</option>'); // adds default option
//   if (buttonId === 'gallery-one') Animal.readJson(jsonDataOne)
//   if (buttonId === 'gallery-two') Animal.readJson(jsonDataTwo)
// }





const jsonDataOne = 'data/page-1.json'
const jsonDataTwo = 'data/page-2.json';
Animal.readJson(jsonDataOne);
Animal.readJson(jsonDataTwo);

// $(() => Animal.readJson(jsonDataTwo));

// Animal.keywords.filter((keyword, index, arr) => arr.indexOf(keyword) === index);


