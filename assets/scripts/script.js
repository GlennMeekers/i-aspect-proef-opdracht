document.addEventListener("DOMContentLoaded", () => {
  // Load content parts
  document.querySelectorAll("[data-include]").forEach(async (el) => {
    const file = el.getAttribute("data-include");
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;
  });

  // Set position when menu is opened (e.g., after toggle)
  document.querySelector(".navbar-toggle").addEventListener("click", () => {
    setResponsiveMenuPosition();
    document.querySelector("#navbarMenu").classList.toggle("is-active");
    document.querySelector(".navbar-toggle").classList.toggle("is-active");
  });

  // Set position on initial load
  window.addEventListener("load", setResponsiveMenuPosition);

  // Set position on resize (in case header height changes)
  window.addEventListener("resize", setResponsiveMenuPosition);

  // Submenu toggles
  const toggles = document.querySelectorAll(".sub-menu-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const wrapper = toggle.closest(".navbar-item");
      const currentDropdown = wrapper.querySelector(".navbar-dropdown");

      // Close all other dropdowns
      document
        .querySelectorAll(".navbar-dropdown.is-active")
        .forEach((dropdown) => {
          if (dropdown !== currentDropdown) {
            dropdown.style.maxHeight = "0";
            dropdown.classList.remove("is-active");
          }
        });

      if (currentDropdown.classList.contains("is-active")) {
        currentDropdown.style.maxHeight = "0";
        currentDropdown.classList.remove("is-active");
      } else {
        currentDropdown.style.maxHeight = currentDropdown.scrollHeight + "px";
        currentDropdown.classList.add("is-active");
      }
    });
  });
});

jQuery(document).ready(function ($) {
  //   Init Slick slider
  $(".slider-container").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// Responsive menu position
function setResponsiveMenuPosition() {
  const header = document.querySelector("header");
  const menu = document.querySelector("#navbarMenu");

  if (window.innerWidth < 1024 && header && menu) {
    const headerHeight = header.offsetHeight;
    menu.style.top = `${headerHeight}px`;
  } else if (menu) {
    // Reset top value when screen is larger
    menu.style.top = "";
  }
}
