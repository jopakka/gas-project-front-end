import './FavList.css';
import FavListItem from './FavListItem';
import {MdDelete} from 'react-icons/md';
import {useMutation} from '@apollo/client';
import {deleteFavorite} from '../utils/queries';

const FavList = ({item, refetch}) => {
  const [doDeleteFavorite] = useMutation(deleteFavorite, {
    variables: {
      stationId: item.stationID,
    },
    onCompleted: (d) => {
      console.log('delete', d);
      if (!d.deleteFavorite) return;
      refetch();
    },
  });

  const askDelete = async () => {
    console.log(item)
    if (window.confirm('Do you want to delete this station from favorites?')) {
      await doDeleteFavorite();
    }
  };

  return (
      <div className="fav-list">
        <FavListItem title="Name" value={item.properties.name ?? 'no name'}/>
        <FavListItem stationId={item.stationID} title="95" value={item.prices.fuel95 ?
            item.prices.fuel95.price :
            'no price'}/>
        <FavListItem stationId={item.stationID} title="98" value={item.prices.fuel98 ?
            item.prices.fuel98.price :
            'no price'}/>
        <FavListItem stationId={item.stationID} title="Diesel" value={item.prices.fuelDiesel ?
            item.prices.fuelDiesel.price :
            'no price'}/>
        <MdDelete className="icon delete" onClick={askDelete}/>
      </div>
  );
};

export default FavList;