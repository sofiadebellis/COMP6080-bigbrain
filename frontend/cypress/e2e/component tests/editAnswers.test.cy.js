describe('Component testing - Edit quiz answers', () => {
  it('registered the user we will be signing in as for the following tests', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');

    // reigstering the user
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .clear()
      .type('test2@email.com');
    window.cy.get('#password')
      .focus()
      .clear()
      .type('Test123!');
    window.cy.get('#confirmPassword')
      .focus()
      .clear()
      .type('Test123!');
    window.cy.get('#signup')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
  });

  it('Sucessfully displayes the edit question pannel with two answer cards', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');

    // logging in the user
    window.cy.get('#email')
      .focus()
      .type('test2@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();

    // creating the new quiz game
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('#navCreateGameBtn').should('be.visible');
    window.cy.get('#navCreateGameBtn')
      .click();
    window.cy.get('#create-quiz-modal').should('be.visible');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#createGameBtn')
      .click();

    // navigating to the edit quiz page
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('edit')
      .click();

    // adding a new question
    window.cy.get('#addQuestionBtn')
      .click();

    // editing the question
    window.cy.get('#0')
      .click();

    // verifying the change in url -> navigation occured
    window.cy.wrap(window.Cypress, { log: false })
      .invoke('minimatch', window.location.href, 'http://localhost:3000/quiz/edit/*/*')
      .should('be.false')

    // testing if the age rendered correctly
    window.cy.get('#header').should('be.visible');
    window.cy.get('#questionString').should('be.visible');
    window.cy.get('#points').should('be.visible');
    window.cy.get('#time').should('be.visible');
    window.cy.get('#youtubeUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#mui-1').should('be.visible');
    window.cy.get('#mui-2').should('be.visible');
  });

  it('does not render the delete answer button when there are 2 answers', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');

    // loggin in the suer
    window.cy.get('#email')
      .focus()
      .type('test2@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');

    // editing the quiz
    window.cy.get('button').contains('edit')
      .click();

    // editing the question
    window.cy.get('#0')
      .click();
    window.cy.wrap(window.Cypress, { log: false })
      .invoke('minimatch', window.location.href, 'http://localhost:3000/quiz/edit/*/*')
      .should('be.false')

    // testing the page rendered ocrrectly
    window.cy.get('#header').should('be.visible');
    window.cy.get('#questionString').should('be.visible');
    window.cy.get('#points').should('be.visible');
    window.cy.get('#time').should('be.visible');
    window.cy.get('#youtubeUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#mui-1').should('be.visible');
    window.cy.get('#mui-2').should('be.visible');
    window.cy.get('button').contains('Delete').should('not.exist');
  })

  it('renders the delete answer button when there are more then 2 answers', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');

    // logging int he user
    window.cy.get('#email')
      .focus()
      .type('test2@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');

    // editing the quiz
    window.cy.get('button').contains('edit')
      .click();

    // editing the question
    window.cy.get('#0')
      .click();

    // testing that the navigation occured sucessfully
    window.cy.wrap(window.Cypress, { log: false })
      .invoke('minimatch', window.location.href, 'http://localhost:3000/quiz/edit/*/*')
      .should('be.false')

    // testing the componenet rendered as expected
    window.cy.get('#header').should('be.visible');
    window.cy.get('#questionString').should('be.visible');
    window.cy.get('#points').should('be.visible');
    window.cy.get('#time').should('be.visible');
    window.cy.get('#youtubeUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');

    // adding an answer
    window.cy.get('#addAnswerBtn')
      .click();
    window.cy.get('#0').should('be.visible');
    window.cy.get('#1').should('be.visible');
    window.cy.get('#2').should('be.visible');

    // testing that the delete answer buttons appeared since there is > 2 answers
    window.cy.get('button').contains('Delete').should('be.visible');
  })

  it('does not render the add answer button when there are 6 answers', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');

    // loggin in the user
    window.cy.get('#email')
      .focus()
      .type('test2@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');

    // editing the quiz
    window.cy.get('button').contains('edit')
      .click();

    // editing the question
    window.cy.get('#0')
      .click();

    // testing the navigation occured sucessfully
    window.cy.wrap(window.Cypress, { log: false })
      .invoke('minimatch', window.location.href, 'http://localhost:3000/quiz/edit/*/*')
      .should('be.false')

    // testing the page rendered as expected
    window.cy.get('#header').should('be.visible');
    window.cy.get('#questionString').should('be.visible');
    window.cy.get('#points').should('be.visible');
    window.cy.get('#time').should('be.visible');
    window.cy.get('#youtubeUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');

    // adding 4 more answers
    window.cy.get('#addAnswerBtn')
      .click();
    window.cy.get('#addAnswerBtn')
      .click();
    window.cy.get('#addAnswerBtn')
      .click();
    window.cy.get('#addAnswerBtn')
      .click();

    // testing that answers rendered as expected
    window.cy.get('#0').should('be.visible');
    window.cy.get('#1').should('be.visible');
    window.cy.get('#2').should('be.visible');
    window.cy.get('#3').should('be.visible');
    window.cy.get('#4').should('be.visible');
    window.cy.get('#5').should('be.visible');

    // testing that the add answer button did not render as there are 6 (the max number of) answers
    window.cy.get('#addAnswerBtn').should('not.exist');
  })

  it('renders the add answer button when there are less than 6 answers', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');

    // loggin in the user
    window.cy.get('#email')
      .focus()
      .type('test2@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');

    // editing the quiz
    window.cy.get('button').contains('edit')
      .click();

    // editing the question
    window.cy.get('#0')
      .click();

    // testing the navigation occured sucessfully
    window.cy.wrap(window.Cypress, { log: false })
      .invoke('minimatch', window.location.href, 'http://localhost:3000/quiz/edit/*/*')
      .should('be.false')

    // testing the page rendered as expected
    window.cy.get('#header').should('be.visible');
    window.cy.get('#questionString').should('be.visible');
    window.cy.get('#points').should('be.visible');
    window.cy.get('#time').should('be.visible');
    window.cy.get('#youtubeUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#mui-1').should('be.visible');
    window.cy.get('#mui-2').should('be.visible');
    window.cy.get('#addAnswerBtn').should('be.visible');

    // adding 3 more answers
    window.cy.get('#addAnswerBtn')
      .click();
    window.cy.get('#2').should('be.visible');
    window.cy.get('#addAnswerBtn').should('be.visible');
    window.cy.get('#addAnswerBtn')
      .click();
    window.cy.get('#3').should('be.visible');
    window.cy.get('#addAnswerBtn').should('be.visible');
    window.cy.get('#addAnswerBtn')
      .click();
    window.cy.get('#4').should('be.visible');

    // testing that the add answer button rendered as there is < 6 answers (the m ax number of answers)
    window.cy.get('#addAnswerBtn').should('be.visible');
  })
});
