import './PopupTopbar.css';
import {MdClose, MdMode, MdStar, MdStarBorder} from 'react-icons/md';
import {useContext} from 'react';
import {MainContext} from '../context/MainContext';
import {useMutation, useQuery} from '@apollo/client';
import {addFavorite, checkFavorite, deleteFavorite} from '../utils/queries';
import {useState} from 'react';

const PopupTopbar = ({station, closeAction, setEditOpen, editIsOpen}) => {
  const {user} = useContext(MainContext);
  const [favorite, setFavorite] = useState(false);
  useQuery(checkFavorite, {
    variables: {stationId: station.id || station.stationID},
    onCompleted: (d) => {
      console.log("d", d)
      if(d.favorite) setFavorite(true)
    }
  })
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

  const favoriteAction = async () => {
    await doAddFavorite(
        {variables: {stationId: station.id || station.stationID}});
  };

  const unFavoriteAction = async () => {
    await doDeleteFavorite(
        {variables: {stationId: station.id || station.stationID}});
  };
  return (
      <div className={user ? "popup-topbar" : "popup-topbar end"}>
        {user && <button onClick={() => setEditOpen(true)}><MdMode/></button>}
        {user && <button>
          {favorite ?
              <MdStar onClick={unFavoriteAction}/> :
              <MdStarBorder onClick={favoriteAction}/>
          }
        </button>
        }
        <button onClick={closeAction}><MdClose/></button>
      </div>
  );
};

export default PopupTopbar;