/* Filename: web3.js */

// Store your Web3Forms API key here
const API_KEY = "835d96a9-4833-4523-bb09-5241f17cac91";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous messages
    formMessage.innerHTML = "";
    formMessage.className = "";

    // Collect form data into an object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Append the API key to the data payload
    data.access_key = API_KEY;

    try {
      // Send the form data to the Web3Forms endpoint
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        formMessage.innerHTML = `
          <div class="form-popup success-message">
            <i class="fa-solid fa-circle-check"></i> Message sent successfully!
          </div>
        `;
        form.reset();

        // Automatically remove the message after 4 seconds
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
      console.error("Error submitting the form:", error);
      formMessage.innerHTML = `
        <div class="form-popup error-message">
          <i class="fa-solid fa-triangle-exclamation"></i> An error occurred. Please try again later.
        </div>
      `;
    }
  });
});
