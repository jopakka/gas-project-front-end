import {useState} from 'react';
import {useQuery} from '@apollo/client';
import {userHistory, userInfo} from '../utils/queries';

const Profile = () => {
  const [history, setHistory] = useState(undefined);
  const [userData, setUserData] = useState(undefined);

  useQuery(userHistory, {
    onCompleted: (d) => {
      if(d.userHistory) setHistory(d.userHistory)
    }
  });

  useQuery(userInfo, {
    onCompleted: (d) => {
      if(d.user) setUserData(d.user)
    }
  })

  return (
      <>
        {userData && <>
          <h1>Hello {userData.username}</h1>
        </>}
      </>
  );
};

export default Profile;