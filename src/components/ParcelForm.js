import React, { useState } from 'react';
import axios from 'axios';

function ParcelForm({ setResults }) {
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
    destination: '',
    ecoFriendly: false,
    sortBy: 'price'
  });

  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false); // ✅ NEW loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setLoading(true); // ✅ Start loading

    const { length, width, height, weight, destination } = formData;

    if (!length || !width || !height || !weight || !destination) {
      setStatusMsg('Please fill out all fields.');
      setLoading(false);
      return;
    }

    if (length <= 0 || width <= 0 || height <= 0 || weight <= 0) {
      setStatusMsg('All dimensions and weight must be positive numbers.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://deliveryscout-backend.onrender.com/compare', formData);
      setResults(response.data.results || []);
      setStatusMsg('Delivery options loaded!');
    } catch (error) {
      console.error('Error fetching delivery options:', error);
      setResults([]);
      setStatusMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="length">Length (cm)</label>
          <input id="length" name="length" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="width">Width (cm)</label>
          <input id="width" name="width" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input id="height" name="height" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input id="weight" name="weight" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input id="destination" name="destination" type="text" placeholder="e.g. UK" onChange={handleChange} required />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="ecoFriendly" className="checkbox-label">
            <input
              id="ecoFriendly"
              name="ecoFriendly"
              type="checkbox"
              onChange={handleChange}
            />
            Eco-friendly only
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="sortBy">Sort by:</label>
          <select id="sortBy" name="sortBy" onChange={handleChange}>
            <option value="price">Price</option>
            <option value="speed">Speed</option>
            <option value="eco">Sustainability</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Compare Delivery Options'}
        </button>
      </form>

      {statusMsg && <p className="status-msg">{statusMsg}</p>}
    </>
  );
}

export default ParcelForm;
