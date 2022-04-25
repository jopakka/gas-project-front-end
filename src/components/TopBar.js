import NavLink from './NavLink';
import './TobBar.css';

const TopBar = ({profileLinks}) => {
  return (
      <header className="top-bar">
        <div>{profileLinks.map(l =>
            <NavLink key={l.title} link={l}/>)}
        </div>
      </header>
  );
};

export default TopBar;