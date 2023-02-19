import React from 'react';
import { useForm } from 'react-hook-form';
import { signIn, signOut } from 'next-auth/react';

type LoginForm = {
  email: string;
  password: string;
};

const HomePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>();

  const submit = (form: LoginForm) => {
    console.log(form);
    signIn('credentials', form);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className='grid h-screen place-content-center'>
      <button onClick={handleLogout}>Logout</button>
      <form
        onSubmit={handleSubmit(submit)}
        className='w-screen max-w-xs border '
        noValidate
      >
        <h1 className='text-2xl font-bold text-center uppercase'>Sign In</h1>
        <input
          className='w-full px-2 py-1 border'
          type='email'
          {...register('email', { required: true })}
          placeholder='example@example.com'
        />
        <input
          className='w-full px-2 py-1 border'
          type='password'
          {...register('password', { required: true })}
          placeholder='*******'
        />
        <button className='w-full p-2 font-semibold tracking-wide bg-blue-300'>
          {' '}
          Login{' '}
        </button>
      </form>
    </div>
  );
};

export default HomePage;
