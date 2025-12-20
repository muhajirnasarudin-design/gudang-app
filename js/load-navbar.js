// Load sidebar ke setiap halaman
fetch('assets/navbar.html')
  .then(res => res.text())
  .then(data => {
    document.body.insertAdjacentHTML('afterbegin', data);

    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");
    const toggle = document.getElementById("toggleSidebar");

    toggle.addEventListener("click", () => {
      if(sidebar.style.display === "none") {
        sidebar.style.display = "block";
        content.style.marginLeft = "210px";
      } else {
        sidebar.style.display = "none";
        content.style.marginLeft = "10px";
      }
    });
  })
  .catch(err => console.error("Gagal load sidebar:", err));
