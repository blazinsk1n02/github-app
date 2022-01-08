import IssueItem from "../IssueItem/IssueItem";

import { useRecoilValue } from "recoil"
import { openIssuesAtom } from "../../atoms/openIssuesAtom"

const IssueList = () => {
  const openIssues = useRecoilValue(openIssuesAtom);

  const listIssues = openIssues.map((item) => {
    return <IssueItem key={item.id} item={item} />
  });

  return (
    <>
      <div className="issues-block">
        <ul>
          {listIssues.length > 0
            ? listIssues
            : <p>No open issues to show.</p>
          }
        </ul>
      </div>
    </>
  )
}

export default IssueList;