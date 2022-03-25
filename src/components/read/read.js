import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import "../../index.css";
import { Header, Icon } from "semantic-ui-react";
import Modal from "../Modal";

export default function Read() {
  const [open, setOpen] = React.useState(false);
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState("");
  useEffect(() => {
    axios
      .get(`https://623cb3b6db0fc039d4ae28ee.mockapi.io/api/v1/users/`)
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);

  const setData = (id, firstName, lastName, email, city, state, pincode) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("city", city);
    localStorage.setItem("state", state);
    localStorage.setItem("pincode", pincode);
  };

  const getData = () => {
    axios
      .get(`https://623cb3b6db0fc039d4ae28ee.mockapi.io/api/v1/users/`)
      .then((getData) => {
        setApiData(getData.data);
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`https://623cb3b6db0fc039d4ae28ee.mockapi.io/api/v1/users/${id}`)
      .then(() => {
        getData();
      });
  };
  let data =
    search === ""
      ? apiData
      : apiData.filter(
          (user) =>
            user.firstName.toLowerCase().startsWith(search) ||
            user.lastName.toLowerCase().startsWith(search) ||
            user.email.toLowerCase().startsWith(search) ||
            user.city.toLowerCase().startsWith(search) ||
            user.state.toLowerCase().startsWith(search) ||
            user.pincode.toLowerCase().startsWith(search)
        );

  return (
    <div className="container">
      <h3 style={{ color: "rgb(0,112,192)", fontSize: "20px" }}>
        Read Record Page
      </h3>
      <Navbar />
      <div className="flex">
        <Link to="/create">
          <h2 style={{ borderBottom: "4px solid rgb(86,99,225)" }}>
            {" "}
            + Add Record
          </h2>
        </Link>
        <input
          type="text"
          placeholder="Search "
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          style={{ padding: "10px" }}
        />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th style={{ textAlign: "center" }}>Email </th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th style={{ textAlign: "center" }}>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <>
                <tr>
                  <td>{data.id}</td>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.city}</td>
                  <td>{data.state}</td>
                  <td>{data.pincode}</td>
                  <td>
                    {" "}
                    <Link to="/update">
                      <button
                        className="btn blue"
                        onClick={() =>
                          setData(
                            data.id,
                            data.firstName,
                            data.lastName,
                            data.email,
                            data.city,
                            data.state,
                            data.pincode
                          )
                        }
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn red"
                      color="red"
                      onClick={() => {
                        onDelete(data.id);
                      }}
                    >
                      Delete
                    </button>

                    {/* <Modal
                      closeIcon
                      open={open}
                      trigger={<Button>Show Modal</Button>}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                    >
                      <Header icon="archive" content="Archive Old Messages" />
                      <Modal.Content>
                        <p>
                          Your inbox is getting full, would you like us to
                          enable automatic archiving of old messages?
                        </p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="red" onClick={() => setOpen(false)}>
                          <Icon name="remove" /> No
                        </Button>
                        <Button color="green" onClick={() => setOpen(false)}>
                          <Icon name="checkmark" /> Yes
                        </Button>
                      </Modal.Actions>
                    </Modal> */}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
