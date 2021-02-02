describe('Listing restaurants', () => {
  it('should show restaurants from the server', () => {
    const sushiPlace = 'Sushi Place';
    const pastaPlace = 'Pasta Place';

    cy.intercept(
      'GET',
      'https://outside-in-dev-api.herokuapp.com/G3Iu6PCDp0KPGsRr4HjnFuvrW5oQwNjP/restaurants',
      {
        statusCode: 200,
        body: [
          {
            id: 1,
            name: pastaPlace,
          },
          {
            id: 2,
            name: sushiPlace,
          },
        ],
      },
    );

    cy.visit('/');
    cy.contains(sushiPlace);
    cy.contains(pastaPlace);
  });
});

describe('Creating restaurants', () => {
  it('allows adding a restaurant', () => {
    const restaurantId = 3;
    const restaurantName = 'Ramen Place';

    cy.intercept(
      'GET',
      'https://outside-in-dev-api.herokuapp.com/G3Iu6PCDp0KPGsRr4HjnFuvrW5oQwNjP/restaurants',
      {
        statusCode: 200,
        body: [],
      },
    );

    cy.intercept(
      'POST',
      'https://outside-in-dev-api.herokuapp.com/G3Iu6PCDp0KPGsRr4HjnFuvrW5oQwNjP/restaurants',
      {
        statusCode: 200,
        body: {
          id: restaurantId,
          name: restaurantName,
        },
      },
    ).as('addRestaurant');

    cy.visit('/');

    cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
    cy.contains('Add').click();

    cy.wait('@addRestaurant').its('request.body').should('deep.equal', {
      name: restaurantName,
    });

    cy.contains(restaurantName);
  });
});
