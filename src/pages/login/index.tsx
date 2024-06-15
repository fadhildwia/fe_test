import React from 'react'

const LoginPage = () => {
  return (
    <div
      className='flex flex-row min-h-screen relative'
    >
      <div className="flex w-full sm:w-1/2 items-center justify-center">
        <form className="w-[420px] flex flex-col gap-5 p-12 z-50">
          <img src="/images/login.png" alt="Login" className="w-full mx-auto" />
          <input type="username" placeholder="Username" className="border border-gray-300 rounded-md p-2" />
          <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
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