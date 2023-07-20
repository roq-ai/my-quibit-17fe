import axios from 'axios';
import queryString from 'query-string';
import { ProblemInterface, ProblemGetQueryInterface } from 'interfaces/problem';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProblems = async (query?: ProblemGetQueryInterface): Promise<PaginatedInterface<ProblemInterface>> => {
  const response = await axios.get('/api/problems', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createProblem = async (problem: ProblemInterface) => {
  const response = await axios.post('/api/problems', problem);
  return response.data;
};

export const updateProblemById = async (id: string, problem: ProblemInterface) => {
  const response = await axios.put(`/api/problems/${id}`, problem);
  return response.data;
};

export const getProblemById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/problems/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProblemById = async (id: string) => {
  const response = await axios.delete(`/api/problems/${id}`);
  return response.data;
};
