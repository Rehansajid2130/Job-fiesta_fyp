import { useNavigate } from "react-router-dom";
import React from "react";

const ChatInterface1 = ({ onSelectChat }) => {
  const navigate = useNavigate();

  const handleChatSelect = (chat) => {
    onSelectChat(chat);
  };

  return (
    <>
      <div
        id="_3345_6061__Chat_Interface_1"
        style={{
          position: "absolute",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 1.00)",
          height: "1147.0px",
          width: "100%",
        }}
      >
        <div
          id="_3345_6062__Rectangle_16"
          style={{
            position: "absolute",
            background: "rgba(250, 250, 250, 1.00)",
            boxShadow: "0.0px 0.0px 1.0px 0.0px rgba(0, 0, 0, 0.25)",
            height: "1147.00px",
            width: "347.00px",
            left: "0.00px",
            top: "0.00px",
          }}
        ></div>

        <div
          id="_3345_6063__Logo"
          style={{
            position: "absolute",
            height: "43.00px",
            width: "149.47px",
            left: "24.00px",
            top: "24.00px",
          }}
        >
          <img
            id="I3345_6063_4_193__Group_3"
            src="/assets/Chatingpageimages/group_3_1.svg"
            alt="Group_3"
            style={{ position: "absolute", top: "calc(100% * 0.02)" }}
          />
        </div>

        <span
          id="_3350_7970__Job"
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "flex-start",
            height: "33.00px",
            width: "52.00px",
            position: "absolute",
            left: "78.00px",
            top: "29.00px",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              background: "rgba(0, 0, 0, 1.00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Martel",
              fontStyle: "normal",
              fontSize: "24.0px",
              fontWeight: "900",
              lineHeight: "150.00%",
            }}
          >
            Job&nbsp;
          </span>
        </span>
        <span
          id="_3350_7971__Fiesta"
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "flex-start",
            height: "29.00px",
            width: "134.00px",
            position: "absolute",
            left: "114.00px",
            top: "24.00px",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              background: "rgba(0, 0, 0, 1.00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Matura MT Script Capitals",
              fontStyle: "normal",
              fontSize: "32.0px",
              fontWeight: "400",
              lineHeight: "150.00%",
            }}
          >
            Fiesta
          </span>
        </span>

        {/* Chat List Items */}
        <div
          onClick={() => handleChatSelect({ name: "Hassan", lastMessage: "Chris Martin reacted with" })}
          style={{ cursor: "pointer" }}
        >
          <div
            id="_3345_6065__Ellipse_37"
            style={{
              position: "absolute",
              background: "url(/assets/Chatingpageimages/ellipse_37.png) 100% / cover no-repeat, linear-gradient(0deg, rgba(196, 196, 196, 1.00)0%, rgba(196, 196, 196, 1.00)100%)",
              height: "36.00px",
              width: "36.00px",
              borderRadius: "50%",
              left: "24.00px",
              top: "300.00px",
            }}
          ></div>

          <span
            id="_3345_6066__Hassan"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "22.00px",
              width: "54.00px",
              position: "absolute",
              left: "73.00px",
              top: "301.00px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(20, 20, 20, 1.00)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Abril Fatface",
                fontStyle: "normal",
                fontSize: "16.0px",
                fontWeight: "400",
              }}
            >
              Hassan&nbsp;
            </span>
          </span>
        </div>

        {/* Add more chat list items here */}

        <div
          id="_3345_6108__NEXT_-_Button"
          onClick={() => handleChatSelect({ name: "New Chat", lastMessage: "Start a new conversation" })}
          style={{
            position: "absolute",
            background: "rgba(12, 70, 59, 1.00)",
            borderRadius: "100px",
            height: "25.00px",
            width: "198.00px",
            left: "475.00px",
            top: "481.00px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: "10px",
            padding: "18px 48px",
            cursor: "pointer",
          }}
        >
          <div
            id="I3345_6108_16_497__Group_6"
            style={{
              position: "relative",
              height: "25.00px",
              width: "112.00px",
            }}
          >
            <span
              id="I3345_6108_16_496__NEXT"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "left",
                alignItems: "flex-start",
                height: "25.00px",
                width: "112.00px",
                position: "absolute",
                left: "0.00px",
                top: "0.00px",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(255, 255, 255, 1.00)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Axiforma",
                  fontStyle: "normal",
                  fontSize: "16.0px",
                  fontWeight: "600",
                  lineHeight: "25.00px",
                }}
              >
                New Message
              </span>
            </span>
          </div>
        </div>

        <div
          id="_3377_2702__arrow_back"
          onClick={() => navigate("/RecruiterDashBoardPage")}
          style={{
            position: "absolute",
            height: "24.00px",
            width: "24.00px",
            left: "11.00px",
            top: "127.00px",
            cursor: "pointer",
          }}
        >
          <img
            id="I3377_2702_54616_25400__icon"
            src="/assets/Chatingpageimages/icon_3.svg"
            alt="icon"
            style={{
              position: "absolute",
              left: "calc(100% * 0.17)",
              top: "calc(100% * 0.17)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ChatInterface1; 