describe('Visual Regression Test', () => {
  it('should match the home page', () => {
    cy.visit('http://localhost:3000');
    cy.wait(1000); // Optional wait for full render
    cy.percySnapshot('Home Page');
  });

  it('should match the login page', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    cy.percySnapshot('Login Page');
  });

  it('should match the delivery options page', () => {
    cy.visit('http://localhost:3000/delivery-options');
    cy.wait(1000);
    cy.percySnapshot('Delivery Options Page');
  });

  it('should match the footer component', () => {
    cy.visit('http://localhost:3000');
    cy.wait(1000);
    cy.percySnapshot('Footer');
  });
});
