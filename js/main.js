let allDestinations = [];

// Fetch the data
fetch("locations.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    allDestinations = data; // store globally for reuse
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
  });

// Listen to search
document.getElementById("search").addEventListener("click", function (e) {
  e.preventDefault(); // prevent form reload
  const query = document.getElementById("search-area").value.toLowerCase();

  const results = allDestinations.filter(
    (item) =>
      item.type.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  displayCards(results);
});

// Helper to display cards
function displayCards(data) {
  const container = document.querySelector("main");

  // Remove any previous results
  const oldSection = document.querySelector(".results-section");
  if (oldSection) oldSection.remove();

  // Create fixed section
  const section = document.createElement("section");
  section.className = "results-section";
  section.style.position = "fixed";
  section.style.top = "80px"; // Space below navbar
  section.style.right = "20px";
  section.style.width = "330px";
  section.style.maxHeight = "85vh";
  section.style.overflowY = "auto";
  section.style.zIndex = "9999";
  section.style.backgroundColor = "#ffffff";
  section.style.boxShadow = "0 0 12px rgba(0,0,0,0.1)";
  section.style.padding = "10px";
  section.style.borderRadius = "8px";

  // No results message
  if (data.length === 0) {
    section.innerHTML = `<p class="text-danger">No results found.</p>`;
  } else {
    data.forEach((item) => {
      const card = `
        <div style="margin-bottom: 1rem;">
          <div class="card h-100">
            <img src="${item.image_url}" class="card-img-top location-image" alt="${item.name}">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text"><strong>Location:</strong> ${item.location}</p>
              <p class="card-text">${item.description}</p>
              <span class="badge bg-primary">${item.type}</span>
            </div>
          </div>
        </div>
      `;
      section.innerHTML += card;
    });
  }

  container.appendChild(section);
}
