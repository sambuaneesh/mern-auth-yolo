import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rive from "@rive-app/react-canvas";
// import RiveComponent from "@rive-app/react-canvas";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3>
              {/* <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch */}
              Welcome to Digital Electronic Affidavit
            </h3>
            <p className="flow-text grey-text text-darken-1">
              {/* Create a (minimal) full-stack app with user authentication via
              passport and JWTs */}
              A minimal authentication application made using MERN stack and
              YOLOv5 detection
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
          <div>
            <Rive
              src="cute_robot.riv"
              style={{
                // width: "20vw",
                height: "30vh",
                // height: "250px",
                alignSelf: "center",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
