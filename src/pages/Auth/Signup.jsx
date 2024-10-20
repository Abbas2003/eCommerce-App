import React from 'react';
import { Button, Input, Form } from 'antd';
import { Link } from 'react-router-dom';

const Signup = () => {
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

        <Form layout="vertical" className="space-y-4">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" block>
            Signup
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
