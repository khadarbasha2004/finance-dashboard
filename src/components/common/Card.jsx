const Card = ({ title, amount }) => {
  return (
    <div className="card-hover fade-in" style={styles.card}>
      <h4>{title}</h4>
      <h2>{amount}</h2>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
  }
};

export default Card;