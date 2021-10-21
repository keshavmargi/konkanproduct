
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
      let text = "<ul>";
      for ( let a = 0; a < this.items.length;a++){
        text += "<li>" + `${this.items[a].title} : ${this.items[a].price}` + "</li>";
        /* console.log(`${this.items[a].title} : ${this.items[a].price}`); */
       /*  var prodarray = [];
        prodarray.push(`${this.items[a].title} : ${this.items[a].price}`);
        console.log(prodarray); */
        
        
      /* for ( var b = 0; b < prodarray.length; b++ ){ */
        /* var imp = [];
        imp.push(`${prodarray[b]}`); */
        /* console.log(`${prodarray[b]}`); */
        
        /* var text = "";
        text += prodarray[b] + "<br>";
        document.getElementById('temp').innerHTML = text; */
      /* } */
      
        /* const wowid = document.getElementById('temp');
        wowid.innerHTML = `${this.items[a].title} : ${this.items[a].price}` */
      }
      text += "</ul>";
      document.getElementById('temp').innerHTML = text;
      console.log(text);
      /* const tempid = document.getElementById('temp');
      tempid.innerHTML = this.items[0].title ; this.items[0].price; */
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
        'mango1.jpg',
        'Per Dozon',
        10.00
      ),
      new Product(
        'Konkan Cashew',
        'Cashew2.jpg',
        'Rate Per Kg',
        15.00
      ),
      new Product(
        'Kokam',
        'Kokum3.jpg',
        'Rate Per Kg',
        4.00
      ),
      new Product(
        'Coconuts',
        'Coconuts.png',
        'Rate Per Pics',
        1.5
      ),
      new Product(
        'Amla Juice',
        'Amla.jpg',
        'Rate Per Liter',
        4.8
      ),
      new Product(
        'Mango Pulp',
        'mango2.png',
        'Rate Per Liter',
        19.99
      ),
      new Product(
        'Jambhul Ras',
        'Jambhul.jpg',
        'Rate Per Liter',
        2.4
      ),
      new Product(
        'Phanas Poli',
        'Phanaspoli.jpg',
        'Rate Per Packet',
        2.2
      ),
      new Product(
        'Amba Vadi',
        'Ambavadi.jpg',
        'Rate Per Packet',
        2.6
      ),
      new Product(
        'Shengadana Laddoo',
        'Shengdana Laddoo.jpg',
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
    /* this.cart = new ShoppingCart('app2'); */
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
