/**
 * Create text from order for sending email
 */

const RECETPT_LENGTH = 80;

const createReceiptText = function ({
  orderId,
  delivery,
  items,
  total,
  payment,
}) {
  const receiptTextLines = [];

  receiptTextLines.push(`Order : ${orderId}`);
  receiptTextLines.push('-'.repeat(RECETPT_LENGTH));
  receiptTextLines.push(
    'Name:' + delivery.name.padStart(RECETPT_LENGTH, ' ').slice(5),
  );
  receiptTextLines.push(
    'Phone:' + delivery.phone.padStart(RECETPT_LENGTH, ' ').slice(6),
  );
  receiptTextLines.push(
    'Address:' + delivery.address.padStart(RECETPT_LENGTH, ' ').slice(8),
  );
  receiptTextLines.push('-'.repeat(RECETPT_LENGTH));

  receiptTextLines.push(
    'Items'.padEnd(RECETPT_LENGTH - 20, ' ') +
      'Qty'.padStart(10, ' ') +
      'Amount'.padStart(10, ' '),
  );
  items.forEach(({ name, option, quantity, amount }) => {
    const desc = `${name} (${option.name})`.padEnd(RECETPT_LENGTH - 20, '.');
    const qty = quantity.toFixed(2).padStart(10, ' ');
    const amt = amount.toFixed(2).padStart(10, ' ');
    receiptTextLines.push(desc + qty + amt);
  });
  receiptTextLines.push('-'.repeat(RECETPT_LENGTH));

  receiptTextLines.push(
    'Total' + total.toFixed(2).padStart(RECETPT_LENGTH).slice(5),
  );
  receiptTextLines.push(
    'Status:' + payment.status.toUpperCase().padStart(RECETPT_LENGTH).slice(7),
  );

  return receiptTextLines.join('\n');
};

module.exports = createReceiptText;
