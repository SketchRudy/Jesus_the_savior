// Select all details elements
const detailsElements = document.querySelectorAll("details");

// Add event listeners to each details element
detailsElements.forEach((details) => {
    details.addEventListener("toggle", () => {
        if (details.open) {
            // Close all other details elements
            detailsElements.forEach((otherDetails) => {
                if (otherDetails !== details) {
                    otherDetails.open = false;
                }
            });
        }
    });
});
