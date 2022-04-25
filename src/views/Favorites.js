import {useQuery} from '@apollo/client';
import {favorites} from '../utils/queries';
import {useEffect, useState} from 'react';

const Favorites = () => {
  const {data} = useQuery(favorites)
  const [favs, setFavs] = useState([])

  useEffect(() => {
    if(data) setFavs(data.favorites)
  }, [data])
  return (
      <>
        {favs.map(f => {
          return <p>{f.properties ? f.properties.name : 'no name'}</p>
        })}
      </>
  );
};

export default Favorites;