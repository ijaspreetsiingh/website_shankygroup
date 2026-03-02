import { Link } from "react-router-dom";
import menu_data from "../../data/menu-data";

 


const NavMenu = () => {
  return (
    <>
      <ul className="navigation clearfix">
        {menu_data.map((item, i) => (
          <li key={i} className={`${item.has_dropdown && 'current dropdown'}`}>
            <Link to={item.link}>{item.title}</Link>
            {item.has_dropdown && (
              <ul>
                {item?.sub_menus?.map((sub_item, j) => (
                  <li key={j}><Link to={sub_item.link}>{sub_item.title}</Link></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;