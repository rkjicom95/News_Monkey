import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, describe, imageUrl, newUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:0}}>
          <span className="badge rounded-pill bg-danger" >{source} </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}...             
          
            </h5>
            <p className="card-text">{describe}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newUrl} target="-blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
