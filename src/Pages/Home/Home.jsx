import React, { useContext, useEffect, useState } from "react";
import images from "../../assets/images";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Axios/MatchData";

const Home = () => {
  const [GetMatch, setGetMatch] = useState([]);
  const [showAll, setShowAll] = useState(false);
  
  

  
  const { data } = useContext(AuthContext);
  
  
useEffect(() => {
  if (data && data.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Sirf date compare karne ke liye time reset karna zaroori hai
    
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0); // Iski bhi time reset karni hogi
      return itemDate >= today; // Aaj ki date ya uske baad wali date ko include karega
    });

    setGetMatch(filteredData);
  }
}, [data]);

const handleShowAll = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate >= today;
  });

  setGetMatch(filteredData);
  setShowAll(true);
};


  return (
    <div className="">
      <div className="w-full h-full">
        <main className="flex min-h-screen flex-col max-w-[430px] mx-auto overflow-hidden">
          <header className="border-b sticky top-0 bg-white z-10">
            <div className="py-1 px-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-gray-800 flex items-center">
                  <img
                    alt="BookMyShow"
                    width={80}
                    height={15}
                    decoding="async"
                    data-nimg={1}
                    className="mr-1"
                    src={images.Logo}
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9">
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
                  className="lucide lucide-menu h-4 w-4"
                >
                  <line x1={4} x2={20} y1={12} y2={12} />
                  <line x1={4} x2={20} y1={6} y2={6} />
                  <line x1={4} x2={20} y1={18} y2={18} />
                </svg>
              </button>
            </div>
          </header>
          <section className="relative">
            <div className="w-full relative overflow-hidden">
              <img
                alt="IPL 2025 Banner"
                width={400}
                height={150}
                decoding="async"
                data-nimg={1}
                className="w-full h-auto max-h-[200px] object-contain"
                src={images.Benatar}
                style={{ color: "transparent" }}
              />
            </div>
          </section>
          <section className="py-2 bg-gray-50">
            <div className="px-4">
              <div className="text-center">
                <h2 className="text-base font-bold text-gray-900 mb-0.5">
                  INDIA - Indian Premier League 2025
                </h2>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center gap-0.5">
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
                      className="lucide lucide-calendar h-5 w-5 text-red-600"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width={18} height={18} x={3} y={4} rx={2} />
                      <path d="M3 10h18" />
                    </svg>
                    <span className="text-gray-700 text-sm">
                      Sat 22 March 2025 Onwards
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
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
                      className="lucide lucide-map-pin h-5 w-5 text-red-600"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx={12} cy={10} r={3} />
                    </svg>
                    <span className="text-gray-700 text-sm">
                      Multiple Venues
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-2">
            <div className="px-4">
              <h2 className="text-base font-bold text-center mb-2">
                Upcoming Matches
              </h2>
              <div className="text-gray-600 mb-4">
                <p className="mb-1 text-xs">
                  Book tickets for upcoming matches through the match list below
                </p>
                <p className="text-red-500 text-sm font-medium text-right cursor-pointer hover:underline thb_dev-loadMoreSchedule">
                  View All Matches
                </p>
              </div>
              <div
                className="grid grid-cols-1 gap-4"
                id="thb_dev-iplScheduleGrid"
              >
                {/* <p className="text-center">Loading data, please wait...</p> */}
                {GetMatch.map((e, index) => {
                  return (
                    <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-0">
                        <div className="bg-red-600 p-3 text-white">
                          <div className="flex justify-between items-center">
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
                                className="lucide lucide-calendar h-4 w-4"
                              >
                                <path d="M8 2v4" />
                                <path d="M16 2v4" />
                                <rect
                                  width={18}
                                  height={18}
                                  x={3}
                                  y={4}
                                  rx={2}
                                />
                                <path d="M3 10h18" />
                              </svg>
                              <span>{e.date}</span>
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
                                className="lucide lucide-clock h-4 w-4"
                              >
                                <circle cx={12} cy={12} r={10} />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{e.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 shadow-md shadow-gray-400/20 border border-red-500 rounded-b-lg">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col items-center">
                              <img
                                alt={e.team1_logo}
                                width={50}
                                height={50}
                                src={e.team1_logo}
                                style={{ color: "transparent" }}
                              />
                              <span className="mt-2 text-xs font-medium">
                                {e.team1}
                              </span>
                            </div>
                            <div className="text-lg font-bold">VS</div>

                            <div className="flex flex-col items-center">
                              <img
                                alt={e.team2_logo}
                                width={50}
                                height={50}
                                src={e.team2_logo}
                                style={{ color: "transparent" }}
                              />
                              <span className="mt-2 text-xs font-medium">
                                {e.team2}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
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
                              className="lucide lucide-map-pin h-4 w-4 text-gray-500 flex-shrink-0"
                            >
                              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                              <circle cx={12} cy={10} r={3} />
                            </svg>
                            <span className="text-xs text-gray-600">
                              {e.venue}
                            </span>
                          </div>
                          <div className="flex justify-between mb-3">
                            <div className="inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-transparent text-green-600 border-0 text-sm font-medium rounded-full px-3 py-1 shadow-sm animate-pulse">
                              Hurry! Seats Selling Out 🚀
                            </div>
                            <div className="inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-transparent border-0 text-orange-600 text-sm font-medium rounded-full px-3 py-1 shadow-sm anim-shake">
                              Only a Few Left! 🔥
                            </div>
                          </div>
                          <Link
                            to={`/ticket/${e.match_number}/${e.team1.replace(/\s+/g, "-")}-vs-${e.team2.replace(/\s+/g, "-")}`}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full bg-red-600 hover:bg-red-700 text-white text-sm"
                          >
                            Book Tickets
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-6">
                {!showAll && (
                  <button
                    onClick={handleShowAll}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 w-full border-red-500 text-red-500 hover:bg-red-50"
                  >
                    View All Matches
                  </button>
                )}
              </div>
            </div>
          </section>
          <footer className="bg-[#0a1633] text-white py-8 px-4 mt-8">
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center mb-8 pb-6 border-b border-gray-700">
              <div className="text-center">
                <p className="text-[10px] uppercase mb-2 tracking-wider text-gray-400">
                  Official Broadcaster
                </p>
                <img
                  alt="Star Sports"
                  loading="lazy"
                  width={60}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="mx-auto"
                  src="https://documents.iplt20.com//ipl/assets/images/new-sponsor-start-sports-logo.webp"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase mb-2 tracking-wider text-gray-400">
                  Title Sponsor
                </p>
                <img
                  alt="TATA"
                  loading="lazy"
                  width={60}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="mx-auto"
                  src="https://documents.iplt20.com//ipl/assets/images/new-sponsor-tata-logo.webp"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase mb-2 tracking-wider text-gray-400">
                  Official Digital Streaming Partner
                </p>
                <img
                  alt="JioHotstar"
                  loading="lazy"
                  width={60}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="mx-auto"
                  src="https://documents.iplt20.com//ipl/assets/images/JioHotstar.webp"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
            <div className="mb-8 pb-6 border-b border-gray-700">
              <p className="text-[10px] uppercase mb-4 tracking-wider text-center text-gray-400">
                Associate Partner
              </p>
              <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
                <img
                  alt="My11Circle"
                  loading="lazy"
                  width={80}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="mx-auto"
                  src="https://documents.iplt20.com//ipl/assets/images/new-sponsor-my11circle-logo.webp"
                  style={{ color: "transparent" }}
                />
                <img
                  alt="AngelOne"
                  loading="lazy"
                  width={80}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="mx-auto"
                  src="https://documents.iplt20.com//ipl/assets/images/new-sponsor-angelone-logo.webp"
                  style={{ color: "transparent" }}
                />
                <img
                  alt="RuPay"
                  loading="lazy"
                  width={80}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="mx-auto"
                  src="https://documents.iplt20.com//ipl/assets/images/new-sponsor-rupay-logo.webp"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-[10px] uppercase mb-2 tracking-wider text-gray-400">
                  Official Umpire Partner
                </p>
                <img
                  alt="Wonder Cement"
                  loading="lazy"
                  width={70}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="mx-auto"
                  src="https://documents.iplt20.com//ipl/assets/images/new-partner-wonder-cement.webp"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase mb-2 tracking-wider text-gray-400">
                  Official Strategic Timeout Partner
                </p>
                <img
                  alt="CEAT"
                  loading="lazy"
                  width={70}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="mx-auto"
                  src="https://documents.iplt20.com//ipl/assets/images/new-sponsor-ceat-logo.webp"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;
