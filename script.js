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


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  const slides = document.getElementsByClassName("slideshow-slide");
  const dots = document.getElementsByClassName("slide-dot");
  
  // Wrap around if out of range
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove 'active' (or whichever highlight class) from all dots
  for (let i = 0; i < dots.length; i++) {
    // If you created a .active class for the dot, remove it:
    dots[i].classList.remove("active");
  }

  // Display current slide and highlight the dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active"); 
}


