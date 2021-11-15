/* eslint-disable jsx-a11y/anchor-is-valid */
function Product({ id, title, description, url, votes, submitterAvatarUrl, productImageUrl, onVote }) {
  function handleOnVote() {
    onVote(id);
  }
  return (
    <div className="item">
      <div className="image">
        <img src={productImageUrl} alt="" />
      </div>
      <div className="middle aligned content">
        <div className="header">
          <a onClick={handleOnVote}>
            <i className="large caret up icon" />
          </a>{" "}
          {votes}
        </div>
        <div className="description">
          <a href={url}>{title}</a>
          <p>{description}</p>
        </div>
        <div className="extra">
          <span>Submitted by:</span>
          <img className="ui avatar image" src={submitterAvatarUrl} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Product;
