const searchForm = document.querySelector("#planet-search-form");
const searchInput = document.querySelector("#planet-search");
const searchResults = document.querySelector("#search-results");
const planetCard = document.querySelector("#earth-card");
const searchHint = document.querySelector("#hint")

const planetImage = document.querySelector("#planet-image");
const planetName = document.querySelector("#planet");
const planetType = document.querySelector(".planet-type");
const planetDescription = document.querySelector("#planet-description");

const searchButton = searchForm.querySelector("button[type='submit']");
const themeButton = document.querySelector(".theme-toggle");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = searchInput.value.trim().toLowerCase();

  if (!name) return;

  searchButton.disabled = false;
  searchHint.textContent = "";

  try {
    const response = await fetch("./test.json");

    if (!response.ok) {
      throw new Error("Could not load test.json");
    }

    const planets = await response.json();

    const planet = planets.find(
      (item) => item.name.toLowerCase() === name
    );

    if (!planet) {
      searchResults.hidden = false;
      planetCard.hidden = true;
      searchHint.textContent = "No results";
      return;
    }

    searchResults.hidden = true;
    searchHint.textContent="";

    planetName.textContent = planet.name;
    planetType.textContent = planet.type;
    planetDescription.textContent = planet.description;

    planetImage.src = planet.image;
    planetImage.alt = planet.name;

    document.querySelector("#planet-gravity").textContent = planet.gravity;
    document.querySelector("#planet-mass").textContent = planet.mass;
    document.querySelector("#planet-period").textContent = planet.period;
    document.querySelector("#planet-temperature").textContent = planet.temperature;
    document.querySelector("#planet-moons").textContent = planet.moons;
    document.querySelector("#planet-diameter").textContent = planet.diameter;
    document.querySelector("#planet-distance").textContent = planet.distanceFromSun;
  
    searchResults.hidden = true;
    planetCard.hidden = false;

  } catch (error) {
    console.error(error);
  } finally {
    searchButton.disabled = false;
  }
});




const themeLabel = themeButton.querySelector("span");
const themeIcon = themeButton.querySelector("svg");
const MOON = '<path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z"/>';
const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

function applyTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeLabel.textContent = dark ? "LIGHT" : "DARK";
  themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  themeIcon.innerHTML = dark ? SUN : MOON;
}

applyTheme("light");

themeButton.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});