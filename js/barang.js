function simpanBarang() {
  const sku = document.getElementById("sku").value;
  const nama = document.getElementById("nama").value;
  const stok = parseInt(document.getElementById("stok").value);

  if (!sku || !nama || isNaN(stok)) {
    alert("Lengkapi data barang");
    return;
  }

  let barang = DB.get("barang");

  // Cegah SKU duplikat
  if (barang.find(b => b.sku === sku)) {
    alert("SKU sudah ada");
    return;
  }

  barang.push({ sku, nama, stok });
  DB.set("barang", barang);

  document.getElementById("sku").value = "";
  document.getElementById("nama").value = "";
  document.getElementById("stok").value = "";

  tampilBarang();
}

function tampilBarang() {
  let barang = DB.get("barang");
  let list = document.getElementById("list");
  list.innerHTML = "";

  if (barang.length === 0) {
    list.innerHTML = "<p>Belum ada barang</p>";
    return;
  }

  barang.forEach(b => {
    list.innerHTML += `
      <div class="list-item">
        <b>${b.sku}</b><br>
        ${b.nama}<br>
        <small>Stok: ${b.stok}</small>
        <svg id="bc-${b.sku}"></svg>
      </div>
    `;
    JsBarcode(`#bc-${b.sku}`, b.sku, { width: 2, height: 40 });
  });
}

tampilBarang();
