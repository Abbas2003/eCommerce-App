import { Button } from 'antd';
import { notification } from "antd";
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Auth = () => {

  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  
    try {
      const result = await signInWithPopup(auth, provider);
  
      // Retrieve credential and token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
  
      // User information
      const user = result.user;
      console.log("User successfully signed in:", user);
  
      notification.success({
        message: "Login Successful",
        description: `Welcome, ${user.displayName || user.email}!`,
      });
  
      navigate("/");
  
    } catch (error) {
      console.error("Error during Google sign-in:", error);
  
      // Extract error details
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error?.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
  
      // Display error notification
      notification.error({
        message: "Login Failed",
        description: `Error: ${errorMessage} (Code: ${errorCode})`,
      });
  
      // Optional: Log the email or handle specific credential-related cases
      if (email) console.log("Affected email:", email);
    }
  };
  

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
