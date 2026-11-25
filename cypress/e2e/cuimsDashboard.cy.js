describe('CUIMS Student Dashboard', () => {
  function loginToCuims() {
    cy.visit('/Login.aspx');

    cy.env(['CUIMS_UID', 'CUIMS_PASSWORD']).then(
      ({ CUIMS_UID, CUIMS_PASSWORD }) => {
        expect(CUIMS_UID, 'CUIMS UID configured')
          .to.be.a('string')
          .and.not.be.empty;

        expect(CUIMS_PASSWORD, 'CUIMS password configured')
          .to.be.a('string')
          .and.not.be.empty;

        // Enter student UID
        cy.get('input:visible')
          .first()
          .should('be.visible')
          .clear()
          .type(CUIMS_UID);

        // Continue to the password step
        cy.contains('NEXT').click();

        // Enter password without exposing it in Cypress logs
        cy.get('input[type="password"]:visible')
          .should('be.visible')
          .clear()
          .type(CUIMS_PASSWORD, { log: false });
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