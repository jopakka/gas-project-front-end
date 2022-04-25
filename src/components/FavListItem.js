import './FavListItem.css';
import {MdMode} from 'react-icons/md';
import {useMutation} from '@apollo/client';
import {update95, update98, updateDiesel} from '../utils/queries';

const FavListItem = ({stationId, title, value, refetch, className = ''}) => {
  const [doUpdate95] = useMutation(update95, {
    onCompleted: (d) => {
      console.log(d);
      if(!d.update95) return;
    },
  });
  const [doUpdate98] = useMutation(update98, {
    onCompleted: (d) => {
      console.log(d);
      if(!d.update98) return;
    },
  });
  const [doUpdateDiesel] = useMutation(updateDiesel, {
    onCompleted: (d) => {
      console.log(d);
      if(!d.updateDiesel) return;
    },
  });

  const askUpdate = async () => {
    const newValue = window.prompt(`Enter new ${title} price`,
        value === 'no price' ? '' : value);
    if (value === newValue) return;

    const options = {variables: {stationId, price: newValue}};
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
        {title !== 'Name' && <MdMode onClick={askUpdate} className="edit"/>}
      </div>
  );
};

export default FavListItem;