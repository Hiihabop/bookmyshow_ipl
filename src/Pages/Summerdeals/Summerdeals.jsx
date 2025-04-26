import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../Axios/MatchData";

const Summerdeals = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const price = queryParams.get("price");
  const quantity = queryParams.get("quantity");

  const { data = [] } = useContext(AuthContext);
  const { match_number } = useParams();
  const [MatchData, setMatchData] = useState([]);
  const baseAmount = price * quantity;

  // Calculate GST (18% of Base Amount)
  const gstAmount = baseAmount * 0.18;

  // Fixed Service Fee
  const serviceFee = 75;

  // Calculate Final Total Amount
  const totalAmount = baseAmount + gstAmount + serviceFee;

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const parsedMatchNumber = parseInt(match_number, 10);
      const match = data.find(
        (match) => match.match_number === parsedMatchNumber
      );
      setMatchData(match);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isValid, setIsValid] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate Form
    validateForm({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate(
        `/payment?amount=${totalAmount.toFixed(2)}&name=${encodeURIComponent(
          formData.name
        )}&email=${encodeURIComponent(
          formData.email
        )}&phone=${encodeURIComponent(formData.phone)}`
      );
    }
  };

  const validateForm = (data) => {
    const nameValid = data.name.trim().length > 2;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      data.email
    );
    const phoneValid = /^[7,8,9][0-9]{9}$/.test(data.phone); // 9 से शुरू होकर 10-digit

    setIsValid(nameValid && emailValid && phoneValid);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              className="flex items-center text-primary hover:text-primary-dark"
              onClick={() => window.history.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
          </div>
          <h1 className="text-3xl font-bold text-center mb-6">
            Complete Your Booking
          </h1>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gray-100 p-4 border-b">
              <h2 className="font-semibold">Booking Summary</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Match:</span>
                <span className="ml-2">
                  {MatchData.team1} vs {MatchData.team2}{" "}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Date &amp; Time:</span>
                <span className="ml-2">
                  {MatchData.date}, {MatchData.time}{" "}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Venue:</span>
                <span className="ml-2">{MatchData.venue} </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Ticket Type:</span>
                <span className="font-medium ml-2">General Stand</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Ticket Price:</span>
                <span className="ml-2">{price} per ticket</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="ml-2">{quantity} tickets</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Base Amount:</span>
                <span className="ml-2">₹{baseAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">GST (18%):</span>
                <span className="ml-2">₹{gstAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service Fee:</span>
                <span className="ml-2">₹{serviceFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold mt-4 pt-4 border-t">
                <span>Total Amount:</span>
                <span className="ml-2 text-red-600">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} id="thb_dev-customer-form">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-gray-100 p-4 border-b">
                <h2 className="font-semibold">Customer Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                    pattern="9[0-9]{9}" // यह HTML level पर validation करेगा
                    title="Mobile number should start with 9 and must be 10 digits"
                    maxLength={10}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Enter a 10-digit mobile number without country code
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              {isValid ? (
                <Link
                  type="submit"
                  to={`/payment?amount=${totalAmount.toFixed(2)}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-200 w-full sm:w-auto min-h-[44px]"
                >
                  Pay ₹{totalAmount.toFixed(2)} with Razorpay
                </Link>
              ) : (
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition duration-200 w-full sm:w-auto min-h-[44px] disabled:pointer-events-none disabled:opacity-50"
                  disabled
                >
                  Pay ₹{totalAmount.toFixed(2)} with Razorpay
                </button>
              )}
              <p className="mt-4 text-sm text-gray-500">
                By proceeding, you agree to our Terms &amp; Conditions
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Summerdeals;
