import { useState } from 'react';

function LogFilter({ onFilterChange }) {
  const [level, setLevel] = useState('');
  const [message, setMessage] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [timestamp_start, setTimestampStart] = useState('');
  const [timestamp_end, setTimestampEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ level, message, resourceId, timestamp_start, timestamp_end });
  };

  return (
    <form className="filter-container" onSubmit={handleSubmit}>
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="">All Levels</option>
        <option value="error">Error</option>
        <option value="warning">Warning</option>
        <option value="info">Info</option>
      </select>
      <input
        type="text"
        placeholder="Search message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Resource ID"
        value={resourceId}
        onChange={(e) => setResourceId(e.target.value)}
      />
      <input
        type="datetime-local"
        value={timestamp_start}
        onChange={(e) => setTimestampStart(e.target.value)}
      />
      <input
        type="datetime-local"
        value={timestamp_end}
        onChange={(e) => setTimestampEnd(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default LogFilter;