const expectchai = require('chai').expect;

describe('validating application', function () {
  xit('verify loginpage title', function () {
    browser.url('/loginpagePractise/#');
    // Browser.pause(3000);
    console.log('Title is : ' + browser.getTitle());

    // Browser.pause(3000);
    expect(browser).toHaveTitleContaining('Rahul Shetty Academy');
    // $(".//a[text()='Login']").click();

    browser.waitUntil(() => $('#username').isDisplayed, { timeout: 3000, timeoutMsg: 'Username field is not display', interval: 500 });
    $('#username').setValue('dsfdsf@efdsf');
    $('#password').setValue('Password');

    $('#signInBtn').click();
    console.log($('.alert-danger').getText() + ' is the error message');

    browser.waitUntil(() => $('#signInBtn').getAttribute('value') === 'Sign In',
      { timeout: 4000, timeoutMsg: 'error message did not appear' });
    console.log($('.alert-danger').getText() + ' is the error message');
    expect($('.alert-danger')).toHaveText('Incorrect username/password.');

    // Admin and User radio btn
    $('.customradio').waitForClickable();
    const rbuttons = $$('.customradio');
    rbuttons[1].$('.radiotextsty').click();
    const modal = $('.modal-body');
    modal.waitForDisplayed();
    $('#cancelBtn').click();
    console.log(rbuttons[1].$('.radiotextsty').isSelected());

    rbuttons[1].$('.radiotextsty').click();
    modal.waitForDisplayed();
    $('#okayBtn').click();

    rbuttons[0].$('.radiotextsty').click();
    expect(modal).not.toBeDisplayed();

    const dropdown = $('select.form-control');
    dropdown.selectByAttribute('value', 'teach');
    browser.pause(2000);
    dropdown.selectByIndex(0);
    browser.pause(2000);
    dropdown.selectByVisibleText('Consultant');
    expectchai(dropdown.getValue()).to.equal('consult');

    $('#username').waitForEnabled();
    $('#username').setValue('rahulshettyacademy');
    $('#password').setValue('learning');
    $('#signInBtn').click();

    // Browser.waitUntil(()=> $('*=Checkout').isDisplayed,
    // {timeout:4000, timeoutMsg:'Login not successful'});

    $('*=Checkout').waitForExist();
    expect(browser).toHaveTitle('ProtoCommerce');
    expect(browser).toHaveUrlContaining('shop');
  });

  it('dynamic dropdown controls', function () {
    browser.url('/AutomationPractice');

    // Autocomplete dropdown
    $('#autocomplete').setValue('ind');
    browser.pause();
    const items = $$('[class="ui-menu-item"] div');
    for (let i = 0; i < items.length; i++) {
      console.log(items[i].getText());
    }

    const desiredLocator = items.filter(item => item.getText() === 'India');
    desiredLocator[0].click();

    // Checkbox
    const checkbox = $$('input[type="checkbox"]');
    checkbox[1].click();
    console.log(checkbox[1].isSelected());
    console.log(checkbox[2].isSelected());

    // Dropdown selection
    const dropdown = $('#dropdown-class-example');
    dropdown.selectByVisibleText('Option2');
    expectchai(dropdown.getValue(), 'option2');

    // Radio button
    $("input[value='radio2']").click();

    // Enter text
    $('#name').setValue('Vijay Nag');

    // Click on Hide and verify text is hidden
    $('#hide-textbox').click();
    expect($('#displayed-text')).not.toBeDisplayed();
    // Click on SHow btn and verify text is displayed
    $('#show-textbox').click();
    expect($('#displayed-text')).toBeDisplayed();

    // Scrolling and mouse hover
    $('#mousehover').scrollIntoView();
    $('#mousehover').moveTo();
    $('=Top').click();

    // Window alert
    // Browser.isAlertOpen(); //true or false
    // Browser.getAlertText(); //gets the alert text
    // Browser.acceptAlert(); //clicks on OK button
    // Expectchai(browser.isAlertOpen()).to.be.true;
    // Expectchai(browser.getAlertText()).to.equal('test');

    browser.saveScreenshot('test11.png');
    browser.pause();
  });

  xit('web table validation', function () {
    browser.url('/seleniumPractise/#/offers');
    $('//tr/th[1]').click();

    // Retrive all table col values into array
    const tds = $$('//tr//td[1]');
    const oriveggiNames = tds.map(veggie => veggie.getText());
    console.log(oriveggiNames);
    const veggiNames = oriveggiNames.slice();
    const sortedVeggies = veggiNames.sort();
    console.log(sortedVeggies);

    console.log('main array ' + oriveggiNames);
    console.log('sorted array ' + sortedVeggies);
    expectchai(oriveggiNames).to.eql(sortedVeggies);

    // Search filter
    $("input[type='search']").setValue('tomato');
    expect(tds).toBeElementsArrayOfSize({ eq: 1 });
    expect(tds[0]).toHaveTextContaining('Tomato');
  });

  xit('Multiple windows', function () {
    browser.url('/AutomationPractice');
    $("[onclick*='openWindow']").click();
    const handles = browser.getWindowHandles();
    browser.switchToWindow(handles[1]);
    browser.maximizeWindow();
    console.log('second browser ' + browser.getTitle());
    browser.closeWindow();
    browser.switchToWindow(handles[0]);
    console.log('Parent browser ' + browser.getTitle());

    // Open a new window from webdriverIO
    browser.newWindow('');
    const title = browser.getTitle();
    browser.switchWindow('/AutomationPractice');
    $('#name').setValue(title);
    browser.pause(4000);
    browser.switchWindow(title);
    console.log(browser.getUrl());
  });

  it('Working with frames - smoke', function () {
    browser.url('/AutomationPractice');
    $('#mousehover').scrollIntoView();
    console.log('number of links are ' + $$('a').length);
    browser.switchToFrame($("[id='courses-iframe']"));
    console.log($('=Courses').getTagName());
    console.log('number of links are ' + $$('a').length);
    browser.switchToFrame(null);
    console.log('number of links are ' + $$('a').length);
  });
});
