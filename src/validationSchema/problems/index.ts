import * as yup from 'yup';

export const problemValidationSchema = yup.object().shape({
  content: yup.string().required(),
  teacher_id: yup.string().nullable(),
});
