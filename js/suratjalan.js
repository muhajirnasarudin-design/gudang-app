function tampilSuratJalan() {
  const orders = DB.get("orders");
  const barang = DB.get("barang");
  const el = document.getElementById("suratList");

  el.innerHTML = "";

  const dikirim = orders.filter(o => o.status === "dikirim");

  if (dikirim.length === 0) {
    el.innerHTML = "<p>Tidak ada surat jalan</p>";
    return;
  }

  dikirim.forEach(o => {
    const b = barang.find(x => x.sku === o.sku);
    const namaBarang = b ? b.nama : "-";

    const idBarcode = `barcode-${o.order_id}`;

    el.innerHTML += `
      <div class="card surat">
        <h2>SURAT JALAN</h2>
        <hr>

        <p><b>Order ID:</b> ${o.order_id}</p>
        <p><b>Platform:</b> ${o.platform}</p>
        <p><b>Nama Barang:</b> ${namaBarang}</p>
        <p><b>SKU:</b> ${o.sku}</p>
        <p><b>Qty:</b> ${o.qty}</p>
        <p><b>Ekspedisi:</b> ${o.ekspedisi}</p>
        <p><b>Resi:</b> ${o.resi}</p>
        <p><b>Tanggal Kirim:</b> ${new Date(o.tanggal_kirim).toLocaleString()}</p>

        <svg id="${idBarcode}"></svg>

        <hr>
        <p style="font-size:12px">Gudang App • Surat Jalan Resmi</p>
      </div>
      <br>
    `;

    setTimeout(() => {
      JsBarcode(`#${idBarcode}`, o.resi || o.order_id, {
        format: "CODE128",
        width: 2,
        height: 50,
        displayValue: true
      });
    }, 100);
  });
}

tampilSuratJalan();
