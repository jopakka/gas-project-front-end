import {Link} from 'react-router-dom';

const NavLink = ({link}) => {
  return (
      <Link onClick={link.action ? link.action : () => {}} className="link" to={link.path}>
        <button>{link.title}</button>
      </Link>
  )
};

export default NavLink;