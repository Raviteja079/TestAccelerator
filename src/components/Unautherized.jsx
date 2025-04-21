const Unauthorized = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>403 - Unauthorized</h2>
      <p>You don't have permission to view this page.</p>
      <a href="/dashboard">Go back to dashboard</a>
    </div>
  );
};

export default Unauthorized;
