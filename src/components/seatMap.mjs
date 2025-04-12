import { Movie } from "../api/movieApi.mjs";

// Create a modal container for the seat map
function createModal() {
  const modal = document.createElement("div");
  modal.className = "seat-map-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <div class="seat-map-container">
        <h2 class="movie-title-seat-map"></h2>
        <div class="seat-map"></div>
        <div class="seat-legend">
          <div class="legend-item">
            <div class="seat available"></div>
            <span>Available</span>
          </div>
          <div class="legend-item">
            <div class="seat occupied"></div>
            <span>Occupied</span>
          </div>
          <div class="legend-item">
            <div class="seat selected"></div>
            <span>Selected</span>
          </div>
        </div>
        <div class="booking-summary">
          <p>Selected Seats: <span id="selected-seats">None</span></p>
          <p>Total Price: $<span id="total-price">0</span></p>
          <button id="confirm-booking" class="confirm-button">Confirm Booking</button>
        </div>
      </div>
    </div>
  `;

  // Use the seat-map-container instead of appending to body
  const container = document.getElementById("seat-map-container");
  if (container) {
    container.appendChild(modal);
  } else {
    // Fallback to body if container not found
    document.body.appendChild(modal);
  }

  // Close button functionality
  const closeButton = modal.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  return modal;
}

// Render the seat map for a specific movie
export function renderSeatMap(movie) {
  // Create modal if it doesn't exist
  let modal = document.querySelector(".seat-map-modal");
  if (!modal) {
    modal = createModal();
  }

  // Set movie title
  const titleElement = modal.querySelector(".movie-title-seat-map");
  titleElement.textContent = movie.title;

  // Get the seat map container
  const seatMapContainer = modal.querySelector(".seat-map");
  seatMapContainer.innerHTML = "";

  // Create screen
  const screen = document.createElement("div");
  screen.className = "screen";
  screen.textContent = "SCREEN";
  seatMapContainer.appendChild(screen);

  // Create seat rows
  const rows = {};
  movie.seats.forEach((seat) => {
    if (!rows[seat.row]) {
      rows[seat.row] = [];
    }
    rows[seat.row].push(seat);
  });

  // Sort seats by number
  Object.keys(rows).forEach((row) => {
    rows[row].sort((a, b) => a.number - b.number);
  });

  // Create seat rows in the UI
  Object.keys(rows).forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = "seat-row";

    // Add row label
    const rowLabel = document.createElement("div");
    rowLabel.className = "row-label";
    rowLabel.textContent = row;
    rowElement.appendChild(rowLabel);

    // Add seats
    const seatsContainer = document.createElement("div");
    seatsContainer.className = "seats-container";

    rows[row].forEach((seat) => {
      const seatElement = document.createElement("div");
      seatElement.className = `seat ${
        seat.occupied ? "occupied" : "available"
      }`;
      seatElement.dataset.id = seat.id;
      seatElement.dataset.row = seat.row;
      seatElement.dataset.number = seat.number;

      if (!seat.occupied) {
        seatElement.addEventListener("click", () =>
          toggleSeatSelection(seatElement)
        );
      }

      seatsContainer.appendChild(seatElement);
    });

    rowElement.appendChild(seatsContainer);
    seatMapContainer.appendChild(rowElement);
  });

  // Reset booking summary
  document.getElementById("selected-seats").textContent = "None";
  document.getElementById("total-price").textContent = "0";

  // Show the modal
  modal.style.display = "block";

  // Add event listener for confirm booking button
  const confirmButton = modal.querySelector("#confirm-booking");
  confirmButton.onclick = () => confirmBooking(movie);
}

// Toggle seat selection
function toggleSeatSelection(seatElement) {
  seatElement.classList.toggle("selected");
  updateBookingSummary();
}

// Update the booking summary
function updateBookingSummary() {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  const selectedSeatsText = document.getElementById("selected-seats");
  const totalPriceElement = document.getElementById("total-price");

  if (selectedSeats.length === 0) {
    selectedSeatsText.textContent = "None";
    totalPriceElement.textContent = "0";
    return;
  }

  const seatIds = Array.from(selectedSeats).map((seat) => seat.dataset.id);
  selectedSeatsText.textContent = seatIds.join(", ");

  // Calculate total price (assuming $10 per seat)
  const totalPrice = selectedSeats.length * 10;
  totalPriceElement.textContent = totalPrice;
}

// Confirm booking
function confirmBooking(movie) {
  const selectedSeats = document.querySelectorAll(".seat.selected");

  if (selectedSeats.length === 0) {
    alert("Please select at least one seat to continue.");
    return;
  }

  const seatIds = Array.from(selectedSeats).map((seat) => seat.dataset.id);
  const totalPrice = selectedSeats.length * 10;

  // In a real application, you would send this data to a server
  console.log(`Booking confirmed for movie: ${movie.title}`);
  console.log(`Selected seats: ${seatIds.join(", ")}`);
  console.log(`Total price: $${totalPrice}`);

  // Show confirmation message
  alert(
    `Booking confirmed for ${movie.title}!\nSelected seats: ${seatIds.join(
      ", "
    )}\nTotal price: $${totalPrice}`
  );

  // Close the modal
  document.querySelector(".seat-map-modal").style.display = "none";

  // Update the seats in the movie object (in a real app, this would be done server-side)
  movie.seats.forEach((seat) => {
    if (seatIds.includes(seat.id)) {
      seat.occupied = true;
    }
  });
}
