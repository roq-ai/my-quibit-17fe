import { AnswerInterface } from 'interfaces/answer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProblemInterface {
  id?: string;
  content: string;
  teacher_id?: string;
  created_at?: any;
  updated_at?: any;
  answer?: AnswerInterface[];
  user?: UserInterface;
  _count?: {
    answer?: number;
  };
}

export interface ProblemGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  teacher_id?: string;
}
