export async function fetchLogs(filters) {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`http://localhost:5000/api/logs?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch logs');
  }
  return response.json();
}