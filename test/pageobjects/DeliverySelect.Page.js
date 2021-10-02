const Page = require('./page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class DeliverySelectPage extends Page {
  /**
     * Define selectors using getter methods
     */
  get deliveryLocation () { return $('#country'); }

  get locationSearchLoading () { return $('.lds-ellipsis'); }

  get purchaseBtn () { return $('[type="submit"]'); }

  /**
     * A method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
  selectLocation (location) {
    $('=' + location).click();
  }

  /**
     * Overwrite specifc options to adapt it to page object
     */
  open () {
    return super.open('login');
  }
}

module.exports = new DeliverySelectPage();
