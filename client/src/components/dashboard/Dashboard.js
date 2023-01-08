import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";

// import { useState, useEffect } from "react";

const Dashboard = (props) => {
  const { user } = props.auth;
  // const [stateVariable, setStateVariable] = useState(initialValue);
  // // state variable and setter go here
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [detected, setDetected] = useState();
  const [semantic, setSemantic] = useState();
  const [toolslist, setTools] = useState();
  const [processing1, setProcessing1] = useState(false);
  const [processing2, setProcessing2] = useState(false);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setDetected();
    setSemantic();
    console.log("yo" + e.target.files);
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    console.log(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function detect() {
    // setProcessing(true);
    // console.log("sleep completed");
    // console.log("processing", new_processing, processing)
    console.log(selectedFile);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    let formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:8000/object-to-img", formData, config)
      // axios.post('http://18.176.111.18:8000/object-to-img', formData, config)
      .then((res) => {
        // console.log(res.data.result);
        setProcessing1(true);
        setTools(res.data.result);
        var encode_image = JSON.parse(res.data.img.body)["image"];
        var image = new Image();
        image.src = "data:image/png;base64," + encode_image;
        console.log(typeof image);
        setDetected("data:image/png;base64," + encode_image);
        setProcessing1(false);
      })
      .catch((err) => console.log(err));
    //     axios.post('http://localhost:8000/image-segmentation', formData, config)
    //         .then(res => {
    //             setProcessing2(true)
    //             console.log(res)
    //             var encode_image = JSON.parse(res.data[1].body)['image'];
    //             var image = new Image();
    //             image.src = 'data:image/png;base64,' + encode_image;
    //             console.log(typeof image)
    //             setSemantic('data:image/png;base64,' + encode_image);
    //             setProcessing2(false)
    //         })
    //         .catch(err => console.log(err))
  }

  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="landing-copy col s12 center-align">
          <h4>
            <b>Hi,</b> {user.name.split(" ")[0]}
            <span>👋</span>
            <p className="flow-text grey-text text-darken-1">
              You are almost there! Complete the{" "}
              <span style={{ fontFamily: "monospace" }}>Authentication</span>
              <br />
              by uploading your picture
              <br />
              <br />
              <div>
                <input type="file" onChange={onSelectFile} /> <br />
              </div>
              <br />
              {/* {selectedFile && (
                <img
                  src={preview}
                  style={{ maxWidth: "800px", maxHeight: "600px" }}
                />
              )} */}
              <button variant="contained" color="secondary" onClick={detect}>
                Detect
              </button>
              <br />
              <br />
              {processing1 && processing2 ? (
                <h1>processing.......</h1>
              ) : (
                <div>
                  {detected && (
                    <h2 style={{ paddingLeft: "50px" }}>Detected Image:</h2>
                  )}

                  <div>
                    {detected && (
                      <img
                        src={detected}
                        style={{ maxWidth: "800px", maxHeight: "600px" }}
                      />
                    )}
                  </div>

                  <div>
                    {detected && <h3>Detected human:</h3>}
                    {detected && (
                      <ul>
                        {toolslist.length > 0 &&
                          toolslist.map((item) => (
                            <li key={item}>
                              {" "}
                              <h4>{item}</h4>{" "}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>

                  {semantic && (
                    <h1 style={{ paddingLeft: "50px" }}>Segmented Image:</h1>
                  )}
                  <br />

                  <div>
                    {semantic && (
                      <img
                        src={semantic}
                        style={{ maxWidth: "800px", maxHeight: "600px" }}
                      />
                    )}
                  </div>

                  <div>{semantic}</div>
                  {/* <div>{semantic && <Legend />}</div> */}
                </div>
              )}
            </p>
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
// export default Dashboard;
