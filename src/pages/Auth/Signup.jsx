import React, { useState } from 'react';
import { Button, Input, Form, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const navigate = useNavigate()


  const handleSignUp = async () => {
    setLoading(true); 
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      if (res.user) {
        const userObj = {
          email: email,
          password: password,
          id: res.user.uid,
          name: name,
          role: "user",
        };
  
        console.log("User Signed In Successfully", userObj);
  
        await setDoc(doc(db, "users", userObj.id), userObj); 
  
        notification.success({
          message: 'Signup Successful',
          description: 'You have signed up successfully! Welcome to Furniro.',
        });
  
        form.resetFields(); 
      } 
    } catch (error) {
      console.error("Error in Signup:", error.message);
  
      notification.error({
        message: 'Signup Failed',
        description: `Error: ${error.message}`,
      });
    } finally {
      setLoading(false); 
    }
  };
  


  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://mojoboutique.com/cdn/shop/articles/organic_modern_furniture_1344x.jpg?v=1704830548')`,
          filter: 'blur(8px)',
          zIndex: 1,
        }}
      ></div>

      {/* Signup Form */}
      <div
        className="relative z-10 bg-white mx-auto p-8 rounded-lg shadow-lg max-w-md w-full text-center space-y-6 md:mt-[15vh]"
      >
        <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
        <p className="text-gray-500">
          Join Furniro and start your journey to beautiful interiors!
        </p>

        <Form layout="vertical" form={form} className="space-y-4">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input type="email" placeholder="Enter your email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Button type="primary" block onClick={handleSignUp}>
            {!loading ? "Signup" : "Submitting..."}
          </Button>
        </Form>

        <h2 className="text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/signin" className="text-blue-500 hover:underline">
            Login
          </Link>
        </h2>
      </div>
    </section>
  );
};

export default Signup;
