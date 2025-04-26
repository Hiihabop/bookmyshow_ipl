import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Axios/MatchData";

const Tickets = () => {
  const { data = [] } = useContext(AuthContext);
  const { match_number } = useParams();
  const [MatchData, setMatchData] = useState([]);
  const [activeTab, setActiveTab] = useState("map");

  const ticketPrices1 = [300, 990, 999, 1000, 1500];
  const ticketPrices2 = [1000, 2000, 2500, 3500, 5000, 7500, 10000];

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const parsedMatchNumber = parseInt(match_number, 10);
      const match = data.find(
        (match) => match.match_number === parsedMatchNumber
      );
      setMatchData(match);
    }
  }, [data]); // ✅ Safe useEffect

  const [selectedPrice, setSelectedPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div>
      <div>
        <div className="w-full h-full">
          <div className=" mx-auto py-8">
            <div className="container flex items-center mb-6">
              <Link
                className="mr-3 flex items-center text-blue-600 hover:text-blue-800"
                to="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Back</span>
              </Link>
              <h1 className="text-2xl font-bold">Select Your Seats</h1>
            </div>
            <div className="container mx-auto px-4 py-4">
              <div className="max-w-4xl mx-auto">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
                  <div className="p-6 pt-1 px-3 pb-2">
                    <div className="flex flex-col items-center gap-1 mb-1">
                      <div className="flex items-center justify-center gap-4 w-full">
                        <div className="flex flex-col items-center w-[40%]">
                          <img
                            alt="Chennai Super Kings"
                            loading="lazy"
                            width={60}
                            height={60}
                            decoding="async"
                            data-nimg={1}
                            className="rounded-full border-2 border-gray-200"
                            src={MatchData.team1_logo}
                            style={{ color: "transparent" }}
                          />
                          <span className="mt-1 text-sm font-medium">
                            {MatchData.team1}
                          </span>
                        </div>
                        <div className="text-xl font-bold w-[10%] text-center">VS</div>
                        <div className="flex flex-col items-center w-[40%]">
                          <img
                            alt="Royal Challengers Bengaluru"
                            loading="lazy"
                            width={60}
                            height={60}
                            decoding="async"
                            data-nimg={1}
                            className="rounded-full border-2 border-gray-200"
                            src={MatchData.team2_logo}
                            style={{ color: "transparent" }}
                          />
                          <span className="mt-1 text-sm font-medium">
                            {MatchData.team2}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-center mt-1">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-calendar h-4 w-4 text-red-600"
                          >
                            <path d="M8 2v4" />
                            <path d="M16 2v4" />
                            <rect width={18} height={18} x={3} y={4} rx={2} />
                            <path d="M3 10h18" />
                          </svg>
                          <span className="text-sm">
                          {MatchData.date}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-clock h-4 w-4 text-red-600 ml-1"
                          >
                            <circle cx={12} cy={12} r={10} />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="text-sm">
                            {MatchData.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-map-pin h-4 w-4 text-red-600"
                          >
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                            <circle cx={12} cy={10} r={3} />
                          </svg>
                          <span className="text-sm">{MatchData.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div dir="ltr" data-orientation="horizontal" className="mb-8">
                  <div
                    role="tablist"
                    aria-orientation="horizontal"
                    className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "map"}
                      onClick={() => setActiveTab("map")}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                        activeTab === "map"
                          ? "bg-background text-foreground shadow-sm"
                          : ""
                      }`}
                    >
                      Stadium Map
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "list"}
                      onClick={() => setActiveTab("list")}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                        activeTab === "list"
                          ? "bg-background text-foreground shadow-sm"
                          : ""
                      }`}
                    >
                      Ticket Types
                    </button>
                  </div>
                  {/* Panels */}
                  {activeTab === "map" && (
                    <div className="p-4 border rounded-md mt-2">
                      <h3 className="text-lg font-semibold mb-2">
                        Select a section from the stadium map
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Click on a section to select your preferred seating area
                      </p>
                      <div
                        className="relative bg-white rounded-xl shadow-lg overflow-hidden"
                        style={{ height: "177.6px", minHeight: 300 }}
                      >
                        <img
                          id="stadium-map"
                          alt={`Stadium Map for ${MatchData.venue}`}
                          className="w-full h-auto max-h-full object-contain cursor-pointer transition-opacity duration-300 opacity-100"
                          src={MatchData.stadium_image}
                        />
                      </div>
                    </div>
                  )}
                  {activeTab === "list" && (
                    <div className="p-4 border rounded-md mt-2">
                      <h3 className="text-lg font-semibold mb-2">
                        Select a ticket type
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Choose from our available ticket categories
                      </p>
                      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                        {ticketPrices1.map((price, index) => (
                          <div
                            key={index}
                            onClick={() => handlePriceSelect(price)}
                            className={`border rounded-md p-4 cursor-pointer transition-all border-gray-200 hover:border-red-300 hover:bg-gray-100 ${
                              selectedPrice === price
                                ? "border-red-500 bg-gray-200"
                                : ""
                            }`}
                          >
                            <span className="text-base font-bold text-red-600">
                              Price: ₹{price}
                            </span>
                            <div className="text-xs text-gray-500 mt-1 leading-tight">
                              <span>100</span>
                              <br />
                              <span>seats available</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Booking Summary
                    </h3>
                    <div className="mb-2">
                      <h4 className="text-sm font-medium text-gray-700">
                        Ticket Type
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {ticketPrices2.map((price, index) => (
                        <button
                          key={index}
                          onClick={() => handlePriceSelect(price)}
                          className={`thb_dev-ticket-type-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 border-gray-300 hover:bg-gray-100 hover:border-red-300 ${
                            selectedPrice === price
                              ? "border-red-500 bg-gray-200"
                              : ""
                          }`}
                        >
                          {price === 1000 && "General Stand"}
                          {price === 2000 && "Premium Stand"}
                          {price === 2500 && "Pavilion Stand"}
                          {price === 3500 && "VIP Stand"}
                          {price === 5000 && "Corporate Box"}
                          {price === 7500 && "Hospitality Box"}
                          {price === 10000 && "Skybox/Lounge"}
                        </button>
                      ))}
                    </div>
                    <div
                      className="bg-blue-50 p-3 rounded-md border border-blue-200 mb-4 text-sm text-gray-700 hidden"
                      id="thb_dev-ticket-type-desc-alert"
                    >
                      <strong id="thb_dev-ticket-type-text" /> –{" "}
                      <span id="thb_dev-ticket-desc-text" />.
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-700">Price per Ticket:</span>
                        <div>
                          <span className="font-medium">₹</span>
                          <span className="font-medium">{selectedPrice}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-700">Quantity:</span>
                        <div className="flex items-center gap-3">
                          <button
                            className="border rounded-md h-8 w-8 p-0"
                            onClick={decrementQuantity}
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{quantity}</span>
                          <button
                            className="border rounded-md h-8 w-8 p-0"
                            onClick={incrementQuantity}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center font-bold text-lg pt-4 border-t mt-4">
                        <span>Total:</span>
                        <div>
                          <span className="text-red-600">₹</span>
                          <span className="text-red-600">
                            {selectedPrice * quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="thb_dev-proceed-error-text"
                  className="text-red-500 text-sm mb-3 text-center hidden"
                >
                  Please select a ticket before proceeding!
                </div>
                <div className="flex justify-center">
                  {selectedPrice > 0 ? (
                    <Link
                      to={`/summerdeals/${match_number}?price=${selectedPrice}&quantity=${quantity}`}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-md mt-4"
                    >
                      Proceed to Booking
                    </Link>
                  ) : (
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 bg-red-600 text-white px-8 py-2 rounded-md mt-4 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Proceed to Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
