const ModalInfo = ({info}) => {
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
            <b>95:</b> {info.prices.fuel95 ?
              info.prices.fuel95.price + ' €/L' :
              'no price'}<br/>
            <b>98:</b> {info.prices.fuel98 ?
              info.prices.fuel98.price + ' €/L' :
              'no price'}<br/>
            <b>Diesel:</b> {info.prices.fuelDiesel ?
              info.prices.fuelDiesel.price + ' €/L' :
              'no price'}<br/>
          </p>
        </div>
      </>
  );
};

export default ModalInfo;