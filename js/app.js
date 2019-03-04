'use strict';

Animal.allAnimals = []; // Array to hold animal objects
Animal.allKeywords = []; // Array to hold animal keywords

// Constructor for each animal tile
function Animal(animal) {
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.title = animal.title;
  this.description = animal.description;
  this.image_url = animal.image_url;
  Animal.allAnimals.push(this); // each instance gets pushed to the allAnimals array
  Animal.allKeywords.push(this.keyword);

  // filters the allKeywords array so it only holds unique values (no duplicate keywords)
  Animal.allKeywords = Animal.allKeywords.filter((keyword, index, arr) => arr.indexOf(keyword) === index);
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
  animalClone.attr('class', this.keyword);
}

// Renders change in select box
Animal.renderSelectOptions = function (keyword) {
  // console.log('ranrenderSelectOptions');
  $('select').append('<option class="clone"></option>');
  let optClone = $('option[class="clone"]');

  optClone.attr('value', keyword);
  optClone.text(keyword);
  optClone.removeClass('clone');
}

// Function to take JSON data and run each obj through the constructor
Animal.readJson = (jsonPage) => {
  $.get(jsonPage)
    .then(data => data.forEach(obj => new Animal(obj)))
    .then(Animal.loadAnimals)
};

Animal.loadAnimals = () => {
  console.log('fired loadAnimals()');
  Animal.allAnimals.forEach(animal => animal.render())
  Animal.allKeywords.forEach(keyword => Animal.renderSelectOptions(keyword))
}




// function switchEventHandler() {
//   console.log('fired switchEventHandler()');
// }

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



const jsonDataOne = 'data/page-1.json'
// const jsonDataTwo = 'data/page-2.json';
$(() => Animal.readJson(jsonDataOne));
// $(() => Animal.readJson(jsonDataTwo));

// Animal.allKeywords.filter((keyword, index, arr) => arr.indexOf(keyword) === index);

$('select[name="animals"]').on('change', function () {
  let $selection = $(this).val();
  console.log(`$selection: ${$selection}`);
  if ($selection === 'default') {
    console.log('$selection is default');
    // console.log($('div'));
    $('div').show()
  } else {
    $('div').hide()
    $(`div[class="${$selection}"]`).show()
  }
})
