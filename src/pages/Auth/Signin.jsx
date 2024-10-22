import React, { useState } from 'react';
import { Button, Input, Form, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const navigate = useNavigate()

  
  const handleSignIn = async () => {
    setLoading(true); 
  
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
  
      if (res.user) {
        console.log("User Signed In Successfully", res.user);
  
        notification.success({
          message: 'Login Successful',
          description: `Welcome back, ${res.user.email}!`,
        });
  
        form.resetFields(); 
  
        navigate("/");
      }
    } catch (error) { 
      console.error("Error in Login:", error.message);
  
      notification.error({
        message: 'Login Failed',
        description: `${error.message}`,
      });
    } finally {
      setLoading(false); 
    }
  };
  



  return (
    <section className="relative h-screen w-screen flex items-center justify-center">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://mojoboutique.com/cdn/shop/articles/organic_modern_furniture_1344x.jpg?v=1704830548')`,
          filter: 'blur(8px)',
          zIndex: 1,
        }}
      ></div>

      {/* Glassmorphism Card */}
      <div
        className="relative z-10 p-8 rounded-xl shadow-lg max-w-md w-full text-center space-y-6"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
        <p className="text-gray-600">Sign in to access your account and continue shopping.</p>

        <Form layout="vertical" className="space-y-4" form={form}>
          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type="email" placeholder="Enter your email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
            
          >
            <Input.Password placeholder="Enter your password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Button type="primary" block onClick={handleSignIn} >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        <div className="text-white/75 mt-4">
          <p>
            Don’t have an account?{' '}
            <Link to="/auth/signup" className="text-blue-400 hover:underline">
              Signup
            </Link>
          </p>
          <p>
            Forgot your password?{' '}
            <Link to="/auth/forgot-password" className="text-blue-400 hover:underline">
              Reset it
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
