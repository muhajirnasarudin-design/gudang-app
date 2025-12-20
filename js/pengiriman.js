function tampilPengiriman() {
  const orders = DB.get("orders");
  const barang = DB.get("barang");
  const el = document.getElementById("kirimList");

  el.innerHTML = "";

  const siapKirim = orders.filter(o => o.status === "diproses");

  if (siapKirim.length === 0) {
    el.innerHTML = "<p>Tidak ada order siap kirim</p>";
    return;
  }

  siapKirim.forEach(o => {
    const b = barang.find(x => x.sku === o.sku);
    const namaBarang = b ? b.nama : "Barang tidak ditemukan";

    el.innerHTML += `
      <div class="list-item">
        <b>Order ID:</b> ${o.order_id}<br>
        <b>Platform:</b> ${o.platform}<br>
        <b>Barang:</b> ${namaBarang} (${o.sku})<br>
        <b>Qty:</b> ${o.qty}<br>

        <input id="ekspedisi-${o.order_id}" placeholder="Ekspedisi (JNE/J&T/SiCepat)">
        <input id="resi-${o.order_id}" placeholder="Nomor Resi">

        <button onclick="kirim('${o.order_id}')">Kirim Barang</button>
      </div>
    `;
  });
}

function kirim(order_id) {
  let orders = DB.get("orders");
  let barang = DB.get("barang");

  let o = orders.find(x => x.order_id === order_id);
  if (!o) return alert("Order tidak ditemukan");

  const ekspedisi = document.getElementById(`ekspedisi-${order_id}`).value;
  const resi = document.getElementById(`resi-${order_id}`).value;

  if (!ekspedisi || !resi) {
    alert("Ekspedisi dan resi wajib diisi");
    return;
  }

  let b = barang.find(x => x.sku === o.sku);
  if (!b) {
    alert("Barang tidak ditemukan");
    return;
  }

  if (b.stok < o.qty) {
    alert("Stok tidak mencukupi");
    return;
  }

  // POTONG STOK (STOK KELUAR)
  b.stok -= o.qty;

  // UPDATE ORDER
  o.status = "dikirim";
  o.ekspedisi = ekspedisi;
  o.resi = resi;
  o.tanggal_kirim = new Date().toISOString();

  // SIMPAN RIWAYAT STOK KELUAR
  let stokKeluar = DB.get("stok_keluar");
  stokKeluar.push({
    sku: o.sku,
    qty: o.qty,
    order_id: o.order_id,
    tanggal: o.tanggal_kirim
  });

  DB.set("barang", barang);
  DB.set("orders", orders);
  DB.set("stok_keluar", stokKeluar);

  alert("Barang berhasil dikirim & stok dikurangi");
  tampilPengiriman();
}

tampilPengiriman();
