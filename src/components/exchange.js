import React, {PropTypes} from 'react';

const Exchange = (props) => {
  let exchange = props.exchange;
  return (
    <option value={exchange.id}> {exchange.name} </option>
  );
};

Exchange.propTypes = {
  exchange: PropTypes.object.isRequired
}

export default Exchange;
