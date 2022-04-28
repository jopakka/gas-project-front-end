import './FavListItem.css';

const FavListItem = ({title, value, updatedAt = '', className = ''}) => {
  return (
      <div className={'fav-list-item ' + className}>
        <p>{title}</p>
        <p>{value}</p>
        {title !== 'Name' && updatedAt &&
            <p style={{fontSize: '0.8em'}}>Updated at:<br/>{updatedAt}</p>}
      </div>
  );
};

export default FavListItem;