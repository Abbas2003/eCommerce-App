import React, { useState, useEffect, useContext } from 'react';
import { Input, message } from 'antd'; // Import message for alert
import Hero from '../components/Hero';
import QualitySection from '../components/QualitySection';
import emailjs from 'emailjs-com';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';


const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0); // State to hold the stored subtotal value
  const [paymentMethod, setPaymentMethod] = useState(''); // State for payment method

  // Form fields state
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
  });

  const user = useContext(UserContext);
  const navigate = useNavigate();


  // Fetch cart items and subtotal from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    // Calculate total price and quantity
    const total = storedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const quantity = storedCartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalPrice(total);
    setTotalQuantity(quantity);

    // Store the subtotal in localStorage
    localStorage.setItem('cartSubtotal', total.toString());
    setCartSubtotal(total); // Update the state with the calculated subtotal
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Function to handle sending email using EmailJS
  const sendEmail = async (orderMessage) => {
    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    const templateParams = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      to_email: formValues.email,
      orderDetails: orderMessage, // Dynamic order details passed to the template
    };

    try {
      const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log('Email sent to:', formValues.email, response);
      message.success('Order confirmation email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      message.error('Failed to send order confirmation email. Please try again later.');
    }

    // Placeholder function to simulate sending an email
    // console.log('Email sent to:', formValues.email);
    // console.log('Order Message:', orderMessage);
  };

  // Function to handle checkout and send order details via WhatsApp and Email
  // Function to handle checkout and send order details via WhatsApp and Email
  const checkoutOrder = async () => {
    if (!user.isLogin) {
      message.error('Please log in to place your order.');
      // Redirect to the auth page after showing the error
      setTimeout(() => {
        navigate('/auth');
      }, 3000); // Redirect after 3 seconds
      return;
    }

    // Check if all required fields are filled
    const { firstName, lastName, country, streetAddress, city, province, zipCode, phone, email } = formValues;

    if (
      !firstName ||
      !lastName ||
      !country ||
      !streetAddress ||
      !city ||
      !province ||
      !zipCode ||
      !phone ||
      !email ||
      !paymentMethod // Check if payment method is selected
    ) {
      message.error('Please fill in all the required fields and select a payment method.');
      return;
    }

    // Create a readable message to send to WhatsApp
    const orderMessage = `
    New Order from ${firstName} ${lastName}
    \nEmail: ${email}
    \nPhone: ${phone}
    \nAddress: ${streetAddress}, ${city}, ${province}, ${zipCode}, ${country}
    \n\nItems Ordered:
    ${cartItems.map((item) => `${item.title} x ${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}`).join('\n')}
    \n\nTotal Quantity: ${totalQuantity}
    \nSubtotal: Rs. ${cartSubtotal.toLocaleString()}
    \nTotal Price: Rs. ${totalPrice.toLocaleString()}
    \nPayment Method: ${paymentMethod}
    \n\nAdditional Info: ${formValues.additionalInfo || 'N/A'}
  `;

    // Open WhatsApp with the formatted message
    window.open(`https://wa.me/923108295635?text=${encodeURIComponent(orderMessage)}`);

    // Send the order summary to the user's email
    sendEmail(orderMessage);

    // Clear the cart after placing the order
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartSubtotal'); // Remove subtotal from local storage
    setCartItems([]);
    setCartSubtotal(0);

    message.success('Order placed successfully!');
  };


  return (
    <section className='poppins-font'>
      {/* Hero Section */}
      <Hero currentPage={'Checkout'} PreviousPage={'Home'} />

      {/* Checkout Form and Summary */}
      <div className="container mx-auto sm:px-6 my-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">Billing Details</h1>
          <div className="space-y-8 px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="space-y-5 md:w-1/3 w-full">
                <p>First Name</p>
                <Input name="firstName" required value={formValues.firstName} onChange={handleInputChange} className="p-4" />
              </div>
              <div className="space-y-5 md:w-1/3 w-full">
                <p>Last Name</p>
                <Input name="lastName" required value={formValues.lastName} onChange={handleInputChange} className="p-4" />
              </div>
            </div>
            <div className="space-y-5">
              <p>Company Name (optional)</p>
              <Input name="companyName" value={formValues.companyName} onChange={handleInputChange} className="p-4" />
            </div>
            <div className="space-y-5">
              <p>Country / Region</p>
              <select
                name="country"
                value={formValues.country}
                onChange={handleInputChange}
                className="border rounded-md p-4 w-full"
                aria-placeholder="Select"
                required
              >
                <option value="">Select Country</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Iran">Iran</option>
              </select>
            </div>
            <div className="space-y-5">
              <p>Street address</p>
              <Input name="streetAddress" required value={formValues.streetAddress} onChange={handleInputChange} className="p-4" />
            </div>
            <div className="space-y-5">
              <p>Town / City</p>
              <Input name="city" value={formValues.city} required onChange={handleInputChange} className="p-4" />
            </div>
            <div className="space-y-5">
              <p>Province</p>
              <select
                name="province"
                value={formValues.province}
                onChange={handleInputChange}
                className="border rounded-md p-4 w-full"
                aria-placeholder="Select"
                required
              >
                <option value="">Select Province</option>
                <option value="Sindh">Sindh</option>
                <option value="Punjab">Punjab</option>
                <option value="Balochistan">Balochistan</option>
                <option value="KPK">KPK</option>
              </select>
            </div>
            <div className="space-y-5">
              <p>ZIP code</p>
              <Input name="zipCode" value={formValues.zipCode} required onChange={handleInputChange} className="p-4" />
            </div>
            <div className="space-y-5">
              <p>Phone</p>
              <Input name="phone" value={formValues.phone} required onChange={handleInputChange} className="p-4" />
            </div>
            <div className="space-y-5">
              <p>Email address</p>
              <Input name="email" value={formValues.email} required onChange={handleInputChange} className="p-4" />
            </div>
            <div className="space-y-5">
              <Input
                name="additionalInfo"
                value={formValues.additionalInfo}
                onChange={handleInputChange}
                className="p-4"
                placeholder="Additional information"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full mx-auto my-10">
          <table className="w-full text-left border-collapse mb-5 border-b border-[#D9D9D9]">
            {/* Table Header */}
            <thead>
              <tr>
                <th className="px-4 py-3 text-[24px] font-semibold">Product</th>
                <th className="px-4 py-3 text-[24px] font-semibold text-right">Subtotal</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-[#9F9F9F]">
                      {item.title} <span className="text-black">x {item.quantity}</span>
                    </td>
                    <td className="px-4 py-2 text-right">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-gray-500 py-4">
                    No products in the cart.
                  </td>
                </tr>
              )}
              {/* Subtotal */}
              <tr>
                <td className="px-4 py-2">Subtotal</td>
                <td className="px-4 py-2 text-right">Rs. {cartSubtotal.toLocaleString()}</td>
              </tr>
              {/* Total */}
              <tr>
                <td className="px-4 pt-2 pb-4">Total</td>
                <td className="px-4 pt-2 pb-4 text-[24px] font-bold text-[#B88E2F] text-right">
                  Rs. {cartSubtotal.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Payment Options */}
          <div className="mb-6 px-3 md:px-0">
            <h3 className="font-semibold mb-4">
              <span className="bg-black rounded-full mr-3 p-[6px] inline-block"></span>Direct Bank Transfer
            </h3>
            <p className="text-[#9F9F9F] text-sm mb-4">
              Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
            </p>
            <div>
              <label className="flex items-center mb-2">
                <input type="radio" name="payment" value="Direct Bank Transfer" onChange={handlePaymentChange} className="mr-2" />
                <span className="text-[#9F9F9F]">Direct Bank Transfer</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="payment" value="Cash On Delivery" onChange={handlePaymentChange} className="mr-2" />
                <span className="text-[#9F9F9F]">Cash On Delivery</span>
              </label>
            </div>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-600 px-3 md:px-0">
            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <strong>privacy policy.</strong>
          </p>

          {/* Place Order Button */}
          <div className="text-center my-8">
            <button onClick={checkoutOrder} className="border border-black rounded-xl py-3 md:w-2/4 w-1/2">
              Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Quality Section */}
      <QualitySection />
    </section>
  );
};

export default CheckOut;
