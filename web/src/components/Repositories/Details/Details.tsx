import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
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

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const { repo } = state;

  useEffect(() => {
    fetch(repo.url + '/commits')
      .then((res) => res.json())
      .then((data) => {
        const sortedData = (data as Commit[]).sort((x, y) => {
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
      });
  }, [repo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Button color="primary" onClick={() => navigate('/')}>
        Back to list
      </Button>
      {repo ? (
        <div className="commitDetails">
          {isLatestCommitAvailable ? (
            <>
              <div>
                <span>Most recent commit date: </span>
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
            </>
          ) : (
            <div>Couldn't fetch commits data</div>
          )}
        </div>
      ) : (
        <div className="error">
          Please try going back and reselecting a repository.
        </div>
      )}
    </>
  );
}
