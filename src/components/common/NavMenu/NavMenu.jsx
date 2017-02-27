import * as React from 'react';
import {Link} from 'react-router';

import './NavMenu.scss';

class NavItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }

  handleClick (){
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }
  render() {
    const nav = this.props.nav;
    let classN = this.state.isOpen? 'open': '';
    if (nav.menus && nav.menus.length>0) {
      return (
          <li className="is-accordion-submenu-parent">
            <a onClick={this.handleClick.bind(this)}><span className="menu-text">{nav.text}</span></a>
            <ul className={`accordion-menu menu sub-menu sublevel-1 ${classN}`}>
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