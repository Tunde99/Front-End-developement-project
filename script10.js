// Planetary Facts Capstone Project - Main JavaScript
console.log("MY SCRIPT IS WORKING!");

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const searchInput = document.querySelector(".search-input-wrapper input");
    const searchButton = document.querySelector(".search-btn");
    const themeToggleBtn = document.querySelector(".theme-toggle");
    
    // Planet Detail Card Elements
    const planetNameEl = document.querySelector(".planet-name");
    const planetTypeEl = document.querySelector(".planet-category");
    const planetDescEl = document.querySelector(".planet-description");
    const planetImgEl = document.querySelector(".planet-image img");
    const gravityEl = document.querySelectorAll(".metric-value")[0];
    const massEl = document.querySelectorAll(".metric-value")[1];
    const periodEl = document.querySelectorAll(".metric-value")[2];
    const tempEl = document.querySelectorAll(".stat-item span")[0];
    const moonsEl = document.querySelectorAll(".stat-item span")[1];
    const diameterEl = document.querySelectorAll(".stat-item span")[2];
    const distanceEl = document.querySelectorAll(".stat-item span")[3];
    
    // Complete fallback data for all major planets
    const fallbackPlanets = {
        "mercury": {
            name: "Mercury",
            type: "Terrestrial",
            description: "The smallest planet in our solar system and closest to the Sun.",
            gravity: "3.7",
            mass: "0.330",
            period: "88",
            temperature: "440",
            moons: "0",
            diameter: "4878",
            distance: "57.9",
            image: "Images/earth.svg"
        },
        "venus": {
            name: "Venus",
            type: "Terrestrial",
            description: "A scorching hot world with a thick, toxic atmosphere trapping heat.",
            gravity: "8.87",
            mass: "4.87",
            period: "225",
            temperature: "737",
            moons: "0",
            diameter: "12104",
            distance: "108.2",
            image: "Images/earth.svg"
        },
        "earth": {
            name: "Earth",
            type: "Terrestrial",
            description: "The only known planet to support life, with liquid water on its surface.",
            gravity: "9.8",
            mass: "0.00315",
            period: "365",
            temperature: "288",
            moons: "1",
            diameter: "12756",
            distance: "149.6",
            image: "Images/earth.svg"
        },
        "mars": {
            name: "Mars",
            type: "Terrestrial",
            description: "A dusty, cold, desert world with a very thin atmosphere.",
            gravity: "3.72",
            mass: "0.00064",
            period: "687",
            temperature: "210",
            moons: "2",
            diameter: "6792",
            distance: "227.9",
            image: "Images/earth.svg"
        },
        "jupiter": {
            name: "Jupiter",
            type: "Gas Giant",
            description: "By far the largest planet in our solar system, more than twice as massive as all the other planets combined.",
            gravity: "24.79",
            mass: "1.898",
            period: "4333",
            temperature: "165",
            moons: "95",
            diameter: "142984",
            distance: "778.5",
            image: "Images/earth.svg"
        },
        "saturn": {
            name: "Saturn",
            type: "Gas Giant",
            description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system.",
            gravity: "10.44",
            mass: "0.568",
            period: "10759",
            temperature: "134",
            moons: "146",
            diameter: "120536",
            distance: "1434",
            image: "Images/earth.svg"
        },
        "uranus": {
            name: "Uranus",
            type: "Ice Giant",
            description: "An ice giant with a unique sideways tilt, spinning on its side.",
            gravity: "8.69",
            mass: "86.8",
            period: "30687",
            temperature: "76",
            moons: "28",
            diameter: "51118",
            distance: "2871",
            image: "Images/earth.svg"
        },
        "neptune": {
            name: "Neptune",
            type: "Ice Giant",
            description: "Dark, cold, and whipped by supersonic winds, Neptune is the farthest major planet.",
            gravity: "11.15",
            mass: "102",
            period: "60190",
            temperature: "72",
            moons: "16",
            diameter: "49528",
            distance: "4495",
            image: "Images/earth.svg"
        },
        "pluto": {
            name: "Pluto",
            type: "Dwarf Planet",
            description: "A complex world of ice mountains and nitrogen glaciers in the Kuiper Belt.",
            gravity: "0.62",
            mass: "0.0130",
            period: "90560",
            temperature: "40",
            moons: "5",
            diameter: "2376",
            distance: "5906",
            image: "Images/earth.svg"
        }
    };

    // Function to fetch and display planet data using the Fetch API
    async function fetchPlanetData(query) {
        const searchTerm = query.trim().toLowerCase();
        if (!searchTerm) return;
        
        if (fallbackPlanets[searchTerm]) {
            updatePlanetUI(fallbackPlanets[searchTerm]);
            return;
        }
        
        try {
            const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${searchTerm}`);
            if (!response.ok) {
                throw new Error("Planet not found");
            }
            const data = await response.json();
            updatePlanetUI({
                name: data.englishName || searchTerm,
                type: data.isPlanet ? "Planet" : "Celestial Body",
                description: `Semi-major axis: ${data.semimajorAxis || 'N/A'} km.`,
                gravity: data.gravity ? data.gravity.toString() : "N/A",
                mass: data.mass ? (data.mass.massValue * Math.pow(10, data.mass.massExponent)).toFixed(5) : "N/A",
                period: data.sideralOrbit ? Math.round(data.sideralOrbit).toString() : "N/A",
                temperature: data.avgTemp ? data.avgTemp.toString() : "288",
                moons: data.moons ? data.moons.length.toString() : "0",
                diameter: data.meanRadius ? Math.round(data.meanRadius * 2).toString() : "N/A",
                distance: data.semimajorAxis ? (data.semimajorAxis / 1000000).toFixed(1) : "N/A",
                image: "Images/earth.svg"
            });
        } catch (error) {
            console.error("Error fetching planet:", error);
        }
    }

    // Helper function to update the DOM elements with planet details
    function updatePlanetUI(planet) {
        console.log("=== FETCHED PLANET DATA ===", planet);

        if (planetNameEl) {
            planetNameEl.textContent = planet.name;
        } else {
            console.log("Missing element: .planet-name");
        }

        if (planetTypeEl) {
            planetTypeEl.textContent = planet.type;
        } else {
            console.log("Missing element: .planet-category");
        }

        if (planetDescEl) {
            planetDescEl.innerHTML = planet.description;
        } else {
            console.log("Missing element: .planet-description");
        }

        // Safely update metric values if they exist
        const metrics = document.querySelectorAll(".metric-value");
        console.log("Found metric boxes:", metrics.length);
        if (metrics.length >= 3) {
            metrics[0].textContent = planet.gravity;
            metrics[1].textContent = planet.mass;
            metrics[2].textContent = planet.period;
        } else {
            console.log("Warning: Could not find 3 elements with class .metric-value");
        }

        // Safely update secondary stats
        const stats = document.querySelectorAll(".stat-item span");
        console.log("Found stat items:", stats.length);
        if (stats.length >= 4) {
            stats[0].textContent = planet.temperature;
            stats[1].textContent = planet.moons;
            stats[2].textContent = planet.diameter;
            stats[3].textContent = planet.distance;
        } else {
            console.log("Warning: Could not find stat spans");
        }

        if (planetImgEl && planet.image) {
            planetImgEl.src = planet.image;
        }
    }



    // Event Listener for Search Button
    if (searchButton && searchInput) {
        searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            fetchPlanetData(searchInput.value);
        });
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                fetchPlanetData(searchInput.value);
            }
        });
    }

    // Theme Toggle Functionality
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            console.log("Moon icon clicked! Toggled light-mode class.");
        });
    }

    // Load default view with Earth on initial startup
    fetchPlanetData("earth");
});

