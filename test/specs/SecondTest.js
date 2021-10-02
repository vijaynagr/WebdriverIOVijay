const expectchai = require('chai').expect;

describe('end to end scenarios', function () {
  it('ene to end test 1', function () {
    this.retries(2);
    const products = ['Blackberry', 'Nokia Edge'];
    browser.url('https://rahulshettyacademy.com/loginpagePractise/#');
    $('#username').waitForEnabled();
    $('#username1').setValue('rahulshettyacademy');
    $('#password').setValue('learning');
    $('#signInBtn').click();
    const link = $('*=Checkout');
    link.waitForExist();
    const cards = $$("div[class='card h-100']");
    cards.filter(card => products.includes(card.$('div h4 a').getText()))
      .map(productCard => productCard.$('.card-footer button').click());
    link.click();
    const productPrices = $$('//tr/td[4]/strong');
    const totalCost = productPrices.map(price => parseInt(price.getText().split('.')[1].trim()))
      .reduce((total, price) => total + price, 0);
    console.log('total cose is ' + totalCost);
    const totalCostOnScreen = parseInt($('h3 strong').getText().split('.')[1].trim());
    expectchai(totalCostOnScreen).to.equal(totalCost);
    $('.btn-success').click();
    $('#country').setValue('ind');
    $('.lds-ellipsis').waitForExist({ reverse: true });
    $('=India').click();
    $('[type="submit"]').click();
    expect($('.alert-success')).toHaveTextContaining('Success');
  });
});
