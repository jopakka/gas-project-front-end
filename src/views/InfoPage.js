import Modal from 'react-modal';
import {useContext, useEffect, useReducer, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {stationInfo} from '../utils/queries';
import PopupTopbar from '../components/PopupTopbar';
import LoadingIndicator from '../components/LoadingIndicator';
import ModalInfo from '../components/ModalInfo';
import ModalEdit from '../components/ModalEdit';
import {useLocation} from 'react-router-dom';
import {MainContext} from '../context/MainContext';

const modalStyles = {
  overlay: {
    zIndex: 1000,
    textAlign: 'center',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100vw',
    maxHeight: '100vh ',
    padding: 0,
  },
};

const InfoPage = ({setVisible, item, isOpen}) => {
  const {setRefresh, socket, updateInfo, setUpdateInfo} = useContext(
      MainContext);
  const location = useLocation();
  const [info, setInfo] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const init = () => ({fuel95: {}, fuel98: {}, fuelDiesel: {}});
  const reducer = (state, action) => {
    switch (action.type) {
      case '95':
        return ({
          ...state,
          fuel95: action.payload,
        });
      case '98':
        return ({
          ...state,
          fuel98: action.payload,
        });
      case 'diesel':
        return ({
          ...state,
          fuelDiesel: action.payload,
        });
      case 'reset':
        return (init);
      default:
        break;
    }
  };
  const [prices, setPrices] = useReducer(reducer, {}, init);
  const [getInfo, {data}] = useLazyQuery(stationInfo, {
    fetchPolicy: 'network-only',
    onCompleted: (d) => {
      setLoading(false);
      if (!d.station) return;
      const p = d.station.prices;
      if (p.fuel95) {
        setPrices({type: '95', payload: p.fuel95});
      }
      if (p.fuel98) {
        setPrices({type: '98', payload: p.fuel98});
      }
      if (p.fuelDiesel) {
        setPrices({type: 'diesel', payload: p.fuelDiesel});
      }
      setInfo(d.station);
      if (d.favorite) setIsFavorite(true);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const closeForm = () => {
    if (location.pathname === '/favorites') {
      if (data.favorite && !isFavorite) {
        setRefresh(true);
      }
    }

    setVisible(false);
    setIsFavorite(false);
    setEditIsOpen(false);
    setInfo(undefined);
    setPrices({type: 'reset'});
  };

  useEffect(() => {
    (async () => {
      if (!isOpen) return;
      setLoading(true);
      setUpdateInfo(false);
      try {
        await getInfo({variables: {stationId: item.id || item.stationID}});
      } catch (e) {

      }
    })();
  }, [getInfo, isOpen, item, setUpdateInfo, updateInfo]);

  useEffect(() => {
    if (!isOpen) return;
    const listener95 = (args) => {
      setPrices({type: '95', payload: args});
    };
    const listener98 = (args) => {
      setPrices({type: '98', payload: args});
    };
    const listenerDiesel = (args) => {
      setPrices({type: 'diesel', payload: args});
    };

    const channel95 = `price ${item.id || item.stationID} 95`;
    const channel98 = `price ${item.id || item.stationID} 98`;
    const channelDiesel = `price ${item.id || item.stationID} diesel`;
    socket.on(channel95, listener95);
    socket.on(channel98, listener98);
    socket.on(channelDiesel, listenerDiesel);
    return () => {
      socket.off(channel95, listener95);
      socket.off(channel98, listener98);
      socket.off(channelDiesel, listenerDiesel);
    };
  }, [isOpen, item, socket]);

  return (
      <Modal ariaHideApp={false} style={modalStyles} isOpen={isOpen}
             parentSelector={() => document.querySelector('.App')}>
        <PopupTopbar isFavorite={isFavorite} setIsFavorite={setIsFavorite}
                     setEditOpen={setEditIsOpen} editIsOpen={editIsOpen}
                     station={item}
                     closeAction={closeForm}/>
        {loading && <LoadingIndicator/>}
        {info && <div style={{margin: 20}}>
          <h2>{info.properties.name}</h2><br/>
          {editIsOpen ?
              <ModalEdit prices={prices} loading={loading}
                         setLoading={setLoading}
                         setIsOpen={setEditIsOpen}
                         item={info}/> :
              <ModalInfo isOpen={!editIsOpen} prices={prices} info={info}/>}
        </div>}
      </Modal>
  );
};

export default InfoPage;