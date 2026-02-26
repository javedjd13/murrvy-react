const RouteFallback = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading route...</span>
      </div>
    </div>
  );
};

export default RouteFallback;
