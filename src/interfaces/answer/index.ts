import { UserInterface } from 'interfaces/user';
import { ProblemInterface } from 'interfaces/problem';
import { GetQueryInterface } from 'interfaces';

export interface AnswerInterface {
  id?: string;
  content: string;
  student_id?: string;
  problem_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  problem?: ProblemInterface;
  _count?: {};
}

export interface AnswerGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  student_id?: string;
  problem_id?: string;
}
