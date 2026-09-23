import { useNavigate } from "react-router-dom";
import React from "react";

const ChatInterface2 = ({ chat, onBack }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        id="_3345_6118__Chat_Interface_2"
        style={{
          position: "absolute",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 1.00)",
          height: "1147.0px",
          width: "100%",
        }}
      >
        <div
          id="_3345_6119__Rectangle_17"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            boxShadow: "0.0px 0.0px 1.0px 0.0px rgba(0, 0, 0, 0.25)",
            height: "64.00px",
            width: "1093.00px",
            left: "347.00px",
            top: "0.00px",
          }}
        ></div>

        <div
          id="_3345_6120__Rectangle_18"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            boxShadow: "0.0px 0.0px 1.0px 0.0px rgba(0, 0, 0, 0.25)",
            height: "64.00px",
            width: "1093.00px",
            left: "347.00px",
            top: "1083.00px",
          }}
        ></div>

        <div
          id="_3345_6121__Rectangle_16"
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
          id="_3345_6122__Logo"
          style={{
            position: "absolute",
            height: "43.00px",
            width: "149.47px",
            left: "24.00px",
            top: "24.00px",
          }}
        >
          <img
            id="I3345_6122_4_193__Group_3"
            src="/assets/images/group_3_2.svg"
            alt="Group_3"
            style={{ position: "absolute", top: "calc(100% * 0.02)" }}
          />
        </div>

        <span
          id="_3350_7983__Job"
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
          id="_3350_7984__Fiesta"
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "flex-start",
            height: "33.00px",
            width: "125.00px",
            position: "absolute",
            left: "123.00px",
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

        {/* Chat Header */}
        <div
          id="_3345_6184__Ellipse_37"
          style={{
            position: "absolute",
            background: "url(/assets/images/null) 100% / cover no-repeat, linear-gradient(0deg, rgba(196, 196, 196, 1.00)0%, rgba(196, 196, 196, 1.00)100%)",
            height: "36.00px",
            width: "36.00px",
            borderRadius: "50%",
            left: "383.00px",
            top: "13.00px",
          }}
        ></div>

        <span
          id="_3345_6185__Suzana_Colin"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "center",
            height: "26.00px",
            width: "105.00px",
            position: "absolute",
            left: "432.00px",
            top: "12.00px",
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
              fontFamily: "Axiforma",
              fontStyle: "normal",
              fontSize: "16.0px",
              fontWeight: "600",
            }}
          >
            {chat?.name || "Chat"}
          </span>
        </span>

        {/* Chat Messages */}
        <div
          id="_3345_6204__Rectangle_24"
          style={{
            position: "absolute",
            background: "rgba(245, 245, 245, 1.00)",
            borderTopLeftRadius: "16.0px",
            borderTopRightRadius: "16.0px",
            borderBottomRightRadius: "16.0px",
            height: "123.00px",
            width: "781.00px",
            left: "440.00px",
            top: "123.00px",
          }}
        ></div>

        <span
          id="_3345_6205__Hi_Furqan_I_saw_your"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "center",
            height: "38.95px",
            width: "753.76px",
            position: "absolute",
            left: "451.02px",
            top: "172.20px",
          }}
        >
          <span
            style={{
              background: "rgba(20, 20, 20, 1.00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontSize: "16.0px",
              fontWeight: "700",
            }}
          >
            Hi {chat?.name || "there"}, I saw your profile and thought
            <br />
            you'd be a great fit for the CEO role. Are you interested?
          </span>
        </span>

        {/* Message Input */}
        <div
          id="_3345_6169__Search"
          style={{
            position: "absolute",
            height: "39.00px",
            width: "852.00px",
            left: "485.00px",
            top: "1095.00px",
          }}
        >
          <div
            id="_3345_6170__Rectangle_10"
            style={{
              position: "absolute",
              borderColor: "#e7e7e7ff",
              borderStyle: "solid",
              borderWidth: "1px",
              borderRadius: "24px",
              height: "37.00px",
              width: "850.00px",
              left: "0.00px",
              top: "0.00px",
            }}
          ></div>

          <span
            id="_3345_6171__Start_a_new_message"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "16.00px",
              width: "146.00px",
              position: "absolute",
              left: "26.00px",
              top: "12.00px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(198, 195, 195, 1.00)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Axiforma",
                fontStyle: "normal",
                fontSize: "14.0px",
                fontWeight: "400",
              }}
            >
              Start a new message
            </span>
          </span>
        </div>

        <div
          id="_3377_2705__arrow_back"
          onClick={onBack}
          style={{
            position: "absolute",
            height: "24.00px",
            width: "24.00px",
            left: "7.00px",
            top: "107.00px",
            cursor: "pointer",
          }}
        >
          <img
            id="I3377_2705_54616_25400__icon"
            src="/assets/images/icon_4.svg"
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

export default ChatInterface2; 