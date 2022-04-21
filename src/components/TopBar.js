import NavLink from './NavLink';
import './TobBar.css';
import {indexOf} from 'leaflet/src/core/Util';

const links = [
  'Home',
  'Favorites',
];

const TopBar = () => {
  return (
      <div className='top-bar'>
        {links.map(l => <NavLink key={indexOf(links, l)} link={l}/>)}
      </div>
  );
};

export default TopBar;