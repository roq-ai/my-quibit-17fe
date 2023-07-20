import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getAnswerById, updateAnswerById } from 'apiSdk/answers';
import { answerValidationSchema } from 'validationSchema/answers';
import { AnswerInterface } from 'interfaces/answer';
import { UserInterface } from 'interfaces/user';
import { ProblemInterface } from 'interfaces/problem';
import { getUsers } from 'apiSdk/users';
import { getProblems } from 'apiSdk/problems';

function AnswerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AnswerInterface>(
    () => (id ? `/answers/${id}` : null),
    () => getAnswerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AnswerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAnswerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/answers');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AnswerInterface>({
    initialValues: data,
    validationSchema: answerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Answers',
              link: '/answers',
            },
            {
              label: 'Update Answer',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Answer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.content}
            label={'Content'}
            props={{
              name: 'content',
              placeholder: 'Content',
              value: formik.values?.content,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'student_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<ProblemInterface>
            formik={formik}
            name={'problem_id'}
            label={'Select Problem'}
            placeholder={'Select Problem'}
            fetcher={getProblems}
            labelField={'content'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/answers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'answer',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AnswerEditPage);
