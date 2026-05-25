import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="flex-grow flex w-full min-h-screen">
      <div className="w-full flex flex-col md:flex-row min-h-screen animate-fade-in-scale">
        {/* Left Side: Login Container */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center items-center bg-white">
          <div className="w-full max-w-md text-left">
            <div className="mb-10">
              <h2 className="font-headline text-3xl text-on-background font-bold mb-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                Log in to<br />
                <img
                  alt="ShareHouse"
                  className="h-16 block -ml-2 mt-2 object-contain"
                  src="/logo-light-bg.png"
                />
              </h2>
              <p className="font-body text-base text-secondary animate-fade-in-up" style={{ animationDelay: '450ms' }}>
                Your internal marketplace for everyday efficiency.
              </p>
            </div>
            
            <button
              onClick={handleLogin}
              className="group w-full flex items-center justify-center gap-4 py-4 px-6 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container hover:border-accent-red hover:shadow-md transition-all duration-300 cursor-pointer shadow-sm animate-fade-in-up"
              style={{ animationDelay: '600ms' }}
            >
              <svg height="24px" viewBox="0 0 48 48" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
                <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
                <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path>
                <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
              </svg>
              <span className="font-label text-base text-on-surface font-medium">Sign in with Google</span>
            </button>

            <div className="mt-8 flex flex-col gap-4 text-left animate-fade-in-up" style={{ animationDelay: '750ms' }}>
              <a className="font-label text-sm text-secondary hover:text-accent-red transition-all font-medium" href="#">Trouble signing in?</a>
              <a className="font-label text-sm text-secondary hover:text-accent-red transition-all font-medium" href="#">Contact Support</a>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Gradient */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-image relative overflow-hidden h-full min-h-screen"></div>
      </div>
    </main>
  );
};

export default Login;
