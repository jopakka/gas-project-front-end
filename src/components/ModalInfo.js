const ModalInfo = ({info, prices}) => {
  return (
      <>
        <div style={{textAlign: 'start'}}>
          <h3>Address</h3>
          <p>
            {info.address.road} {info.address.house_number}<br/>
            {info.address.postcode} {info.address.city}
          </p>
        </div>
        <br/>
        <div style={{textAlign: 'start'}}>
          <h3>Prices</h3>
          <p>
            <b>95:</b> {prices.fuel95.price ?
              prices.fuel95.price + ' €/L' :
              'no price'}<br/>
            <b>98:</b> {prices.fuel98.price ?
              prices.fuel98.price + ' €/L' :
              'no price'}<br/>
            <b>Diesel:</b> {prices.fuelDiesel.price ?
              prices.fuelDiesel.price + ' €/L' :
              'no price'}<br/>
          </p>
        </div>
      </>
  );
};

export default ModalInfo;