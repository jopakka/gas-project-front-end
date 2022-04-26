import './FavListItem.css';
import {MdMode} from 'react-icons/md';
import {useMutation} from '@apollo/client';
import {update95, update98, updateDiesel} from '../utils/queries';

const FavListItem = ({stationId, title, value, updatedAt = '', className = ''}) => {
  const [doUpdate95] = useMutation(update95, {
    fetchPolicy: 'network-only',
    onError: () => {
      alert('Error while updating price');
    },
  });
  const [doUpdate98] = useMutation(update98, {
    fetchPolicy: 'network-only',
    onError: () => {
      alert('Error while updating price');
    },
  });
  const [doUpdateDiesel] = useMutation(updateDiesel, {
    fetchPolicy: 'network-only',
    onError: () => {
      alert('Error while updating price');
    },
  });

  const askUpdate = async () => {
    let newValue = window.prompt(`Enter new ${title} price`,
        value === 'no price' ? '' : value);
    if (!newValue || value === newValue) return;
    if (isNaN(newValue)) return window.alert('Not a valid value');

    const options = {
      variables: {
        stationId,
        price: newValue,
      },
    };
    switch (title) {
      case '95':
        await doUpdate95(options);
        break;
      case '98':
        await doUpdate98(options);
        break;
      case 'Diesel':
        await doUpdateDiesel(options);
        break;
      default:
        break;
    }
  };

  return (
      <div className={'fav-list-item ' + className}>
        <p>{title}</p>
        <p>{value}</p>
        {title !== 'Name' && updatedAt && <p style={{fontSize: '0.8em'}}>Updated at:<br/>{updatedAt}</p>}
        {title !== 'Name' && <MdMode onClick={askUpdate} className="edit"/>}
      </div>
  );
};

export default FavListItem;