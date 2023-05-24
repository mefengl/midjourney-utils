function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getTextarea() {
  return document.querySelector('[class^="channelTextArea"]');
}

function getAttachButton() {
  const textarea = getTextarea();
  if (!textarea) return;
  return textarea.querySelector('[class^="attachButton"]');
}

function attachButtonExpanded() {
  const attachButton = getAttachButton();
  if (!attachButton) return false;
  return attachButton.getAttribute('aria-expanded') === 'true';
}

function expandAttachButton() {
  if (attachButtonExpanded()) return;
  const attachButton = getAttachButton();
  if (!attachButton) return;
  attachButton.click();
}

function getChannelAttachMenu() {
  return document.querySelector('#channel-attach');
}

function getUploadAFileButton() {
  const channelAttachMenu = getChannelAttachMenu();
  if (!channelAttachMenu) return;
  return channelAttachMenu.querySelector('#channel-attach-upload-file');
}

function getCreateThreadButton() {
  const channelAttachMenu = getChannelAttachMenu();
  if (!channelAttachMenu) return;
  return channelAttachMenu.querySelector('#channel-attach-THREAD');
}

function getUseAppsButton() {
  const channelAttachMenu = getChannelAttachMenu();
  if (!channelAttachMenu) return;
  return channelAttachMenu.querySelector('#channel-attach-SLASH_COMMAND');
}

async function openUseAppsMenu() {
  if (!attachButtonExpanded()) expandAttachButton();
  await sleep(500);
  const useAppsButton = getUseAppsButton();
  if (!useAppsButton) return;
  useAppsButton.click();
  await sleep(500);
}

function getUseAppsMenu() {
  const textarea = getTextarea();
  if (!textarea) return;
  return textarea.querySelector('[class^="autocomplete"]');
}

function getUseAppsMenuItems() {
  const useAppsMenu = getUseAppsMenu();
  if (!useAppsMenu) return;
  const appsMenuRail = useAppsMenu.querySelector('[class^="rail"]');
  if (!appsMenuRail) return;
  return Array.from(appsMenuRail.querySelectorAll('[role="button"]'));
}

function getMidjourneyButtonInUseAppsMenu() {
  const useAppsMenuItems = getUseAppsMenuItems();
  if (!useAppsMenuItems) return;
  return useAppsMenuItems.find(item => item.getAttribute('aria-label') === 'Midjourney Bot');
}

async function midjourneyBotInstalled() {
  await openUseAppsMenu();
  return !!getMidjourneyButtonInUseAppsMenu();
}

function getButtonContainers() {
  return document.querySelectorAll("[id^='message-accessorie'] [class^='children']");
}

function getButtons(temp) {
  const buttons = temp.querySelectorAll('button');
  return Array.from(buttons);
}

function oneMoreButton(temp) {
  const buttons = getButtons(temp);
  const lastButton = buttons[buttons.length - 1];
  const cloneButton = lastButton.cloneNode();
  lastButton.parentNode.insertBefore(cloneButton, lastButton.nextSibling);
  return cloneButton;
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
