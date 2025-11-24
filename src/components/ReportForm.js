import React, { useState } from 'react';

const ReportForm = ({ onCancel, onSubmit, cities, allowedSpecies }) => {
  const [formData, setFormData] = useState({
    species: '',
    severity: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    description: '',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.species.trim()) newErrors.species = 'Species is required';
    if (!formData.severity) newErrors.severity = 'Severity is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      alert('Sighting reported successfully! It will appear on the map.');
      onCancel();
    }, 1000);
  };

  return (
    <div className="report-form-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Report a Tick Sighting</h1>
          <p>Help track tick activity across the UK by reporting your sighting</p>
        </div>
        
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-grid">
            <div className="form-section">
              <h3>Sighting Details</h3>
              
              <div className="form-group">
                <label>Species *</label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  className={errors.species ? 'error' : ''}
                >
                  <option value="">Select Species</option>
                  {allowedSpecies.map(species => (
                    <option key={species} value={species}>{species}</option>
                  ))}
                </select>
                {errors.species && <span className="error-text">{errors.species}</span>}
                <div className="help-text">Select from predefined UK tick species</div>
              </div>

              <div className="form-group">
                <label>Severity *</label>
                <select 
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className={errors.severity ? 'error' : ''}
                >
                  <option value="">Select Severity Level</option>
                  <option value="low">Low - Single tick, no signs of disease</option>
                  <option value="medium">Medium - Multiple ticks or signs of irritation</option>
                  <option value="high">High - Heavy infestation or signs of tick-borne disease</option>
                </select>
                {errors.severity && <span className="error-text">{errors.severity}</span>}
              </div>

              <div className="form-group">
                <label>Date of Sighting *</label>
                <input 
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-text">{errors.date}</span>}
              </div>
            </div>

            <div className="form-section">
              <h3>Location Information</h3>

              <div className="form-group">
                <label>City/Town *</label>
                <select 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? 'error' : ''}
                >
                  <option value="">Select your location</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the sighting in detail...
• Where exactly was it found? (park, garden, woodland, etc.)
• What was it found on? (person, pet, wildlife)
• Any unusual behavior or characteristics?
• Weather conditions at the time"
                  rows="6"
                />
                <div className="help-text">Provide as much detail as possible to help with tracking and identification</div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            
            <div className="form-group">
              <label>Upload Image (Optional)</label>
              <div className="file-upload">
                <input 
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
                <div className="file-upload-help">
                  <p>Upload a clear photo of the tick if possible. This helps with species identification.</p>
                  <ul>
                    <li>Supported formats: JPG, PNG, GIF</li>
                    <li>Maximum file size: 5MB</li>
                    <li>Tip: Take photo against a light background for better visibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting Report...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>

        <div className="form-footer">
          <h4>Why Report Tick Sightings?</h4>
          <div className="benefits-grid">
            <div className="benefit">
              <strong>Track Spread</strong>
              <p>Help monitor the spread of ticks across the UK</p>
            </div>
            <div className="benefit">
              <strong>Public Health</strong>
              <p>Contribute to public health awareness and prevention</p>
            </div>
            <div className="benefit">
              <strong>Research</strong>
              <p>Support scientific research on tick-borne diseases</p>
            </div>
            <div className="benefit">
              <strong>Community</strong>
              <p>Help your local community stay informed about risks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;