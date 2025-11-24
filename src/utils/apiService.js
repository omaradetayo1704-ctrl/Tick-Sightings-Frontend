
const BASE_URL = 'https://dev-task.elancoapps.com/data';

const apiService = {
  async checkHealth() {
    try {
      const response = await fetch('https://dev-task.elancoapps.com/health');
      if (!response.ok) throw new Error('API health check failed');
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error.message);
      throw error;
    }
  },

  async getStats() {
    try {
      const response = await fetch('https://dev-task.elancoapps.com/stats');
      if (!response.ok) throw new Error('Stats fetch failed');
      return await response.json();
    } catch (error) {
      console.error('Stats fetch failed:', error.message);
      throw error;
    }
  },

  async getAllSightings() {
    try {
      console.log('Fetching all sightings from:', `${BASE_URL}/tick-sightings`);
      const response = await fetch(`${BASE_URL}/tick-sightings`);
      if (!response.ok) throw new Error(`Failed to fetch sightings: ${response.status}`);
      const data = await response.json();
      console.log('Raw API data received:', data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('API fetch failed:', error.message);
      throw error;
    }
  },

  async getSightingsBySpecies(species) {
    try {
      const response = await fetch(`${BASE_URL}/tick-sightings/species/${encodeURIComponent(species)}`);
      if (!response.ok) throw new Error('Species filter failed');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Species filter failed:', error.message);
      throw error;
    }
  },

  async getSightingsByCity(city) {
    try {
      const response = await fetch(`${BASE_URL}/tick-sightings/city/${encodeURIComponent(city)}`);
      if (!response.ok) throw new Error('City filter failed');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('City filter failed:', error.message);
      throw error;
    }
  },

  async getSightingById(id) {
    try {
      const response = await fetch(`${BASE_URL}/tick-sightings/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.log('Sighting not found, this is expected for sample data');
          return null;
        }
        throw new Error('Sighting details fetch failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Sighting details fetch failed:', error.message);
      throw error;
    }
  }
};

export default apiService;