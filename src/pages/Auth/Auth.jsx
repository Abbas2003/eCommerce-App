import { Button } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';

const Auth = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result=>", result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user=>", user);
        navigate("/")
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error?.customData?.email;
        // The AuthCredential type that was used.
        console.log("error=>", errorCode, errorMessage, email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/banner.png')`,
          filter: 'blur(4px)', 
          zIndex: 1,
        }}
      ></div>

      {/* Content Section */}
      <div
        className="relative container z-10 bg-white/[.7] p-10 mx-auto rounded-lg shadow-lg max-w-sm w-full text-center space-y-6 mt-[20vh]"
      >
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Furniro</h1>
        <p className="text-gray-700">
          Login to explore the world of beautiful interiors!
        </p>

        {/* Login Buttons */}
        <div className="space-y-3">
          <Button type="primary" block onClick={handleSignInWithGoogle}>
            Login with Google
          </Button>
          <Button type="dashed" block href='/auth/signin'>
            Login with Email
          </Button>
        </div>

        <h2 className="text-gray-700">
          Don’t have an account?{' '}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </h2>
      </div>
    </section>
  );
};

export default Auth;
