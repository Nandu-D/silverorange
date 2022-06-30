import { useNavigate } from 'react-router-dom';
import { Repo } from '../../../models/Repo';
import './ListRepos.css';

interface ListReposProps {
  repos: Repo[];
}

export function ListRepos(props: ListReposProps) {
  const { repos } = props;
  const navigate = useNavigate();

  const onRepositoryClicked = (repo: Repo) => {
    navigate('/details', { state: { repo } });
  };

  return (
    <>
      {repos.map((repo, index) => {
        return (
          <tr key={repo.id} onClick={() => onRepositoryClicked(repo)}>
            <th scope="row">{index + 1}</th>
            <td>{repo.name}</td>
            <td>{repo.description}</td>
            <td>{repo.language}</td>
            <td>{repo.forks_count}</td>
          </tr>
        );
      })}
    </>
  );
}
