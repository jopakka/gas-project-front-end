import Modal from 'react-modal';
import {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {stationInfo} from '../utils/queries';

const modalStyles = {
  overlay: {
    zIndex: 1000,
    textAlign: 'center',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100vw',
    maxHeight: '100vh ',
    paddingTop: 48
  },
};

const InfoPage = ({setVisible, item, isOpen}) => {
  const [info, setInfo] = useState(undefined)
  const [getInfo] = useLazyQuery(stationInfo, {
    variables: {stationId: item.id || item.stationID},
    onCompleted: (d) => {
      console.log("data", d.station)
      setInfo(d.station)
    }
  })

  const closeForm = () => {
    setVisible(false)
    setInfo(undefined)
  }

  useEffect(() => {
    console.log("info", info)
  }, [info])

  useEffect(() => {
    if(!isOpen) return;
    getInfo()
  }, [getInfo, isOpen])

 return (
     <Modal ariaHideApp={false} style={modalStyles} isOpen={true}
             parentSelector={() => document.querySelector('.App')}>
       <div className="cancel" onClick={closeForm}></div>
       {info && <>
         <h2>{info.properties.name}</h2><br/>
         <div style={{textAlign: "start"}}>
           <h3>Address</h3>
           <p>
             {info.address.road} {info.address.house_number}<br/>
             {info.address.postcode} {info.address.city}
           </p>
         </div><br/>
         <div style={{textAlign: "start"}}>
           <h3>Prices</h3>
           <p>
             <b>95:</b> {info.prices.fuel95 ? info.prices.fuel95.price +  " €/L" : "no price"}<br/>
             <b>98:</b> {info.prices.fuel98 ? info.prices.fuel98.price +  " €/L" : "no price"}<br/>
             <b>Diesel:</b> {info.prices.fuelDiesel ? info.prices.fuelDiesel.price +  " €/L" : "no price"}<br/>
           </p>
         </div>
       </>}
     </Modal>
 )
};

export default InfoPage;