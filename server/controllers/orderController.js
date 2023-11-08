const db = require('../config/db');

// Function to confirm delivery and update order status
function confirmDelivery(orderId) {
  const sql = 'UPDATE orders SET order-status = ? WHERE id = ?';
  const values = ['delivered', orderId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating order status:', err);
      return;
    }
    console.log(`Order with ID ${orderId} has been marked as delivered.`);
  });
}

module.exports = confirmDelivery;
