import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const JobdetailsPage = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [roleType, setRoleType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [workEnvironment, setWorkEnvironment] = useState("");
  const [applicationProcess, setApplicationProcess] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobBenefits, setJobBenefits] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");

  return (
    <>
      <div
        id="_3356_5963__Job_details_Page"
        style={{
          position: "absolute",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 1.00)",
          borderRadius: "15px",
          height: "2289.0px",
          width: "100%",
        }}
      >
        <span
          id="_3356_5965__Job_Details"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "flex-start",
            height: "45.00px",
            width: "254.00px",
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
            Job Details
          </span>
        </span>
        <img
          id="_3354_5618__Ellipse_40"
          style={{ position: "absolute", left: "231.00px", top: "147.00px" }}
        />
        <span
          id="_3356_5966__Find_the_best_talent"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "flex-start",
            height: "22.00px",
            width: "413.00px",
            position: "absolute",
            left: "calc(50% - 600.00px)",
            top: "252.00px",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              background: "rgba(94, 102, 112, 1.00)",
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
            Find the best talent for your company
          </span>
        </span>

        <div
          id="_3378_2590__Rectangle_4"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderRadius: "40px",
            boxShadow: "0.0px 10.0px 40.0px 0.0px rgba(0, 0, 0, 0.15)",
            height: "1900.00px",
            width: "1311.00px",
            left: "calc(50% - 655.00px)",
            top: "294.00px",
          }}
        ></div>

        <div
          id="_3356_5967__Button__Post_"
          onClick={() => navigate("/JobSeekerDashBoardPage")}
          style={{
            position: "absolute",
            background: "rgba(12, 70, 59, 1.00)",
            borderRadius: "15px",
            height: "80.00px",
            width: "339.44px",
            left: "827.00px",
            top: "2040.00px",
            cursor: "pointer",
          }}
        >
          <span
            id="_3356_5968__Apply"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "46.00px",
              width: "97.00px",
              position: "absolute",
              left: "calc(50% - 48.72px)",
              top: "17.00px",
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
                fontFamily: "Inter",
                fontStyle: "normal",
                fontSize: "33.74409866333008px",
                fontWeight: "700",
                lineHeight: "45.29px",
              }}
            >
              Apply
            </span>
          </span>
        </div>

        <div
          id="_3356_5984__Button__submitbtn_"
          onClick={() => navigate("/SearchPage")}
          style={{
            position: "absolute",
            background: "rgba(233, 25, 29, 1.00)",
            borderRadius: "15px",
            height: "80.00px",
            width: "339.00px",
            left: "248.00px",
            top: "2040.00px",
            cursor: "pointer",
          }}
        >
          <span
            id="_3356_5985__Cancel"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "41.00px",
              width: "104.00px",
              position: "absolute",
              left: "calc(50% - 51.50px)",
              top: "20.00px",
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
                fontFamily: "Inter",
                fontStyle: "normal",
                fontSize: "30.45404624938965px",
                fontWeight: "700",
                lineHeight: "40.88px",
              }}
            >
              Cancel
            </span>
          </span>
        </div>

        {/* Job Title Input Field */}
        <input
          id="job-title-input-container"
          type="text"
          value={jobTitle}
          onChange={e => setJobTitle(e.target.value)}
          placeholder="Job Title"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "120.00px",
            top: "396.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        {/* Type of Role Input Field */}
        <input
          id="role-type-input"
          type="text"
          value={roleType}
          onChange={e => setRoleType(e.target.value)}
          placeholder="Type of Role"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "810.00px",
            top: "396.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        {/* Company Name Input Field */}
        <input
          id="company-name-input"
          type="text"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          placeholder="Company Name"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "120.00px",
            top: "547.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        {/* Location Input Field */}
        <input
          id="location-input"
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Location"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "810.00px",
            top: "547.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        {/* Desired Salary Range Input Field */}
        <input
          id="salary-range-input"
          type="text"
          value={salaryRange}
          onChange={e => setSalaryRange(e.target.value)}
          placeholder="Desired Salary Range"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "120.00px",
            top: "698.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        {/* Work Environment Input Field */}
        <input
          id="work-environment-input"
          type="text"
          value={workEnvironment}
          onChange={e => setWorkEnvironment(e.target.value)}
          placeholder="Work Environment"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "120.00px",
            top: "849.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        {/* Job Application Process Input Field */}
        <input
          id="application-process-input"
          type="text"
          value={applicationProcess}
          onChange={e => setApplicationProcess(e.target.value)}
          placeholder="Job Application Process"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "120.00px",
            top: "1000.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        <span
          id="_3356_6000__Job_Experience_Level"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: "24.00px",
            width: "253.00px",
            position: "absolute",
            left: "133.00px",
            top: "1311.00px",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              background: "rgba(18, 18, 36, 0.50)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontSize: "24.0px",
              fontWeight: "400",
              lineHeight: "24.00px",
            }}
          >
            Job Experience Level
          </span>
        </span>
        <div
          id="_3356_6001__Input__password_"
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
            top: "1151.00px",
          }}
        >
          <span
            id="_3356_6002__Marital_Status"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "24.00px",
              width: "165.00px",
              position: "absolute",
              left: "17.00px",
              top: "26.00px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(18, 18, 36, 0.50)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontSize: "24.0px",
                fontWeight: "400",
                lineHeight: "24.00px",
              }}
            >
              Marital Status
            </span>
          </span>
        </div>

        {/* Marital Status Input Field */}
        <input
          id="marital-status-input"
          type="text"
          value={maritalStatus}
          onChange={e => setMaritalStatus(e.target.value)}
          placeholder="Marital Status"
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
            top: "1151.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        <div
          id="_3356_6003__Input__password_"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "810.00px",
            top: "1151.00px",
          }}
        >
          <span
            id="_3356_6004__Gender"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "24.00px",
              width: "89.00px",
              position: "absolute",
              left: "17.00px",
              top: "26.00px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(18, 18, 36, 0.50)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontSize: "24.0px",
                fontWeight: "400",
                lineHeight: "24.00px",
              }}
            >
              Gender
            </span>
          </span>
        </div>

        {/* Gender Input Field */}
        <input
          id="gender-input"
          type="text"
          value={gender}
          onChange={e => setGender(e.target.value)}
          placeholder="Gender"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "810.00px",
            top: "1151.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        <div
          id="_3356_6005__Input__password_"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "810.00px",
            top: "698.00px",
          }}
        >
          <span
            id="_3356_6006__Job_Type"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "24.00px",
              width: "109.00px",
              position: "absolute",
              left: "17.00px",
              top: "26.00px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(18, 18, 36, 0.50)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontSize: "24.0px",
                fontWeight: "400",
                lineHeight: "24.00px",
              }}
            >
              Job Type
            </span>
          </span>
        </div>

        {/* Job Type Input Field */}
        <input
          id="job-type-input"
          type="text"
          value={jobType}
          onChange={e => setJobType(e.target.value)}
          placeholder="Job Type"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "810.00px",
            top: "698.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        <div
          id="_3356_6007__Input__password_"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "801.00px",
            top: "849.00px",
          }}
        >
          <span
            id="_3356_6008__Job_Benefits"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "24.00px",
              width: "146.00px",
              position: "absolute",
              left: "17.00px",
              top: "26.00px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(18, 18, 36, 0.50)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontSize: "24.0px",
                fontWeight: "400",
                lineHeight: "24.00px",
              }}
            >
              Job Benefits
            </span>
          </span>
        </div>

        {/* Job Benefits Input Field */}
        <input
          id="job-benefits-input"
          type="text"
          value={jobBenefits}
          onChange={e => setJobBenefits(e.target.value)}
          placeholder="Job Benefits"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "801.00px",
            top: "849.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        <div
          id="_3356_6009__Input__password_"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "810.00px",
            top: "1000.00px",
          }}
        >
          <span
            id="_3356_6010__Application_Deadline"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "24.00px",
              width: "250.00px",
              position: "absolute",
              left: "17.00px",
              top: "26.00px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(18, 18, 36, 0.50)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontSize: "24.0px",
                fontWeight: "400",
                lineHeight: "24.00px",
              }}
            >
              Application Deadline
            </span>
          </span>
          <div
            id="_3356_6011__85616160-3bae-4f2b-9"
            style={{
              position: "absolute",
              background: "url(assets/images/null) 100% / cover no-repeat",
              height: "58.00px",
              width: "65.00px",
              left: "367.00px",
              top: "18.00px",
            }}
          ></div>
        </div>

        {/* Application Deadline Input Field */}
        <input
          id="application-deadline-input"
          type="text"
          value={applicationDeadline}
          onChange={e => setApplicationDeadline(e.target.value)}
          placeholder="Application Deadline"
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 1.00)",
            borderColor: "#e7e7f1ff",
            borderStyle: "solid",
            borderWidth: "2.043895721435547px",
            borderRadius: "15px",
            height: "88.91px",
            width: "472.91px",
            left: "810.00px",
            top: "1000.00px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "24.0px",
            fontWeight: "400",
            color: "rgba(18, 18, 36, 0.90)",
            paddingLeft: "17px",
            outline: "none"
          }}
        />

        <div
          id="_3356_6012__Menu_with_Text_field"
          style={{
            position: "absolute",
            height: "296.00px",
            width: "332.00px",
            left: "120.00px",
            top: "1287.00px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            padding: "8px 0px 0px 0px",
          }}
        >
          <div
            id="I3356_6012_54061_37014__Text_field"
            style={{
              position: "relative",
              borderTopLeftRadius: "4.0px",
              borderTopRightRadius: "4.0px",
              height: "56.00px",
              width: "calc(100% - 0px - 0px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "nowrap",
            }}
          >
            <div
              id="I3356_6012_54061_37014_52798_24672__Text_field"
              style={{
                position: "relative",
                borderColor: "#65558fff",
                borderStyle: "solid",
                borderWidth: "3px",
                borderRadius: "4px",
                width: "calc(100% - 0px - 0px)",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexWrap: "nowrap",
                gap: "10px",
              }}
            >
              <div
                id="I3356_6012_54061_37014_52798_24673__State-layer"
                style={{
                  position: "relative",
                  borderTopLeftRadius: "4.0px",
                  borderTopRightRadius: "4.0px",
                  width: "calc(100% - 16px - 0px)",
                  flex: "1",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexWrap: "nowrap",
                  gap: "4px",
                  padding: "4px 0px 4px 16px",
                }}
              >
                <div
                  id="I3356_6012_54061_37014_52798_24674__Content"
                  style={{
                    position: "relative",
                    height: "40.00px",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexWrap: "nowrap",
                    padding: "4px 0px",
                  }}
                >
                  <div
                    id="I3356_6012_54061_37014_52798_24675__Input_text_container"
                    style={{
                      position: "relative",
                      width: "calc(100% - 0px - 0px)",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <span
                      id="I3356_6012_54061_37014_52798_24676__Input_text"
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        alignItems: "center",
                        height: "24.00px",
                        width: "0.00px",
                        position: "relative",
                      }}
                    ></span>
                  </div>

                  <div
                    id="I3356_6012_54061_37014_52798_24678__Label_text_container"
                    style={{
                      position: "absolute",
                      background: "rgba(254, 247, 255, 1.00)",
                      height: "16.00px",
                      width: "31.00px",
                      left: "-4.00px",
                      top: "-12.00px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "nowrap",
                      padding: "0px 4px",
                    }}
                  >
                    <span
                      id="I3356_6012_54061_37014_52798_24679__Label_text"
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        alignItems: "flex-start",
                        height: "16.00px",
                        width: "31.00px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          background: "rgba(101, 85, 143, 1.00)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          textFillColor: "transparent",
                          WebkitTextFillColor: "transparent",
                          fontFamily: "Roboto",
                          fontStyle: "normal",
                          fontSize: "12.0px",
                          fontWeight: "400",
                          lineHeight: "16.00px",
                          letterSpacing: "0.4000000059604645px",
                        }}
                      >
                        Label
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  id="I3356_6012_54061_37014_52798_24680__Trailing_icon"
                  style={{
                    position: "relative",
                    height: "48.00px",
                    width: "48.00px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: "10px",
                  }}
                >
                  <div
                    id="I3356_6012_54061_37014_52798_24680_51525_5219__container"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "100px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "nowrap",
                      gap: "10px",
                    }}
                  >
                    <div
                      id="I3356_6012_54061_37014_52798_24680_51525_5220__state-layer"
                      style={{
                        position: "relative",
                        height: "24.00px",
                        width: "24.00px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        gap: "10px",
                        padding: "8px",
                      }}
                    >
                      <div
                        id="I3356_6012_54061_37014_52798_24680_51525_5221__Icon"
                        style={{
                          position: "relative",
                          height: "24.00px",
                          width: "24.00px",
                        }}
                      >
                        <img
                          id="I3356_6012_54061_37014_52798_24680_51525_5221_54616_25504__icon"
                          src="assets/images/icon_11.svg"
                          alt="icon"
                          style={{
                            position: "absolute",
                            left: "calc(100% * 0.08)",
                            top: "calc(100% * 0.08)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="I3356_6012_54061_37015__Menu"
            style={{
              position: "relative",
              background: "rgba(255, 255, 255, 1.00)",
              borderRadius: "4px",
              boxShadow:
                "0.0px 2.0px 6.0px 2.0px rgba(0, 0, 0, 0.15), 0.0px 1.0px 2.0px 0.0px rgba(0, 0, 0, 0.30)",
              height: "224.00px",
              width: "200.00px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              padding: "8px 0px",
            }}
          ></div>
        </div>

        <div
          id="_3356_6013__Div__formField_"
          style={{
            position: "absolute",
            height: "239.00px",
            width: "413.00px",
            left: "120.00px",
            top: "1502.00px",
          }}
        >
          <span
            id="_3356_6015__Terms_and_Conditions"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "24.00px",
              width: "280.00px",
              position: "absolute",
              left: "0.00px",
              top: "4.98px",
            }}
          >
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
              Terms and Conditions*
            </span>
          </span>

          <div
            id="_3356_6016__Input__password_"
            style={{
              position: "absolute",
              background: "rgba(255, 255, 255, 1.00)",
              borderColor: "#e7e7f1ff",
              borderStyle: "solid",
              borderWidth: "2.043895721435547px",
              borderRadius: "8px",
              height: "70.91px",
              width: "387.91px",
              left: "0.00px",
              top: "59.00px",
            }}
          >
            <span
              id="_3356_6017__Conditions1"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "left",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "24.00px",
                width: "137.00px",
                position: "absolute",
                left: "17.00px",
                top: "26.00px",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(18, 18, 36, 0.50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontSize: "24.0px",
                  fontWeight: "400",
                  lineHeight: "24.00px",
                }}
              >
                Conditions1
              </span>
            </span>
          </div>

          <div
            id="_3356_6018__Input__password_"
            style={{
              position: "absolute",
              background: "rgba(255, 255, 255, 1.00)",
              borderColor: "#e7e7f1ff",
              borderStyle: "solid",
              borderWidth: "2.043895721435547px",
              borderRadius: "8px",
              height: "70.91px",
              width: "387.91px",
              left: "0.00px",
              top: "164.00px",
            }}
          >
            <span
              id="_3356_6019__Conditions2"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "left",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "24.00px",
                width: "144.00px",
                position: "absolute",
                left: "17.00px",
                top: "26.00px",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(18, 18, 36, 0.50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontSize: "24.0px",
                  fontWeight: "400",
                  lineHeight: "24.00px",
                }}
              >
                Conditions2
              </span>
            </span>
          </div>
        </div>

        <div
          id="_3356_6020__Div__formField_"
          style={{
            position: "absolute",
            height: "329.00px",
            width: "477.00px",
            left: "810.00px",
            top: "1348.00px",
          }}
        >
          <span
            id="_3356_6022__Skills_Required__"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "24.00px",
              width: "193.00px",
              position: "absolute",
              left: "0.00px",
              top: "4.98px",
            }}
          >
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
              Skills Required *
            </span>
          </span>

          <div
            id="_3356_6023__Input__password_"
            style={{
              position: "absolute",
              background: "rgba(255, 255, 255, 1.00)",
              borderColor: "#e7e7f1ff",
              borderStyle: "solid",
              borderWidth: "2.043895721435547px",
              borderRadius: "8px",
              height: "88.91px",
              width: "472.91px",
              left: "0.00px",
              top: "59.00px",
            }}
          >
            <span
              id="_3356_6024__Skill1"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "left",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "24.00px",
                width: "52.00px",
                position: "absolute",
                left: "17.00px",
                top: "26.00px",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(18, 18, 36, 0.50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontSize: "24.0px",
                  fontWeight: "400",
                  lineHeight: "24.00px",
                }}
              >
                Skill1
              </span>
            </span>
          </div>

          <div
            id="_3356_6025__Input__password_"
            style={{
              position: "absolute",
              background: "rgba(255, 255, 255, 1.00)",
              borderColor: "#e7e7f1ff",
              borderStyle: "solid",
              borderWidth: "2.043895721435547px",
              borderRadius: "8px",
              height: "88.91px",
              width: "472.91px",
              left: "0.00px",
              top: "212.00px",
            }}
          >
            <span
              id="_3356_6026__SKill2"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "left",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "24.00px",
                width: "60.00px",
                position: "absolute",
                left: "17.00px",
                top: "26.00px",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(18, 18, 36, 0.50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontSize: "24.0px",
                  fontWeight: "400",
                  lineHeight: "24.00px",
                }}
              >
                SKill2
              </span>
            </span>
          </div>
        </div>

        <div
          id="_3356_6027__Div__formInput_"
          style={{
            position: "absolute",
            height: "177.00px",
            width: "1083.00px",
            left: "101.00px",
            top: "1785.00px",
          }}
        >
          <div
            id="_3356_6028__Input__password_"
            style={{
              position: "absolute",
              background: "rgba(255, 255, 255, 1.00)",
              borderColor: "#e7e7f1ff",
              borderStyle: "solid",
              borderWidth: "2.043895721435547px",
              borderRadius: "8px",
              height: "88.91px",
              width: "1153.91px",
              left: "24.00px",
              top: "89.00px",
            }}
          ></div>

          <span
            id="_3356_6029__Job_Description_"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "24.00px",
              width: "201.00px",
              position: "absolute",
              left: "24.00px",
              top: "26.00px",
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
                Job Description
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
          id="_3356_6030__arrow_back"
          style={{
            position: "absolute",
            height: "24.00px",
            width: "24.00px",
            left: "41.00px",
            top: "121.00px",
          }}
        >
          <img
            id="I3356_6030_54616_25400__icon"
            src="assets/images/icon_12.svg"
            alt="icon"
            style={{
              position: "absolute",
              left: "calc(100% * 0.17)",
              top: "calc(100% * 0.17)",
            }}
          />
        </div>

        <div
          id="_3354_5620__Button__submitbtn_"
          style={{
            position: "absolute",
            background: "rgba(12, 70, 59, 1.00)",
            borderRadius: "15px",
            height: "84.82px",
            width: "333.42px",
            left: "853.00px",
            top: "1704.00px",
          }}
        >
          <span
            id="_3354_5621__Upload_Resume"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "center",
              height: "41.00px",
              width: "222.00px",
              position: "absolute",
              left: "calc(50% - 152.71px)",
              top: "23.00px",
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
                fontFamily: "Inter",
                fontStyle: "normal",
                fontSize: "29.0px",
                fontWeight: "700",
                lineHeight: "40.88px",
              }}
            >
              Upload Resume
            </span>
          </span>
          <div
            id="_3354_5622__Upload"
            style={{
              position: "absolute",
              overflow: "hidden",
              height: "48.00px",
              width: "48.00px",
              left: "256.00px",
              top: "16.00px",
            }}
          >
            <img
              id="I3354_5622_7758_12506__Icon"
              src="assets/images/icon_13.svg"
              alt="Icon"
              style={{
                position: "absolute",
                left: "calc(100% * 0.13)",
                top: "calc(100% * 0.13)",
              }}
            />
          </div>
        </div>

        <div
          id="_3356_6111__Rectangle_1"
          style={{
            position: "absolute",
            background: "rgba(242, 255, 242, 1.00)",
            height: "89.00px",
            width: "1449.00px",
            left: "-4.00px",
            top: "0.00px",
          }}
        ></div>

        <div
          id="_3356_6148__Frame_27"
          style={{
            position: "absolute",
            height: "50.00px",
            width: "345.65px",
            left: "calc(50% - 175.59px)",
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
            id="_3356_6149__Frame_5"
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
              id="_3356_6150__Home"
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
            id="_3356_6151__Frame_4"
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
              id="_3356_6152__Jobs"
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
            id="_3356_6153__Frame_3"
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
              id="_3356_6154__Categories"
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
            id="_3356_6155__Frame_10"
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
          id="_3356_6157__Frame_10"
          style={{
            position: "absolute",
            height: "30.00px",
            width: "85.66px",
            left: "1125.01px",
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
            id="_3356_6158__Browse_jobs"
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
          id="_3356_6159__Job"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "flex-start",
            height: "33.00px",
            width: "52.00px",
            position: "absolute",
            left: "35.00px",
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
          id="_3356_6160__Fiesta"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "flex-start",
            height: "33.00px",
            width: "124.00px",
            position: "absolute",
            left: "81.00px",
            top: "29.00px",
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

        <span
          id="_3357_5259__Begineer_level"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "center",
            height: "54.00px",
            width: "320.00px",
            position: "absolute",
            left: "133.00px",
            top: "1368.00px",
          }}
        >
          <span
            style={{
              background: "rgba(122, 110, 110, 1.00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontSize: "24.0px",
              fontWeight: "700",
            }}
          >
            Begineer level
          </span>
        </span>
        <span
          id="_3357_5264__Advanced_level"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "center",
            height: "54.00px",
            width: "320.00px",
            position: "absolute",
            left: "128.00px",
            top: "1435.00px",
          }}
        >
          <span
            style={{
              background: "rgba(122, 110, 110, 1.00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontSize: "24.0px",
              fontWeight: "700",
            }}
          >
            Advanced level
          </span>
        </span>
        <div
          id="_3377_2678__Frame_53"
          style={{
            position: "absolute",
            overflow: "hidden",
            height: "65.00px",
            width: "67.00px",
            left: "1355.00px",
            top: "12.00px",
          }}
        >
          <img
            id="_3377_2679__Group_6"
            src="assets/images/group_6_4.svg"
            alt="Group_6"
            style={{
              position: "absolute",
              left: "calc(100% * 0.01)",
              top: "calc(100% * 0.01)",
            }}
          />
        </div>
      </div>
    </>
  );
};
export default JobdetailsPage;
