import * as React from 'react';
import './Single.scss';

class Single extends React.Component {
  static postId;

  renderComment(comment,i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button className="remove">
            &times;
          </button>
        </p>
      </div>
    );
  }

  handleSubmit(e){
    e.preventDefault();
    var author = this.refs.author.value;
    var comment = this.refs.comment.value;
    this.props.addComment(this.postId, author, comment);
  }
  render() {
    this.postId = this.props.params.postId;
    const i = this.props.posts.findIndex(
      (post) => post.code === this.props.params.postId
    );
    const post = this.props.posts[i];
    const postComments = this.props.comments[this.postId] || [];

    return (
      <div className="single-photo">
        <div className="photo-wrapper">
          <div className="image-wrapper">
            <img src={post.display_src} alt=""/>
          </div>
          <div className="detail">
            <p>{post.caption}</p>

            <div className="post-comment">
              {postComments.map(this.renderComment)}
              <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" ref="author" placeholder="author11"/>
                <input type="text" ref="comment" placeholder="comment"/>
                <input type="submit" hidden/>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Single;