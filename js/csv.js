function loadCSV(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split("\n");
    let orders = DB.get("orders");

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const data = lines[i].split(",");
      const order_id = data[0]?.trim();
      const sku = data[1]?.trim();
      const qty = parseInt(data[2]);
      const platform = data[3]?.trim();

      if (!order_id || !sku || !qty) continue;

      orders.push({
        order_id,
        sku,
        qty,
        platform,
        status: "pending",
        tanggal: new Date().toISOString()
      });
    }

    DB.set("orders", orders);
    alert("Order CSV berhasil diimport");
  };

  reader.readAsText(file);
}
