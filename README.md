UK TICK TRACKER

Overview
UK Tick Tracker is a React frontend that visualises tick sightings across the UK using the Elanco API.
The app shows a map of sightings, allows filtering by species, severity, date and city, and lets users report new sightings. It also includes an education area with species information, prevention tips, and seasonal activity insights.

Key features
• Interactive Leaflet map of UK tick sightings with severity based marker styling and legend
• Data fetched from the Elanco API with a sample data fallback if the API is not available
• Filters for species, city, severity and date range
• Clickable markers that open a detailed modal for each sighting
• Report form to submit new tick sightings, saved locally and shown on the map
• Education section with
− Tick species guide
− Prevention and safety tips
− Seasonal tick activity chart per city and year
• Local storage persistence for user reported sightings so reports stay after refresh
• Simple header navigation between Map view, Report Sighting and Education

Tech stack
• React with Create React App
• JavaScript
• HTML
• CSS
• React Leaflet and OpenStreetMap tiles for mapping
• Browser Fetch API for HTTP requests
• LocalStorage for client side persistence

Architecture and components

App
• Root component that holds global state for:
− API sightings
− User reported sightings
− Filtered sightings
− Selected sighting
− Current view (map, report form, education)
• Fetches tick sightings from
https://dev-task.elancoapps.com/data/tick-sightings

• If the API fetch fails, falls back to generated sample data that uses predefined tick species and UK cities
• Combines API data with user reported sightings, then applies filters for species, severity, date and city
• Saves user reported sightings to localStorage so they reload on refresh
• Exposes a “Refresh” button that reloads data from the API

Map
• Uses React Leaflet to render a UK focused map
• Shows markers for each sighting using a custom divIcon
• Marker color and size reflect severity (low, medium, high)
• Click on a marker opens a popup and also triggers the detailed modal
• Includes base layer control (standard and satellite)
• Shows legend for severity and user reported markers
• Summary panel shows total sightings, API sightings and user reports

Filters
• Sidebar panel with form controls for:
− Species (from a fixed allowed list)
− City (from the UK city list used for coordinates)
− Severity
− Start date
− End date
• “Clear filters” button resets all filters
• Small summary showing currently active filters

Report form
• Guided form to report a new tick sighting
• Fields: species, severity, date, city, optional description, optional image upload
• Species dropdown restricted to allowed UK tick species
• City dropdown based on the same list used for mapping
• Client side validation and inline error messages for required fields
• On successful submit: adds the sighting into app state, persists it to localStorage and informs the user that it will appear on the map

Sighting details modal
• Opens when a marker or popup is clicked
• Shows full details for a sighting, including:
− Species and latin name
− Severity with color highlight
− Date and time
− City and location
− Description
− Source (API data or user reported)
• When sighting comes from the API, raw API data is displayed in a scrollable JSON block
• Actions: report similar sighting, get directions, share, close (some actions are placeholders for future work)

Education section
Three tabbed views:

Species guide
• Static guide for four UK tick species
• For each species: common name, latin name, description, habitat, risk level, seasonal activity

Prevention tips
• Practical guidance for clothing, outdoor behaviour, checks after outdoor activity, tick removal and garden management
• Section on when to seek medical attention, with key warning signs

Seasonal chart
• Uses sighting data for a selected city and year
• Calculates sightings per month and renders a simple bar chart
• Shows total sightings, peak month and average monthly sightings
• Includes explanatory notes about seasonal tick activity patterns

Location and coordinates
• UK cities and their coordinates are defined in a separate utility file
• When API data is loaded, each record is mapped to a distributed UK city with randomised coordinates inside that city area
• User reported sightings use the selected city combined with generated coordinates in that city

API integration
Base data URL
https://dev-task.elancoapps.com/data

Endpoints used directly or via a service layer:
• GET /data/tick-sightings
− Used for the main sightings dataset displayed on the map
• GET /health
− Health check endpoint for the API
• GET /stats
− General statistics endpoint
• GET /data/tick-sightings/species/{species}
− Optional helper for species specific lists
• GET /data/tick-sightings/city/{city}
− Optional helper for city specific lists
• GET /data/tick-sightings/{id}
− Optional helper for detailed lookup by id

The main map view loads all sightings once, transforms them into a map friendly format, and then filters them on the client side rather than making multiple API calls.

How to run the project locally

Prerequisites
• Node.js and npm installed on your machine
• Stable LTS Node version recommended

Steps

Clone the repository
git clone YOUR_REPO_URL
cd YOUR_PROJECT_FOLDER

Install dependencies
npm install

Start the development server
npm start

Open the app
The app runs on
http://localhost:3000

Build for production
npm run build
This creates an optimised production build in the build folder.

Project structure

src
• index.js React entry point that mounts App
• index.css Global styles
• App.js Root component, data fetching, state, layout, navigation
• App.css Layout and component styling
• apiService.js API helper functions for health, stats and tick sightings
• utils
− cityCoordinates.js UK cities and coordinate helpers
• components
− Map.js Map view with markers and legend
− Filters.js Filter panel
− SightingDetails.js Modal with full sighting information
− ReportForm.js User sighting report form
− Education.js Education area container and tab logic
− SpeciesGuide.js Species information
− PreventionTips.js Prevention and safety guidance
− SeasonalChart.js Seasonal activity visualisation

Design choices

• Chose React for a clear separation between data, UI and state
• Used React Leaflet and OpenStreetMap tiles to provide a familiar, responsive map interface without backend work
• Kept all global state in App to keep the data flow explicit and easy to follow
• Used localStorage for user reports so the experience feels persistent without a backend write API
• Limited species list to four named UK tick species for consistency between API data, reporting and education content
• Applied simple severity levels, low, medium, high, to control both marker styling and legend
• Added a dedicated Education section to show understanding beyond pure data display, linking the map data to public health context
• Included loading states, error fallback and sample data generation to handle failed API calls gracefully