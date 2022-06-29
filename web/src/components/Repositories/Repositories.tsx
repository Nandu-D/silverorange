import { Repo } from '../../models/Repo';
import { Table } from 'reactstrap';
import { TableRow } from './TableRow/TableRow';

import './Repositories.css';

interface RepositoriesProps {
  repos: Repo[];
}

export function Repositories(props: RepositoriesProps) {
  const { repos } = props;

  return (
    <div>
      <Table striped={true}>
        <thead>
          <tr>
            <th>#</th>
            <th>Repository name</th>
            <th>Description</th>
            <th>Language</th>
            <th>Forks count</th>
          </tr>
        </thead>
        <tbody>
          <TableRow repos={repos} />
        </tbody>
      </Table>
    </div>
  );
}