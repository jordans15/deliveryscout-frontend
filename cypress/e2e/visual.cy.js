describe('Visual Regression Test', () => {
    it('should match the home page', () => {
      cy.visit('http://localhost:3000'); // Make sure the app is running on localhost
      cy.percySnapshot('Home Page'); // Percy snapshot for the home page
    });
  
    it('should match the login page', () => {
      cy.visit('http://localhost:3000/login'); // Adjust based on your route
      cy.percySnapshot('Login Page'); // Percy snapshot for the login page
    });
  
    it('should match the delivery options page', () => {
        cy.visit('http://localhost:3000/delivery-options'); // Adjust route
        cy.percySnapshot('Delivery Options Page');
      });
      
    it('should match the footer component', () => {
        cy.visit('http://localhost:3000'); // Can visit home page or any page containing footer
        cy.get('footer').percySnapshot('Footer');
      });
      
  });
  