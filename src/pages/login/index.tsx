import { appCookies } from '@/hooks/appCookies';
import usePostLogin from '@/hooks/usePostLogin';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect } from 'react'
import * as Yup from 'yup';

const LoginPage = () => {
  const router = useRouter();
  const { setCookie, getCookie } = appCookies();

  const { mutateAsync: mutateAsyncLogin } = usePostLogin({
    onSuccess: (res) => {
      setCookie({
        name: 'access_token',
        value: res.access_token
      });
      router.replace('/');
    },
    onError: (res) => {
      const errorMessage = res.response?.data.message;

      formik.setFieldError('password', errorMessage?.[0] || errorMessage)
    }
  });

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await getCookie({ name: 'access_token' });
      if (accessToken) {
        router.replace('/');
      }
    }

    checkToken();
  }, []);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: async (value) => {
      await mutateAsyncLogin({
        username: value.username,
        password: value.password
      });
    }
  });

  return (
    <div
      className='flex flex-row min-h-screen relative'
    >
      <div className="flex w-full sm:w-1/2 items-center justify-center">
        <form className="w-[420px] flex flex-col gap-5 p-12 z-50" onSubmit={formik.handleSubmit}>
          <img src="/images/login.png" alt="Login" className="w-full mx-auto" />
          <div className='flex flex-col'>
            <input
              type="username"
              placeholder="Username"
              className="border border-gray-300 rounded-md p-2"
              value={formik.values.username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                formik.setFieldError('username', undefined);
                formik.setFieldValue('username', e.target.value);
              }}
            />
            {formik.errors.username && <div className='text-red-600'>{formik.errors.username}</div>}
          </div>
          <div className='flex flex-col'>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md p-2"
              value={formik.values.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                formik.setFieldError('password', undefined);
                formik.setFieldValue('password', e.target.value);
              }}
            />
            {formik.errors.password && <div className='text-red-600 text-sm'>{formik.errors.password}</div>}
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Login</button>
        </form>
      </div>
      <div className="w-[calc(100%-420px)] flex justify-center items-center">
        <img src="/images/company-amico.png" alt="Login Image" className="object-cover w-10/12" />
      </div>
    </div>
  )
}

export default LoginPage