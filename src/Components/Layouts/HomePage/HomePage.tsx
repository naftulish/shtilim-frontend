import React from 'react';
import {  SchoolRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./HomePage.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useTitle from '../../../hooks/useTitle';


const HomePage = () => {
  useTitle("ראשי");

  return (
    <div className='Home'>
     <div className='homeText'>
      <h1>מערכת ADL</h1>
        מערכת חדשנית וידידותית לאיסוף נתונים עבור תוכניות התנהגות ADL.
        מיועדת לשמש את מנתחות ההתנהגות בגני התקשורת של שתילים למעקב ובקרה אחרי ההתנהגויות המאתגרות: גמילה, התפרצויות, בעיות אכילה ועוד.
        בממשק פשוט ונעים, ובלחיצה על מספר מינימלי של כפתורים, מזין הצוות המטפל של הילד את הנתונים הנדרשים לתוכנית כשאפשרויותיהם מוגדרים מראש.
        הנתונים מסוכמים אל טבלת אקסל, בעזרתה בונה מנתחת ההתנהגות את המשך התוכנית.
      </div>

    
    <div className='homeFlex'>

      <div className='homeBox'>
        <Link to="/students">
          <SchoolRounded />
          <span>תלמידים</span>
          <Link to="/addstudent">הוספת תלמידים</Link>
        </Link>
      </div>

      <div className='homeBox'>
        <Link to="/plans">
          <AssignmentIcon />
          <span>תוכניות</span>
          <Link to="/addplan">הוספת תוכנית</Link>
        </Link>
      </div>
    </div>

    </div>
  );
};

export default HomePage;
