const Page = require('./page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage extends Page {
  /**
     * Define selectors using getter methods
     */
  get productPrices () { return $$('//tr/td[4]/strong'); }

  get totalPrice () { return $('h3 strong'); }

  get checkoutBtn () { return $('.btn-success'); }

  /**
     * A method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
  addAllProductPrice () {
    const sumOfProducts = this.productPrices.map(productPrice => parseInt(productPrice.getText().split('.')[1].trim()))// It returns an array of 2 elements
      .reduce((acc, price) => acc + price, 0);
    return sumOfProducts;
  }

  totalFormattedPrice () {
    // Return parseInt(this.totalPrice.getText().split('.')[1].trim());
    return parseInt(this.totalPrice.getText().split('.')[1].trim());
  }

  /**
     * Overwrite specifc options to adapt it to page object
     */
  open () {
    return super.open('login');
  }
}

module.exports = new CheckoutPage();
