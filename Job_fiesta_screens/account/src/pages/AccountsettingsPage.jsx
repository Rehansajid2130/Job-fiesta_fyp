import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const AccountsettingsPage = () => {
  const navigate = useNavigate();

  // State for password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State for username
  const [username, setUsername] = useState("Furqan12");

  // Handler for Save Changes
  const handleSaveChanges = () => {
    if (!username) {
      alert("Please enter a username.");
      return;
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }
    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Here you would call your API to update the password and username
    alert(`Username changed to: ${username}\nPassword changed successfully!`);
    // Optionally reset fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handler for Delete Account
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Here you would call your API to delete the account
      alert("Account deleted (demo only).");
      navigate("/");
    }
  };

  return (
    <>
      <div
        id="_3356_5382__Account_settings_Pag"
        style={{
          position: "absolute",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 1.00)",
          borderRadius: "15px",
          height: "1718.0px",
          width: "100%",
        }}
      >
        <span
          id="_3356_5384__Accounts_Setting"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "flex-start",
            height: "45.00px",
            width: "391.00px",
            position: "absolute",
            left: "calc(50% - 600.00px)",
            top: "187.00px",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              background: "rgba(48, 48, 48, 1.00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontSize: "45.0px",
              fontWeight: "600",
              lineHeight: "45.00px",
            }}
          >
            Accounts Setting
          </span>
        </span>

        <input
          id="_3356_5405__Input__password_"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "118.00px",
            top: "439.00px",
            fontSize: 24,
            fontFamily: "Poppins",
            fontWeight: 400,
            paddingLeft: 32,
            paddingRight: 16,
            color: "#121224",
          }}
        />

        <span
          id="_3354_5560__Remember_your_passwo"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "center",
            height: "22.00px",
            width: "298.00px",
            position: "absolute",
            left: "101.00px",
            top: "1007.00px",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              background: "rgba(47, 118, 230, 1.00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontSize: "22.0px",
              fontWeight: "400",
              lineHeight: "22.00px",
            }}
          >
            Remember your password
          </span>
        </span>
        <div
          id="_3356_5417__Input__password_"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "70.91px",
            width: "387.91px",
            left: "101.00px",
            top: "1051.00px",
          }}
        >
          <span
            id="_3354_5572__Notifications"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "24.00px",
              width: "152.00px",
              position: "absolute",
              left: "29.00px",
              top: "26.00px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(48, 48, 48, 1.00)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontSize: "24.0px",
                fontWeight: "700",
                lineHeight: "24.00px",
              }}
            >
              Notifications
            </span>
          </span>
          <div
            id="_3356_5962__25078737-6096-4c26-a"
            style={{
              position: "absolute",
              background:
                "url(assets/images/2507873760964c26a2f1581734d25db5_1.png) 100% / cover no-repeat",
              height: "73.00px",
              width: "99.00px",
              left: "293.00px",
              top: "0.00px",
            }}
          ></div>
        </div>

        <div
          id="_3356_5449__arrow_back"
          style={{
            position: "absolute",
            height: "24.00px",
            width: "24.00px",
            left: "41.00px",
            top: "121.00px",
          }}
        >
          <img
            id="I3356_5449_54616_25400__icon"
            src="assets/images/account_circle.svg"
            alt="icon"
            style={{
              position: "absolute",
              left: "calc(100% * 0.17)",
              top: "calc(100% * 0.17)",
            }}
          />
        </div>

        <div
          id="_3356_5354__Image"
          style={{
            position: "absolute",
            overflow: "hidden",
            background: "url(assets/images/image.png) 100% / cover no-repeat",
            borderRadius: "45px",
            transform: "scale(1.0, -1.0)",
            transformOrigin: "0 0",
            height: "calc(100% - 1595.00px)",
            width: "145.00px",
            left: "101.00px",
            top: "374.00px",
          }}
        ></div>

        <span
          id="_3356_5476__Username"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "center",
            height: "24.00px",
            width: "121.00px",
            position: "absolute",
            left: "118.00px",
            top: "393.00px",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              background: "rgba(48, 48, 48, 1.00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontSize: "24.0px",
              fontWeight: "700",
              lineHeight: "24.00px",
            }}
          >
            Username
          </span>
        </span>
        <div
          id="_3354_5559__Div__formInput_"
          style={{
            position: "absolute",
            borderRadius: "15px",
            height: "177.00px",
            width: "1155.00px",
            left: "101.00px",
            top: "565.00px",
          }}
        >
          
          
           
            
            <input
              id="_3354_5561__Input__password_"
              type="password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Old Password"
              style={{
                position: "absolute",
                background: "rgba(255, 255, 255, 1.00)",
                borderColor: "#e7e7f1ff",
                borderStyle: "solid",
                borderWidth: "2.043895721435547px",
                borderRadius: "8px",
                height: "89.91px",
                width: "1150.91px",
                left: "0.00px",
                top: "45.00px",
                fontSize: 24,
                fontFamily: "Poppins",
                fontWeight: 400,
                paddingLeft: 32,
                paddingRight: 16,
                color: "#121224",
              }}
            />
          </div>

          <span
            id="_3354_5563__Change_Password_"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "24.00px",
              width: "233.00px",
              position: "absolute",
              left: "0.00px",
              top: "4.98px",
            }}
          >
            <span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(48, 48, 48, 1.00)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontSize: "24.0px",
                  fontWeight: "500",
                  lineHeight: "24.00px",
                }}
              >
                Change Password
              </span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(240, 65, 65, 1.00)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontSize: "24.0px",
                  fontWeight: "500",
                  lineHeight: "24.00px",
                }}
              >
                *
              </span>
            </span>
          </span>
        </div>

        <div
          id="_3354_5565__Input__password_"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "89.91px",
            width: "1150.91px",
            left: "101.00px",
            top: "742.00px",
          }}
        >
          <input
            id="_3354_5565__Input__password_"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            style={{
              position: "absolute",
              background: "rgba(255, 255, 255, 1.00)",
              borderColor: "#e7e7f1ff",
              borderStyle: "solid",
              borderWidth: "2.043895721435547px",
              borderRadius: "15px",
              height: "89.91px",
              width: "1150.91px",
              left: "0.00px",
              top: "0.00px",
              fontSize: 24,
              fontFamily: "Poppins",
              fontWeight: 400,
              paddingLeft: 32,
              paddingRight: 16,
              color: "#121224",
            }}
          />
        </div>

        <div
          id="_3354_5568__Input__password_"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "8px",
            height: "89.91px",
            width: "1150.91px",
            left: "101.00px",
            top: "894.00px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            id="_3354_5568__Input__password_"
            type="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old Password"
            style={{
              position: "absolute",
              background: "rgba(255, 255, 255, 1.00)",
              borderColor: "#e7e7f1ff",
              borderStyle: "solid",
              borderWidth: "2.043895721435547px",
              borderRadius: "8px",
              height: "89.91px",
              width: "1150.91px",
              left: "0.00px",
              top: "0.00px",
              fontSize: 24,
              fontFamily: "Poppins",
              fontWeight: 400,
              paddingLeft: 32,
              paddingRight: 16,
              color: "#121224",
            }}
          />
        </div>

        <div
          id="_3356_5951__Actions"
          style={{
            position: "absolute",
            height: "55.00px",
            width: "247.00px",
            left: "788.00px",
            top: "1160.00px",
          }}
        >
          <div
            id="_3354_5677__Frame_11"
            onClick={handleDeleteAccount}
            style={{
              position: "absolute",
              background: "rgba(209, 38, 38, 1.00)",
              borderRadius: "50px",
              height: "35.00px",
              width: "227.00px",
              left: "0.00px",
              top: "0.00px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <span
              id="_3354_5678__Delete_Account"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "flex-start",
                height: "30.00px",
                width: "192.00px",
                position: "relative",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(242, 255, 242, 1.00)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontSize: "20.0px",
                  fontWeight: "600",
                  lineHeight: "150.00%",
                }}
              >
                Delete Account
              </span>
            </span>
            <div
              id="_3356_6054__delete"
              style={{
                position: "relative",
                height: "25.00px",
                width: "25.00px",
              }}
            >
              <img
                id="I3356_6054_54616_25472__icon"
                src="assets/images/icon_9.svg"
                alt="icon"
                style={{
                  position: "absolute",
                  left: "calc(100% * 0.17)",
                  top: "calc(100% * 0.12)",
                }}
              />
            </div>
          </div>
        </div>

        <div
          id="_3354_5714__Frame_11"
          onClick={handleSaveChanges}
          style={{
            position: "absolute",
            background: "rgba(47, 118, 230, 1.00)",
            borderRadius: "50px",
            height: "35.00px",
            width: "221.00px",
            left: "235.00px",
            top: "1160.00px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <span
            id="_3354_5715__Save_Changes"
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "flex-start",
              height: "30.00px",
              width: "247.00px",
              position: "relative",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(242, 255, 242, 1.00)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontSize: "20.0px",
                fontWeight: "600",
                lineHeight: "150.00%",
              }}
            >
              Save Changes
            </span>
          </span>
        </div>

        <div
          id="_3356_6059__Rectangle_1"
          style={{
            position: "absolute",
            background: "rgba(242, 255, 242, 1.00)",
            height: "89.00px",
            width: "1449.00px",
            left: "-9.00px",
            top: "0.00px",
          }}
        ></div>

        <div
          id="_3356_6096__Frame_27"
          style={{
            position: "absolute",
            height: "50.00px",
            width: "345.65px",
            left: "calc(50% - 180.59px)",
            top: "27.00px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            gap: "20px",
          }}
        >
          <div
            id="_3356_6097__Frame_5"
            onClick={() => navigate("/")}
            style={{
              position: "relative",
              height: "30.00px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <span
              id="_3356_6098__Home"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "flex-start",
                height: "30.00px",
                width: "58.00px",
                position: "relative",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(40, 40, 40, 1.00)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontSize: "20.0px",
                  fontWeight: "700",
                  lineHeight: "150.00%",
                }}
              >
                Home
              </span>
            </span>
          </div>

          <div
            id="_3356_6099__Frame_4"
            onClick={() => navigate("/SearchPage")}
            style={{
              position: "relative",
              height: "30.00px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <span
              id="_3356_6100__Jobs"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "flex-start",
                height: "30.00px",
                width: "47.00px",
                position: "relative",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(40, 40, 40, 1.00)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontSize: "20.0px",
                  fontWeight: "500",
                  lineHeight: "150.00%",
                }}
              >
                Jobs
              </span>
            </span>
          </div>

          <div
            id="_3356_6101__Frame_3"
            style={{
              position: "relative",
              height: "30.00px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: "10px",
              padding: "10px",
            }}
          >
            <span
              id="_3356_6102__Categories"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "flex-start",
                height: "30.00px",
                width: "105.00px",
                position: "relative",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(40, 40, 40, 1.00)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontSize: "20.0px",
                  fontWeight: "500",
                  lineHeight: "150.00%",
                }}
              >
                Categories
              </span>
            </span>
          </div>

          <div
            id="_3356_6103__Frame_10"
            style={{
              position: "relative",
              height: "30.00px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: "10px",
              padding: "10px",
            }}
          ></div>
        </div>

        <div
          id="_3356_6105__Frame_10"
          style={{
            position: "absolute",
            height: "30.00px",
            width: "85.66px",
            left: "1120.01px",
            top: "27.00px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: "10px",
            padding: "10px",
          }}
        >
          <span
            id="_3356_6106__Browse_jobs"
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "flex-start",
              height: "30.00px",
              width: "120.00px",
              position: "relative",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(12, 70, 59, 1.00)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontSize: "20.0px",
                fontWeight: "700",
                lineHeight: "150.00%",
              }}
            >
              Browse jobs
            </span>
          </span>
        </div>

        <span
          id="_3356_6107__Job"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "flex-start",
            height: "33.00px",
            width: "52.00px",
            position: "absolute",
            left: "30.00px",
            top: "34.00px",
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
          id="_3356_6108__Fiesta"
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "flex-start",
            height: "33.00px",
            width: "124.00px",
            position: "absolute",
            left: "76.00px",
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
    
    </>
  );
};
export default AccountsettingsPage;
