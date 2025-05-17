document.addEventListener("DOMContentLoaded", () => {
  // Busca funcional
  const searchInput = document.querySelector(".search-box input");
  const filterItems = document.querySelectorAll(".filter-item");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const termo = searchInput.value.toLowerCase();
      filterItems.forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(termo) ? "" : "none";
      });
    });
  }

  // Abrir modal
  const addBtn = document.querySelector(".add-btn");
  const modal = document.getElementById("modalForm");
  const closeModal = document.querySelector(".close-modal");

  if (addBtn && modal && closeModal) {
    addBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});
