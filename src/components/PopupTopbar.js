import './PopupTopbar.css';
import {MdClose, MdMode, MdStar, MdStarBorder} from 'react-icons/md';
import {useContext} from 'react';
import {MainContext} from '../context/MainContext';
import {useMutation} from '@apollo/client';
import {addFavorite, deleteFavorite} from '../utils/queries';

const PopupTopbar = ({
                       station,
                       closeAction,
                       setEditOpen,
                       editIsOpen,
                       isFavorite,
                       setIsFavorite,
                     }) => {
  const {user} = useContext(MainContext);
  const [doAddFavorite] = useMutation(addFavorite, {
    onCompleted: (d) => {
      if (!d.addFavorite) return;
      setIsFavorite(true);
    },
  });
  const [doDeleteFavorite] = useMutation(deleteFavorite, {
    onCompleted: (d) => {
      if (!d.deleteFavorite) return;
      setIsFavorite(false);
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
      <div className={user ? 'popup-topbar' : 'popup-topbar end'}>
        {user &&
            <button onClick={() => setEditOpen(!editIsOpen)}><MdMode/></button>}
        {user && <button>
          {isFavorite ?
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