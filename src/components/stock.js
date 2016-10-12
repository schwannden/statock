import React, {PropTypes} from 'react';

const Stock = (props) => {
  let stock = props.stock;
  return (
    <option value={stock.id}> {stock.symbol + ' - ' + stock.name} </option>
  );
};

Stock.propTypes = {
  stock: PropTypes.object.isRequired
}

export default Stock;
