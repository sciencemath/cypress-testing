/// <reference types="cypress" />

const { forEach } = require('cypress/types/lodash');

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  properties.forEach((property) => {
    it(`should have a column for ${property}`, () => {
      cy.get(`#${property}-column`);
    });

    it('should hide the column if unchecked', () => {
      cy.get(`#show-${property}`).click();
      cy.get(`#${property}-column`).should('be.hidden');
    });
  });

  restaurants.forEach((restaurant) => {
    it(`should only display rows that match ${restaurant} when selected`, () => {
      cy.get('#restaurant-visibility-filter').select(restaurant);
      cy.get('td[headers="whereToOrder-column]')
        .should('contain', restaurant)
        .and('have.length.at.least', 1);
    });
  });

  describe('Rating Filter', () => {
    beforeEach(() => {
      cy.get('#minimum-rating-visibility').as('rating-filter');
    });

    forEach((rating) => {
      it(`should only display items with rating of ${rating} or higher`, () => {
        cy.get('@rating-filter').invoke('val', rating).trigger('change');
        cy.get('td.popularity').invoke('text').should('be.gte', rating);
      });
    });
  });
});
