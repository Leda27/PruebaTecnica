const productData = {
  categories: {
    "canastafamiliar": [
      { 
        name: "Harina Blanca", 
        image: "img/HARINABLANCA.jpg", 
        price: "$15.000", 
        description: "Harina blanca ideal para cocinar" 
      },
      { 
        name: "Avena Molida", 
        image: "img/AVENA MOLIDA.jpg", 
        price: "$20.000", 
        description: "Avena molida rica en fibra y nutrientes." 
      }
    ],
    "cuidadopersonal": [
      { 
        name: "Toallas", 
        image: "img/toallas-plus-tela-do-x10.jpg", 
        price: "$8.000", 
        description: "Toallas suaves y absorbentes para uso diario." 
      },
      { 
        name: "Crema Dental", 
        image: "img/CREMA DENTAL.jpg", 
        price: "$3.700", 
        description: "Crema dental con flúor" 
      }
    ],
    "dulces": [
      { 
        name: "Supercoco", 
        image: "img/SUPERCOCO.jpg", 
        price: "$100", 
        description: "Dulce de coco tradicional con un toque delicioso." 
      },
      { 
        name: "Trululu", 
        image: "img/TRULULU.jpg", 
        price: "$2.500", 
        description: "Gomitas dulces en forma de ositos." 
      }
    ],
    "mascotas": [
      { 
        name: "Don Kat", 
        image: "img/ALIMENTO PARA GATOS.jpg", 
        price: "$3.000", 
        description: "Alimento balanceado para gatos adultos." 
      },
      { 
        name: "Ringo", 
        image: "img/ALIMENTO PARA PERROS RINGO.jpg", 
        price: "$2.5000", 
        description: "Croquetas nutritivas para perros" 
      }
    ],
    "aseo": [
      { 
        name: "Servilleta", 
        image: "img/SERVILLETA.jpg", 
        price: "$3.000", 
        description: "Servilletas prácticas para cualquier ocasión." 
      },
      { 
        name: "Papel", 
        image: "img/papel.jpg", 
        price: "$4.000", 
        description: "Papel higiénico suave y resistente." 
      }
    ]
  }
};

class ProductManager {
  constructor(productData) {
    this.products = [];
    this.categories = Object.keys(productData.categories);

    this.categories.forEach(category => {
      productData.categories[category].forEach(product => {
        this.products.push({
          id: this.products.length,
          name: product.name,
          image: product.image,
          description: product.description, 
          price: product.price, 
          category: category
        });
      });
    });

    this.selectedProducts = [];
    this.productList = document.getElementById('product-list');
    this.selectedProductsList = document.getElementById('selected-products');
    this.noProductsMessage = document.getElementById('no-products');
    this.categoryButtons = document.querySelectorAll('.category');

    this.initializeEventListeners();
    this.loadProducts();
  }

  initializeEventListeners() {
    this.categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.loadProducts(button.getAttribute('data-category'));
      });
    });
  }

  loadProducts(category = 'todos') {
    this.productList.innerHTML = '';

    const filteredProducts = category === 'todos'
      ? this.products
      : this.products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-card bg-white rounded-lg shadow-md p-4';
      productDiv.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-md mb-4">
        <p class="text-gray-600 mb-2">${product.description}</p>
        <p class="font-bold text-blue-600 mb-4">${product.price}</p>
        <button class="select-product w-full bg-green-500 text-white py-2 rounded-md">
          Seleccionar Producto
        </button>
      `;

      productDiv.querySelector('.select-product').addEventListener('click', () => this.selectProduct(product.id));
      this.productList.appendChild(productDiv);
    });
  }

  selectProduct(productId) {
    const selectedProduct = this.products.find(product => product.id === productId);

    Swal.fire({
      title: 'Producto Seleccionado',
      text: `¿Estás seguro de seleccionar ${selectedProduct.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, seleccionar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed && !this.selectedProducts.includes(selectedProduct)) {
        this.selectedProducts.push(selectedProduct);
        this.updateSelectedProductsList();
        Swal.fire('Producto añadido', `${selectedProduct.name} ha sido seleccionado`, 'success');
      }
    });
  }

  updateSelectedProductsList() {
    this.noProductsMessage.style.display = this.selectedProducts.length ? 'none' : 'block';
    this.selectedProductsList.innerHTML = this.selectedProducts.map(product => `
      <div class="bg-gray-100 rounded-lg p-3">
        <h3 class="font-semibold">${product.name}</h3>
        <button class="mt-2 w-full bg-red-500 text-white py-1 rounded-md">
          Eliminar
        </button>
      </div>
    `).join('');
  }
}

const productManager = new ProductManager(productData);
