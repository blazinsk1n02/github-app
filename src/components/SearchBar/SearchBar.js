import './SearchBar.scss';

import { getRepo } from '../../services/queries'
import { useRecoilState } from "recoil";
import { usernameAtom } from '../../atoms/usernameAtom';
import { repositoryAtom } from '../../atoms/repositoryAtom';
import { openIssuesAtom } from '../../atoms/openIssuesAtom';
import { useEffect } from 'react';

const SearchBar = () => {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [repository, setRepository] = useRecoilState(repositoryAtom);
  const [openIssues, setOpenIssues] = useRecoilState(openIssuesAtom)

  useEffect(() => {
    if (sessionStorage.getItem("username") !== null) {
      setUsername(JSON.parse(sessionStorage.getItem('username')));
    }

    if (sessionStorage.getItem("repository") !== null) {
      setRepository(JSON.parse(sessionStorage.getItem('repository')));
    }

    if (sessionStorage.getItem("openIssues") !== null) {
      setOpenIssues(JSON.parse(sessionStorage.getItem('openIssues')));
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handleRepoChange = (event) => {
    setRepository(event.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    sessionStorage.setItem('username', JSON.stringify(username));
    sessionStorage.setItem('repository', JSON.stringify(repository));

    getRepo(username, repository)
      .then(res => {
        setOpenIssues(res)
      })
      .catch(e => {
        setOpenIssues([]);
        if (openIssues.length > 0) {
          sessionStorage.removeItem('openIssues');
        }
        console.log(e)
      });
  }

  if (openIssues.length > 0) {
    sessionStorage.setItem('openIssues', JSON.stringify(openIssues));
  }

  return (
    <div className='search-block'>
      <p>Enter username and repository to show open issues</p>

      <form method="POST" onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            className="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder='Username'
          // autoComplete='off'
          />

          <input
            type="text"
            name="repository"
            value={repository}
            onChange={handleRepoChange}
            placeholder='Repository'
          // autoComplete='off'
          />
        </div>

        <button name="search">
          Search
        </button>

      </form>
    </div>
  )
}

export default SearchBar;