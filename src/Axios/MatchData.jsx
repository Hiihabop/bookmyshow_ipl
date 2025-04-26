import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const matches = [
    {
      match_number: 42,
      team1: "Kolkata Knight Riders",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Kolkata_Knight_Riders.avif",
      team2: "Punjab Kings",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Punjab_Kings.avif",
      date: "April 26, Saturday",
      time: "7:30 PM IST",
      venue: "Ekana Cricket Stadium, Lucknow",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 43,
      team1: "Kolkata Knight Riders",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Kolkata_Knight_Riders.avif",
      team2: "Punjab Kings",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Punjab_Kings.avif",
      date: "26 April 2025",
      time: "7:30 PM IST",
      venue: "Eden Gardens, Kolkata",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 44,
      team1: "Mumbai Indians",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150354/IPL_TIME_LOGO/Mumbai_Indians.avif",
      team2: "Lucknow Super Giants",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Lucknow_Super_Giants.avif",
      date: "27 April 2025",
      time: "3:30 PM IST",
      venue: "Wankhede Stadium, Mumbai",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 45,
      team1: "Delhi Capitals",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Delhi_Capitals.avif",
      team2: "Royal Challengers Bengaluru",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Royal_Challengers_Bengaluru.avif",
      date: "27 April 2025",
      time: "7:30 PM IST",
      venue: "Arun Jaitley Stadium, Delhi",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 45_1,
      team1: "Rajasthan Royals",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Rajasthan_Royals.avif",
      team2: "Gujarat Titans",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Gujarat_Titans.avif",
      date: "28 April 2025",
      time: "7:30 PM IST",
      venue: "Sawai Mansingh Stadium, Jaipur, Rajasthan, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 45_2,
      team1: "Delhi Capitals",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150241/IPL_TIME_LOGO/Delhi_Capitals.avif",
      team2: "Kolkata Knight Riders",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150376/IPL_TIME_LOGO/Kolkata_Knight_Riders.avif",
      date: "29 April 2025",
      time: "7:30 PM IST",
      venue: "Arun Jaitley Stadium, Delhi, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 45_3,
      team1: "Chennai Super Kings",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Chennai_Super_Kings.avif",
      team2: "Punjab Kings",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Punjab_Kings.avif",
      date: "30 April 2025",
      time: "7:30 PM IST",
      venue: "MA Chidambaram Stadium, Chennai, Tamil Nadu, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 45_4,
      team1: "Rajasthan Royals",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Rajasthan_Royals.avif",
      team2: "Mumbai Indians",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Mumbai_Indians.avif",
      date: "1 May 2025",
      time: "7:30 PM IST",
      venue: "Sawai Mansingh Stadium, Jaipur, Rajasthan, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 45_5,
      team1: "Gujarat Titans",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Gujarat_Titans.avif",
      team2: "Sunrisers Hyderabad",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Sunrisers_Hyderabad.avif",
      date: "2 May 2025",
      time: "7:30 PM IST",
      venue: "Narendra Modi Stadium, Ahmedabad, Gujarat, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 45_6,
      team1: "Royal Challengers Bengaluru",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150354/IPL_TIME_LOGO/Royal_Challengers_Bengaluru.avif",
      team2: "Chennai Super Kings",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150376/IPL_TIME_LOGO/Chennai_Super_Kings.avif",
      date: "3 May 2025",
      time: "7:30 PM IST",
      venue: "Sawai Mansingh Stadium, Jaipur",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 45_7,
      team1: "Kolkata Knight Riders",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150241/IPL_TIME_LOGO/Kolkata_Knight_Riders.avif",
      team2: "Rajasthan Royals",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150354/IPL_TIME_LOGO/Rajasthan_Royals.avif",
      date: "4 May 2025",
      time: "3:30 PM IST",
      venue: "Eden Gardens, Kolkata, West Bengal, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 46,
      team1: "Punjab Kings",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743151693/IPL_TIME_LOGO/Punjab_Kings.avif",
      team2: "Lucknow Super Giants",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Lucknow_Super_Giants.avif",
      date: "4 May 2025",
      time: "7:30 PM IST",
      venue:
        "Himachal Pradesh Cricket Association Stadium, Dharamsala, Himachal Pradesh, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 47,
      team1: "Sunrisers Hyderabad",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Sunrisers_Hyderabad.avif",
      team2: "Delhi Capitals",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Delhi_Capitals.avif",
      date: "5 May 2025",
      time: "7:30 PM IST",
      venue:
        "Rajiv Gandhi International Cricket Stadium, Hyderabad, Telangana, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 48,
      team1: "Mumbai Indians",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Mumbai_Indians.avif",
      team2: "Gujarat Titans",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Gujarat_Titans.avif",
      date: "6 May 2025",
      time: "7:30 PM IST",
      venue: "Wankhede Stadium, Mumbai, Maharashtra, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 49,
      team1: "Kolkata Knight Riders",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Kolkata_Knight_Riders.avif",
      team2: "Chennai Super Kings",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Chennai_Super_Kings.avif",
      date: "7 May 2025",
      time: "7:30 PM IST",
      venue: "Eden Gardens, Kolkata, West Bengal, India",
      stadium_image:
        "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 50,
      team1: "Punjab Kings",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150354/IPL_TIME_LOGO/Punjab_Kings.avif",
      team2: "Delhi Capitals",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Delhi_Capitals.avif",
      date: "8 May 2025",
      time: "7:30 PM IST",
      venue:
        "Himachal Pradesh Cricket Association Stadium, Dharamsala, Himachal Pradesh, India",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51,
      team1: "Lucknow Super Giants",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Lucknow_Super_Giants.avif",
      team2: "Royal Challengers Bengaluru",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Royal_Challengers_Bengaluru.avif",
      date: "9 May, 2025",
      time: "7:30 PM IST",
      venue:
        "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow, Uttar Pradesh, India",
        stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_1,
      team1: "Sunrisers Hyderabad",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Sunrisers_Hyderabad.avif",
      team2: "Kolkata Knight Riders",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Kolkata_Knight_Riders.avif",
      date: "10 May, 2025",
      time: "7:30 PM IST",
      venue: "Arun Jaitley Stadium, Delhi",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_2,
      team1: "Punjab Kings",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Punjab_Kings.avif",
      team2: "Mumbai Indians",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Mumbai_Indians.avif",
      date: "11 May, 2025",
      time: "3:30 PM IST",
      venue: "Himachal Pradesh Cricket Association Stadium, Dharamsala",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_3,
      team1: "Delhi Capitals",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Delhi_Capitals.avif",
      team2: "Gujarat Titans",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Gujarat_Titans.avif",
      date: "11 May, 2025",
      time: "7:30 PM IST",
      venue: "Arun Jaitley Stadium, Delhi",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_4,
      team1: "Chennai Super Kings",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Chennai_Super_Kings.avif",
      team2: "Rajasthan Royals",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Rajasthan_Royals.avif",
      date: "12 May, 2025",
      time: "7:30 PM IST",
      venue: "MA Chidambaram Stadium, Chennai",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_5,
      team1: "Royal Challengers Bengaluru",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Royal_Challengers_Bengaluru.avif",
      team2: "Sunrisers Hyderabad",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Sunrisers_Hyderabad.avif",
      date: "13 May, 2025",
      time: "7:30 PM IST",
      venue: "M. Chinnaswamy Stadium, Bengaluru",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_6,
      team1: "Gujarat Titans",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Gujarat_Titans.avif",
      team2: "Lucknow Super Giants",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Lucknow_Super_Giants.avif",
      date: "14 May, 2025",
      time: "7:30 PM IST",
      venue: "Narendra Modi Stadium, Ahmedabad",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_7,
      team1: "Mumbai Indians",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Mumbai_Indians.avif",
      team2: "Delhi Capitals",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Delhi_Capitals.avif",
      date: "15 May, 2025",
      time: "7:30 PM IST",
      venue: "Wankhede Stadium, Mumbai",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_8,
      team1: "Rajasthan Royals",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Rajasthan_Royals.avif",
      team2: "Punjab Kings",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Punjab_Kings.avif",
      date: "16 May, 2025",
      time: "7:30 PM IST",
      venue: "Sawai Mansingh Stadium, Jaipur",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 51_9,
      team1: "Royal Challengers Bengaluru",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Royal_Challengers_Bengaluru.avif",
      team2: "Kolkata Knight Riders",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Kolkata_Knight_Riders.avif",
      date: "16 May, 2025",
      time: "7:30 PM IST",
      venue: "M. Chinnaswamy Stadium, Bengaluru",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 52,
      team1: "Gujarat Titans",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Gujarat_Titans.avif",
      team2: "Chennai Super Kings",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Chennai_Super_Kings.avif",
      date: "18 May 2025",
      time: "3:30 PM IST",
      venue: "Narendra Modi Stadium, Ahmedabad",
      stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
    {
      match_number: 53,
      team1: "Lucknow Super Giants",
      team1_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Lucknow_Super_Giants.avif",
      team2: "Sunrisers Hyderabad",
      team2_logo:
        "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1743150377/IPL_TIME_LOGO/Sunrisers_Hyderabad.avif",
      date: "18 May 2025",
      time: "7:30 PM IST",
      venue:
        "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow",
        stadium_image: "https://ultimatecricketguru.com/wp-content/uploads/2023/09/m-chinnaswamy-stadium-bangalore-seating-plan.webp",
    },
  ];
  useEffect(() => {
    setData(matches);
  }, []);

  return (
    <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
