import { useState } from 'react';
import LogFilter from './components/LogFilter';
import LogTable from './components/LogTable';
import { fetchLogs } from './utils/api';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (filters) => {
    setLoading(true);
    fetchLogs(filters)
      .then(data => setLogs(data))
      .catch(error => console.error('Error fetching logs:', error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <h1>Log Query Interface</h1>
      <LogFilter onFilterChange={handleFilterChange} />
      {loading ? <p>Loading...</p> : <LogTable logs={logs} />}
    </div>
  );
}

export default App;