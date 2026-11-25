// Handle known JavaScript errors from the CU LMS website.
Cypress.on('uncaught:exception', (err) => {
  const message = err.message || '';

  if (
    message.includes('require is not defined') ||
    message.includes("Bootstrap's JavaScript requires jQuery") ||
    message.includes("Cannot read properties of null (reading 'getContext')")
  ) {
    return false;
  }

  // Allow other errors to fail the test normally.
  return true;
});