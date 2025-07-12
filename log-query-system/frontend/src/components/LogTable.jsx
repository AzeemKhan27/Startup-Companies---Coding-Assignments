function LogTable({ logs }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Level</th>
          <th>Message</th>
          <th>Resource ID</th>
          <th>Trace ID</th>
          <th>Span ID</th>
          <th>Commit</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log.id} className={log.level}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.level}</td>
            <td>{log.message}</td>
            <td>{log.resourceId || '-'}</td>
            <td>{log.traceId || '-'}</td>
            <td>{log.spanId || '-'}</td>
            <td>{log.commit || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LogTable;