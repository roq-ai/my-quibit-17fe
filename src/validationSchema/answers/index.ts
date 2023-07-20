import * as yup from 'yup';

export const answerValidationSchema = yup.object().shape({
  content: yup.string().required(),
  student_id: yup.string().nullable(),
  problem_id: yup.string().nullable(),
});
