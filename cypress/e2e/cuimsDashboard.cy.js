describe('CUIMS Student Dashboard', () => {
  function loginToCuims() {
    cy.visit('/Login.aspx');

    cy.env(['username', 'password']).then(
      ({ username, password }) => {
        expect(username, 'CUIMS UID configured')
          .to.be.a('string')
          .and.not.be.empty;

        expect(password, 'CUIMS password configured')
          .to.be.a('string')
          .and.not.be.empty;

        // Enter student UID
        cy.get('input:visible')
          .first()
          .should('be.visible')
          .clear()
          .type(username);

        // Continue to the password step
        cy.contains('NEXT').click();

        // Enter password without exposing it in Cypress logs
        cy.get('input[type="password"]:visible')
          .should('be.visible')
          .clear()
          .type(password, { log: false });
      }
    );

    // Complete CAPTCHA and submit LOGIN manually.
    // Resume Cypress after successful login.
    cy.pause();

    // Confirm the authenticated dashboard has opened
    cy.url().should('include', 'StudentHome.aspx');

    cy.get('body').should('be.visible');
  }

  it('TC-04: Dashboard opens after login', () => {
    loginToCuims();

    cy.url().should('include', 'StudentHome.aspx');
  });

  it('TC-05: Important dashboard sections are visible', () => {
    loginToCuims();

    cy.contains('Important Links').should('be.visible');
    cy.contains('Mentor Details').should('be.visible');
  });

  it('TC-06: Course attendance information is visible', () => {
    loginToCuims();

    cy.contains('Attendance').should('be.visible');
  });
});