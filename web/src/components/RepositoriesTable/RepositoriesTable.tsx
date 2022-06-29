import React from 'react';
import { Repo } from '../../models/Repo';

interface ReposProps {
  repos: Repo[];
}

export function RepositoriesTable(props: ReposProps) {
  return <div>RepositoriesTable {props.repos.length}</div>;
}
