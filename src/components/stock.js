import React, {PropTypes} from 'react';

const Stock = ({stock}) =>
  (<option value={stock.id}> {stock.symbol + ' - ' + stock.name} </option>);

Stock.propTypes = {
  stock: PropTypes.object.isRequired
}

export default Stock;
