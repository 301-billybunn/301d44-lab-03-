'use strict';

function Animal(animal) {
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.title = animal.title;
  this.discription = animal.description;
  this.image_url = animal.image_url;
}

Animal.allAnimals = [];
