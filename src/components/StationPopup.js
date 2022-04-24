import {Popup} from 'react-leaflet';
import './StationPopup.css';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import {MdStarBorder, MdStar} from 'react-icons/md';
import {useMutation, useQuery} from '@apollo/client';
import {addFavorite, checkFavorite, deleteFavorite} from '../utils/queries';

const StationPopup = ({station}) => {
  const {user} = useContext(MainContext);
  const [favorite, setFavorite] = useState(false);
  const [doAddFavorite] = useMutation(addFavorite, {
    onCompleted: (d) => {
      if (!d.addFavorite) return;
      setFavorite(true);
    },
  });
  const [doDeleteFavorite] = useMutation(deleteFavorite, {
    onCompleted: (d) => {
      if (!d.deleteFavorite) return;
      setFavorite(false);
    },
  });
  const {data} = useQuery(checkFavorite, {variables: {stationId: station.id}});

  useEffect(() => {
    console.log('data', data && data.favorite);
    if (data && data.favorite) setFavorite(true);
  }, [data]);

  const favoriteAction = async () => {
    console.log('favorite clicked');
    await doAddFavorite({variables: {stationId: station.id}});
  };

  const unFavoriteAction = async () => {
    console.log('unfavorite clicked');
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
          <th>{station.prices.fuel95 ?
              station.prices.fuel95.price :
              'no price'}</th>
        </tr>
        <tr>
          <th>98</th>
          <th>{station.prices.fuel98 ?
              station.prices.fuel98.price :
              'no price'}</th>
        </tr>
        <tr>
          <th>Diesel</th>
          <th>{station.prices.fuelDiesel ?
              station.prices.fuelDiesel.price :
              'no price'}</th>
        </tr>
        </tbody>
      </table>
    </div>
  </Popup>);
};

export default StationPopup;