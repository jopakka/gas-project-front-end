import Modal from 'react-modal';
import {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {stationInfo} from '../utils/queries';
import PopupTopbar from '../components/PopupTopbar';
import LoadingIndicator from '../components/LoadingIndicator';
import ModalInfo from '../components/ModalInfo';
import ModalEdit from '../components/ModalEdit';

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
  const [info, setInfo] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [getInfo] = useLazyQuery(stationInfo, {
    variables: {stationId: item.id || item.stationID},
    onCompleted: (d) => {
      setLoading(false);
      setInfo(d.station);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const closeForm = () => {
    setVisible(false);
    setInfo(undefined);
  };

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    getInfo();
  }, [getInfo, isOpen]);

  return (
      <Modal ariaHideApp={false} style={modalStyles} isOpen={true}
             parentSelector={() => document.querySelector('.App')}>
        <PopupTopbar setEditOpen={setEditIsOpen} station={item}
                     closeAction={closeForm}/>
        {loading && <LoadingIndicator/>}
        {info && <div style={{margin: 20}}>
          <h2>{info.properties.name}</h2><br/>
          {editIsOpen ?
              <ModalEdit loading={loading} setLoading={setLoading}
                         isOpen={editIsOpen} setIsOpen={setEditIsOpen}
                         item={info}/> :
              <ModalInfo info={info}/>}
        </div>}
      </Modal>
  );
};

export default InfoPage;