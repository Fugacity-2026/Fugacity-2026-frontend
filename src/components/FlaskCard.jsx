
import React from "react";

const FlaskCard = ({ event, onClick }) => {
  return (
    <>
      <style>
        {`
        .flask-card {
          background: #061c1c;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(78, 226, 255, 0.4);

          /* subtle base glow */
          box-shadow: 0 0 10px rgba(78, 226, 255, 0.08);

          height: 420px; /* ✅ FIXED HEIGHT */
          display: flex;
          flex-direction: column;
        }

        .flask-card:hover {
          transform: translateY(-8px);
          border: 1px solid #4ee2ff;
          box-shadow:
            0 0 12px rgba(78, 226, 255, 0.4),
            0 0 25px rgba(78, 226, 255, 0.25),
            0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .flask-img {
          width: 100%;
          height: 200px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .flask-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: 0.4s;
          padding-top: 7px;
        }

        .flask-card:hover  {
          transform: scale(1.05);
        }

        .flask-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .flask-tag {
          font-size: 15px;
          color: #4ee2ff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
          font-family: Arial Black;
        }

        .flask-title {
          font-size: 25px;
          color: #ffffff;
          margin-bottom: 6px;
          font-weight: 600;
        }

        /* LIMIT DESCRIPTION */
        .flask-desc {
          font-size: 14px;
          color: #bcdede;
          opacity: 0.8;
          margin-bottom: 10px;

          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .flask-bottom {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .flask-details {
          font-size: 18px;
          color: white;
          font-family: Arial;
        }

        .flask-btn {
          padding: 6px 14px;
          font-size: 17px;
          border-radius: 6px;
          border: 1px solid #4ee2ff;
          background: transparent;
          color: #4ee2ff;
          cursor: pointer;
          transition: 0.3s;
          font-family: Arial Black;
        }

        .flask-btn:hover {
          background: #4ee2ff;
          color: black;
          font-weight: 600;
        }


       

          /* MOBILE FIX FOR TEAM + ROUNDS */
          .flask-details {
            display: flex;
            flex-direction: column;
            font-size: 15px;
            gap: 2px;
          }

          .divider {
            display: none;
          }
        }
        `}
      </style>

      <div className="flask-card" onClick={() => onClick(event)}>
        
        {/* IMAGE */}
        <div className="flask-img">
          <img src={event.image} alt={event.name} />
        </div>

        {/* CONTENT */}
        <div className="flask-content">
          <p className="flask-tag">{event.category}</p>

          <h3 className="flask-title">{event.name}</h3>

          <p className="flask-desc">
            {event.description2 ||
              "Explore this exciting event and showcase your skills."}
          </p>

          <div className="flask-bottom">
            
            {/* UPDATED DETAILS */}
            <span className="flask-details">
              <span>Team Size: {event.teamSize}</span>
              <span className="divider"> | </span>
              <span>Rounds: {event.rounds} </span>
            </span>

            <button className="flask-btn">EXPLORE</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlaskCard;