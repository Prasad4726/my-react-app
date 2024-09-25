import React, { useState } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);
  const [newSchema, setNewSchema] = useState(''); 

  const handleSaveSegmentClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const addNewSchema = () => {
    if (newSchema) {
      const schemaToAdd = availableSchemas.find(schema => schema.value === newSchema);
      if (schemaToAdd) {
        setSelectedSchemas([...selectedSchemas, schemaToAdd]);
        setAvailableSchemas(availableSchemas.filter(schema => schema.value !== newSchema));
        setNewSchema('');
      }
    }
  };

  const handleSave = () => {
    const dataToSend = {
      segment_name: 'last_10_days_blog_visits',
      schema: selectedSchemas.reduce((acc, schema) => {
        acc[schema.value] = schema.label;
        return acc;
      }, {})
    };
    console.log('Data to send:', dataToSend);
    closePopup();
  };

  return (
    <div className="App">
      <header className="header">
        <h1>View Audience</h1>
      </header>

      <div className="content">
        <button className="save-segment-btn" onClick={handleSaveSegmentClick}>
          Save Segment
        </button>
      </div>

      {/* Sliding Popup */}
      <div className={`popup-overlay ${showPopup ? 'show' : ''}`}>
        <div className={`popup-content ${showPopup ? 'slide-in' : 'slide-out'}`}>
          <header className="popup-header">
            <h2>Saving Segment</h2>
          </header>
          <div className="popup-body">
            <label>
              Enter the Name of the Segment
              <input type="text" placeholder="Name of the segment" />
            </label>

            <p>
              To save your segment, you need to add the schemas to build the query
            </p>

            <div className="schema-section">
              <div className="schema-labels">
                <span className="user-traits-dot"></span> User Traits
                <span className="group-traits-dot"></span> Group Traits
              </div>
              {selectedSchemas.map((schema, index) => (
                <div className="schema-select" key={index}>
                  <select>
                    <option>{schema.label}</option>
                  </select>
                  <button className="remove-schema-btn" onClick={() => {
                    setAvailableSchemas([...availableSchemas, schema]);
                    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
                  }}>-</button>
                </div>
              ))}
            </div>

            <div className="add-schema-section">
              <select value={newSchema} onChange={(e) => setNewSchema(e.target.value)}>
                <option value="">Add schema to segment</option>
                {availableSchemas.map(schema => (
                  <option key={schema.value} value={schema.value}>{schema.label}</option>
                ))}
              </select>
              <button className="add-schema-btn" onClick={addNewSchema}>+ Add new schema</button>
            </div>
          </div>

          <footer className="popup-footer">
            <button className="save-btn" onClick={handleSave}>Save the Segment</button>
            <button className="cancel-btn" onClick={closePopup}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

