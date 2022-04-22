const NavLink = ({link}) => {
  return (
      <button onClick={link.action}>{link.title}</button>
  )
};

export default NavLink;