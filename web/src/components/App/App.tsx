import React, { useEffect, useState } from 'react';

import './App.css';
import { Repo } from '../../models/Repo';
import { RepositoriesTable } from '../RepositoriesTable/RepositoriesTable';

export function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRepos(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }, []);

  if (error) {
    return <div>Couldn't load repositories. Please try again.</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <RepositoriesTable repos={repos} />;
  }
}
