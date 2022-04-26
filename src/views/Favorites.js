import {useQuery} from '@apollo/client';
import {favorites} from '../utils/queries';
import {useEffect, useState} from 'react';
import FavList from '../components/FavList';
import LoadingIndicator from '../components/LoadingIndicator';

const Favorites = () => {
  const {data, refetch} = useQuery(favorites, {
    fetchPolicy: 'network-only',
    onCompleted: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  const doRefetch = async () => {
    try {
      setLoading(true)
      await refetch();
    } catch (e) {}
  }

  useEffect(() => {
    if (data) setFavs(data.favorites);
  }, [data]);
  return (
      <>
        {loading ? <LoadingIndicator /> :
            favs.length > 0 ?
                favs.map(f => <FavList key={f.stationID} item={f} refetch={doRefetch}/>) :
                <p>No favorites</p>
        }
      </>
  );
};

export default Favorites;