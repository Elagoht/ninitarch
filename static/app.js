// Main application logic
document.addEventListener("DOMContentLoaded", async () => {
  // Load data from API
  try {
    const response = await fetch("/api/data");
    const data = await response.json();

    const categoriesContainer = document.getElementById("categories-container");
    const categories = [
      { name: "Essentials", data: data.Essentials },
      { name: "Development", data: data.Development },
      { name: "Terminal", data: data.Terminal },
      { name: "Gaming", data: data.Gaming },
      { name: "Games", data: data.Games },
    ];

    categories.forEach((category, index) => {
      if (!category.data) return;

      const container = document.createElement("apps-container");
      container.setAttribute("category", category.name);
      container.setAttribute("odd", (index % 2 === 1).toString());

      // Iterate through subcategories
      Object.entries(category.data).forEach(([subcategoryName, apps]) => {
        const appList = document.createElement("app-list");
        appList.setAttribute("title", subcategoryName);

        apps.forEach((app) => {
          const appItem = document.createElement("app-item");
          appItem.setAttribute("name", app.name);
          appItem.setAttribute("package", app.package);
          appItem.setAttribute("image", app.image);
          appList.appendChild(appItem);
        });

        container.appendChild(appList);
      });

      categoriesContainer.appendChild(container);
    });

    // Initialize scroll to top button
    initScrollToTop();
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

function initScrollToTop() {
  const scrollBtn = document.getElementById("scroll-to-top");
  scrollBtn.textContent = "Scroll to top ↑";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
