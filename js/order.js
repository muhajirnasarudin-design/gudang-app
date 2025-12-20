function tampilOrder() {
  const orders = DB.get("orders");
  const barang = DB.get("barang");
  const el = document.getElementById("orderList");

  el.innerHTML = "";

  if (orders.length === 0) {
    el.innerHTML = "<p>Belum ada order</p>";
    return;
  }

  orders.forEach(o => {
    const b = barang.find(x => x.sku === o.sku);
    const namaBarang = b ? b.nama : "Barang tidak ditemukan";

    el.innerHTML += `
      <div class="list-item">
        <b>Order ID:</b> ${o.order_id}<br>
        <b>Platform:</b> ${o.platform}<br>
        <b>Barang:</b> ${namaBarang} (${o.sku})<br>
        <b>Qty:</b> ${o.qty}<br>
        <b>Status:</b> ${o.status}<br><br>

        ${o.status === "pending" ? 
          `<button onclick="proses('${o.order_id}')">Proses Order</button>` 
          : `<small>✔ Sudah diproses</small>`
        }
      </div>
    `;
  });
}

function proses(order_id) {
  let orders = DB.get("orders");
  let o = orders.find(x => x.order_id === order_id);

  if (!o) {
    alert("Order tidak ditemukan");
    return;
  }

  o.status = "diproses";
  DB.set("orders", orders);

  alert("Order diproses (Pick & Pack)");
  tampilOrder();
}

tampilOrder();
