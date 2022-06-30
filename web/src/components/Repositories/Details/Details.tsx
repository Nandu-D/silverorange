import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, CardTitle } from 'reactstrap';
import { Commit } from '../../../models/Commit';
import { Repo } from '../../../models/Repo';
import './Details.css';

interface LocationState {
  repo: Repo;
}

export function Details() {
  const [isLatestCommitAvailable, setIsLatestCommitAvailable] = useState(false);
  const [commitDate, setCommitDate] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [readme, setReadme] = useState<string>();

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const { repo } = state;

  useEffect(() => {
    const gitHubCommitsUrl = repo.url + '/commits';
    fetch(gitHubCommitsUrl)
      .then((res) => res.json())
      .then((data) => extractCommitNameAuthorDate(data));

    const gitHubReadmeFileUrl = `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`;
    fetch(gitHubReadmeFileUrl)
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else {
          return '';
        }
      })
      .then((result) => setReadme(result));
  }, [repo]); // eslint-disable-line react-hooks/exhaustive-deps

  const extractCommitNameAuthorDate = (data: Commit[]) => {
    const sortedData = data.sort((x, y) => {
      const xDate = x.commit.author.date;
      const yDate = y.commit.author.date;
      const xTimeStampToEpochTime = new Date(xDate).getTime();
      const yTimeStampToEpochTime = new Date(yDate).getTime();

      return yTimeStampToEpochTime - xTimeStampToEpochTime;
    });
    if (sortedData.length) {
      const latestCommit = sortedData[0];
      setIsLatestCommitAvailable(true);
      setCommitDate(new Date(latestCommit.commit.author.date).toString());
      setAuthor(latestCommit.commit.author.name);
      setMessage(latestCommit.commit.message);
    }
  };

  return (
    <>
      <Button color="primary" onClick={() => navigate('/')}>
        Back to list
      </Button>
      {repo ? (
        <div className="commitDetails">
          {isLatestCommitAvailable ? (
            <Card className="detailsCard">
              <CardTitle tag="h4">Latest commit details</CardTitle>
              <div>
                <span>Commit date: </span>
                {commitDate}
              </div>
              <div>
                <span>Author: </span>
                {author}
              </div>
              <div>
                <span>Message: </span>
                {message}
              </div>
            </Card>
          ) : (
            <div>Couldn't fetch commits data</div>
          )}
        </div>
      ) : (
        <div className="error">
          Please try going back and reselecting a repository.
        </div>
      )}
      {readme ? (
        <ReactMarkdown className="markdown">{readme}</ReactMarkdown>
      ) : (
        <></>
      )}
    </>
  );
}
