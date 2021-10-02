const LoginPage = require('../pageobjects/login.page');
const ShopPage = require('../pageobjects/shop.page');
const CheckoutPage = require('../pageobjects/Checkout.Page');
const expectchai = require('chai').expect;
const deliverySelectPage = require('../pageobjects/DeliverySelect.Page');
const fs = require('fs');
const credentials = JSON.parse(fs.readFileSync('test/TestData/LoginTestData.json'));

describe('My Login application', function () {
  credentials.forEach(({ username, password, products }) => {
    it('should login with valid credentials', function () {
      LoginPage.open();
      LoginPage.login(username, password);
      browser.pause(3000);
      ShopPage.checkoutLink.waitForExist();
      ShopPage.addProductToCart(products);
      ShopPage.checkoutLink.click();

      browser.pause(3000);
      CheckoutPage.totalPrice.waitForExist();
      const sumOfIndividualProductPrice = CheckoutPage.addAllProductPrice();
      const totalPriceOnScreen = CheckoutPage.totalFormattedPrice();
      console.log(totalPriceOnScreen + '-------------' + sumOfIndividualProductPrice);
      expectchai(totalPriceOnScreen).to.equal(sumOfIndividualProductPrice);
      CheckoutPage.checkoutBtn.click();

      deliverySelectPage.deliveryLocation.setValue('ind');
      deliverySelectPage.locationSearchLoading.waitForExist({ reverse: true });
      deliverySelectPage.selectLocation('India');
      deliverySelectPage.purchaseBtn.click();

      expect($('.alert-success')).toHaveTextContaining('Success');
    });
  });

  credentials.forEach(({ username, password, products }) => {
    it('should login with valid smoke', function () {
      LoginPage.open();
      LoginPage.login(username, password);
      browser.pause(3000);
      ShopPage.checkoutLink.waitForExist();
      ShopPage.addProductToCart(products);
      ShopPage.checkoutLink.click();

      browser.pause(3000);
      CheckoutPage.totalPrice.waitForExist();
      const sumOfIndividualProductPrice = CheckoutPage.addAllProductPrice();
      const totalPriceOnScreen = CheckoutPage.totalFormattedPrice();
      console.log(totalPriceOnScreen + '-------------' + sumOfIndividualProductPrice);
      expectchai(totalPriceOnScreen).to.equal(sumOfIndividualProductPrice);
      CheckoutPage.checkoutBtn.click();

      deliverySelectPage.deliveryLocation.setValue('ind');
      deliverySelectPage.locationSearchLoading.waitForExist({ reverse: true });
      deliverySelectPage.selectLocation('India');
      deliverySelectPage.purchaseBtn.click();

      expect($('.alert-success')).toHaveTextContaining('Success');
    });
  });
});
