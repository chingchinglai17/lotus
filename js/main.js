function updateCartSummary() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalAmountElement = document.getElementById('totalAmount');
  cartItemsContainer.innerHTML = ''; // 清空原本的內容

  let totalAmount = 0;
  const products = [
    { id: 'product1Qty', name: '去膜去芯蓮子' },
    { id: 'product2Qty', name: '含膜去芯蓮子' },
    { id: 'product3Qty', name: '含膜含芯蓮子' },
    { id: 'product4Qty', name: '蓮藕粉' },
    { id: 'product5Qty', name: '蓮芯' }
  ];

  products.forEach(product => {
    const qtyInput = document.getElementById(product.id);
    const quantity = Number(qtyInput.value) || 0;
    const price = Number(qtyInput.dataset.price) || 0;
    if (quantity > 0) {
      const subtotal = quantity * price;
      totalAmount += subtotal;

      // 建立每個商品的訂購行
      const item = document.createElement('div');
      item.textContent = `${product.name} x ${quantity} = ${subtotal} 元`;
      cartItemsContainer.appendChild(item);
    }
  });

  totalAmountElement.textContent = totalAmount.toLocaleString(); // 加上千分位
}
