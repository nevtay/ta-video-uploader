import React, { useState, useEffect, useContext } from "react";
import NextButton from "../components/NextButton";
import FormContext from "../context/uploadFields/formContext";

const PageOne = () => {
  const formContext = useContext(FormContext);
  const {
    fileName,
    videoFile,
    videoFileRef,
    videoTitle,
    videoDate,
    videoTime,
    videoTimeRef,
    videoLocation,
    setFileProperties,
    setVideoTitle,
    setVideoDate,
    setVideoTime,
    setVideoLocation,
    clearVideoFile,
  } = formContext;

  const [errors, setErrors] = useState([]);

  // validate video title field
  useEffect(() => {
    if (!videoFile) {
      setErrors([...errors, "Add a file"]);
    } else {
      setErrors([...errors.filter((err) => err !== "Add a file")]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoFile]);

  // validate video title field
  useEffect(() => {
    if (!videoTitle) {
      setErrors([...errors, "Video title required"]);
    } else {
      setErrors([...errors.filter((err) => err !== "Video title required")]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTitle]);

  // validate video date field
  useEffect(() => {
    if (!videoDate) {
      setErrors([...errors, "Video date required"]);
    } else {
      setErrors([...errors.filter((err) => err !== "Video date required")]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoDate]);

  // validate video time field
  useEffect(() => {
    if (!videoTime) {
      setErrors([...errors, "Video time required"]);
    } else {
      setErrors([...errors.filter((err) => err !== "Video time required")]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTime]);

  return (
    <>
      <p className="text-muted mb-4">
        Fields marked with <sup className="text-danger">*</sup> cannot be empty.
      </p>
      <div className="input-group mb-4">
        <div className="custom-file">
          <input
            style={{ cursor: "pointer" }}
            ref={videoFileRef}
            type="file"
            name="fileName"
            accept="video/*"
            className="custom-file-input"
            onChange={(e) => {
              if (!e.target.files[0]) {
                return;
              }
              setFileProperties(e);
            }}
            required
          />
          <label className="custom-file-label" htmlFor="customFile">
            {!fileName ? "Upload Video" : fileName}
          </label>
        </div>
        {fileName && (
          <div className="input-group-prepend">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                videoFileRef.current.value = "";
                clearVideoFile();
              }}
              className="input-group-text"
            >
              Remove File
            </span>
          </div>
        )}
      </div>
      <div className="input-group mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text">
            Video Title <sup className="text-danger">*</sup>
          </span>
        </div>
        <input
          type="text"
          name="videoTitle"
          className="form-control"
          placeholder="Enter Title"
          value={videoTitle}
          onChange={setVideoTitle}
          required
        />
      </div>
      <div className="input-group mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text">
            Video Start Date <sup className="text-danger">*</sup>
          </span>
        </div>
        <input
          type="date"
          name="videoStartDate"
          className="form-control"
          placeholder="Start Date (required)"
          value={videoDate}
          onChange={setVideoDate}
          required
        />
      </div>
      <div className="input-group mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text">
            Video Start Time <sup className="text-danger">*</sup>
          </span>
        </div>
        <input
          type="time"
          name="videoStartTime"
          className="form-control"
          placeholder="Start Time (required)"
          value={videoTime}
          ref={videoTimeRef}
          onChange={() => setVideoTime(videoTimeRef.current.value)}
          required
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Location (Postal Code)</span>
        </div>
        <input
          type="string"
          name="postalCode"
          className="form-control"
          placeholder="e.g. 190034"
          value={videoLocation}
          onChange={setVideoLocation}
        />
      </div>
      {errors.length > 0 ? (
        <div className="btn-group mt-4">
          <NextButton hasError={true} />
        </div>
      ) : (
        <div className="btn-group mt-4">
          <NextButton />
        </div>
      )}
    </>
  );
};

export default PageOne;
