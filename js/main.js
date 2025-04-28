  // 輸入訂單數量
document.addEventListener('DOMContentLoaded', function () {
  const API_URL = 'https://script.google.com/macros/s/AKfycbzsTUoiYbxQl8waNIKTGLtf5jGTZHiyRYAiffbAeTPTHDP5uWHUKCr1Vwm2i_1CHPnE/exec'; //我的API 網址
  const API_KEY = 'LotusSeedsLOcalOrderFormKey2025!'; //我的API KEY

  document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const data = {
      key: API_KEY,
      fbName: document.getElementById('fbName').value,
      lineName: document.getElementById('lineName').value,
      receiverName: document.getElementById('receiverName').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      shipping: document.getElementById('shipping').value,
      notes: document.getElementById('notes').value,
      product1Qty: Number(document.getElementById('product1Qty').value) || 0,
      product2Qty: Number(document.getElementById('product2Qty').value) || 0,
      product3Qty: Number(document.getElementById('product3Qty').value) || 0,
      product4Qty: Number(document.getElementById('product4Qty').value) || 0,
      product5Qty: Number(document.getElementById('product5Qty').value) || 0,
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // 注意 header 要用 headers: {}
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('訂單送出成功！感謝您的訂購！');
        document.getElementById('orderForm').reset();
      } else {
        alert('訂單送出失敗：' + result.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('發生錯誤，請稍後再試。');
    });
  });
});




//計算總經額
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
