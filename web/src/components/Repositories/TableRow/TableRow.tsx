import { Repo } from '../../../models/Repo';

interface TableRowProps {
  repos: Repo[];
}

export function TableRow(props: TableRowProps) {
  const { repos } = props;

  return (
    <>
      {repos.map((repo, index) => (
        <tr key={repo.id}>
          <th scope="row">{index + 1}</th>
          <td>{repo.name}</td>
          <td>{repo.description}</td>
          <td>{repo.language}</td>
          <td>{repo.forks_count}</td>
        </tr>
      ))}
    </>
  );
}
