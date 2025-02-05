document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item details");
  
    faqItems.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) {
          // Close all other open details elements
          faqItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.open) {
              otherItem.open = false;
            }
          });
        }
      });
    });
  });
  