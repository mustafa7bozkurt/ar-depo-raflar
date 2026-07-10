document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCD7hQmZLOvymN2d5VkEDg1lo1LUkoZae8",
      authDomain: "ari-depo-raflar.firebaseapp.com",
      projectId: "ari-depo-raflar",
      storageBucket: "ari-depo-raflar.firebasestorage.app",
      messagingSenderId: "363413639255",
      appId: "1:363413639255:web:4ae722cdf3d76d275dd312",
      measurementId: "G-M6H110QW3K"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // DOM Elements
    const navItems = document.querySelectorAll('.bottom-nav li');
    const pages = document.querySelectorAll('.page');
    
    const warehouseTabButtons = document.querySelectorAll('.warehouse-header .tab-btn');
    const warehouseTabContents = document.querySelectorAll('#page-warehouse .tab-content');

    const searchInput = document.getElementById('product-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchProductType = document.getElementById('search-product-type');
    const searchResults = document.getElementById('search-results');
    const resultsList = document.getElementById('results-list');

    const addProductForm = document.getElementById('add-product-form');
    const formProductType = document.getElementById('form-product-type');
    const formProductSize = document.getElementById('form-product-size');
    const formProductLength = document.getElementById('form-product-length');
    const formProductWeightPerMeter = document.getElementById('form-product-weight-per-meter');
    const formProductLocation = document.getElementById('form-product-location');
    const formProductQty = document.getElementById('form-product-qty');
    const weightHelperText = document.getElementById('weight-helper');
    
    const warehouseList = document.getElementById('warehouse-list');
    
    // Warehouse Views
    const viewDepoMain = document.getElementById('view-depo-main');
    const viewDepoProfilTypes = document.getElementById('view-depo-profil-types');
    const viewDepoRafTypes = document.getElementById('view-depo-raf-types');
    const viewDepoProducts = document.getElementById('view-depo-products');
    const depoViews = [viewDepoMain, viewDepoProfilTypes, viewDepoRafTypes, viewDepoProducts];
    
    const categoryCards = document.querySelectorAll('.category-card');
    const profilTypesGrid = document.getElementById('profil-types-grid');
    const rafTypesGrid = document.getElementById('raf-types-grid');
    const depoProductsTitle = document.getElementById('depo-products-title');
    const depoEmptyState = document.getElementById('depo-empty-state');
    const btnBackToTypes = document.getElementById('btn-back-to-types');
    const backToMainBtns = document.querySelectorAll('[data-back="main"]');

    // Modal DOM Elements
    const modalOverlay = document.getElementById('productModalOverlay');
    const closeModalBtn = document.getElementById('closeProductModal');
    const modalPName = document.getElementById('modal-p-name');
    const modalPSize = document.getElementById('modal-p-size');
    const modalPLength = document.getElementById('modal-p-length');
    const modalPWeightPerMeter = document.getElementById('modal-p-weight-per-meter');
    const modalPLocation = document.getElementById('modal-p-location');
    const modalPWeight = document.getElementById('modal-p-weight');
    const modalQtyInput = document.getElementById('modal-qty-input');
    const modalQtyMinus = document.getElementById('modal-qty-minus');
    const modalQtyPlus = document.getElementById('modal-qty-plus');
    const modalSaveBtn = document.getElementById('modal-action-save');
    const modalDeleteBtn = document.getElementById('modal-action-delete');
    const modalPLastUpdated = document.getElementById('modal-p-last-updated');

    // Default Local State
    let defaultState = {
        products: [
  {
    "id": 1,
    "name": "20x60x2 Kutu",
    "size": "20x60x2",
    "profileType": "Kutu",
    "location": "Ön 1",
    "qty": 25,
    "length": 6,
    "weightPerMeter": 0.824
  },
  {
    "id": 2,
    "name": "120x2 Boru",
    "size": "120x2",
    "profileType": "Boru",
    "location": "Ön 1",
    "qty": 2,
    "length": 6,
    "weightPerMeter": 2.009
  },
  {
    "id": 3,
    "name": "15x15x1.5 Kutu",
    "size": "15x15x1.5",
    "profileType": "Kutu",
    "location": "Ön 1",
    "qty": 112,
    "length": 6,
    "weightPerMeter": 0.22
  },
  {
    "id": 4,
    "name": "50x3 Boru",
    "size": "50x3",
    "profileType": "Boru",
    "location": "Ön 1",
    "qty": 7,
    "length": 6,
    "weightPerMeter": 1.2
  },
  {
    "id": 5,
    "name": "50x100x2 Diğer",
    "size": "50x100x2",
    "profileType": "Diğer",
    "location": "Ön 1",
    "qty": 3,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 6,
    "name": "20x40x3 Kutu",
    "size": "20x40x3",
    "profileType": "Kutu",
    "location": "Ön 1",
    "qty": 10,
    "length": 6,
    "weightPerMeter": 0.878
  },
  {
    "id": 7,
    "name": "100x100x2 Kutu",
    "size": "100x100x2",
    "profileType": "Kutu",
    "location": "Ön 1",
    "qty": 8,
    "length": 6,
    "weightPerMeter": 2.125
  },
  {
    "id": 8,
    "name": "80x3 Boru",
    "size": "80x3",
    "profileType": "Boru",
    "location": "Ön 1",
    "qty": 15,
    "length": 6,
    "weightPerMeter": 1.967
  },
  {
    "id": 9,
    "name": "50x100x3 Köşebent",
    "size": "50x100x3",
    "profileType": "Köşebent",
    "location": "Ön 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.195
  },
  {
    "id": 10,
    "name": "120x10 Lama",
    "size": "120x10",
    "profileType": "Lama",
    "location": "Ön 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.252
  },
  {
    "id": 11,
    "name": "100x5 Boru",
    "size": "100x5",
    "profileType": "Boru",
    "location": "Ön 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.044
  },
  {
    "id": 12,
    "name": "70x2 Boru",
    "size": "70x2",
    "profileType": "Boru",
    "location": "Ön 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.158
  },
  {
    "id": 13,
    "name": "50x100x2 Kutu",
    "size": "50x100x2",
    "profileType": "Kutu",
    "location": "Ön 1",
    "qty": 4,
    "length": 6,
    "weightPerMeter": 1.583
  },
  {
    "id": 14,
    "name": "50x100x2 Kutu",
    "size": "50x100x2",
    "profileType": "Kutu",
    "location": "Ön 2",
    "qty": 14,
    "length": 6,
    "weightPerMeter": 1.583
  },
  {
    "id": 15,
    "name": "45x2.5 Boru",
    "size": "45x2.5",
    "profileType": "Boru",
    "location": "Ön 2",
    "qty": 26,
    "length": 6,
    "weightPerMeter": 0.905
  },
  {
    "id": 16,
    "name": "18x1 Boru",
    "size": "18x1",
    "profileType": "Boru",
    "location": "Ön 2",
    "qty": 91,
    "length": 6,
    "weightPerMeter": 0.145
  },
  {
    "id": 17,
    "name": "40x1.5 Boru",
    "size": "40x1.5",
    "profileType": "Boru",
    "location": "Ön 2",
    "qty": 57,
    "length": 6,
    "weightPerMeter": 0.492
  },
  {
    "id": 18,
    "name": "120x120x3 Kutu",
    "size": "120x120x3",
    "profileType": "Kutu",
    "location": "Ön 2",
    "qty": 6,
    "length": 6,
    "weightPerMeter": 3.805
  },
  {
    "id": 19,
    "name": "30x30x3 Kutu",
    "size": "30x30x3",
    "profileType": "Kutu",
    "location": "Ön 2",
    "qty": 40,
    "length": 6,
    "weightPerMeter": 0.878
  },
  {
    "id": 20,
    "name": "75x2 Boru",
    "size": "75x2",
    "profileType": "Boru",
    "location": "Ön 2",
    "qty": 3,
    "length": 6,
    "weightPerMeter": 1.243
  },
  {
    "id": 21,
    "name": "20x80x2 Kutu",
    "size": "20x80x2",
    "profileType": "Kutu",
    "location": "Ön 2",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.041
  },
  {
    "id": 22,
    "name": "18x1 Boru",
    "size": "18x1",
    "profileType": "Boru",
    "location": "Ön 3",
    "qty": 396,
    "length": 6,
    "weightPerMeter": 0.145
  },
  {
    "id": 23,
    "name": "40x5 Boru",
    "size": "40x5",
    "profileType": "Boru",
    "location": "Ön 3",
    "qty": 6,
    "length": 6,
    "weightPerMeter": 1.49
  },
  {
    "id": 24,
    "name": "25x50x2 Kutu",
    "size": "25x50x2",
    "profileType": "Kutu",
    "location": "Ön 3",
    "qty": 28,
    "length": 6,
    "weightPerMeter": 0.77
  },
  {
    "id": 25,
    "name": "40x3 Boru",
    "size": "40x3",
    "profileType": "Boru",
    "location": "Ön 3",
    "qty": 25,
    "length": 6,
    "weightPerMeter": 0.945
  },
  {
    "id": 26,
    "name": "25x2 Boru",
    "size": "25x2",
    "profileType": "Boru",
    "location": "Ön 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.392
  },
  {
    "id": 27,
    "name": "30x30x2 Kutu",
    "size": "30x30x2",
    "profileType": "Kutu",
    "location": "Ön 3",
    "qty": 50,
    "length": 6,
    "weightPerMeter": 0.607
  },
  {
    "id": 28,
    "name": "45x2.5 Boru",
    "size": "45x2.5",
    "profileType": "Boru",
    "location": "Ön 3",
    "qty": 40,
    "length": 6,
    "weightPerMeter": 0.905
  },
  {
    "id": 29,
    "name": "70x2 Boru",
    "size": "70x2",
    "profileType": "Boru",
    "location": "Ön 4",
    "qty": 33,
    "length": 6,
    "weightPerMeter": 1.158
  },
  {
    "id": 30,
    "name": "13x1 Boru",
    "size": "13x1",
    "profileType": "Boru",
    "location": "Ön 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.102
  },
  {
    "id": 31,
    "name": "30x50x2 Kutu",
    "size": "30x50x2",
    "profileType": "Kutu",
    "location": "Ön 4",
    "qty": 40,
    "length": 6,
    "weightPerMeter": 0.824
  },
  {
    "id": 32,
    "name": "20x30x2 Kutu",
    "size": "20x30x2",
    "profileType": "Kutu",
    "location": "Ön 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.499
  },
  {
    "id": 33,
    "name": "20x40x2 Kutu",
    "size": "20x40x2",
    "profileType": "Kutu",
    "location": "Ön 4",
    "qty": 45,
    "length": 6,
    "weightPerMeter": 0.607
  },
  {
    "id": 34,
    "name": "30x2 Boru",
    "size": "30x2",
    "profileType": "Boru",
    "location": "Ön 4",
    "qty": 5,
    "length": 6,
    "weightPerMeter": 0.477
  },
  {
    "id": 35,
    "name": "35x3 Boru",
    "size": "35x3",
    "profileType": "Boru",
    "location": "Ön 5",
    "qty": 54,
    "length": 6,
    "weightPerMeter": 0.817
  },
  {
    "id": 36,
    "name": "30x2.5 Boru",
    "size": "30x2.5",
    "profileType": "Boru",
    "location": "Ön 5",
    "qty": 46,
    "length": 6,
    "weightPerMeter": 0.585
  },
  {
    "id": 37,
    "name": "10x1.5 Boru",
    "size": "10x1.5",
    "profileType": "Boru",
    "location": "Ön 5",
    "qty": 620,
    "length": 6,
    "weightPerMeter": 0.109
  },
  {
    "id": 38,
    "name": "20x40x2 Kutu",
    "size": "20x40x2",
    "profileType": "Kutu",
    "location": "Ön 5",
    "qty": 113,
    "length": 6,
    "weightPerMeter": 0.607
  },
  {
    "id": 39,
    "name": "40x40x2 Kutu",
    "size": "40x40x2",
    "profileType": "Kutu",
    "location": "Ön 5",
    "qty": 20,
    "length": 6,
    "weightPerMeter": 0.824
  },
  {
    "id": 40,
    "name": "40x2 Boru",
    "size": "40x2",
    "profileType": "Boru",
    "location": "Ön 5",
    "qty": 18,
    "length": 6,
    "weightPerMeter": 0.647
  },
  {
    "id": 41,
    "name": "100x2 Boru",
    "size": "100x2",
    "profileType": "Boru",
    "location": "Ön 6",
    "qty": 20,
    "length": 6,
    "weightPerMeter": 1.669
  },
  {
    "id": 42,
    "name": "30x60x2 Kutu",
    "size": "30x60x2",
    "profileType": "Kutu",
    "location": "Ön 6",
    "qty": 27,
    "length": 6,
    "weightPerMeter": 0.932
  },
  {
    "id": 43,
    "name": "25x1.5 Boru",
    "size": "25x1.5",
    "profileType": "Boru",
    "location": "Ön 6",
    "qty": 46,
    "length": 6,
    "weightPerMeter": 0.3
  },
  {
    "id": 44,
    "name": "20x20x2 Kutu",
    "size": "20x20x2",
    "profileType": "Kutu",
    "location": "Ön 6",
    "qty": 7,
    "length": 6,
    "weightPerMeter": 0.39
  },
  {
    "id": 45,
    "name": "40x60x2 Kutu",
    "size": "40x60x2",
    "profileType": "Kutu",
    "location": "Ön 6",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.041
  },
  {
    "id": 46,
    "name": "6x1 Boru",
    "size": "6x1",
    "profileType": "Boru",
    "location": "Ön 6",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.043
  },
  {
    "id": 47,
    "name": "30x40x2 Kutu",
    "size": "30x40x2",
    "profileType": "Kutu",
    "location": "Ön 6",
    "qty": 70,
    "length": 6,
    "weightPerMeter": 0.715
  },
  {
    "id": 48,
    "name": "50x50x3 Kutu",
    "size": "50x50x3",
    "profileType": "Kutu",
    "location": "Ön 6",
    "qty": 7,
    "length": 6,
    "weightPerMeter": 1.528
  },
  {
    "id": 49,
    "name": "8x1 Boru",
    "size": "8x1",
    "profileType": "Boru",
    "location": "Ön 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.06
  },
  {
    "id": 50,
    "name": "20x30x2 Kutu",
    "size": "20x30x2",
    "profileType": "Kutu",
    "location": "Ön 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.499
  },
  {
    "id": 51,
    "name": "40x60x3 Kutu",
    "size": "40x60x3",
    "profileType": "Kutu",
    "location": "Ön 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.528
  },
  {
    "id": 52,
    "name": "50x50x2 Kutu",
    "size": "50x50x2",
    "profileType": "Kutu",
    "location": "Ön 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.041
  },
  {
    "id": 53,
    "name": "10x10x1.5 Kutu",
    "size": "10x10x1.5",
    "profileType": "Kutu",
    "location": "Ön 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.138
  },
  {
    "id": 54,
    "name": "20x70x2 Köşebent",
    "size": "20x70x2",
    "profileType": "Köşebent",
    "location": "Arka 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.477
  },
  {
    "id": 55,
    "name": "20x60x1.4 Köşebent",
    "size": "20x60x1.4",
    "profileType": "Köşebent",
    "location": "Arka 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.298
  },
  {
    "id": 56,
    "name": "40x7.5 Boru",
    "size": "40x7.5",
    "profileType": "Boru",
    "location": "Arka 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.075
  },
  {
    "id": 57,
    "name": "26x6 Boru",
    "size": "26x6",
    "profileType": "Boru",
    "location": "Arka 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.022
  },
  {
    "id": 58,
    "name": "50x2 Diğer",
    "size": "50x2",
    "profileType": "Diğer",
    "location": "Arka 1",
    "qty": 2,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 59,
    "name": "15x15x1 Köşebent",
    "size": "15x15x1",
    "profileType": "Köşebent",
    "location": "Arka 1",
    "qty": 2,
    "length": 6,
    "weightPerMeter": 0.079
  },
  {
    "id": 60,
    "name": "20x30x2 Köşebent",
    "size": "20x30x2",
    "profileType": "Köşebent",
    "location": "Arka 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.26
  },
  {
    "id": 61,
    "name": "30x50x1 Kutu",
    "size": "30x50x1",
    "profileType": "Kutu",
    "location": "Arka 1",
    "qty": 3,
    "length": 6,
    "weightPerMeter": 0.423
  },
  {
    "id": 62,
    "name": "50x50x4 Köşebent",
    "size": "50x50x4",
    "profileType": "Köşebent",
    "location": "Arka 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.041
  },
  {
    "id": 63,
    "name": "50x100x3 Köşebent",
    "size": "50x100x3",
    "profileType": "Köşebent",
    "location": "Arka 1",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.195
  },
  {
    "id": 64,
    "name": "60x1.5 Boru",
    "size": "60x1.5",
    "profileType": "Boru",
    "location": "Arka 2",
    "qty": 3,
    "length": 6,
    "weightPerMeter": 0.747
  },
  {
    "id": 65,
    "name": "100x5 Boru",
    "size": "100x5",
    "profileType": "Boru",
    "location": "Arka 2",
    "qty": 2,
    "length": 6,
    "weightPerMeter": 4.044
  },
  {
    "id": 66,
    "name": "30x2 Diğer",
    "size": "30x2",
    "profileType": "Diğer",
    "location": "Arka 2",
    "qty": 88,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 67,
    "name": "70x2 Boru",
    "size": "70x2",
    "profileType": "Boru",
    "location": "Arka 2",
    "qty": 9,
    "length": 6,
    "weightPerMeter": 1.158
  },
  {
    "id": 68,
    "name": "200x3 Boru",
    "size": "200x3",
    "profileType": "Boru",
    "location": "Arka 2",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.032
  },
  {
    "id": 69,
    "name": "170x5 Boru",
    "size": "170x5",
    "profileType": "Boru",
    "location": "Arka 2",
    "qty": 2,
    "length": 6,
    "weightPerMeter": 7.024
  },
  {
    "id": 70,
    "name": "60x60x6 Köşebent",
    "size": "60x60x6",
    "profileType": "Köşebent",
    "location": "Arka 2",
    "qty": 28,
    "length": 6,
    "weightPerMeter": 1.854
  },
  {
    "id": 71,
    "name": "35x3 Boru",
    "size": "35x3",
    "profileType": "Boru",
    "location": "Arka 2",
    "qty": 39,
    "length": 6,
    "weightPerMeter": 0.817
  },
  {
    "id": 72,
    "name": "50x50x2 Köşebent",
    "size": "50x50x2",
    "profileType": "Köşebent",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.531
  },
  {
    "id": 73,
    "name": "20x80x1.4 Köşebent",
    "size": "20x80x1.4",
    "profileType": "Köşebent",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.374
  },
  {
    "id": 74,
    "name": "150x150x3 Kutu",
    "size": "150x150x3",
    "profileType": "Kutu",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.78
  },
  {
    "id": 75,
    "name": "50x150x2 Kutu",
    "size": "50x150x2",
    "profileType": "Kutu",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.125
  },
  {
    "id": 76,
    "name": "25x50x2 Köşebent",
    "size": "25x50x2",
    "profileType": "Köşebent",
    "location": "Arka 3",
    "qty": 12,
    "length": 6,
    "weightPerMeter": 0.396
  },
  {
    "id": 77,
    "name": "50x5 Boru",
    "size": "50x5",
    "profileType": "Boru",
    "location": "Arka 3",
    "qty": 3,
    "length": 6,
    "weightPerMeter": 1.916
  },
  {
    "id": 78,
    "name": "16x1 Boru",
    "size": "16x1",
    "profileType": "Boru",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.128
  },
  {
    "id": 79,
    "name": "28x2 Boru",
    "size": "28x2",
    "profileType": "Boru",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.443
  },
  {
    "id": 80,
    "name": "19x1 Boru",
    "size": "19x1",
    "profileType": "Boru",
    "location": "Arka 3",
    "qty": 5,
    "length": 6,
    "weightPerMeter": 0.153
  },
  {
    "id": 81,
    "name": "20x40x3 Köşebent",
    "size": "20x40x3",
    "profileType": "Köşebent",
    "location": "Arka 3",
    "qty": 11,
    "length": 6,
    "weightPerMeter": 0.463
  },
  {
    "id": 82,
    "name": "25x25x2 Köşebent",
    "size": "25x25x2",
    "profileType": "Köşebent",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.26
  },
  {
    "id": 83,
    "name": "25x25x1.3 Köşebent",
    "size": "25x25x1.3",
    "profileType": "Köşebent",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.172
  },
  {
    "id": 84,
    "name": "60x60x2 Kutu",
    "size": "60x60x2",
    "profileType": "Kutu",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.257
  },
  {
    "id": 85,
    "name": "20x40x3 Kutu",
    "size": "20x40x3",
    "profileType": "Kutu",
    "location": "Arka 3",
    "qty": 5,
    "length": 6,
    "weightPerMeter": 0.878
  },
  {
    "id": 86,
    "name": "20x80x2 Kutu",
    "size": "20x80x2",
    "profileType": "Kutu",
    "location": "Arka 3",
    "qty": 3,
    "length": 6,
    "weightPerMeter": 1.041
  },
  {
    "id": 87,
    "name": "F Profil",
    "size": "-",
    "profileType": "F",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 88,
    "name": "50x2 Boru",
    "size": "50x2",
    "profileType": "Boru",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.817
  },
  {
    "id": 89,
    "name": "40x40x4 Köşebent",
    "size": "40x40x4",
    "profileType": "Köşebent",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.824
  },
  {
    "id": 90,
    "name": "40x40x2 Köşebent",
    "size": "40x40x2",
    "profileType": "Köşebent",
    "location": "Arka 3",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.423
  },
  {
    "id": 91,
    "name": "10x20x2 Kutu",
    "size": "10x20x2",
    "profileType": "Kutu",
    "location": "Arka 3",
    "qty": 30,
    "length": 6,
    "weightPerMeter": 0.282
  },
  {
    "id": 92,
    "name": "40x50x2 Kutu",
    "size": "40x50x2",
    "profileType": "Kutu",
    "location": "Arka 3",
    "qty": 183,
    "length": 6,
    "weightPerMeter": 0.932
  },
  {
    "id": 93,
    "name": "35x35x2 Köşebent",
    "size": "35x35x2",
    "profileType": "Köşebent",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.369
  },
  {
    "id": 94,
    "name": "20x20x2 U Profil",
    "size": "20x20x2",
    "profileType": "U Profil",
    "location": "Arka 4",
    "qty": 128,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 95,
    "name": "67x6.5 Boru",
    "size": "67x6.5",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 2,
    "length": 6,
    "weightPerMeter": 3.348
  },
  {
    "id": 96,
    "name": "40x60x3 Kutu",
    "size": "40x60x3",
    "profileType": "Kutu",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.528
  },
  {
    "id": 97,
    "name": "32x1 Boru",
    "size": "32x1",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 5,
    "length": 6,
    "weightPerMeter": 0.264
  },
  {
    "id": 98,
    "name": "20x1 Boru",
    "size": "20x1",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.162
  },
  {
    "id": 99,
    "name": "40x3 Boru",
    "size": "40x3",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.945
  },
  {
    "id": 100,
    "name": "35x35x2 Kutu",
    "size": "35x35x2",
    "profileType": "Kutu",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.715
  },
  {
    "id": 101,
    "name": "30x3 Boru",
    "size": "30x3",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.69
  },
  {
    "id": 102,
    "name": "28x3.5 Boru",
    "size": "28x3.5",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 2,
    "length": 6,
    "weightPerMeter": 0.73
  },
  {
    "id": 103,
    "name": "60x5 Boru",
    "size": "60x5",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.341
  },
  {
    "id": 104,
    "name": "51x1.5 Boru",
    "size": "51x1.5",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.632
  },
  {
    "id": 105,
    "name": "30x30x2 Köşebent",
    "size": "30x30x2",
    "profileType": "Köşebent",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.314
  },
  {
    "id": 106,
    "name": "60x60x3 Kutu",
    "size": "60x60x3",
    "profileType": "Kutu",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.854
  },
  {
    "id": 107,
    "name": "30x1.5 Boru",
    "size": "30x1.5",
    "profileType": "Boru",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.364
  },
  {
    "id": 108,
    "name": "11.5x11.5x1.5 Köşebent",
    "size": "11.5x11.5x1.5",
    "profileType": "Köşebent",
    "location": "Arka 4",
    "qty": 76,
    "length": 6,
    "weightPerMeter": 0.087
  },
  {
    "id": 109,
    "name": "20x25x2 U Profil",
    "size": "20x25x2",
    "profileType": "U Profil",
    "location": "Arka 4",
    "qty": 96,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 110,
    "name": "40x50x1 Kutu",
    "size": "40x50x1",
    "profileType": "Kutu",
    "location": "Arka 4",
    "qty": 68,
    "length": 6,
    "weightPerMeter": 0.477
  },
  {
    "id": 111,
    "name": "40x50x1 Kutu",
    "size": "40x50x1",
    "profileType": "Kutu",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.477
  },
  {
    "id": 112,
    "name": "50x50x5 Köşebent",
    "size": "50x50x5",
    "profileType": "Köşebent",
    "location": "Arka 4",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.287
  },
  {
    "id": 113,
    "name": "10x20x3 Köşebent",
    "size": "10x20x3",
    "profileType": "Köşebent",
    "location": "Arka 5",
    "qty": 225,
    "length": 6,
    "weightPerMeter": 0.22
  },
  {
    "id": 114,
    "name": "20x60x1.5 Köşebent",
    "size": "20x60x1.5",
    "profileType": "Köşebent",
    "location": "Arka 5",
    "qty": 97,
    "length": 6,
    "weightPerMeter": 0.319
  },
  {
    "id": 115,
    "name": "12.5x12.5x1.5 U Profil",
    "size": "12.5x12.5x1.5",
    "profileType": "U Profil",
    "location": "Arka 5",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 116,
    "name": "15x20x3 Köşebent",
    "size": "15x20x3",
    "profileType": "Köşebent",
    "location": "Arka 5",
    "qty": 77,
    "length": 6,
    "weightPerMeter": 0.26
  },
  {
    "id": 117,
    "name": "30x30x3 Köşebent",
    "size": "30x30x3",
    "profileType": "Köşebent",
    "location": "Arka 5",
    "qty": 68,
    "length": 6,
    "weightPerMeter": 0.463
  },
  {
    "id": 118,
    "name": "16x1.5 Boru",
    "size": "16x1.5",
    "profileType": "Boru",
    "location": "Arka 5",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.185
  },
  {
    "id": 119,
    "name": "60x2 Boru",
    "size": "60x2",
    "profileType": "Boru",
    "location": "Arka 5",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.988
  },
  {
    "id": 120,
    "name": "30x2 Diğer",
    "size": "30x2",
    "profileType": "Diğer",
    "location": "Arka 5",
    "qty": 10,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 121,
    "name": "35x5 Boru",
    "size": "35x5",
    "profileType": "Boru",
    "location": "Arka 5",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.277
  },
  {
    "id": 122,
    "name": "60x120x2 Kutu",
    "size": "60x120x2",
    "profileType": "Kutu",
    "location": "Arka 5",
    "qty": 5,
    "length": 6,
    "weightPerMeter": 1.908
  },
  {
    "id": 123,
    "name": "50x50x4 Kutu",
    "size": "50x50x4",
    "profileType": "Kutu",
    "location": "Arka 5",
    "qty": 29,
    "length": 6,
    "weightPerMeter": 1.995
  },
  {
    "id": 124,
    "name": "60x5 Boru",
    "size": "60x5",
    "profileType": "Boru",
    "location": "Arka 6",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.341
  },
  {
    "id": 125,
    "name": "32x32x2.5 Kutu",
    "size": "32x32x2.5",
    "profileType": "Kutu",
    "location": "Arka 6",
    "qty": 126,
    "length": 6,
    "weightPerMeter": 0.799
  },
  {
    "id": 126,
    "name": "80x80x2 Kutu",
    "size": "80x80x2",
    "profileType": "Kutu",
    "location": "Arka 6",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.691
  },
  {
    "id": 127,
    "name": "25x25x1.5 Köşebent",
    "size": "25x25x1.5",
    "profileType": "Köşebent",
    "location": "Arka 6",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.197
  },
  {
    "id": 128,
    "name": "60x60x2 Köşebent",
    "size": "60x60x2",
    "profileType": "Köşebent",
    "location": "Arka 6",
    "qty": 95,
    "length": 6,
    "weightPerMeter": 0.64
  },
  {
    "id": 129,
    "name": "24x3.5 Boru",
    "size": "24x3.5",
    "profileType": "Boru",
    "location": "Arka 6",
    "qty": 39,
    "length": 6,
    "weightPerMeter": 0.611
  },
  {
    "id": 130,
    "name": "20x60x2 Kutu",
    "size": "20x60x2",
    "profileType": "Kutu",
    "location": "Arka 6",
    "qty": 8,
    "length": 6,
    "weightPerMeter": 0.824
  },
  {
    "id": 131,
    "name": "30x30x2 Köşebent",
    "size": "30x30x2",
    "profileType": "Köşebent",
    "location": "Arka 6",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.314
  },
  {
    "id": 132,
    "name": "40x40x5 Köşebent",
    "size": "40x40x5",
    "profileType": "Köşebent",
    "location": "Arka 6",
    "qty": 80,
    "length": 6,
    "weightPerMeter": 1.016
  },
  {
    "id": 133,
    "name": "40x80x3 Kutu",
    "size": "40x80x3",
    "profileType": "Kutu",
    "location": "Arka 6",
    "qty": 34,
    "length": 6,
    "weightPerMeter": 1.854
  },
  {
    "id": 134,
    "name": "26x8 Boru",
    "size": "26x8",
    "profileType": "Boru",
    "location": "Arka 7",
    "qty": 60,
    "length": 6,
    "weightPerMeter": 1.226
  },
  {
    "id": 135,
    "name": "45x1.5 Boru",
    "size": "45x1.5",
    "profileType": "Boru",
    "location": "Arka 7",
    "qty": 17,
    "length": 6,
    "weightPerMeter": 0.556
  },
  {
    "id": 136,
    "name": "20x30x2 U Profil",
    "size": "20x30x2",
    "profileType": "U Profil",
    "location": "Arka 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 137,
    "name": "50x150x2 Kutu",
    "size": "50x150x2",
    "profileType": "Kutu",
    "location": "Arka 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.125
  },
  {
    "id": 138,
    "name": "15x100x1.2 Kutu",
    "size": "15x100x1.2",
    "profileType": "Kutu",
    "location": "Arka 7",
    "qty": 31,
    "length": 6,
    "weightPerMeter": 0.732
  },
  {
    "id": 139,
    "name": "20x40x2 Köşebent",
    "size": "20x40x2",
    "profileType": "Köşebent",
    "location": "Arka 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.314
  },
  {
    "id": 140,
    "name": "30x30x2 Köşebent",
    "size": "30x30x2",
    "profileType": "Köşebent",
    "location": "Arka 7",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.314
  },
  {
    "id": 141,
    "name": "150x150x3 Kutu",
    "size": "150x150x3",
    "profileType": "Kutu",
    "location": "Arka 7",
    "qty": 7,
    "length": 6,
    "weightPerMeter": 4.78
  },
  {
    "id": 142,
    "name": "20x40x4 Köşebent",
    "size": "20x40x4",
    "profileType": "Köşebent",
    "location": "Arka 8",
    "qty": 60,
    "length": 6,
    "weightPerMeter": 0.607
  },
  {
    "id": 143,
    "name": "23x1 Boru",
    "size": "23x1",
    "profileType": "Boru",
    "location": "Arka 8",
    "qty": 137,
    "length": 6,
    "weightPerMeter": 0.187
  },
  {
    "id": 144,
    "name": "18x2 Boru",
    "size": "18x2",
    "profileType": "Boru",
    "location": "Arka 8",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.272
  },
  {
    "id": 145,
    "name": "22x2 Boru",
    "size": "22x2",
    "profileType": "Boru",
    "location": "Arka 8",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.341
  },
  {
    "id": 146,
    "name": "40x80x2 Kutu",
    "size": "40x80x2",
    "profileType": "Kutu",
    "location": "Arka 8",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.257
  },
  {
    "id": 147,
    "name": "20x2 Boru",
    "size": "20x2",
    "profileType": "Boru",
    "location": "Arka 8",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.306
  },
  {
    "id": 148,
    "name": "120x2 Boru",
    "size": "120x2",
    "profileType": "Boru",
    "location": "Arka 8",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.009
  },
  {
    "id": 149,
    "name": "110x5 Boru",
    "size": "110x5",
    "profileType": "Boru",
    "location": "Arka 8",
    "qty": 4,
    "length": 6,
    "weightPerMeter": 4.47
  },
  {
    "id": 150,
    "name": "75x6 Boru",
    "size": "75x6",
    "profileType": "Boru",
    "location": "Arka 8",
    "qty": 2,
    "length": 6,
    "weightPerMeter": 3.525
  },
  {
    "id": 151,
    "name": "90x5 Boru",
    "size": "90x5",
    "profileType": "Boru",
    "location": "Arka 8",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.618
  },
  {
    "id": 152,
    "name": "40x60x1 Kutu",
    "size": "40x60x1",
    "profileType": "Kutu",
    "location": "Arka 9",
    "qty": 21,
    "length": 6,
    "weightPerMeter": 0.531
  },
  {
    "id": 153,
    "name": "20x20x2 Köşebent",
    "size": "20x20x2",
    "profileType": "Köşebent",
    "location": "Arka 9",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.206
  },
  {
    "id": 154,
    "name": "12x1 Boru",
    "size": "12x1",
    "profileType": "Boru",
    "location": "Arka 9",
    "qty": 340,
    "length": 6,
    "weightPerMeter": 0.094
  },
  {
    "id": 155,
    "name": "40x40x3 Köşebent",
    "size": "40x40x3",
    "profileType": "Köşebent",
    "location": "Arka 9",
    "qty": 73,
    "length": 6,
    "weightPerMeter": 0.626
  },
  {
    "id": 156,
    "name": "80x80x6 Köşebent",
    "size": "80x80x6",
    "profileType": "Köşebent",
    "location": "Arka 9",
    "qty": 18,
    "length": 6,
    "weightPerMeter": 2.504
  },
  {
    "id": 157,
    "name": "50x10 Lama",
    "size": "50x10",
    "profileType": "Lama",
    "location": "Lama 1 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.355
  },
  {
    "id": 158,
    "name": "18x5 Lama",
    "size": "18x5",
    "profileType": "Lama",
    "location": "Lama 1 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.244
  },
  {
    "id": 159,
    "name": "25x5 Lama",
    "size": "25x5",
    "profileType": "Lama",
    "location": "Lama 1 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.339
  },
  {
    "id": 160,
    "name": "40x4 Lama",
    "size": "40x4",
    "profileType": "Lama",
    "location": "Lama 1 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.434
  },
  {
    "id": 161,
    "name": "30x8 Lama",
    "size": "30x8",
    "profileType": "Lama",
    "location": "Lama 1 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.65
  },
  {
    "id": 162,
    "name": "50x4 Lama",
    "size": "50x4",
    "profileType": "Lama",
    "location": "Lama 1 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.542
  },
  {
    "id": 163,
    "name": "20x6 Lama",
    "size": "20x6",
    "profileType": "Lama",
    "location": "Lama 1 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.325
  },
  {
    "id": 164,
    "name": "25 Çubuk",
    "size": "25",
    "profileType": "Çubuk",
    "location": "Lama 1 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.33
  },
  {
    "id": 165,
    "name": "30x10 Lama",
    "size": "30x10",
    "profileType": "Lama",
    "location": "Lama 1 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.813
  },
  {
    "id": 166,
    "name": "40x20 Lama",
    "size": "40x20",
    "profileType": "Lama",
    "location": "Lama 2 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.168
  },
  {
    "id": 167,
    "name": "50x5 Lama",
    "size": "50x5",
    "profileType": "Lama",
    "location": "Lama 2 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.678
  },
  {
    "id": 168,
    "name": "25x3 Lama",
    "size": "25x3",
    "profileType": "Lama",
    "location": "Lama 2 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.203
  },
  {
    "id": 169,
    "name": "20x3 Lama",
    "size": "20x3",
    "profileType": "Lama",
    "location": "Lama 2 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.163
  },
  {
    "id": 170,
    "name": "10x10 Lama",
    "size": "10x10",
    "profileType": "Lama",
    "location": "Lama 2 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.271
  },
  {
    "id": 171,
    "name": "60x5 Lama",
    "size": "60x5",
    "profileType": "Lama",
    "location": "Lama 2 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.813
  },
  {
    "id": 172,
    "name": "35x5 Lama",
    "size": "35x5",
    "profileType": "Lama",
    "location": "Lama 2 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.474
  },
  {
    "id": 173,
    "name": "30x3 Lama",
    "size": "30x3",
    "profileType": "Lama",
    "location": "Lama 2 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.244
  },
  {
    "id": 174,
    "name": "100x100x10 Köşebent",
    "size": "100x100x10",
    "profileType": "Köşebent",
    "location": "Lama 2 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.149
  },
  {
    "id": 175,
    "name": "80x10 Lama",
    "size": "80x10",
    "profileType": "Lama",
    "location": "Lama 3 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.168
  },
  {
    "id": 176,
    "name": "40x10 Lama",
    "size": "40x10",
    "profileType": "Lama",
    "location": "Lama 3 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.084
  },
  {
    "id": 177,
    "name": "30x5 Lama",
    "size": "30x5",
    "profileType": "Lama",
    "location": "Lama 3 SOL",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.407
  },
  {
    "id": 178,
    "name": "15x5 Lama",
    "size": "15x5",
    "profileType": "Lama",
    "location": "Lama 3 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.203
  },
  {
    "id": 179,
    "name": "60x10 Lama",
    "size": "60x10",
    "profileType": "Lama",
    "location": "Lama 3 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.626
  },
  {
    "id": 180,
    "name": "20x5 Lama",
    "size": "20x5",
    "profileType": "Lama",
    "location": "Lama 3 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.271
  },
  {
    "id": 181,
    "name": "40x5 Lama",
    "size": "40x5",
    "profileType": "Lama",
    "location": "Lama 3 SAĞ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.542
  },
  {
    "id": 182,
    "name": "20x5 Boru",
    "size": "20x5",
    "profileType": "Boru",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.639
  },
  {
    "id": 183,
    "name": "30x7 Lama",
    "size": "30x7",
    "profileType": "Lama",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.569
  },
  {
    "id": 184,
    "name": "10cubuk Diğer",
    "size": "10cubuk",
    "profileType": "Diğer",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.0
  },
  {
    "id": 185,
    "name": "80x3 Boru",
    "size": "80x3",
    "profileType": "Boru",
    "location": "ÜST ÖN",
    "qty": 45,
    "length": 6,
    "weightPerMeter": 1.967
  },
  {
    "id": 186,
    "name": "25x1.5 Boru",
    "size": "25x1.5",
    "profileType": "Boru",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.3
  },
  {
    "id": 187,
    "name": "13x1 Boru",
    "size": "13x1",
    "profileType": "Boru",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.102
  },
  {
    "id": 188,
    "name": "30x30x3 Köşebent",
    "size": "30x30x3",
    "profileType": "Köşebent",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.463
  },
  {
    "id": 189,
    "name": "60x120x2 Kutu",
    "size": "60x120x2",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 36,
    "length": 6,
    "weightPerMeter": 1.908
  },
  {
    "id": 190,
    "name": "30x1.5 Boru",
    "size": "30x1.5",
    "profileType": "Boru",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.364
  },
  {
    "id": 191,
    "name": "120x120x3 Kutu",
    "size": "120x120x3",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 30,
    "length": 6,
    "weightPerMeter": 3.805
  },
  {
    "id": 192,
    "name": "60x60x3 Kutu",
    "size": "60x60x3",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 40,
    "length": 6,
    "weightPerMeter": 1.854
  },
  {
    "id": 193,
    "name": "30x30x3 Köşebent",
    "size": "30x30x3",
    "profileType": "Köşebent",
    "location": "ÜST ÖN",
    "qty": 9,
    "length": 6,
    "weightPerMeter": 0.463
  },
  {
    "id": 194,
    "name": "82x6 Boru",
    "size": "82x6",
    "profileType": "Boru",
    "location": "ÜST ÖN",
    "qty": 17,
    "length": 6,
    "weightPerMeter": 3.882
  },
  {
    "id": 195,
    "name": "30x30x3 Kutu",
    "size": "30x30x3",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.878
  },
  {
    "id": 196,
    "name": "25x25x2 Kutu",
    "size": "25x25x2",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 70,
    "length": 6,
    "weightPerMeter": 0.499
  },
  {
    "id": 197,
    "name": "10x10x1.5 Kutu",
    "size": "10x10x1.5",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.138
  },
  {
    "id": 198,
    "name": "80x80x3 Kutu",
    "size": "80x80x3",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.504
  },
  {
    "id": 199,
    "name": "40x50x2 Kutu",
    "size": "40x50x2",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.932
  },
  {
    "id": 200,
    "name": "50x50x5 Köşebent",
    "size": "50x50x5",
    "profileType": "Köşebent",
    "location": "ÜST ÖN",
    "qty": 24,
    "length": 6,
    "weightPerMeter": 1.287
  },
  {
    "id": 201,
    "name": "23x1 Boru",
    "size": "23x1",
    "profileType": "Boru",
    "location": "ÜST ÖN",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.187
  },
  {
    "id": 202,
    "name": "20x40x2 Kutu",
    "size": "20x40x2",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 60,
    "length": 6,
    "weightPerMeter": 0.607
  },
  {
    "id": 203,
    "name": "40x40x2 Kutu",
    "size": "40x40x2",
    "profileType": "Kutu",
    "location": "ÜST ÖN",
    "qty": 60,
    "length": 6,
    "weightPerMeter": 0.824
  },
  {
    "id": 204,
    "name": "50x100x3 Köşebent",
    "size": "50x100x3",
    "profileType": "Köşebent",
    "location": "ÜST ÖN",
    "qty": 36,
    "length": 6,
    "weightPerMeter": 1.195
  },
  {
    "id": 205,
    "name": "125x2.5 Boru",
    "size": "125x2.5",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 12,
    "length": 6,
    "weightPerMeter": 2.607
  },
  {
    "id": 206,
    "name": "40x40x3 Kutu",
    "size": "40x40x3",
    "profileType": "Kutu",
    "location": "ÜST ARKA",
    "qty": 24,
    "length": 6,
    "weightPerMeter": 1.203
  },
  {
    "id": 207,
    "name": "30x2 Boru",
    "size": "30x2",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 30,
    "length": 6,
    "weightPerMeter": 0.477
  },
  {
    "id": 208,
    "name": "30x2.5 Boru",
    "size": "30x2.5",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 40,
    "length": 6,
    "weightPerMeter": 0.585
  },
  {
    "id": 209,
    "name": "40x5 Boru",
    "size": "40x5",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.49
  },
  {
    "id": 210,
    "name": "30x60x2 Kutu",
    "size": "30x60x2",
    "profileType": "Kutu",
    "location": "ÜST ARKA",
    "qty": 32,
    "length": 6,
    "weightPerMeter": 0.932
  },
  {
    "id": 211,
    "name": "40x80x2 Kutu",
    "size": "40x80x2",
    "profileType": "Kutu",
    "location": "ÜST ARKA",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.257
  },
  {
    "id": 212,
    "name": "30x2 Boru",
    "size": "30x2",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 40,
    "length": 6,
    "weightPerMeter": 0.477
  },
  {
    "id": 213,
    "name": "20x20x2 Köşebent",
    "size": "20x20x2",
    "profileType": "Köşebent",
    "location": "ÜST ARKA",
    "qty": 80,
    "length": 6,
    "weightPerMeter": 0.206
  },
  {
    "id": 214,
    "name": "40x100x2 Kutu",
    "size": "40x100x2",
    "profileType": "Kutu",
    "location": "ÜST ARKA",
    "qty": 14,
    "length": 6,
    "weightPerMeter": 1.474
  },
  {
    "id": 215,
    "name": "20x30x2 Kutu",
    "size": "20x30x2",
    "profileType": "Kutu",
    "location": "ÜST ARKA",
    "qty": 72,
    "length": 6,
    "weightPerMeter": 0.499
  },
  {
    "id": 216,
    "name": "80x80x2 Kutu",
    "size": "80x80x2",
    "profileType": "Kutu",
    "location": "ÜST ARKA",
    "qty": 40,
    "length": 6,
    "weightPerMeter": 1.691
  },
  {
    "id": 217,
    "name": "170x5 Boru",
    "size": "170x5",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 14,
    "length": 6,
    "weightPerMeter": 7.024
  },
  {
    "id": 218,
    "name": "23x1 Boru",
    "size": "23x1",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.187
  },
  {
    "id": 219,
    "name": "100x5 Boru",
    "size": "100x5",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 14,
    "length": 6,
    "weightPerMeter": 4.044
  },
  {
    "id": 220,
    "name": "60x60x6 Köşebent",
    "size": "60x60x6",
    "profileType": "Köşebent",
    "location": "ÜST ARKA",
    "qty": 28,
    "length": 6,
    "weightPerMeter": 1.854
  },
  {
    "id": 221,
    "name": "60x3 Boru",
    "size": "60x3",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 10,
    "length": 6,
    "weightPerMeter": 1.456
  },
  {
    "id": 222,
    "name": "40x3 Boru",
    "size": "40x3",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.945
  },
  {
    "id": 223,
    "name": "75x2 Boru",
    "size": "75x2",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.243
  },
  {
    "id": 224,
    "name": "120x2 Boru",
    "size": "120x2",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.009
  },
  {
    "id": 225,
    "name": "26x8 Boru",
    "size": "26x8",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.226
  },
  {
    "id": 226,
    "name": "100x2 Boru",
    "size": "100x2",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 20,
    "length": 6,
    "weightPerMeter": 1.669
  },
  {
    "id": 227,
    "name": "100x5 Boru",
    "size": "100x5",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 5,
    "length": 6,
    "weightPerMeter": 4.044
  },
  {
    "id": 228,
    "name": "90x5 Boru",
    "size": "90x5",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 8,
    "length": 6,
    "weightPerMeter": 3.618
  },
  {
    "id": 229,
    "name": "82x3 Boru",
    "size": "82x3",
    "profileType": "Boru",
    "location": "ÜST ARKA",
    "qty": 20,
    "length": 6,
    "weightPerMeter": 2.018
  },
  {
    "id": 230,
    "name": "42 Çubuk",
    "size": "42",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.755
  },
  {
    "id": 231,
    "name": "22 Çubuk",
    "size": "22",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.03
  },
  {
    "id": 232,
    "name": "20 Çubuk",
    "size": "20",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.851
  },
  {
    "id": 233,
    "name": "32 Çubuk",
    "size": "32",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.18
  },
  {
    "id": 234,
    "name": "35 Çubuk",
    "size": "35",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.607
  },
  {
    "id": 235,
    "name": "13 Çubuk",
    "size": "13",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.36
  },
  {
    "id": 236,
    "name": "42 Çubuk",
    "size": "42",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.755
  },
  {
    "id": 237,
    "name": "30 Çubuk",
    "size": "30",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.916
  },
  {
    "id": 238,
    "name": "50 Çubuk",
    "size": "50",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.321
  },
  {
    "id": 239,
    "name": "25 Çubuk",
    "size": "25",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.33
  },
  {
    "id": 240,
    "name": "12 Çubuk",
    "size": "12",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.306
  },
  {
    "id": 241,
    "name": "24 Çubuk",
    "size": "24",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.226
  },
  {
    "id": 242,
    "name": "80 Çubuk",
    "size": "80",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 13.622
  },
  {
    "id": 243,
    "name": "75 Çubuk",
    "size": "75",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 11.972
  },
  {
    "id": 244,
    "name": "80 Çubuk",
    "size": "80",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 13.622
  },
  {
    "id": 245,
    "name": "55 Çubuk",
    "size": "55",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 6.438
  },
  {
    "id": 246,
    "name": "40 Çubuk",
    "size": "40",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.405
  },
  {
    "id": 247,
    "name": "50 Çubuk",
    "size": "50",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.321
  },
  {
    "id": 248,
    "name": "15 Çubuk",
    "size": "15",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.479
  },
  {
    "id": 249,
    "name": "80 Çubuk",
    "size": "80",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 13.622
  },
  {
    "id": 250,
    "name": "70 Çubuk",
    "size": "70",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 10.429
  },
  {
    "id": 251,
    "name": "65 Çubuk",
    "size": "65",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 8.993
  },
  {
    "id": 252,
    "name": "35 Çubuk",
    "size": "35",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.607
  },
  {
    "id": 253,
    "name": "20 Çubuk",
    "size": "20",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.851
  },
  {
    "id": 254,
    "name": "100 Çubuk",
    "size": "100",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 21.284
  },
  {
    "id": 255,
    "name": "75 Çubuk",
    "size": "75",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 11.972
  },
  {
    "id": 256,
    "name": "16 Çubuk",
    "size": "16",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.545
  },
  {
    "id": 257,
    "name": "70 Çubuk",
    "size": "70",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 10.429
  },
  {
    "id": 258,
    "name": "85 Çubuk",
    "size": "85",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 15.378
  },
  {
    "id": 259,
    "name": "90 Çubuk",
    "size": "90",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 17.24
  },
  {
    "id": 260,
    "name": "125 Çubuk",
    "size": "125",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 33.257
  },
  {
    "id": 261,
    "name": "65 Çubuk",
    "size": "65",
    "profileType": "Çubuk",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 8.993
  },
  {
    "id": 262,
    "name": "80x80 Lama",
    "size": "80x80",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 17.344
  },
  {
    "id": 263,
    "name": "70x70 Lama",
    "size": "70x70",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 13.279
  },
  {
    "id": 264,
    "name": "20x40 Lama",
    "size": "20x40",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.168
  },
  {
    "id": 265,
    "name": "15x15 Lama",
    "size": "15x15",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.61
  },
  {
    "id": 266,
    "name": "15x20 Lama",
    "size": "15x20",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.813
  },
  {
    "id": 267,
    "name": "20x5 Lama",
    "size": "20x5",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.271
  },
  {
    "id": 268,
    "name": "20x20 Lama",
    "size": "20x20",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.084
  },
  {
    "id": 269,
    "name": "40x10 Lama",
    "size": "40x10",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.084
  },
  {
    "id": 270,
    "name": "10x10 Lama",
    "size": "10x10",
    "profileType": "Lama",
    "location": "Çubuk Sağ",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.271
  },
  {
    "id": 271,
    "name": "15x5 Lama",
    "size": "15x5",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.203
  },
  {
    "id": 272,
    "name": "20x5 Lama",
    "size": "20x5",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.271
  },
  {
    "id": 273,
    "name": "25x6 Lama",
    "size": "25x6",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.407
  },
  {
    "id": 274,
    "name": "30x7 Lama",
    "size": "30x7",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.569
  },
  {
    "id": 275,
    "name": "40x5 Lama",
    "size": "40x5",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.542
  },
  {
    "id": 276,
    "name": "50x5 Lama",
    "size": "50x5",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.678
  },
  {
    "id": 277,
    "name": "60x6 Lama",
    "size": "60x6",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.976
  },
  {
    "id": 278,
    "name": "15x10 Lama",
    "size": "15x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.407
  },
  {
    "id": 279,
    "name": "30x10 Lama",
    "size": "30x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.813
  },
  {
    "id": 280,
    "name": "40x10 Lama",
    "size": "40x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.084
  },
  {
    "id": 281,
    "name": "50x10 Lama",
    "size": "50x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.355
  },
  {
    "id": 282,
    "name": "60x10 Lama",
    "size": "60x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.626
  },
  {
    "id": 283,
    "name": "70x10 Lama",
    "size": "70x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.897
  },
  {
    "id": 284,
    "name": "80x10 Lama",
    "size": "80x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.168
  },
  {
    "id": 285,
    "name": "90x10 Lama",
    "size": "90x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.439
  },
  {
    "id": 286,
    "name": "100x10 Lama",
    "size": "100x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.71
  },
  {
    "id": 287,
    "name": "70x20 Lama",
    "size": "70x20",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.794
  },
  {
    "id": 288,
    "name": "80x15 Lama",
    "size": "80x15",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.252
  },
  {
    "id": 289,
    "name": "60x20 Lama",
    "size": "60x20",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.252
  },
  {
    "id": 290,
    "name": "150x10 Lama",
    "size": "150x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.065
  },
  {
    "id": 291,
    "name": "15x15 Lama",
    "size": "15x15",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.61
  },
  {
    "id": 292,
    "name": "12x12 Lama",
    "size": "12x12",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.39
  },
  {
    "id": 293,
    "name": "100x25 Lama",
    "size": "100x25",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 6.775
  },
  {
    "id": 294,
    "name": "40x15 Lama",
    "size": "40x15",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.626
  },
  {
    "id": 295,
    "name": "70x15 Lama",
    "size": "70x15",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.846
  },
  {
    "id": 296,
    "name": "50x20 Lama",
    "size": "50x20",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.71
  },
  {
    "id": 297,
    "name": "50x25 Lama",
    "size": "50x25",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.388
  },
  {
    "id": 298,
    "name": "80x20 Lama",
    "size": "80x20",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.336
  },
  {
    "id": 299,
    "name": "80x40 Lama",
    "size": "80x40",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 8.672
  },
  {
    "id": 300,
    "name": "70x40 Lama",
    "size": "70x40",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 7.588
  },
  {
    "id": 301,
    "name": "100x40 Lama",
    "size": "100x40",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 10.84
  },
  {
    "id": 302,
    "name": "60x40 Lama",
    "size": "60x40",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 6.504
  },
  {
    "id": 303,
    "name": "80x25 Lama",
    "size": "80x25",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.42
  },
  {
    "id": 304,
    "name": "70x20 Lama",
    "size": "70x20",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.794
  },
  {
    "id": 305,
    "name": "100x30 Lama",
    "size": "100x30",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 8.13
  },
  {
    "id": 306,
    "name": "80x50 Lama",
    "size": "80x50",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 10.84
  },
  {
    "id": 307,
    "name": "30x3 Lama",
    "size": "30x3",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.244
  },
  {
    "id": 308,
    "name": "120x10 Lama",
    "size": "120x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.252
  },
  {
    "id": 309,
    "name": "70x70x4 Kutu",
    "size": "70x70x4",
    "profileType": "Kutu",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.862
  },
  {
    "id": 310,
    "name": "120x15 Lama",
    "size": "120x15",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.878
  },
  {
    "id": 311,
    "name": "120x20 Lama",
    "size": "120x20",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 6.504
  },
  {
    "id": 312,
    "name": "100x15 Lama",
    "size": "100x15",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.065
  },
  {
    "id": 313,
    "name": "200x10 Lama",
    "size": "200x10",
    "profileType": "Lama",
    "location": "Çubuk Orta",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.42
  },
  {
    "id": 314,
    "name": "15x15 Lama",
    "size": "15x15",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.61
  },
  {
    "id": 315,
    "name": "30x30 Lama",
    "size": "30x30",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.439
  },
  {
    "id": 316,
    "name": "25x25 Lama",
    "size": "25x25",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.694
  },
  {
    "id": 317,
    "name": "20x20 Lama",
    "size": "20x20",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.084
  },
  {
    "id": 318,
    "name": "25x20 Lama",
    "size": "25x20",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.355
  },
  {
    "id": 319,
    "name": "90x5 Boru",
    "size": "90x5",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.618
  },
  {
    "id": 320,
    "name": "15x15 Lama",
    "size": "15x15",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.61
  },
  {
    "id": 321,
    "name": "25x15 Lama",
    "size": "25x15",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.016
  },
  {
    "id": 322,
    "name": "12 Çubuk",
    "size": "12",
    "profileType": "Çubuk",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.306
  },
  {
    "id": 323,
    "name": "50x30 Lama",
    "size": "50x30",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.065
  },
  {
    "id": 324,
    "name": "50x25 Lama",
    "size": "50x25",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.388
  },
  {
    "id": 325,
    "name": "60x25 Lama",
    "size": "60x25",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.065
  },
  {
    "id": 326,
    "name": "110x20 Lama",
    "size": "110x20",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.962
  },
  {
    "id": 327,
    "name": "40x20 Lama",
    "size": "40x20",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.168
  },
  {
    "id": 328,
    "name": "40x40 Lama",
    "size": "40x40",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.336
  },
  {
    "id": 329,
    "name": "35x35 Lama",
    "size": "35x35",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.32
  },
  {
    "id": 330,
    "name": "80x10 Boru",
    "size": "80x10",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.96
  },
  {
    "id": 331,
    "name": "90x10 Boru",
    "size": "90x10",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 6.811
  },
  {
    "id": 332,
    "name": "50x10 Boru",
    "size": "50x10",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.405
  },
  {
    "id": 333,
    "name": "8 Çubuk",
    "size": "8",
    "profileType": "Çubuk",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.136
  },
  {
    "id": 334,
    "name": "80x20 Lama",
    "size": "80x20",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.336
  },
  {
    "id": 335,
    "name": "80x30 Lama",
    "size": "80x30",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 6.504
  },
  {
    "id": 336,
    "name": "50x40 Lama",
    "size": "50x40",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.42
  },
  {
    "id": 337,
    "name": "30x15 Lama",
    "size": "30x15",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.22
  },
  {
    "id": 338,
    "name": "50x15 Lama",
    "size": "50x15",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 2.033
  },
  {
    "id": 339,
    "name": "20x15 Lama",
    "size": "20x15",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.813
  },
  {
    "id": 340,
    "name": "25x20 Lama",
    "size": "25x20",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.355
  },
  {
    "id": 341,
    "name": "30x20 Lama",
    "size": "30x20",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.626
  },
  {
    "id": 342,
    "name": "60x17.5 Boru",
    "size": "60x17.5",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 6.332
  },
  {
    "id": 343,
    "name": "35x5 Boru",
    "size": "35x5",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.277
  },
  {
    "id": 344,
    "name": "60x15 Boru",
    "size": "60x15",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.747
  },
  {
    "id": 345,
    "name": "6 Çubuk",
    "size": "6",
    "profileType": "Çubuk",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.077
  },
  {
    "id": 346,
    "name": "50x15 Boru",
    "size": "50x15",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 4.47
  },
  {
    "id": 347,
    "name": "80x10 Boru",
    "size": "80x10",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.96
  },
  {
    "id": 348,
    "name": "150x10 Boru",
    "size": "150x10",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 11.919
  },
  {
    "id": 349,
    "name": "50x10 Boru",
    "size": "50x10",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 3.405
  },
  {
    "id": 350,
    "name": "10 Çubuk",
    "size": "10",
    "profileType": "Çubuk",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.213
  },
  {
    "id": 351,
    "name": "70x70 Lama",
    "size": "70x70",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 13.279
  },
  {
    "id": 352,
    "name": "60x50 Lama",
    "size": "60x50",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 8.13
  },
  {
    "id": 353,
    "name": "80x60 Lama",
    "size": "80x60",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 13.008
  },
  {
    "id": 354,
    "name": "50x50 Lama",
    "size": "50x50",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 6.775
  },
  {
    "id": 355,
    "name": "6x1 Boru",
    "size": "6x1",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.043
  },
  {
    "id": 356,
    "name": "100x20 Lama",
    "size": "100x20",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 5.42
  },
  {
    "id": 357,
    "name": "6 Çubuk",
    "size": "6",
    "profileType": "Çubuk",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.077
  },
  {
    "id": 358,
    "name": "30x6 Boru",
    "size": "30x6",
    "profileType": "Boru",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 1.226
  },
  {
    "id": 359,
    "name": "60x60 Lama",
    "size": "60x60",
    "profileType": "Lama",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 9.756
  },
  {
    "id": 360,
    "name": "7 Çubuk",
    "size": "7",
    "profileType": "Çubuk",
    "location": "Çubuk Sol",
    "qty": 1,
    "length": 6,
    "weightPerMeter": 0.104
  }
]
    };
    let state = { products: [] };

    let selectedProductId = null;
    let currentFilterType = null; // 'profil' or 'raf'
    let currentFilterValue = null;

    const profilTipiListesi = ["Boru", "Kutu", "Köşebent", "Lama", "Çubuk", "F", "H", "T", "Levha"];
    const rafListesi = ["Ön 1","Ön 2","Ön 3","Ön 4","Ön 5","Ön 6","Ön 7","Arka 1","Arka 2","Arka 3","Arka 4","Arka 5","Arka 6","Arka 7","Arka 8","Arka 9","Lama 1 SOL","Lama 1 SAĞ","Lama 2 SOL","Lama 2 SAĞ","Lama 3 SOL","Lama 3 SAĞ","ÜST ÖN","ÜST ARKA","Çubuk Sağ","Çubuk Orta","Çubuk Sol","Fire Rafı"];

    // Firebase Real-time Synchronization
    let isInitialized = false;
    db.collection('products').onSnapshot((snapshot) => {
        if (snapshot.empty && !isInitialized) {
            isInitialized = true;
            console.log("Firestore is empty. Pre-populating with 360 default products...");
            const batches = [];
            let currentBatch = db.batch();
            let count = 0;
            
            defaultState.products.forEach((p) => {
                const docRef = db.collection('products').doc(p.id.toString());
                currentBatch.set(docRef, p);
                count++;
                if (count === 400) {
                    batches.push(currentBatch);
                    currentBatch = db.batch();
                    count = 0;
                }
            });
            if (count > 0) {
                batches.push(currentBatch);
            }
            
            Promise.all(batches.map(b => b.commit()))
                .then(() => {
                    console.log("Firestore successfully populated!");
                })
                .catch(err => {
                    console.error("Error populating Firestore:", err);
                });
            return;
        }
        
        state.products = [];
        snapshot.forEach((doc) => {
            state.products.push(doc.data());
        });
        
        // Refresh UI
        if (currentFilterType && currentFilterValue) {
            renderFilteredProducts(currentFilterType, currentFilterValue);
        }
        triggerSearch(searchInput.value);
    }, (error) => {
        console.error("Firestore onSnapshot error:", error);
    });

    // Save state (compatibility dummy, actual writes go to Firestore directly)
    function saveState() {
        // Firestore snapshot handles real-time updates!
    }

    // View Switcher for Depo
    function switchDepoView(viewElement) {
        depoViews.forEach(v => {
            v.style.display = 'none';
            v.classList.remove('active');
        });
        viewElement.style.display = 'block';
        setTimeout(() => viewElement.classList.add('active'), 10);
    }

    // Navigation inside Depo Tab
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category === 'profil') {
                populateProfilTypes();
                switchDepoView(viewDepoProfilTypes);
            } else if (category === 'raflar') {
                populateRafTypes();
                switchDepoView(viewDepoRafTypes);
            }
        });
    });

    backToMainBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilterType = null;
            currentFilterValue = null;
            switchDepoView(viewDepoMain);
        });
    });

    btnBackToTypes.addEventListener('click', () => {
        if (currentFilterType === 'profil') {
            switchDepoView(viewDepoProfilTypes);
        } else if (currentFilterType === 'raf') {
            switchDepoView(viewDepoRafTypes);
        } else {
            switchDepoView(viewDepoMain);
        }
    });

    function populateProfilTypes() {
        profilTypesGrid.innerHTML = profilTipiListesi.map(tip => `
            <div class="type-card" data-filter-type="profil" data-val="${tip}">
                <span>${tip}</span>
            </div>
        `).join('');
        attachTypeCardListeners();
    }

    function populateRafTypes() {
        rafTypesGrid.innerHTML = rafListesi.map(raf => `
            <div class="type-card" data-filter-type="raf" data-val="${raf}">
                <span>${raf}</span>
            </div>
        `).join('');
        attachTypeCardListeners();
    }

    function attachTypeCardListeners() {
        document.querySelectorAll('.type-card').forEach(card => {
            card.addEventListener('click', () => {
                const fType = card.getAttribute('data-filter-type');
                const val = card.getAttribute('data-val');
                currentFilterType = fType;
                currentFilterValue = val;
                
                depoProductsTitle.textContent = val;
                renderFilteredProducts(fType, val);
                switchDepoView(viewDepoProducts);
            });
        });
    }

    function renderFilteredProducts(filterType, filterValue) {
        let filtered = [];
        if (filterType === 'profil') {
            filtered = state.products.filter(p => p.profileType === filterValue);
        } else if (filterType === 'raf') {
            filtered = state.products.filter(p => p.location === filterValue);
        }

        // Sort by size (extract numbers, comparison dimensions)
        filtered.sort((a, b) => {
            const parseNums = (sizeStr) => {
                if (!sizeStr) return [];
                const matches = sizeStr.match(/\d+(?:\.\d+)?/g);
                return matches ? matches.map(Number) : [];
            };
            const numsA = parseNums(a.size);
            const numsB = parseNums(b.size);
            
            for (let i = 0; i < Math.max(numsA.length, numsB.length); i++) {
                const valA = numsA[i] || 0;
                const valB = numsB[i] || 0;
                if (valA !== valB) {
                    return valA - valB;
                }
            }
            if (a.length !== b.length) {
                return a.length - b.length;
            }
            return a.name.localeCompare(b.name);
        });

        if (filtered.length === 0) {
            depoEmptyState.style.display = 'block';
            warehouseList.style.display = 'none';
        } else {
            depoEmptyState.style.display = 'none';
            warehouseList.style.display = 'flex';
            warehouseList.innerHTML = filtered.map(p => getProductCardHTML(p)).join('');
            
            // Listeners
            warehouseList.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = parseInt(card.getAttribute('data-id'));
                    openProductModal(id);
                });
            });
        }
    }


    // Format Size helper (spaces to x and normalize dimensions)
    function formatSizeInput(val, pType) {
        let clean = val.trim().replace(/\s+/g, 'x').replace(/\*/g, 'x').replace(/,/g, '.');
        if (pType === 'Kutu' || pType === 'Köşebent') {
            const match = clean.match(/^(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)$/);
            if (match) {
                const a = parseFloat(match[1]);
                const b = parseFloat(match[2]);
                const t = parseFloat(match[3]);
                if (a > b) {
                    return `${b}x${a}x${t}`;
                }
                return `${a}x${b}x${t}`;
            }
        }
        return clean;
    }

    // Page Navigation (Bottom Nav)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            const targetPage = item.getAttribute('data-page');
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === `page-${targetPage}`) {
                    page.classList.add('active');
                }
            });
        });
    });

    // Warehouse Tab Navigation (Depo / Ürün Kaydet)
    warehouseTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            warehouseTabButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            const targetTab = button.getAttribute('data-tab');
            warehouseTabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Auto-calculate Weight per meter
    function autoCalculateWeight() {
        const pType = formProductType.value;
        const sizeStrRaw = formProductSize.value;
        
        if (!pType || !sizeStrRaw) return;
        
        const sizeStr = formatSizeInput(sizeStrRaw, pType).toLowerCase();

        let weight = null;
        
        const match3 = sizeStr.match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/);
        const match2 = sizeStr.match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/);
        const match1 = sizeStr.match(/^(\d+(?:\.\d+)?)$/);

        // Density of Aluminum = 2.71 g/cm3 -> 0.00271 kg/mm3
        const density = 0.00271;

        if (pType === "Boru" && match2) {
            const D = parseFloat(match2[1]);
            const t = parseFloat(match2[2]);
            const area = Math.PI * t * (D - t);
            weight = area * density;
        } else if (pType === "Kutu" && match3) {
            const A = parseFloat(match3[1]);
            const B = parseFloat(match3[2]);
            const t = parseFloat(match3[3]);
            const area = 2 * t * (A + B - 2 * t);
            weight = area * density;
        } else if (pType === "Köşebent" && match3) {
            const A = parseFloat(match3[1]);
            const B = parseFloat(match3[2]);
            const t = parseFloat(match3[3]);
            const area = (A + B - t) * t;
            weight = area * density;
        } else if (pType === "Lama" && match2) {
            const A = parseFloat(match2[1]);
            const B = parseFloat(match2[2]);
            const area = A * B;
            weight = area * density;
        } else if (pType === "Çubuk" && match1) {
            const D = parseFloat(match1[1]);
            const r = D / 2;
            const area = Math.PI * r * r;
            weight = area * density;
        } else if (pType === "Levha" && match3) {
            // Usually levha is mm x mm x mm (Width x Length x Thickness)
            // Weight per piece would be calculated differently, but let's assume weight per meter of width here or similar.
            // Simplified fallback
            const t = parseFloat(match3[3]); // Kalınlık
            weight = t * 1000 * density; // 1m x 1m levha ağırlığı
        }

        if (weight !== null && !isNaN(weight) && weight > 0) {
            formProductWeightPerMeter.value = weight.toFixed(3);
            weightHelperText.textContent = `Otomatik hesaplanan teorik ağırlık: ${weight.toFixed(3)} kg/m`;
            weightHelperText.style.color = "var(--success)";
        } else {
            weightHelperText.textContent = 'Otomatik hesaplama bu ölçü formatı için yapılamadı, lütfen elle girin.';
            weightHelperText.style.color = "var(--warning)";
        }
    }

    formProductSize.addEventListener('input', () => {
        // As user types, if they typed space, it visually stays space, but we use formatted version internally.
        autoCalculateWeight();
    });
    formProductType.addEventListener('change', autoCalculateWeight);

    // Render Product Card HTML Helper
    function getProductCardHTML(p, label = '') {
        const singleBoyWeight = (p.length * p.weightPerMeter).toFixed(2);
        const totalWeight = (p.length * p.weightPerMeter * p.qty).toFixed(1);
        return `
            <div class="product-card" data-id="${p.id}">
                <div class="product-icon">
                    <i class="fa-solid fa-box"></i>
                </div>
                <div class="product-info">
                    <h3>${escapeHTML(p.name)} ${label ? `<span style="font-size:10px; background:var(--primary-color); padding: 2px 6px; border-radius:4px; margin-left: 6px;">${label}</span>` : ''}</h3>
                    <div class="product-meta-row">
                        <span class="product-meta-item"><i class="fa-solid fa-ruler-combined"></i> ${escapeHTML(p.size)}</span>
                        <span class="product-meta-item"><i class="fa-solid fa-arrows-left-right"></i> ${p.length} mt</span>
                        <span class="product-meta-item"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(p.location)}</span>
                        <span class="product-meta-item"><i class="fa-solid fa-layer-group"></i> ${p.qty} Adet</span>
                        <span class="product-meta-item" style="border-color: rgba(59, 130, 246, 0.2); background: rgba(59, 130, 246, 0.05); color: #fff;"><i class="fa-solid fa-weight-hanging"></i> ${totalWeight} kg</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Search Logic Trigger
    function triggerSearch(queryText) {
        const rawQuery = queryText.trim().toLowerCase();
        
        if (rawQuery.length === 0) {
            searchResults.style.display = 'none';
            clearSearchBtn.style.display = 'none';
            return;
        }

        clearSearchBtn.style.display = 'block';
        searchResults.style.display = 'block';

        const parseNums = (sizeStr) => {
            if (!sizeStr) return [];
            const matches = sizeStr.match(/\d+(?:\.\d+)?/g);
            return matches ? matches.map(Number) : [];
        };

        const getNormalizedNums = (nums, type) => {
            if (!nums || nums.length === 0) return [];
            const result = [...nums];
            if (type === 'Kutu' || type === 'Köşebent') {
                if (result.length >= 2 && result[0] > result[1]) {
                    return [result[1], result[0], ...result.slice(2)];
                }
            } else if (type === 'Lama' || type === 'Boru') {
                if (result.length >= 2 && result[0] < result[1]) {
                    return [result[1], result[0], ...result.slice(2)];
                }
            }
            return result;
        };

        const checkDimensionsMatch = (queryStr, productSizeStr, pType) => {
            const queryNums = queryStr.match(/\d+(?:\.\d+)?/g);
            if (!queryNums || queryNums.length < 2) return false;
            const parsedQuery = queryNums.map(Number);
            
            const prodNums = productSizeStr.match(/\d+(?:\.\d+)?/g);
            if (!prodNums) return false;
            const parsedProd = prodNums.map(Number);
            
            const normQuery = getNormalizedNums(parsedQuery, pType);
            const normProd = getNormalizedNums(parsedProd, pType);
            
            for (let i = 0; i < normQuery.length; i++) {
                if (normQuery[i] !== normProd[i]) {
                    return false;
                }
            }
            return true;
        };

        let queryType = null;
        if (rawQuery.includes('kutu')) queryType = 'Kutu';
        else if (rawQuery.includes('boru')) queryType = 'Boru';
        else if (rawQuery.includes('kosebent') || rawQuery.includes('köşebent') || rawQuery.includes('kösebent')) queryType = 'Köşebent';
        else if (rawQuery.includes('lama')) queryType = 'Lama';
        else if (rawQuery.includes('cubuk') || rawQuery.includes('çubuk')) queryType = 'Çubuk';
        else if (rawQuery.includes('u ')) queryType = 'U';
        else if (rawQuery.includes('f ')) queryType = 'F';
        else if (rawQuery.includes('h ')) queryType = 'H';
        else if (rawQuery.includes('t ')) queryType = 'T';
        else if (rawQuery.includes('levha')) queryType = 'Levha';

        // Override with dropdown filter if selected
        const dropdownType = searchProductType.value;
        if (dropdownType) {
            queryType = dropdownType;
        }

        const formattedQuery = formatSizeInput(rawQuery, queryType);

        const exactMatches = state.products.filter(p => {
            if (p.location.toLowerCase().includes(rawQuery)) return true;
            
            if (checkDimensionsMatch(rawQuery, p.size, queryType || p.profileType)) {
                if (queryType && p.profileType !== queryType) {
                    return false;
                }
                return true;
            }
            
            return p.name.toLowerCase().includes(rawQuery) || 
                   p.name.toLowerCase().includes(formattedQuery) || 
                   p.size.toLowerCase().includes(rawQuery) ||
                   p.size.toLowerCase().includes(formattedQuery);
        });

        exactMatches.sort((a, b) => {
            const numsA = parseNums(a.size);
            const numsB = parseNums(b.size);
            
            for (let i = 0; i < Math.max(numsA.length, numsB.length); i++) {
                const valA = numsA[i] || 0;
                const valB = numsB[i] || 0;
                if (valA !== valB) {
                    return valA - valB;
                }
            }
            if (a.length !== b.length) {
                return a.length - b.length;
            }
            return a.name.localeCompare(b.name);
        });

        const getSimilarityScore = (nums1, nums2, type) => {
            const norm1 = getNormalizedNums(nums1, type);
            const norm2 = getNormalizedNums(nums2, type);
            let diff = 0;
            const maxLen = Math.max(norm1.length, norm2.length);
            for (let i = 0; i < maxLen; i++) {
                const n1 = norm1[i] || 0;
                const n2 = norm2[i] || 0;
                let weight = 1;
                if (i === maxLen - 1 && maxLen > 1) {
                    weight = 10;
                }
                diff += Math.abs(n1 - n2) * weight;
            }
            return diff;
        };

        const isWithinBounds = (targetNums, candidateNums, type) => {
            const norm1 = getNormalizedNums(targetNums, type);
            const norm2 = getNormalizedNums(candidateNums, type);
            
            if (norm1.length === 0 || norm2.length === 0) return false;
            
            if (type === 'Kutu' || type === 'Köşebent') {
                const maxDimDiff = 5;
                const maxThicknessDiff = 4;
                if (norm1[0] !== undefined && Math.abs(norm1[0] - (norm2[0] || 0)) > maxDimDiff) return false;
                if (norm1[1] !== undefined && Math.abs(norm1[1] - (norm2[1] || 0)) > maxDimDiff) return false;
                if (norm1[2] !== undefined && Math.abs(norm1[2] - (norm2[2] || 0)) > maxThicknessDiff) return false;
                return true;
            } else if (type === 'Boru' || type === 'Lama') {
                const maxDimDiff = 5;
                const maxThicknessDiff = 4;
                if (norm1[0] !== undefined && Math.abs(norm1[0] - (norm2[0] || 0)) > maxDimDiff) return false;
                if (norm1[1] !== undefined && Math.abs(norm1[1] - (norm2[1] || 0)) > maxThicknessDiff) return false;
                return true;
            } else {
                const maxDimDiff = 5;
                if (norm1[0] !== undefined && Math.abs(norm1[0] - (norm2[0] || 0)) > maxDimDiff) return false;
                return true;
            }
        };

        let targetType = null;
        let targetNums = [];
        
        if (exactMatches.length > 0) {
            targetType = exactMatches[0].profileType;
            targetNums = parseNums(exactMatches[0].size);
        } else {
            targetType = queryType;
            targetNums = parseNums(rawQuery);
        }

        let similarMatches = [];
        if (targetNums.length > 0 || targetType) {
            const candidates = state.products.filter(p => 
                (!targetType || p.profileType === targetType) &&
                !exactMatches.some(em => em.id === p.id) &&
                isWithinBounds(targetNums, parseNums(p.size), targetType || p.profileType)
            );
            
            candidates.sort((a, b) => {
                const scoreA = getSimilarityScore(targetNums, parseNums(a.size), targetType || a.profileType);
                const scoreB = getSimilarityScore(targetNums, parseNums(b.size), targetType || b.profileType);
                return scoreA - scoreB;
            });
            
            similarMatches = candidates.slice(0, 4);
        }

        let html = '';

        if (exactMatches.length > 0) {
            html += `<div class="product-list">`;
            exactMatches.forEach(p => {
                html += getProductCardHTML(p, 'Bulunan');
            });
            html += `</div>`;
        } else {
            html += `
                <div class="empty-state" style="padding: 20px 0;">
                    <p>Aradığınız kriterde ürün bulunamadı.</p>
                </div>
            `;
        }

        if (similarMatches.length > 0) {
            html += `
                <h3 class="section-title" style="margin-top: 24px; font-size:16px;">Benzer / Önerilen Ürünler</h3>
                <div class="product-list">
            `;
            similarMatches.forEach(p => {
                html += getProductCardHTML(p);
            });
            html += `</div>`;
        }

        resultsList.innerHTML = html;

        resultsList.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.getAttribute('data-id'));
                openProductModal(id);
            });
        });
    }

    searchInput.addEventListener('input', (e) => {
        triggerSearch(e.target.value);
    });

    searchProductType.addEventListener('change', () => {
        triggerSearch(searchInput.value);
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        triggerSearch('');
        searchInput.focus();
    });

    // Add Product Form Handler
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const pType = formProductType.value;
        const rawSize = formProductSize.value.trim();
        const size = formatSizeInput(rawSize, pType); // Formatted size with 'x'
        const name = `${size} ${pType}`; // Auto generated name
        
        const length = parseFloat(formProductLength.value.trim());
        const weightPerMeter = parseFloat(formProductWeightPerMeter.value.trim());
        const location = formProductLocation.value;
        const qty = parseInt(formProductQty.value.trim());

        const newProduct = {
            id: Date.now(),
            name,
            size,
            profileType: pType,
            length,
            weightPerMeter,
            location,
            qty,
            lastUpdated: new Date()
        };

        db.collection('products').doc(newProduct.id.toString()).set(newProduct)
            .then(() => {
                alert('Ürün başarıyla depoya kaydedildi!');
            })
            .catch(err => {
                console.error("Error saving product:", err);
                alert("Ürün kaydedilirken hata oluştu!");
            });

        // Reset form & helper
        addProductForm.reset();
        weightHelperText.textContent = 'Ölçü girildiğinde teorik ağırlık otomatik hesaplanır.';
        weightHelperText.style.color = 'var(--text-secondary)';

        alert('Ürün başarıyla depoya kaydedildi!');

        // Switch to list tab
        const listTabButton = document.querySelector('.warehouse-header .tab-btn[data-tab="list"]');
        listTabButton.click();
        
        // Go back to main warehouse menu
        currentFilterType = null;
        currentFilterValue = null;
        switchDepoView(viewDepoMain);
    });

    // Modal Control: Open
    function openProductModal(id) {
        const product = state.products.find(p => p.id === id);
        if (!product) return;

        selectedProductId = id;

        modalPName.textContent = product.name;
        modalPSize.textContent = product.size;
        modalPLength.textContent = `${product.length} mt`;
        modalPWeightPerMeter.textContent = `${product.weightPerMeter.toFixed(3)} kg/m`;
        modalPLocation.textContent = product.location;
        
        modalQtyInput.value = product.qty;
        modalPLastUpdated.textContent = formatTimestamp(product.lastUpdated);
        updateModalWeightDisplay();

        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        selectedProductId = null;
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    modalQtyMinus.addEventListener('click', () => {
        let val = parseInt(modalQtyInput.value);
        if (val > 0) {
            modalQtyInput.value = val - 1;
            updateModalWeightDisplay();
        }
    });

    modalQtyPlus.addEventListener('click', () => {
        let val = parseInt(modalQtyInput.value);
        modalQtyInput.value = val + 1;
        updateModalWeightDisplay();
    });

    modalQtyInput.addEventListener('input', () => {
        let val = parseInt(modalQtyInput.value);
        if (isNaN(val) || val < 0) {
            modalQtyInput.value = 0;
        }
        updateModalWeightDisplay();
    });

    function updateModalWeightDisplay() {
        const product = state.products.find(p => p.id === selectedProductId);
        if (!product) return;
        
        const currentQty = parseInt(modalQtyInput.value) || 0;
        const singleBoyWeight = (product.length * product.weightPerMeter).toFixed(2);
        const totalWeight = (product.length * product.weightPerMeter * currentQty).toFixed(1);
        
        modalPWeight.textContent = `1 Boy (${product.length} mt): ${singleBoyWeight} kg / Toplam: ${totalWeight} kg`;
    }

    modalSaveBtn.addEventListener('click', () => {
        if (selectedProductId === null) return;
        const newQty = parseInt(modalQtyInput.value) || 0;
        db.collection('products').doc(selectedProductId.toString()).update({
            qty: newQty,
            lastUpdated: new Date()
        }).catch(err => {
            console.error("Error updating qty:", err);
        });
        closeModal();
    });

    modalDeleteBtn.addEventListener('click', () => {
        if (selectedProductId === null) return;
        
        if (confirm('Bu ürünü depodan silmek istediğinize emin misiniz?')) {
            db.collection('products').doc(selectedProductId.toString()).delete()
                .catch(err => {
                    console.error("Error deleting product:", err);
                });
            closeModal();
        }
    });

    function formatTimestamp(ts) {
        if (!ts) return "Bilgi Yok";
        const date = ts.toDate ? ts.toDate() : new Date(ts);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
