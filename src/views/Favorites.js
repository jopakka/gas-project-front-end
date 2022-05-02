import {useQuery} from '@apollo/client';
import {favorites} from '../utils/queries';
import {useCallback, useContext, useEffect, useState} from 'react';
import FavList from '../components/FavList';
import LoadingIndicator from '../components/LoadingIndicator';
import {MainContext} from '../context/MainContext';

const Favorites = (callback, deps) => {
  const {refresh, setRefresh} = useContext(MainContext);
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

  const doRefetch = useCallback(async () => {
        try {
          setLoading(true);
          await refetch();
        } catch (e) {

        }
      }, [refetch],
  );

  useEffect(() => {
    if (data) setFavs(data.favorites);
  }, [data]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      doRefetch();
    }
  }, [doRefetch, refresh, setRefresh]);

  return (
      <>
        {loading ? <LoadingIndicator/> :
            favs.length > 0 ?
                favs.map(f => <FavList key={f.stationID} item={f}
                                       refetch={doRefetch}/>) :
                <p>No favorites</p>
        }
      </>
  );
};

export default Favorites;