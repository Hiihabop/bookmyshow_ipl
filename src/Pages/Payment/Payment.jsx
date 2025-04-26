import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Link, useLocation } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebase/firebase";
import images from "../../assets/images";


const Payment = () => {

  const [upiLink, setupiLink] = useState("")
  
  useEffect(()=>{
    upi()
  },[])

  const upi = async () => {
    const db = getDatabase(app);
    const upiRef = ref(db, "upi_id");
    const snapshot = await get(upiRef);
    if (snapshot.exists()) {
      const upiData = snapshot.val();
      setupiLink(upiData);
    } else {
      console.log("No data available");
    }
  }

  const qrRef = useRef();

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "QRCode.png";
      downloadLink.click();
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get("amount");
  const paymentAmount = !isNaN(parseFloat(amount))
    ? parseFloat(amount).toFixed(2)
    : "0.00";

    const upiId = upiLink.upi;
    const site_name = "site_name";
    const amt = paymentAmount;
    const tmp_site_name = "BookMyShow Payment";

    const upiUrl = `upi://pay?pa=${upiId}&pn=${site_name}&am=${amt}&cu=INR&tn=${tmp_site_name}`;
    


  // const upiLink = `upi://pay?pa=0792865a0208562.bqr@kotak&pn=bookmy show&am=${paymentAmount}&cu=INR`;

  const [openAccordion, setOpenAccordion] = useState(null);
  const contentRefs = [useRef(null), useRef(null), useRef(null)];

  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      // Clicking the currently open accordion closes it
      setOpenAccordion(null);
    } else {
      // Clicking a new accordion closes others and opens this one
      setOpenAccordion(index);
    }
  };

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return; // Agar timer khatam ho gaya to aur update nahi karega

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Component unmount hone pe cleanup karega
  }, [timeLeft]);

  // Seconds ko "MM:SS" format me convert karne ke liye
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const [utrNumber, setUtrNumber] = useState("");
  const [shaNumber, setShaNumber] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Kisi bhi ek input me value ho to button enable ho
    if (utrNumber.length > 11 || shaNumber.length > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [utrNumber, shaNumber]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const openUPIApp = () => {
    console.log(selected);
    const upiId = upiLink.upi;
    const site_name = "site_name";
    const amt = paymentAmount;
    const tmp_site_name = "BookMyShow Payment";
    let upiUrl = "";
    if (selected === "Google Pay") {
      upiUrl = `upi://pay?pa=${upiId}&pn=${site_name}&am=${amt}&cu=INR&tn=${tmp_site_name}`;
    } else if (selected === "PhonePe") {
      upiUrl = `phonepe://pay?pa=${upiId}&pn=${site_name}&am=${amt}&cu=INR&tn=${tmp_site_name}`;
    } else if (selected === "Paytm") {
      upiUrl = `paytmmp://pay?pa=${upiId}&pn=${site_name}&am=${amt}&cu=INR&tn=${tmp_site_name}`;
    } else if (selected === "Other UPI APP") {
      upiUrl = `upi://pay?pa=${upiId}&pn=${site_name}&am=${amt}&cu=INR&tn=${tmp_site_name}`;
    }
    const opened = window.open(upiUrl, "_self");

    setTimeout(() => {
      if (!opened) {
        setShowErrorModal(true);
      }
    }, 500);
  };

  const [selected, setSelected] = useState("");

  const upiApps = [
    {
      name: "PhonePe",
      onclick: "PhonePe",
      icon: "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/phonepay.png",
    },
    {
      name: "Paytm",
      onclick: "Paytm",
      icon: "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/paytm.svg",
    },
    {
      name: "Google Pay",
      onclick: "Google Pay",
      icon: "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/gpay.png",
    },
    {
      name: "Other UPI APP",
      onclick: "Other UPI APP",
      icon: "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745665251/IPL_TIME_LOGO/Icon/ea5vgtntqxifynpywtch.png",
    },
  ];

  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleClick = (appName) => {
    setSelected(appName);
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div>
      <div className="w-full h-full">
        <div className="jsx-d1df65e65681fd70 flex flex-col min-h-screen bg-gray-50">
          <div className="jsx-d1df65e65681fd70 bg-white text-gray-800 p-2 shadow-sm">
            <div className="jsx-d1df65e65681fd70 container mx-auto">
              <div className="jsx-d1df65e65681fd70 flex items-center justify-between">
                <div className="jsx-d1df65e65681fd70 flex items-center">
                  <button
                    className="jsx-d1df65e65681fd70 p-1 touch-manipulation mr-2"
                    onClick={() => window.history.back()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-left"
                    >
                      <path d="m12 19-7-7 7-7" />
                      <path d="M19 12H5" />
                    </svg>
                  </button>
                  <div className="jsx-d1df65e65681fd70 flex flex-col">
                    <div className="jsx-d1df65e65681fd70 flex items-center">
                      <span
                        className="jsx-d1df65e65681fd70 text-sm font-bold"
                        style={{ color: "rgb(91, 91, 91)" }}
                      >
                        book
                      </span>
                      <img
                        alt="BookMyShow"
                        className="jsx-d1df65e65681fd70 h-6 mx-1"
                        src="https://e7.pngegg.com/pngimages/919/445/png-clipart-bookmyshow-office-android-ticket-android-text-logo-thumbnail.png"
                      />
                      <span
                        className="jsx-d1df65e65681fd70 text-sm font-bold"
                        style={{ color: "rgb(91, 91, 91)" }}
                      >
                        show
                      </span>
                    </div>
                    <div className="jsx-d1df65e65681fd70 flex items-center text-[10px] text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={10}
                        height={10}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shield mr-1"
                      >
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      </svg>
                      <span className="jsx-d1df65e65681fd70">
                        Razorpay Trusted Business
                      </span>
                    </div>
                  </div>
                </div>
                <div className="jsx-d1df65e65681fd70 bg-gray-100 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="jsx-d1df65e65681fd70 container mx-auto px-3 py-2 flex-grow">
            <h2 className="jsx-d1df65e65681fd70 text-base font-bold mb-1">
              Payment Options
            </h2>
            <h3 className="jsx-d1df65e65681fd70 text-xs text-gray-600 mb-3">
              All Payment Options
            </h3>
            <div className="jsx-d1df65e65681fd70 bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="mb-2 border border-gray-200 rounded-md overflow-hidden">
                <h2>
                  <button
                    className={`w-full px-4 py-3 text-left font-medium flex justify-between items-center transition-colors duration-300 ${
                      openAccordion === 1 ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => toggleAccordion(1)}
                    aria-expanded={openAccordion === 1}
                  >
                    <div className="flex items-center justify-between w-full min-h-[48px] accordion-header">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <img
                            alt="BHIM UPI"
                            className="w-6 h-6"
                            src="https://img.icons8.com/fluent/200/bhim.png"
                          />
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold text-sm mr-2">
                            UPI/QR
                          </span>
                          <div className="flex">
                            <img
                              alt="Payment Options"
                              className="h-6 object-contain ml-3"
                              src="https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/paytm.svg"
                            />
                            <img
                              alt="Payment Options"
                              className="h-6 object-contain ml-3"
                              src="https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/phonepay.png"
                            />
                            <img
                              alt="Payment Options"
                              className="h-6 object-contain ml-3"
                              src="https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/gpay.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        openAccordion === 1 ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  ref={contentRefs[0]}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === 1 ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className=" p-4 sm:p-6 relative accordion-content">
                    <div className="flex flex-col gap-4">
                      <div className="">
                        <div className="">
                          <div className="w-full flex justify-between mb-2 sm:mb-0 sm:absolute sm:top-4 sm:right-4 sm:flex sm:items-center text-gray-600">
                            <div className="inline-block px-2 py-0.5 mb-3 bg-[#E7F9E7] text-[#0C7A0C] text-xs rounded-full">
                              Upto ₹200 cashback
                            </div>
                            <div className="flex ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span
                                className="font-medium text-red-500 scale-110 transition-transform duration-200"
                                title="You have 15 minutes to complete this payment"
                                id="thb_dev-timer"
                              >
                                {formatTime(timeLeft)}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 w-full">
                            {upiApps.map((app) => (
                              <div key={app.name}>
                                <button
                                  onClick={() => handleClick(app.onclick)}
                                  className={`flex items-center gap-2 px-4 mb-4 py-2 border rounded-md text-sm font-medium${
                                    selected === app.name
                                      ? "border-red-300 bg-red-50 text-red-700"
                                      : "border-gray-300 text-gray-700"
                                  }`}
                                >
                                  <span className="text-lg">
                                    <img
                                      src={app.icon}
                                      className="h-4"
                                      alt=""
                                    />
                                  </span>
                                  {app.name}
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={handleButtonClick}
                              className={`flex items-center gap-2 px-4 w-35 mb-4 py-2 border rounded-md text-sm font-medium
                                       "border-red-300 "
                                      "border-gray-300 text-gray-700"
                                  `}
                            >
                              <span className="text-lg">
                                <img
                                  src={
                                    "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745677168/IPL_TIME_LOGO/Icon/qr.png"
                                  }
                                  className="h-5"
                                  alt=""
                                />
                              </span>
                              QR Code
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full max-w-md"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Item 2 */}
              <div className="mb-2 border border-gray-200 rounded-md overflow-hidden">
                <h2>
                  <button
                    className={`w-full px-4 py-3 text-left font-medium flex justify-between items-center transition-colors duration-300 ${
                      openAccordion === 2 ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => toggleAccordion(2)}
                    aria-expanded={openAccordion === 2}
                  >
                    <div className="flex items-center justify-between w-full accordion-header">
                      <div className="flex items-center">
                        <div className="text-blue-600 mr-4">
                          <svg
                            width={32}
                            height={32}
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x={4}
                              y={8}
                              width={24}
                              height={16}
                              rx={2}
                              stroke="#2563EB"
                              strokeWidth={2}
                            />
                            <line
                              x1={4}
                              y1={13}
                              x2={28}
                              y2={13}
                              stroke="#2563EB"
                              strokeWidth={2}
                            />
                          </svg>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold text-sm mr-2">
                            Cards
                          </span>
                          <img
                            alt="Card Payment Options"
                            className="h-6 object-contain"
                            src="https://t3.ftcdn.net/jpg/05/89/45/84/360_F_589458438_NjcRmqJWjA2Jk2YlMY2k5jKB4iCdRkAn.jpg"
                          />
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        openAccordion === 2 ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  ref={contentRefs[1]}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === 2 ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="mt-4 p-4 border border-blue-200 rounded-lg bg-blue-50 text-red-500 text-sm accordion-content">
                      Payment via credit/debit card is disabled due to high
                      payment failure response from our banks! Please choose
                      from other payment methods available to make your payment.
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Item 3 */}
              <div className="mb-2 border border-gray-200 rounded-md overflow-hidden">
                <h2>
                  <button
                    className={`w-full px-4 py-3 text-left font-medium flex justify-between items-center transition-colors duration-300 ${
                      openAccordion === 3 ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => toggleAccordion(3)}
                    aria-expanded={openAccordion === 3}
                  >
                    <div className="flex items-center justify-between w-full accordion-header">
                      <div className="flex items-center">
                        <div className="text-blue-600 mr-4">
                          <svg
                            width={32}
                            height={32}
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x={4}
                              y={7}
                              width={24}
                              height={18}
                              rx={2}
                              stroke="#2563EB"
                              strokeWidth={2}
                            />
                            <path d="M24 14H28V18H24V14Z" fill="#2563EB" />
                          </svg>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold text-sm mr-2">
                            Wallet
                          </span>
                          <div className="flex">
                            <img
                              alt="Payment Options"
                              className="h-6 object-contain ml-3"
                              src="https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745676287/IPL_TIME_LOGO/Icon/wolet_3.png"
                            />
                            <img
                              alt="Payment Options"
                              className="h-6 object-contain ml-3"
                              src="https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745676287/IPL_TIME_LOGO/Icon/wolet_2.png"
                            />
                            <img
                              alt="Payment Options"
                              className="h-6 object-contain ml-3"
                              src="https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745676287/IPL_TIME_LOGO/Icon/wolet_1.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        openAccordion === 3 ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  ref={contentRefs[2]}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === 3 ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="mt-3 p-3 border border-blue-200 rounded-lg bg-blue-50 accordion-content ">
                      <div className="text-center">
                        <h3 className="text-green-600 text-sm font-medium mb-2">
                          Pay using any upi to make your order success ✓
                        </h3>
                        <div className="bg-white p-2 rounded-md mb-3 relative">
                          <div className="flex flex-col items-center">
                            <p
                              className="text-sm font-medium"
                              id="thb_dev-upi-id"
                            >
                              {upiLink.upi}
                            </p>
                            <p className="text-xs text-gray-600 mb-2">
                              Account • Bank
                            </p>
                            <button
                              id="thb_dev-copy-upi-btn"
                              className="text-blue-500 border border-blue-500 rounded-md px-4 py-0.5 text-xs w-24 active:bg-blue-500"
                              onClick={() => {
                                const upiId = upiLink.upi; 
                                navigator.clipboard
                                  .writeText(upiId)
                                  .then(() => {
                                    alert("UPI ID copied to clipboard!");
                                  })
                                  .catch((err) => {
                                    console.error(
                                      "Failed to copy UPI ID: ",
                                      err
                                    );
                                  });
                              }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm font-medium">
                            Amount to be Paid ₹{paymentAmount}
                          </p>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">
                          After Payment, Please Enter Your 12 Digits UTR or
                          Transaction Number to Verify Your Payment and Track
                          Your Tickets
                        </p>
                        <div>
                          <label
                            htmlFor="walletUtrNumber"
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            UTR UPI REF. NO
                          </label>
                          <input
                            id="utrInput"
                            placeholder="Enter UTR or Transaction Number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            maxLength={12}
                            required
                            type="text"
                            value={utrNumber}
                            onChange={(e) => setUtrNumber(e.target.value)}
                          />
                          <p className="mt-1 text-xs text-red-500">
                            *Required - Please enter a valid 12-digit UTR number
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="account-strip"
            className="jsx-d1df65e65681fd70 flex flex-col items-center bg-surface p-2"
          >
            <div className="jsx-d1df65e65681fd70 flex items-center justify-center">
              <div
                data-testid="secured-by-razorpay"
                className="jsx-d1df65e65681fd70 flex items-end justify-center text-[#768EA7]"
                style={{ visibility: "visible" }}
              >
                <span className="jsx-d1df65e65681fd70 text-xs mr-px">
                  Secured by
                </span>
                <span
                  data-testid
                  title="RazorPay"
                  className="jsx-d1df65e65681fd70 inline-flex h-3 items-center *:h-full mx-1 !h-3 w-[4rem]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={316}
                    height={67}
                    fill="#072654"
                    viewBox="0 0 1896 401"
                    className="jsx-d1df65e65681fd70"
                  >
                    <path
                      fill="#3395FF"
                      d="M122.63 105.7l-15.75 57.97 90.15-58.3-58.96 219.98 59.88.05L285.05.48"
                      className="jsx-d1df65e65681fd70"
                    />
                    <path
                      d="M25.6 232.92L.8 325.4h122.73l50.22-188.13L25.6 232.92m426.32-81.42c-3 11.15-8.78 19.34-17.4 24.57-8.6 5.22-20.67 7.84-36.25 7.84h-49.5l17.38-64.8h49.5c15.56 0 26.25 2.6 32.05 7.9 5.8 5.3 7.2 13.4 4.22 24.6m51.25-1.4c6.3-23.4 3.7-41.4-7.82-54-11.5-12.5-31.68-18.8-60.48-18.8H324.4l-66.5 248.1h53.67l26.8-100h35.2c7.9 0 14.12 1.3 18.66 3.8 4.55 2.6 7.22 7.1 8.04 13.6l9.58 82.6h57.5l-9.32-77c-1.9-17.2-9.77-27.3-23.6-30.3 17.63-5.1 32.4-13.6 44.3-25.4a92.6 92.6 0 0 0 24.44-42.5m130.46 86.4c-4.5 16.8-11.4 29.5-20.73 38.4-9.34 8.9-20.5 13.3-33.52 13.3-13.26 0-22.25-4.3-27-13-4.76-8.7-4.92-21.3-.5-37.8 4.42-16.5 11.47-29.4 21.17-38.7 9.7-9.3 21.04-13.95 34.06-13.95 13 0 21.9 4.5 26.4 13.43 4.6 8.97 4.7 21.8.2 38.5zm23.52-87.8l-6.72 25.1c-2.9-9-8.53-16.2-16.85-21.6-8.34-5.3-18.66-8-30.97-8-15.1 0-29.6 3.9-43.5 11.7-13.9 7.8-26.1 18.8-36.5 33-10.4 14.2-18 30.3-22.9 48.4-4.8 18.2-5.8 34.1-2.9 47.9 3 13.9 9.3 24.5 19 31.9 9.8 7.5 22.3 11.2 37.6 11.2a82.4 82.4 0 0 0 35.2-7.7 82.11 82.11 0 0 0 28.4-21.2l-7 26.16h51.9L709.3 149h-52zm238.65 0H744.87l-10.55 39.4h87.82l-116.1 100.3-9.92 37h155.8l10.55-39.4h-94.1l117.88-101.8m142.4 52c-4.67 17.4-11.6 30.48-20.75 39-9.15 8.6-20.23 12.9-33.24 12.9-27.2 0-36.14-17.3-26.86-51.9 4.6-17.2 11.56-30.13 20.86-38.84 9.3-8.74 20.57-13.1 33.82-13.1 13 0 21.78 4.33 26.3 13.05 4.52 8.7 4.48 21.67-.13 38.87m30.38-80.83c-11.95-7.44-27.2-11.16-45.8-11.16-18.83 0-36.26 3.7-52.3 11.1a113.09 113.09 0 0 0-41 32.06c-11.3 13.9-19.43 30.2-24.42 48.8-4.9 18.53-5.5 34.8-1.7 48.73 3.8 13.9 11.8 24.6 23.8 32 12.1 7.46 27.5 11.17 46.4 11.17 18.6 0 35.9-3.74 51.8-11.18 15.9-7.48 29.5-18.1 40.8-32.1 11.3-13.94 19.4-30.2 24.4-48.8 5-18.6 5.6-34.84 1.8-48.8-3.8-13.9-11.7-24.6-23.6-32.05m185.1 40.8l13.3-48.1c-4.5-2.3-10.4-3.5-17.8-3.5-11.9 0-23.3 2.94-34.3 8.9-9.46 5.06-17.5 12.2-24.3 21.14l6.9-25.9-15.07.06h-37l-47.7 176.7h52.63l24.75-92.37c3.6-13.43 10.08-24 19.43-31.5 9.3-7.53 20.9-11.3 34.9-11.3 8.6 0 16.6 1.97 24.2 5.9m146.5 41.1c-4.5 16.5-11.3 29.1-20.6 37.8-9.3 8.74-20.5 13.1-33.5 13.1s-21.9-4.4-26.6-13.2c-4.8-8.85-4.9-21.6-.4-38.36 4.5-16.75 11.4-29.6 20.9-38.5 9.5-8.97 20.7-13.45 33.7-13.45 12.8 0 21.4 4.6 26 13.9 4.6 9.3 4.7 22.2.28 38.7m36.8-81.4c-9.75-7.8-22.2-11.7-37.3-11.7-13.23 0-25.84 3-37.8 9.06-11.95 6.05-21.65 14.3-29.1 24.74l.18-1.2 8.83-28.1h-51.4l-13.1 48.9-.4 1.7-54 201.44h52.7l27.2-101.4c2.7 9.02 8.2 16.1 16.6 21.22 8.4 5.1 18.77 7.63 31.1 7.63 15.3 0 29.9-3.7 43.75-11.1 13.9-7.42 25.9-18.1 36.1-31.9 10.2-13.8 17.77-29.8 22.6-47.9 4.9-18.13 5.9-34.3 3.1-48.45-2.85-14.17-9.16-25.14-18.9-32.9m174.65 80.65c-4.5 16.7-11.4 29.5-20.7 38.3-9.3 8.86-20.5 13.27-33.5 13.27-13.3 0-22.3-4.3-27-13-4.8-8.7-4.9-21.3-.5-37.8 4.4-16.5 11.42-29.4 21.12-38.7 9.7-9.3 21.05-13.94 34.07-13.94 13 0 21.8 4.5 26.4 13.4 4.6 8.93 4.63 21.76.15 38.5zm23.5-87.85l-6.73 25.1c-2.9-9.05-8.5-16.25-16.8-21.6-8.4-5.34-18.7-8-31-8-15.1 0-29.68 3.9-43.6 11.7-13.9 7.8-26.1 18.74-36.5 32.9-10.4 14.16-18 30.3-22.9 48.4-4.85 18.17-5.8 34.1-2.9 47.96 2.93 13.8 9.24 24.46 19 31.9 9.74 7.4 22.3 11.14 37.6 11.14 12.3 0 24.05-2.56 35.2-7.7a82.3 82.3 0 0 0 28.33-21.23l-7 26.18h51.9l47.38-176.7h-51.9zm269.87.06l.03-.05h-31.9c-1.02 0-1.92.05-2.85.07h-16.55l-8.5 11.8-2.1 2.8-.9 1.4-67.25 93.68-13.9-109.7h-55.08l27.9 166.7-61.6 85.3h54.9l14.9-21.13c.42-.62.8-1.14 1.3-1.8l17.4-24.7.5-.7 77.93-110.5 65.7-93 .1-.06h-.03z"
                      className="jsx-d1df65e65681fd70"
                    />
                  </svg>
                </span>
              </div>
              <span className="jsx-d1df65e65681fd70 mx-1 text-[#768ea7]">
                •
              </span>
              <div className="jsx-d1df65e65681fd70 flex items-center text-xs font-normal text-on-surface/70">
                <button type="button" className="jsx-d1df65e65681fd70 grow">
                  <p className="jsx-d1df65e65681fd70 py-1 text-right text-xs text-[#768ea7]">
                    Account &amp; Terms
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="jsx-d1df65e65681fd70 sticky bottom-0 bg-white border-t shadow-md p-2">
            <div className="jsx-d1df65e65681fd70 container mx-auto flex flex-row items-center justify-between">
              <div className="jsx-d1df65e65681fd70">
                <div className="jsx-d1df65e65681fd70 text-sm font-bold">
                  ₹{paymentAmount}
                </div>
                <button className="jsx-d1df65e65681fd70 text-gray-600 text-[9px] flex items-center justify-center">
                  View Details{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={8}
                    height={8}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down ml-1"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              {/* <button
                  id="thb_dev-continue-btn"
                  className="mt-3 bg-red-600 text-white py-1.5 px-4 rounded-md text-xs font-semibold min-h-[40px] min-w-[100px] touch-manipulation disabled:pointer-events-none disabled:opacity-50"
                  disabled={!isButtonEnabled}
                  onClick={handleButtonClick}
                >
                  Continue
                </button> */}
              <button
                className="mt-3 bg-red-600 text-white py-1.5 px-4 rounded-md text-xs font-semibold min-h-[40px] min-w-[100px] touch-manipulation disabled:pointer-events-none disabled:opacity-50"
                onClick={openUPIApp}
                disabled={!selected}
              >
                Pay ₹{paymentAmount}
              </button>
            </div>
          </div>
          {showModal && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={() => setShowModal(false)} // Close modal when background is clicked
  >
    <div
      className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg text-center"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-center">
          <img
            alt="BookMyShow"
            width={85}
            height={15}
            decoding="async"
            data-nimg={1}
            className="mr-1"
            src={images.Logo}
            style={{ color: "transparent" }}
          />
        </div>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowModal(false)} // Close modal when close button is clicked
        >
          ✕
        </button>
      </div>
      <p className="mb-4">Scan the code to pay</p>
      <div className="flex justify-center" ref={qrRef}>
        <QRCode value={upiUrl} size={150} />
      </div>
      <button
        onClick={downloadQRCode}
        className="text-blue-500 border border-blue-500 rounded-md px-4 py-0.5 text-sm w-35 active:bg-blue-500 mt-4"
      >
        Download QR
      </button>
    </div>
  </div>
)}
          {showErrorModal && (
            <div
              id="error-modal"
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1F-0c8xXqZhJnO2otgbvDpEcKsfQbAqpXjw&usqp=CAU"
                  alt="Error"
                  className="w-16 h-16 mx-auto mb-4"
                />
                <div className="text-lg font-semibold mb-2">
                  Server Unreachable
                </div>
                <p className="text-gray-600 mb-4">
                  We're unable to connect to Google Pay servers. Please try
                  another payment method or try again later.
                </p>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
