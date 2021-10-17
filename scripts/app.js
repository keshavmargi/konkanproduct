
class Product {


  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log('Ordering...');
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    console.log(this);
    cartEl.innerHTML = `
      <p>Add To Cart</p>
      <h2>Total: \$${0}</h2>
      <button data-bs-toggle="modal" data-bs-target="#order">Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    // orderButton.addEventListener('click', () => this.orderProducts());
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h4>${this.product.title}</h4>
            <h5>\$${this.product.price}</h5>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        'Mango Hapus',
        'file:///D:/Web%20Works/Ecommerce%20Website/mango1.jpg',
        'Per Dozon',
        10.00
      ),
      new Product(
        'Konkan Cashew',
        'file:///D:/Web%20Works/Ecommerce%20Website/Cashew2.jpg',
        'Rate Per Kg',
        15.00
      ),
      new Product(
        'Kokam',
        'file:///D:/Web%20Works/Ecommerce%20Website/Kokum3.jpg',
        'Rate Per Kg',
        4.00
      ),
      new Product(
        'Coconuts',
        'file:///D:/Web%20Works/Ecommerce%20Website/Coconuts.png',
        'Rate Per Pics',
        1.5
      ),
      new Product(
        'Amla Juice',
        'file:///D:/Web%20Works/Ecommerce%20Website/Amla.jpg',
        'Rate Per Liter',
        4.8
      ),
      new Product(
        'Mango Pulp',
        'file:///D:/Web%20Works/Ecommerce%20Website/mango2.png',
        'Rate Per Liter',
        19.99
      ),
      new Product(
        'Jambhul Ras',
        'file:///D:/Web%20Works/Ecommerce%20Website/Jambhul.jpg',
        'Rate Per Liter',
        2.4
      ),
      new Product(
        'Phanas Poli',
        'file:///D:/Web%20Works/Ecommerce%20Website/Phanaspoli.jpg',
        'Rate Per Packet',
        2.2
      ),
      new Product(
        'Amba Vadi',
        'file:///D:/Web%20Works/Ecommerce%20Website/Ambavadi.jpg',
        'Rate Per Packet',
        2.6
      ),
      new Product(
        'Shengadana Laddoo',
        'file:///D:/Web%20Works/Ecommerce%20Website/Shengdana%20Laddoo.jpg',
        'Rate Per Packet',
        1.1
      )
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list')
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('app1');
    new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
