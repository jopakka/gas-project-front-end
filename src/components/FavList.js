import './FavList.css';
import FavListItem from './FavListItem';
import {MdDelete} from 'react-icons/md';
import {useMutation} from '@apollo/client';
import {deleteFavorite} from '../utils/queries';
import {DateTime} from 'luxon';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';

const FavList = ({item, refetch}) => {
  const {socket, setInfoVisible, setInfoItem} = useContext(MainContext);
  const [doDeleteFavorite] = useMutation(deleteFavorite, {
    fetchPolicy: 'network-only',
    variables: {
      stationId: item.stationID,
    },
    onCompleted: (d) => {
      console.log('delete', d);
      if (!d.deleteFavorite) return;
      refetch();
    },
  });
  const [price95, setPrice95] = useState(undefined);
  const [price98, setPrice98] = useState(undefined);
  const [priceDiesel, setPriceDiesel] = useState(undefined);

  const askDelete = async (e) => {
    e.stopPropagation();
    console.log(item);
    if (window.confirm('Do you want to delete this station from favorites?')) {
      await doDeleteFavorite();
    }
  };

  const formatTime = (timestamp) => {
    if (isNaN(timestamp)) {
      timestamp = DateTime.fromISO(timestamp);
    }
    return DateTime.fromMillis(Number(timestamp))
        .setLocale('en-GB')
        .toFormat('f');
  };

  useEffect(() => {
    setPrice95(item.prices.fuel95);
    setPrice98(item.prices.fuel98);
    setPriceDiesel(item.prices.fuelDiesel);
  }, [item]);

  useEffect(() => {
    const listener95 = (args) => {
      if(item.prices.fuel95) item.prices.fuel95.price = args;
      setPrice95(args);
    };
    const listener98 = (args) => {
      if(item.prices.fuel98) item.prices.fuel98.price = args;
      setPrice98(args);
    };
    const listenerDiesel = (args) => {
      if(item.prices.fuelDiesel) item.prices.fuelDiesel.price = args;
      setPriceDiesel(args);
    };

    const channel95 = `price ${item.stationID} 95`;
    const channel98 = `price ${item.stationID} 98`;
    const channelDiesel = `price ${item.stationID} diesel`;
    socket.on(channel95, listener95);
    socket.on(channel98, listener98);
    socket.on(channelDiesel, listenerDiesel);
    return () => {
      socket.off(channel95, listener95);
      socket.off(channel98, listener98);
      socket.off(channelDiesel, listenerDiesel);
    };
  }, [item, socket]);

  const doShowInfo = () => {
    setInfoItem(item);
    setInfoVisible(true);
  };

  useEffect(() => {
    console.log("id", item.stationID)
  }, [item])

  return (
      <div className="fav-list" onClick={doShowInfo}>
        <FavListItem title="Name" value={item.properties.name ?? 'no name'}/>
        <FavListItem updatedAt={price95 &&
            formatTime(price95.updatedAt)} title="95"
                     value={price95 ? price95.price : 'no price'}/>
        <FavListItem updatedAt={price98 &&
            formatTime(price98.updatedAt)} title="98"
                     value={price98 ? price98.price : 'no price'}/>
        <FavListItem
            updatedAt={priceDiesel && formatTime(priceDiesel.updatedAt)}
            title="Diesel"
            value={priceDiesel ? priceDiesel.price : 'no price'}/>
        <MdDelete className="icon delete" onClick={askDelete}/>
      </div>
  );
};

export default FavList;