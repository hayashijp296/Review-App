import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import FormContainer from '../form/FormContainer';
import { commonModalClass } from '../../utils/theme';
import { ImSpinner3 } from 'react-icons/im';
import { verifyPasswordResetToken } from '../../api/auth';
import { useNotification } from '../../hooks';
import { useEffect } from 'react';
export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    one: '',
    two: '',
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  const { updateNotifications } = useNotification();
  const navigate = useNavigate();
  // isValid, isVerifying, !isValid

  useEffect(() => {
    isValidToken();
  }, []);
  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate('/auth/reset-password', { replace: true });
      return updateNotifications('error', error);
    }
    if (!valid) {
      setIsValid(false);
      return navigate('/auth/reset-password', { replace: true });
    }

    setIsValid(true);
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.one.trim())
      return updateNotifications('error', 'Password is missing');

    if (password.one.trim().length < 8)
      return updateNotifications(
        'error',
        'Password must be at least 8 characters'
      );
    if (password.one !== password.two)
      return updateNotifications('error', 'Password do not match!');
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait, we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );
  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry, the token is invalid
          </h1>
          <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
        </Container>
      </FormContainer>
    );

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClass + ' w-96'}>
          <Title>Enter New Password</Title>
          <FormInput
            value={password.one}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="one"
            type="password"
          />
          <FormInput
            value={password.two}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="********"
            name="two"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
