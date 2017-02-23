import * as React from 'react';
import {Link} from 'react-router';

import './PhotoGrid.scss';

class Photo extends React.Component {
  render() {
    const {post, comments, i} = this.props;
    return (
      <li>
        <figure className="grid-figure">
          <Link to={`/view/${post.code}`}>
            <div className="img-wrap" style={{ backgroundImage: `url(${post.display_src})`}}></div>
          </Link>

          <figcaption>
            <p>{post.caption}</p>
            <div className="control-buttons">
              <button onClick={this.props.increment.bind(null, i)} className="likes">&hearts; {post.likes}</button>
              <Link to={`/view/${post.code}`}>
                    <span className="comment-count">
                      <span className="speech-bubble">
                        {comments[post.code]? comments[post.code].length: 0 }
                      </span>
                    </span>
              </Link>
            </div>
          </figcaption>
        </figure>
      </li>
    );
  }
}


class PhotoGrid extends React.Component {

  render() {
    const {posts} = this.props;
    return (
      <div className="photo-grid">
        <ul className="grid-list">
          {posts.map( (post, i) =>  <Photo {...this.props} key={i} i={i} post={post}/> ) }
        </ul>
      </div>
    );
  }
}

export default PhotoGrid;