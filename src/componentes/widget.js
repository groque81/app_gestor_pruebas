import React from 'react';

function Widget({ title, count }) {
  return (
    <div style={styles.widget}>
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
}

const styles = {
  widget: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    width: '23%',  // Para hacer que quepan 4 widgets en una fila
    textAlign: 'center',
  },
};

export {Widget};
