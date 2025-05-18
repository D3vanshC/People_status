import { useState, useEffect } from 'react';
import './master.css';

function Master() {
  const [searchTerm, setSearchTerm] = useState('');
  const [peopleInside, setPeopleInside] = useState([]);
  const [peopleOutside, setPeopleOutside] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    //api calls


    fetchPeopleData();
  }, []);

  const fetchPeopleData = async () => {
    setLoading(true);
    try {

        const response = await fetch('http', {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
            })

        //using mockdata insted of response
        
      const mockData = {
        inside: [
          { id: 1, name: 'choco', status: 'inside', lastUpdated: '2025-05-18T10:30:00' },
          { id: 2, name: 'ronin', status: 'inside', lastUpdated: '2025-05-18T09:45:00' },
          { id: 3, name: 'phoenix', status: 'inside', lastUpdated: '2025-05-18T11:15:00' },
          { id: 4, name: 'nano', status: 'inside', lastUpdated: '2025-05-18T08:20:00' },
          { id: 5, name: 'panda', status: 'inside', lastUpdated: '2025-05-18T10:00:00' },
        ],
        outside: [
          { id: 6, name: 'nawab', status: 'outside', lastUpdated: '2025-05-18T07:30:00' },
          { id: 7, name: 'emvee', status: 'outside', lastUpdated: '2025-05-18T08:45:00' },
          { id: 8, name: 'oggy', status: 'outside', lastUpdated: '2025-05-18T09:10:00' },
          { id: 9, name: 'jaadu', status: 'outside', lastUpdated: '2025-05-18T11:30:00' },
          { id: 10, name: 'jhaplu', status: 'outside', lastUpdated: '2025-05-18T10:50:00' },
        ]
      };

      // Set state with mock data
      setPeopleInside(mockData.inside);
      setPeopleOutside(mockData.outside);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching people data:', error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPeopleInside = peopleInside.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPeopleOutside = peopleOutside.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
  };

  return (
    <div className="app-container">
        <h2>    People Tracker - Admin Window    </h2>
      <div className="app-content">
        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search people..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>

        {/* Results Section - Weather/Status */}
        <div className="result-container">
          {selectedPerson ? (
            <div className="status-display">
              <h3>{selectedPerson.name}</h3>
              <p className={`status ${selectedPerson.status}`}>
                Currently <span>{selectedPerson.status}</span>
              </p>
              <p className="last-updated">
                Last updated: {new Date(selectedPerson.lastUpdated).toLocaleTimeString()}
              </p>
              <button 
                className="back-button" 
                onClick={() => {
                    setSelectedPerson(null);
                    setSearchTerm('');}}
              >
                Back to List
              </button>
            </div>
          ) : (
            <div className="placeholder-text">
              Select a person to see their status
            </div>
          )}
        </div>

        {/* Lists Section */}
        <div className="lists-container">
          {/* Inside List */}
          <div className="list-wrapper">
            <h2>People Inside 📥</h2>
            <div className="people-list">
              {loading ? (
                <p>Loading inside list...</p>
              ) : filteredPeopleInside.length > 0 ? (
                filteredPeopleInside.map(person => (
                  <div 
                    key={person.id} 
                    className="person-item"
                    onClick={() => handleSelectPerson(person)}
                  >
                    <span>{person.name}</span>
                  </div>
                ))
              ) : (
                <p><br></br>🔍 No people found inside matching your search.
</p>
              )}
            </div>
          </div>

          {/* Outside List */}
          <div className="list-wrapper">
            <h2>People Outside 📤</h2>
            <div className="people-list">
              {loading ? (
                <p>Loading outside list...</p>
              ) : filteredPeopleOutside.length > 0 ? (
                filteredPeopleOutside.map(person => (
                  <div 
                    key={person.id} 
                    className="person-item"
                    onClick={() => handleSelectPerson(person)}
                  >
                    <span>{person.name}</span>
                  </div>
                ))
              ) : (
                <p><br></br>🔍 No people found outside matching your search.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Master;