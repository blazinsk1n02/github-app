import './IssueItem.scss';

import { Link } from "react-router-dom";

const IssueItem = ({
  item
}) => {
  
  return (
    <li id={item.id} className="list-item">
      <div className="list-item-content">
        <div className="title">
          <Link to={`/comments/${item.number}`}>
            {item.title}
          </Link>
        </div>
        <small>#{item.number}</small>
      </div>
      <div className="list-item-img">
        <img src={item.assignee?.avatar_url} />
        <div className="tooltip">Assigned to {item.assignee?.login}</div>
      </div>
    </li>
  )
}

export default IssueItem;