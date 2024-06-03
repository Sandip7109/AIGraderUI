import { Link } from "react-router-dom";
import { Navbar, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faGraduationCap,
  faHouse,
  faPen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./dashboard-nav.scss";
export function DashboardNavbar() {
  return (
    <Navbar style={{ height: "60px", paddingTop:"2px" }} fullWidth>
      <div className="flex justify-between gap-6 md:flex-row md:items-center">
        <div>
          <Link to="/dashboard/home">
            <Button variant="text" className="butten-nav">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesomeIcon
                  icon={faHouse}
                  size="2xl"
                  style={{ paddingRight: "10px" }}
                />
                <h4 style={{ paddingTop: "8px", fontSize: "17px" }}>
                  {" "}
                  Dashboard{" "}
                </h4>
              </div>
            </Button>
          </Link>
          <Link to="/dashboard/teach">
            <Button variant="text" className="butten-nav">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesomeIcon
                  icon={faChalkboardUser}
                  size="2xl"
                  style={{ paddingRight: "10px" }}
                />
                <h4 style={{ paddingTop: "8px", fontSize: "17px" }}>
                  {" "}
                  Teacher{" "}
                </h4>
              </div>{" "}
            </Button>
          </Link>
          <Link to="/dashboard/student">
            <Button variant="text" className="butten-nav">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="2xl"
                  style={{ paddingRight: "10px" }}
                />{" "}
                <h4 style={{ paddingTop: "8px", fontSize: "17px" }}>
                  {" "}
                  Student{" "}
                </h4>
              </div>{" "}
            </Button>
          </Link>{" "}
          <Link to="/dashboard/assessment-form">
            <Button variant="text" className="butten-nav">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesomeIcon
                  icon={faPen}
                  size="2xl"
                  style={{ paddingRight: "10px" }}
                />
                <h4 style={{ paddingTop: "8px", fontSize: "17px" }}>
                  {" "}
                  Assessment
                </h4>
              </div>{" "}
            </Button>
          </Link>{" "}
        </div>
        <Link to="/auth/sign-in">
          <Button variant="text" className="butten-nav">
            {" "}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="2xl"
                style={{ paddingRight: "10px" }}
              />
              <h4 style={{ paddingTop: "5px", fontSize: "17px" }}>
                {" "}
                Sign Out{" "}
              </h4>
            </div>
          </Button>
        </Link>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
