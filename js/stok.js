function stokMasuk() {
  const sku = document.getElementById("sku").value;
  const qty = parseInt(document.getElementById("qty").value);

  if (!sku || !qty) {
    alert("SKU dan jumlah wajib diisi");
    return;
  }

  let barang = DB.get("barang");
  let item = barang.find(b => b.sku === sku);

  if (!item) {
    alert("Barang tidak ditemukan di master");
    return;
  }

  item.stok += qty;

  // simpan histori stok masuk
  let histori = DB.get("stok_masuk");
  histori.push({
    sku: sku,
    qty: qty,
    tanggal: new Date().toISOString()
  });

  DB.set("barang", barang);
  DB.set("stok_masuk", histori);

  alert("Stok berhasil ditambahkan");
}
