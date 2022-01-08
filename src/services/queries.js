const baseUrl = 'https://api.github.com/repos'

export const getRepo = async (username, repository) => {
  try {
    let response = await fetch(`${baseUrl}/${username}/${repository}/issues`, {
      state: 'open'
    });
    if (!response.ok) {
      debugger
      throw new Error("HTTP error " + response.status);
    } else {
      return response.json();
    }
  } catch (err) {
    throw new Error("HTTP error " + err.status);
  }
}

export const getIssueComments = async (username, repository, issueNum) => {
  try {
    let response = await fetch(`${baseUrl}/${username}/${repository}/issues/${issueNum}/comments`);
    let result = response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
}