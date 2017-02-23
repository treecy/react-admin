import * as React from 'react';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/actionCreators';

class MainComponent extends React.Component {

    render() {
        return (
            <div>
                <h1>
                    <Link to="/">My First React</Link>
                </h1>
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

// 将 state 和一些通用方法绑定到 component 上
const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);



export default Main;