import React, {PropTypes} from 'react';

const Exchange = ({exchange}) => 
  (<option value={exchange.id}> {exchange.name} </option>);

Exchange.propTypes = {
  exchange: PropTypes.object.isRequired
}

export default Exchange;
