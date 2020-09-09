import React from 'react';
import Item from '../Item';

function Cancelled({ bookings }) {
  return bookings.map((data, index) => <Item data={data} />);
}

export default Cancelled;
