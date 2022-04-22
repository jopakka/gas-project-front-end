import NavLink from './NavLink';
import './TobBar.css';

const TopBar = ({links, profileLinks}) => {
  return (
      <header className="top-bar">
        <div>{links.map(l => <NavLink key={l.title} link={l}/>)}</div>
        <div>{profileLinks.map(l =>
            <NavLink key={l.title} link={l}/>)}
        </div>
      </header>
  );
};

export default TopBar;