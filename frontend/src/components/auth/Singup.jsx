import React from 'react';
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

export default function Signup() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign up</Title>
          <FormInput label="Name" placeholder="Lam Nguyen" name="name" />
          <FormInput label="Email" placeholder="lam@gmail.com" name="email" />
          <FormInput label="Password" placeholder="********" name="password" />
          <Submit value="Sign up" />
          <div className="flex justify-between">
            <a
              className="text-dark-subtle hover:text-white transition"
              href="#"
            >
              Forget password
            </a>
            <a
              className="text-dark-subtle hover:text-white transition"
              href="#"
            >
              Sign in
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
}
