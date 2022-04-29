import './HistoryItem.css';

const HistoryItem = ({item}) => {
  return (
      <div className="history-item">
        <p><b>Station id:</b> {item.stationID}</p>
        <p><b>Price:</b> {item.price}</p>
        <p><b>Type:</b> {item.type}</p>
        <p><b>Updated at:</b> {item.updatedAt}</p>
      </div>
  );
};

export default HistoryItem;