import {MdThumbDownOffAlt, MdThumbUpOffAlt} from 'react-icons/md';
import './ModalInfo.css';
import {useMutation} from '@apollo/client';
import {addRating} from '../utils/queries';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';

const ModalInfo = ({info, prices, isOpen}) => {
  const {socket, user} = useContext(MainContext);
  const [rating95, setRating95] = useState(prices.fuel95 && prices.fuel95.rating ? prices.fuel95.rating : 0);
  const [rating98, setRating98] = useState(prices.fuel98 && prices.fuel98.rating ? prices.fuel98.rating : 0);
  const [ratingDiesel, setRatingDiesel] = useState(
      prices.fuelDiesel && prices.fuelDiesel.rating ? prices.fuelDiesel.rating : 0);
  const [doAddRating] = useMutation(addRating);

  useEffect(() => {
    if (!isOpen) return;
    const listener95 = (args) => {
      setRating95(args);
    };
    const listener98 = (args) => {
      setRating98(args);
    };
    const listenerDiesel = (args) => {
      setRatingDiesel(args);
    };

    if (prices.fuel95) {
      socket.on(`rating ${prices.fuel95.historyID}`, listener95);
    }
    if (prices.fuel98) {
      socket.on(`rating ${prices.fuel98.historyID}`, listener98);
    }
    if (prices.fuelDiesel) {
      socket.on(`rating ${prices.fuelDiesel.historyID}`, listenerDiesel);
    }

    return () => {
      if (prices.fuel95) {
        socket.off(`rating ${prices.fuel95.historyID}`, listener95);
      }
      if (prices.fuel98) {
        socket.off(`rating ${prices.fuel98.historyID}`, listener98);
      }
      if (prices.fuelDiesel) {
        socket.off(`rating ${prices.fuelDiesel.historyID}`, listenerDiesel);
      }
    };
  }, [isOpen, prices, socket]);

  const doLike = async (historyId, rating) => {
    if (!historyId) return;
    try {
      await doAddRating({
        variables: {
          historyId,
          rating,
        },
      });
    } catch (e) {

    }
  };

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
            <b>95:</b> {prices.fuel95 && prices.fuel95.price ?
              prices.fuel95.price + ' €/L' :
              'no price'} (<span style={{
            color: rating95 > 0 ? 'green' :
                rating95 === 0 || rating95 === undefined ? 'black' : 'red',
          }}>{rating95}</span>) {user && <><MdThumbUpOffAlt onClick={() => {
            doLike(prices.fuel95.historyID, 1);
          }} className="thumb"/>
            <MdThumbDownOffAlt onClick={() => {
              doLike(prices.fuel95.historyID, -1);
            }} className="thumb"/></>}<br/>

            <b>98:</b> {prices.fuel98 && prices.fuel98.price ?
              prices.fuel98.price + ' €/L' :
              'no price'} (<span style={{
            color: rating98 > 0 ? 'green' :
                rating98 === 0 || rating98 === undefined ? 'black' : 'red',
          }}>{rating98}</span>) {user && <><MdThumbUpOffAlt onClick={() => {
            doLike(prices.fuel98.historyID, 1);
          }} className="thumb"/>
            <MdThumbDownOffAlt onClick={() => {
              doLike(prices.fuel98.historyID, -1);
            }} className="thumb"/></>}<br/>

            <b>Diesel:</b> {prices.fuelDiesel && prices.fuelDiesel.price ?
              prices.fuelDiesel.price + ' €/L' :
              'no price'} (<span style={{
            color: ratingDiesel > 0 ? 'green' :
                ratingDiesel === 0 || ratingDiesel === undefined ?
                    'black' :
                    'red',
          }}>{ratingDiesel}</span>) {user && <><MdThumbUpOffAlt onClick={() => {
            doLike(prices.fuelDiesel.historyID, 1);
          }} className="thumb"/>
            <MdThumbDownOffAlt onClick={() => {
              doLike(prices.fuelDiesel.historyID, -1);
            }} className="thumb"/></>}<br/>
          </p>
        </div>
      </>
  );
};

export default ModalInfo;