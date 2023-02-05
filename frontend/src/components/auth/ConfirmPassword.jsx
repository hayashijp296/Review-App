import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import FormContainer from '../form/FormContainer';
import { commonModalClass } from '../../utils/theme';
export default function ConfirmPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  // isValid, isVerifying, !isValid
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClass + ' w-96'}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="confirmPassword"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
