import './Comments.scss';

import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameAtom } from '../../atoms/usernameAtom';
import { repositoryAtom } from '../../atoms/repositoryAtom';
import { getIssueComments } from '../../services/queries'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Comments = () => {
  const [issueComments, setIssueComments] = useState([])
  const username = useRecoilValue(usernameAtom);
  const repository = useRecoilValue(repositoryAtom);
  let { issueNum } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/');
    } else {
      getIssueComments(username, repository, issueNum)
        .then(res => {
          setIssueComments(res);
          sessionStorage.setItem('issueComments', JSON.stringify(res));
        });
    }
  }, [])

  return (
    <div className="comments-block">
      <div className="comments-wrapper">
        {issueComments.map((x) => {
          return (
            <div className="comment-wrapper" key={x.id}>
              <div className="author-avatar">
                <img src={x.user.avatar_url} />
              </div>
              <div className="comment-content">
                <div className="comment-header">{x.user.login}</div>
                <div className="comment-body">{x.body}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Comments;