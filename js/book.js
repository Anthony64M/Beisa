document.addEventListener("DOMContentLoaded", function () {
    // Define available booking dates (you can replace this with your data)
    const availableDates = ["2023-09-15", "2023-09-20", "2023-09-25"];
  
    const currentMonthElement = document.getElementById("current-month");
    const calendarBody = document.querySelector(".calendar tbody");
  
    let currentDate = new Date();
    let selectedDate = null;
  
    // Function to update the calendar
    function updateCalendar(monthOffset = 0) {
      currentDate.setMonth(currentDate.getMonth() + monthOffset);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
  
      // Update the current month header
      currentMonthElement.textContent = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
      }).format(currentDate);
  
      // Clear the calendar
      calendarBody.innerHTML = "";
  
      // Create calendar cells for the month
      let dayCounter = 1;
      for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          const cell = document.createElement("td");
  
          if (i === 0 && j < firstDayOfMonth) {
            // Empty cell before the 1st day of the month
            cell.textContent = "";
          } else if (dayCounter <= daysInMonth) {
            cell.textContent = dayCounter;
            const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayCounter).padStart(2, "0")}`;
            const isAvailable = availableDates.includes(dateString);
  
            // Add classes for styling and availability status
            cell.classList.add("calendar-day");
            if (!isAvailable) {
              cell.classList.add("unavailable");
            } else {
              cell.addEventListener("click", function () {
                handleDateSelection(dateString);
              });
            }
            if (dateString === selectedDate) {
              cell.classList.add("selected");
            }
  
            dayCounter++;
          } else {
            // Empty cell after the last day of the month
            cell.textContent = "";
          }
  
          row.appendChild(cell);
        }
        calendarBody.appendChild(row);
      }
    }
  
    // Handle date selection
    function handleDateSelection(dateString) {
      if (selectedDate) {
        // Deselect the previously selected date
        document.querySelector(".calendar-day.selected").classList.remove("selected");
      }
  
      // Select the new date
      selectedDate = dateString;
      document.querySelector(`.calendar-day[data-date="${dateString}"]`).classList.add("selected");
  
      // Update the check-in and check-out date fields in the form (optional)
      document.getElementById("check-in-date").value = dateString;
      document.getElementById("check-out-date").value = dateString;
    }
  
    // Previous month button
    document.getElementById("prev-month").addEventListener("click", function () {
      updateCalendar(-1);
    });
  
    // Next month button
    document.getElementById("next-month").addEventListener("click", function () {
      updateCalendar(1);
    });
  
    // Initialize the calendar
    updateCalendar();
  
    // Form submission handler
    const paymentForm = document.getElementById("payment-form");
    paymentForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Add your form submission logic here
      // You can access form fields using their IDs, e.g., document.getElementById("full-name").value
  
      // Example: Validate the form fields
      const fullName = document.getElementById("full-name").value;
      const email = document.getElementById("email").value;
      const checkInDate = document.getElementById("check-in-date").value;
      const checkOutDate = document.getElementById("check-out-date").value;
      const guests = document.getElementById("guests").value;
      const cardNumber = document.getElementById("card-number").value;
      const cardName = document.getElementById("card-name").value;
      const expirationMonth = document.getElementById("expiration-month").value;
      const expirationYear = document.getElementById("expiration-year").value;
      const cvv = document.getElementById("cvv").value;
  
      // Example: Basic validation (you can add more specific validation)
      if (!fullName || !email || !checkInDate || !checkOutDate || !guests || !cardNumber || !cardName || !expirationMonth || !expirationYear || !cvv) {
        alert("Please fill in all fields.");
        return;
      }
  
      // Add your form submission logic here (e.g., sending data to a server)
      const formData = new FormData(paymentForm);
  
      // Create an object from form data
      const formDataObject = {};
      formData.forEach(function (value, key) {
        formDataObject[key] = value;
      });
  
      // Send the form data to the server
      fetch("YOUR_SERVER_ENDPOINT_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the server's response (e.g., display a success message)
          console.log("Server response:", data);
          alert("Payment successful!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while processing your payment. Please try again.");
        });
    });
  });
  