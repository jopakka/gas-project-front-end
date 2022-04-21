import Map from './Map';
import TopBar from '../components/TopBar';

const Home = () => {
  return (
      <div style={{flex: 1}}>
        <TopBar/>
        <Map showAllStation/>
      </div>
  );
};

export default Home;