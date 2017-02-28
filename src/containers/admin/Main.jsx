import * as React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Header from 'components/common/Header/Header';
import NavMenu from 'components/common/NavMenu/NavMenu';
import * as actionCreators from '../../actions/actionCreators';
import {menus} from '../../data/config';

class MainComponent extends React.Component {

  render() {
    return (
        <section id="page">
          <Header />
          <NavMenu menus={menus}/>
          <section id="main-conten">
            { React.cloneElement(this.props.children, this.props) }
          </section>
        </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
    menus: state.menus
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

// 将 state 和 actions 绑定到 props 上
const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);


export default Main;