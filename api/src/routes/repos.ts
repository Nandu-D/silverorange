import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
const fetch = require('node-fetch');

export const repos = Router();

const REPOS_GITHUB_URL = 'https://api.github.com/users/silverorange/repos';

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  let reposFromGitHub: Repo[] = [];
  let reposFromJsonFile: Repo[] = [];
  await getReposFromGitHub(REPOS_GITHUB_URL).then((data) => {
    reposFromGitHub = data;
  });

  res.json(reposFromGitHub);
});

const getReposFromGitHub = async (url: string) => {
  try {
    const response = await fetch(url);
    const repos = await response.json();
    return repos;
  } catch (error) {
    return [];
  }
};
