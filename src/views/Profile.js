import {useState} from 'react';
import {useQuery} from '@apollo/client';
import {userInfo} from '../utils/queries';
import LoadingIndicator from '../components/LoadingIndicator';
import HistoryItem from '../components/HistoryItem';
import {indexOf} from 'leaflet/src/core/Util';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({user: {}, history: []});

  useQuery(userInfo, {
    onCompleted: (d) => {
      const newData = {};
      if (d.userHistory) newData.history = d.userHistory;
      if (d.user) newData.user = d.user;
      setUserData(newData);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  return (
      <>
        {loading && <LoadingIndicator/>}
        <h1>Hello {userData.user.username}</h1>
        <h2>History</h2>
        {userData.history.length > 0 ?
            userData.history.map(
                h => <HistoryItem key={indexOf(userData.history, h)}
                                  item={h}/>) :
            <p>No items</p>}
      </>
  );
};

export default Profile;