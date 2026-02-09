function WaterCard({ title, value, unit, status }) {
  return (
    <div className={`card ${status || ""}`}>
      <h3>{title}</h3>
      <p>{value} {unit}</p>
    </div>
  );
}
export default WaterCard;