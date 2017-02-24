import * as React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from 'components/common/Header/Header';
import * as actionCreators from '../actions/actionCreators';

class MainComponent extends React.Component {

    render() {
        return (
            <div>
                <Header></Header>
                { React.cloneElement(this.props.children, this.props) }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

// 将 state 和 actions 绑定到 props 上
const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);



export default Main;