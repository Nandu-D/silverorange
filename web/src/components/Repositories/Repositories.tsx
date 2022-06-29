import { Repo } from '../../models/Repo';
import { Table } from 'reactstrap';
import { ListRepos } from './ListRepos/ListRepos';

import './Repositories.css';
import { useEffect, useState } from 'react';
import { Filter } from './Filter/Filter';

interface RepositoriesProps {
  repos: Repo[];
}

export function Repositories(props: RepositoriesProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [language, setLanguage] = useState<string | undefined>(undefined);

  useEffect(() => {
    //Sorting repos reverse chronologically by its creation date
    sortRepositoriesReverseChronologically();
  }, [props.repos]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (language === undefined) {
      sortRepositoriesReverseChronologically();
      return;
    }
    setRepos(props.repos.filter((repo) => repo.language === language));
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterReposByLanguage = (languageSelected: string | undefined) => {
    setLanguage(languageSelected);
  };

  const sortRepositoriesReverseChronologically = () => {
    const sortedArray = props.repos.sort((x, y) => {
      return (
        new Date(y.created_at).getTime() - new Date(x.created_at).getTime()
      );
    });
    setRepos([...sortedArray]);
  };

  return (
    <>
      <Filter
        languages={Array.from(
          new Set(props.repos.map((repo) => repo.language))
        )} //Extracting languages and removing duplicates
        onClick={filterReposByLanguage}
      />
      <Table striped={true} bordered={true}>
        <caption>
          <h4>Repositories Table</h4>
        </caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Repository name</th>
            <th scope="col">Description</th>
            <th scope="col">Language</th>
            <th scope="col">Forks count</th>
          </tr>
        </thead>
        <tbody>
          <ListRepos repos={repos} />
        </tbody>
      </Table>
    </>
  );
}
