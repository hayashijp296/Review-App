import React from 'react';
import { useState } from 'react';
import { forgetPassword } from '../../api/auth';
import { commonModalClass } from '../../utils/theme';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import { isValidEmail } from '../../utils/helper';
import { useNotification } from '../../hooks';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const { updateNotifications } = useNotification();
  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotifications('error', 'Invalid email');
    const { error, message } = await forgetPassword(email);
    if (error) return updateNotifications('error', error);
    updateNotifications('success', message);
  };
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClass + ' w-96'}>
          <Title>Please Enter Your Email</Title>
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="lam@gmail.com"
            name="email"
          />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
