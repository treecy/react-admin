import * as React from 'react';
import {Link} from 'react-router';

import './NavMenu.scss';

class NavItem extends React.Component {
  render() {
    const nav = this.props.nav;
    if (nav.menus && nav.menus.length>0) {
      return (
          <li>
            <span className="menu-text">{nav.text}</span>
            <ul className="vertical accordion-menu menu sub-menu">
              {nav.menus.map((item,i) => <NavItem nav={item} key={i}/>)}
            </ul>
          </li>
      )
    }else {
      return (
          <li>
            <Link to={`/admin/${nav.page_id}`}>
              <span className="menu-text">{nav.text}</span>
            </Link>
          </li>
      )
    }

  }
}


class NavMenu extends React.Component {

  render() {
    return (
        <div className="accordion-menu-wrapper">
          <ul className="vertical accordion-menu menu">
            {this.props.menus.map((item,i) => <NavItem nav={item} key={i}/>)}
          </ul>
        </div>
    );
  }
}

export default NavMenu