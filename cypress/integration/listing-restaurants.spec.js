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
            id: 259,
            name: pastaPlace,
          },
          {
            id: 260,
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
