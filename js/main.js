document.addEventListener('DOMContentLoaded', function () {
  const API_URL = 'https://script.google.com/macros/s/AKfycbzsTUoiYbxQl8waNIKTGLtf5jGTZHiyRYAiffbAeTPTHDP5uWHUKCr1Vwm2i_1CHPnE/exec';
  const API_KEY = 'LotusSeedsLOcalOrderFormKey2025!';

  const productPrices = {
    product1Qty: 450, // 去膜去芯蓮子
    product2Qty: 420, // 含膜去芯蓮子
    product3Qty: 400, // 含膜含芯蓮子
    product4Qty: 500, // 蓮藕粉
    product5Qty: 0  // 蓮子芯
  };

  let currentTotal = 0;
  let displayedTotal = 0;
  let animationFrameId;

  function calculateShipping(totalQty) {
    if (totalQty >= 20) return 0;
    if (totalQty >= 6) return 235;
    if (totalQty >= 1) return 170;
    return 0; // 沒有購買商品，運費0
  }

  function animateTotal() {
    if (Math.abs(currentTotal - displayedTotal) < 1) {
      displayedTotal = currentTotal;
      renderTotal(displayedTotal);
      return;
    }
    displayedTotal += (currentTotal - displayedTotal) * 0.2;
    renderTotal(displayedTotal);
    animationFrameId = requestAnimationFrame(animateTotal);
  }

  function renderTotal(total) {
    document.getElementById('totalAmount').innerHTML = `<strong>總金額：${Math.round(total)} 元</strong>`;
  }

  function updateSummary() {
    let summaryHTML = '';
    let total = 0;
    let totalQty = 0;

    for (const [productId, price] of Object.entries(productPrices)) {
      const qty = Number(document.getElementById(productId).value) || 0;
      if (qty > 0) {
        const subtotal = qty * price;
        summaryHTML += `<li>${document.getElementById(productId).placeholder}：${qty}斤(包)，共 ${subtotal} 元</li>`;
        total += subtotal;
        totalQty += qty;
      }
    }

    const shippingFee = calculateShipping(totalQty);
    if (totalQty > 0) {
      summaryHTML += `<li>運費：${shippingFee} 元</li>`;
      total += shippingFee;
    }

    currentTotal = total;

    if (summaryHTML === '') {
      document.getElementById('orderSummary').innerHTML = '<p>尚未選購商品</p>';
      document.getElementById('totalAmount').innerHTML = '';
    } else {
      document.getElementById('orderSummary').innerHTML = `
        <ul>${summaryHTML}</ul>
        <div id="totalAmount"></div>
      `;
      cancelAnimationFrame(animationFrameId);
      animateTotal();
    }
  }

  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateSummary);
  });

  document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (currentTotal === 0) {
      alert('請至少選購一樣商品再送出訂單喔！🙏');
      return;
    }
    
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('訂單送出成功！感謝您的訂購！🎉');
        document.getElementById('orderForm').reset();
        updateSummary();
      } else {
        alert('訂單送出失敗：' + result.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('發生錯誤，請稍後再試。');
    });
  });

  updateSummary();
});
