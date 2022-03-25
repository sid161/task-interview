import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import Navbar from "../Navbar";
import validator from "validator";

export default function Create() {
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [emailError, setEmailError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;
    console.log("check", email);

    if (!validator.isEmail(email)) {
      setEmailError("Enter valid Email!");
      console.log("fail", email);
    } else {
      setEmailError("");
    }
  };

  const validatePincode = (e) => {
    var pincode = e.target.value;
    if (!validator.isNumeric(pincode) || pincode.length !== 5) {
      setPincodeError(
        "Enter pincode only in numbers and it should be of length 5"
      );
      console.log("pincodeerror", pincodeError);
    } else {
      setPincodeError("");
    }
  };

  const sendDataToAPI = () => {
    axios
      .post(`https://623cb3b6db0fc039d4ae28ee.mockapi.io/api/v1/users/`, {
        firstName,
        lastName,
        email,
        city,
        state,
        pincode,
      })
      .then(() => {
        history.push("/");
      });
  };
  return (
    <div className="container">
      <h3 style={{ color: "rgb(0,112,192)", fontSize: "20px" }}>
        Add Record Page
      </h3>
      <Navbar />
      <Form>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="flex-30">
            <label>First Name</label>
            <input
              name="fname"
              style={{ width: "80%", padding: "15px", margin: "15px" }}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>

          <div className="flex-30">
            <label>Last Name</label>
            <input
              name="lname"
              style={{ width: "80%", padding: "15px", margin: "15px" }}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex-30">
            <label>email</label>
            <input
              name="email"
              style={{ width: "80%", padding: "15px", margin: "15px" }}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e);
              }}
            />
          </div>
          <span
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            {emailError}
          </span>

          <div className="flex-30">
            <label>City</label>
            <input
              name="city"
              style={{ width: "80%", padding: "15px", margin: "15px" }}
              placeholder="city"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="flex-30">
            <label>State</label>
            <select
              name="state"
              style={{ width: "90%", padding: "15px", margin: "15px" }}
              placeholder="state"
              onChange={(e) => setState(e.target.value)}
            >
              <option>Delhi</option>
              <option>Maharashtra</option>
              <option>UP</option>
              <option>Goa</option>
            </select>
          </div>

          <div className="flex-30">
            <label>Pincode</label>
            <input
              name="pincode"
              placeholder="pincode"
              style={{ width: "80%", padding: "15px", margin: "15px" }}
              minlength="5"
              maxlength="5"
              onChange={(e) => {
                setPincode(e.target.value);
                validatePincode(e);
              }}
            />
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {pincodeError}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="button"
            type="submit"
            style={{ backgroundColor: "rgb(86,99,225)", color: "white" }}
            onClick={
              emailError === "" && pincodeError === "" ? sendDataToAPI : ""
            }
          >
            Add
          </button>
          <button className="button" type="cancel">
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
