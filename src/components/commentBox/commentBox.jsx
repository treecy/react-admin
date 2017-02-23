import './commentBox.scss';

import * as React from 'react';
import Remarkable from 'remarkable';
import $ from 'jquery';

var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

class Comment extends React.Component {
    //markdown 编译
    rawMarkup() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className="comment">
                <h2 className="comment-author">
                    {this.props.author}
                </h2>

                {/*不进行html转义*/}
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        return (
            <div className="comment-list">
                {this.props.data.map( (comment) => (
                    <Comment author={comment.author} key={comment.id}>
                        {comment.text}
                    </Comment>
                ) )}
            </div>
        )
    }
}

class CommentForm extends React.Component {
    state = {
        author: '',
        text: ''
    };

    render() {
        return (
            <form className="comment-form">
                <input type="text" placeholder="Your name" value={this.state.author} onChange={this}/>
                <input type="text" placeholder="Say something ..." value={this.state.text}/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
}


class CommentBox extends React.Component {
    state = {data: []};
    constructor(props) {
        super(props);
        this.getDataList = this.getDataList.bind(this);
    }

    getDataList() {
        this.setState({data: data});
    }

    render() {
        return (
            <div className="comment-box">
                <h1>Comments</h1>
                <button onClick={this.getDataList}>Get Comment List</button>
                <CommentList data={this.state.data}/>
                <CommentForm />
            </div>
        );
    }
}

export default {CommentBox};
