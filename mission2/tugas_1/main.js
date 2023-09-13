document.addEventListener("DOMContentLoaded", function () {
  const cartItems = [];
  const incrementButtons = document.querySelectorAll("#btnInc");
  const decrementButtons = document.querySelectorAll("#btnDec");
  const addToCartButtons = document.querySelectorAll("#btnAdd");
  const deleteButtons = document.querySelectorAll("#btnDel");
  const cartList = document.querySelector(".cart-items");
  const totalPurchase = document.querySelector(".cart .text-info");
  const tax = document.querySelectorAll(".tax-total .text-info")[1];
  const totalPayment = document.querySelectorAll(".text-primary")[1];
  const checkoutButton = document.querySelector("#btnCoPrint");

  // Daftar produk Anda
  const products = [
    {
      name: "MNSH D1V1",
      price: 125000,
      image: "assets/image1.jpg",
    },
    {
      name: "MNSH D1V2",
      price: 125000,
      image: "assets/image2.jpg",
    },
    {
      name: "MNSH D1V3",
      price: 125000,
      image: "assets/image3.jpg",
    },
    {
      name: "MNSH D1V4",
      price: 125000,
      image: "assets/image4.jpg",
    },
    {
      name: "MNSH D1V5",
      price: 125000,
      image: "assets/image5.jpg",
    },
    {
      name: "MNSH D1V6",
      price: 125000,
      image: "assets/image6.jpg",
    },
    // Tambahkan produk lainnya sesuai kebutuhan Anda
  ];

  // Fungsi untuk mengupdate tampilan keranjang
  function updateCart() {
    cartList.innerHTML = "";

    let total = 0;

    cartItems.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("mb-2");

      const image = document.createElement("img");
      image.setAttribute("src", item.image);
      image.setAttribute("alt", item.name);
      image.classList.add("w-12", "h-12", "mx-2");

      const itemName = document.createElement("span");
      itemName.textContent = item.name;
      itemName.classList.add("text-black");

      const itemPrice = document.createElement("span");
      itemPrice.textContent = `Rp ${item.price.toFixed(2)}`;
      itemPrice.classList.add("text-black");

      cartItem.appendChild(image);
      cartItem.appendChild(itemName);
      cartItem.appendChild(itemPrice);

      cartList.appendChild(cartItem);

      total += item.price * item.quantity;
    });

    totalPurchase.textContent = `Total Pembelian: Rp ${total.toFixed(2)}`;
    const taxAmount = (total * 11) / 100;
    tax.textContent = `Pajak (11%): Rp ${taxAmount.toFixed(2)}`;
    totalPayment.textContent = `Total Pembayaran: Rp ${(
      total + taxAmount
    ).toFixed(2)}`;
  }

  // Fungsi untuk menambah barang ke keranjang
  function addToCart(index) {
    const selectedProduct = products[index];
    const existingItem = cartItems.find(
      (item) => item.name === selectedProduct.name
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity: 1,
      });
    }

    updateCart();
  }

  // Fungsi untuk mengurangi barang dari keranjang
  function removeFromCart(index) {
    const selectedItem = cartItems[index];
    const itemIndex = cartItems.findIndex(
      (item) => item.name === selectedItem.name
    );

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
    }

    updateCart();
  }

  // Event listener untuk tombol "+" (Tambah jumlah barang)
  incrementButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      addToCart(index);
    });
  });

  // Event listener untuk tombol "-" (Kurangi jumlah barang)
  decrementButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const selectedItem = cartItems[index];
      if (selectedItem && selectedItem.quantity > 0) {
        selectedItem.quantity--;
        updateCart();
      }
    });
  });

  // Event listener untuk tombol "Tambah Barang" (Tambah barang ke keranjang)
  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      addToCart(index);
    });
  });

  // Event listener untuk tombol "Hapus Barang" (Hapus barang dari keranjang)
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeFromCart(index);
    });
  });

  // Event listener untuk tombol "Checkout"
  checkoutButton.addEventListener("click", () => {
    const cartContent = cartItems
      .map((item) => `${item.name} - Rp ${item.price.toFixed(2)}\n`)
      .join("");
    const totalAmount = (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) *
      1.11
    ).toFixed(2);
    const struk = `Detail Pembelian:\n\n${cartContent}\nTotal Pembayaran (termasuk pajak 11%): Rp ${totalAmount}`;
    const blob = new Blob([struk], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "struk.txt";
    a.click();
  });

  // Inisialisasi tampilan keranjang
  updateCart();
});
