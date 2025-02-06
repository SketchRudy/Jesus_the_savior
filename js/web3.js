document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission

      formMessage.innerHTML = "";
      formMessage.className = "";

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
          // Send form data to the backend
          const response = await fetch("http://localhost:5000/send-message", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
          });

          const result = await response.json();

          if (result.success) {
              formMessage.innerHTML = `
                  <div class="form-popup success-message">
                      <i class="fa-solid fa-circle-check"></i> Message sent successfully!
                  </div>
              `;
              form.reset();

              setTimeout(() => {
                  formMessage.innerHTML = "";
              }, 4000);
          } else {
              formMessage.innerHTML = `
                  <div class="form-popup error-message">
                      <i class="fa-solid fa-circle-xmark"></i> Failed to send: ${result.message}
                  </div>
              `;
          }
      } catch (error) {
          console.error("Error submitting form:", error);
          formMessage.innerHTML = `
              <div class="form-popup error-message">
                  <i class="fa-solid fa-triangle-exclamation"></i> An error occurred. Please try again later.
              </div>
          `;
      }
  });
});