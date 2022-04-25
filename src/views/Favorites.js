import {useQuery} from '@apollo/client';
import {favorites} from '../utils/queries';
import {useEffect, useState} from 'react';
import FavList from '../components/FavList';

const Favorites = () => {
  const {data, refetch} = useQuery(favorites, {fetchPolicy: 'network-only'});
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if (data) setFavs(data.favorites);
  }, [data]);
  return (
      <>
        {favs.map(f => <FavList key={f.stationID} item={f} refetch={refetch}/>)}
      </>
  );
};

export default Favorites;