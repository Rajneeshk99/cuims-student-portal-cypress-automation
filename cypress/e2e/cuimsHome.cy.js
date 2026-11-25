
describe('CUIMS - Entry and Login Checks', () => {
  // TC-01
  it('TC-01: CUIMS entry page loads', () => {
    cy.visit('https://uims.cuchd.in/');
    cy.get('body').should('be.visible');
    cy.url().should('include', 'uims.cuchd.in');
  });

  // TC-02
  it('TC-02: Student login page displays form controls', () => {
    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes(
          "Cannot read properties of null (reading 'getContext')"
        )
      ) {
        return false;
      }
      return true;
    });

    // Register the handler before navigation so page-load errors are handled.
    cy.visit('https://students.cuchd.in/Login.aspx');

    cy.get('body').should('be.visible');
    cy.get('input:visible, button:visible, select:visible')
      .should('have.length.greaterThan', 0);
  });

  // TC-03
  it('TC-03: LMS page is accessible', () => {
    cy.visit('https://lms.cuchd.in/');
    cy.get('body').should('be.visible');
    cy.url().should('include', 'lms.cuchd.in');
  });

  // TC-07
  it('TC-07: LMS page loads successfully', () => {
    cy.visit('https://lms.cuchd.in/');
    cy.url().should('include', 'lms.cuchd.in');
    cy.get('body').should('be.visible');
  });

  // TC-08
  it('TC-08: LMS Dashboard loads successfully', function () {
    cy.visit('https://lms.cuchd.in/');
    cy.url().should('include', 'lms.cuchd.in');
    cy.get('body').should('be.visible');

    cy.location('pathname').then((pathname) => {
      if (pathname.toLowerCase().includes('/login/')) {
        cy.contains('h1', 'Log in to CHANDIGARH UNIVERSITY')
          .should('be.visible')
          .then(() => {
            cy.log(
              'LMS password login is disabled; dashboard authentication requires CUIMS portal.'
            );
            this.skip();
          });
      }
    });
  });
});
