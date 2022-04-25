import {Popup} from 'react-leaflet';
import './StationPopup.css';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import {MdStar, MdStarBorder} from 'react-icons/md';
import {useLazyQuery, useMutation} from '@apollo/client';
import {addFavorite, checkFavorite, deleteFavorite} from '../utils/queries';

const StationPopup = ({station, isOpen}) => {
  const {user, socket} = useContext(MainContext);
  const [doCheckFavorite, {data}] = useLazyQuery(checkFavorite,
      {fetchPolicy: 'network-only', variables: {stationId: station.id}});
  const [favorite, setFavorite] = useState(false);
  const [price95, setPrice95] = useState(undefined);
  const [price98, setPrice98] = useState(undefined);
  const [priceDiesel, setPriceDiesel] = useState(undefined);

  const [doAddFavorite] = useMutation(addFavorite, {
    onCompleted: (d) => {
      console.log('add', d);
      if (!d.addFavorite) return;
      setFavorite(true);
    },
  });
  const [doDeleteFavorite] = useMutation(deleteFavorite, {
    onCompleted: (d) => {
      console.log('delete', d);
      if (!d.deleteFavorite) return;
      setFavorite(false);
    },
  });

  useEffect(() => {
    (async () => {
      if (isOpen) {
        await doCheckFavorite();
      }
    })();
  }, [doCheckFavorite, isOpen]);

  useEffect(() => {
    if (data && data.favorite) setFavorite(true);
  }, [data]);

  useEffect(() => {
    setPrice95(station.prices.fuel95);
    setPrice98(station.prices.fuel98);
    setPriceDiesel(station.prices.fuelDiesel);
  }, [station]);

  useEffect(() => {
    if (!isOpen) return;
    const listener95 = (args) => {
      setPrice95(args);
    };
    const listener98 = (args) => {
      setPrice98(args);
    };
    const listenerDiesel = (args) => {
      setPriceDiesel(args);
    };

    const channel95 = `price ${station.id} 95`;
    const channel98 = `price ${station.id} 98`;
    const channelDiesel = `price ${station.id} diesel`;
    socket.on(channel95, listener95);
    socket.on(channel98, listener98);
    socket.on(channelDiesel, listenerDiesel);
    return () => {
      socket.off(channel95, listener95);
      socket.off(channel98, listener98);
      socket.off(channelDiesel, listenerDiesel);
    };
  }, [isOpen, socket, station]);

  const favoriteAction = async () => {
    await doAddFavorite({variables: {stationId: station.id}});
  };

  const unFavoriteAction = async () => {
    await doDeleteFavorite({variables: {stationId: station.id}});
  };

  return (<Popup>
    <div className="station-popup">
      <h2>{station.properties.name}</h2>
      {user &&
          <>
            {favorite ?
                <MdStar className="favorite-star" onClick={unFavoriteAction}/> :
                <MdStarBorder className="favorite-star"
                              onClick={favoriteAction}/>}
          </>
      }
      <table>
        <tbody>
        <tr>
          <th>95</th>
          <th>{price95 ?
              price95.price :
              'no price'}</th>
        </tr>
        <tr>
          <th>98</th>
          <th>{price98 ?
              price98.price :
              'no price'}</th>
        </tr>
        <tr>
          <th>Diesel</th>
          <th>{priceDiesel ?
              priceDiesel.price :
              'no price'}</th>
        </tr>
        </tbody>
      </table>
    </div>
  </Popup>);
};

export default StationPopup;