function getButtons(temp) {
  const buttons = temp.querySelectorAll('button');
  return Array.from(buttons);
}

function getSubmitButton() {
  return document.querySelector('button[type="submit"]');
}

function isSubmitting() {
  const submitButton = getSubmitButton();
  if (!submitButton) return false;
  return submitButton.getAttribute('aria-busy') === 'true';
}

async function checkSubmitStatus() {
  while (true) {
    await sleep(100);
    console.log(isSubmitting()? 'Submitting...' : 'Ready');
  }
}

async function waitForSubmitFinish() {
  while (isSubmitting()) {
    await sleep(500);
    console.log('Submitting...');
  }
}

async function waitForSubmitButton() {
  while (!getSubmitButton()) {
    await sleep(1000);
    console.log('Waiting for submit button...');
  }
}

async function submitForm() {
  const submitButton = getSubmitButton();
  if (!submitButton) {
    console.log('No submit button found');
    return;
  }
  submitButton.click();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getFormNumber() {
  const forms = document.querySelectorAll('form');
  return forms.length;
}

async function clickAllButtonsWithConfirm(temp) {
  const buttons = getButtons(temp);
  buttons.pop();
  for (const button of buttons) {
    button.click();
    while (getFormNumber() === 1) {
      await sleep(500);
      console.log('Opening...');
    }
    submitForm();
    while (getFormNumber() === 2) {
      await sleep(500);
      console.log('Submitting...');
    }
  }
}

function isClicking(button) {
  return button.querySelector('div > div').getAttribute('aria-hidden') === 'true';
}

async function clickAllButtons(temp) {
  const buttons = getButtons(temp);
  buttons.pop();
  for (const button of buttons) {
    button.click();
    while (!isClicking(button)) {
      await sleep(10);
      console.log('Waiting for clicking...');
    }
    while (isClicking(button)) {
      await sleep(500);
      console.log('Clicking...');
    }
  }
}
