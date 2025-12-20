function loadLaporan() {
  const bulan = document.getElementById("bulan").value;
  if (!bulan) return alert("Pilih bulan dulu");

  const orders = DB.get("orders");
  const barang = DB.get("barang");
  const tbody = document.getElementById("detail");

  tbody.innerHTML = "";

  let totalOrder = 0;
  let totalQty = 0;
  let hitungBarang = {};

  orders.forEach(o => {
    if (!o.tanggal_kirim) return;

    const tgl = new Date(o.tanggal_kirim);
    const ym = `${tgl.getFullYear()}-${String(tgl.getMonth()+1).padStart(2,'0')}`;

    if (ym === bulan) {
      totalOrder++;
      totalQty += o.qty;

      hitungBarang[o.sku] = (hitungBarang[o.sku] || 0) + o.qty;

      const b = barang.find(x => x.sku === o.sku);

      tbody.innerHTML += `
        <tr>
          <td>${tgl.toLocaleDateString()}</td>
          <td>${o.order_id}</td>
          <td>${b ? b.nama : o.sku}</td>
          <td>${o.qty}</td>
          <td>${o.ekspedisi}</td>
        </tr>
      `;
    }
  });

  let topSku = "-";
  let max = 0;
  for (let sku in hitungBarang) {
    if (hitungBarang[sku] > max) {
      max = hitungBarang[sku];
      topSku = sku;
    }
  }

  const topBarang = barang.find(b => b.sku === topSku);

  document.getElementById("totalOrder").innerText = totalOrder;
  document.getElementById("totalQty").innerText = totalQty;
  document.getElementById("topBarang").innerText =
    topBarang ? `${topBarang.nama} (${max})` : "-";
}
