const Page = require('./page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class ShopPage extends Page {
  /**
     * Define selectors using getter methods
     */
  get checkoutLink () { return $('*=Checkout'); }

  get cards () { return $$('div[class="card h-100"]'); }

  addProductToCart (products) {
    console.log('inside addproducttocart function ' + products);
    this.cards.filter(card => products.includes(card.$('div h4 a').getText()))
      .map(productCard => productCard.$('.card-footer button').click());
  }
}

module.exports = new ShopPage();
