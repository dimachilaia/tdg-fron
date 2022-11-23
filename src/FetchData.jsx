import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import useStore from "./store";
import styled from "styled-components";
import Loading from "./Loading/Loading";
import DataTable from "react-data-table-component";
import ModalComponent from "./Modal/ModalComponent";

const FetchData = () => {
  const data = useStore((state) => state.data);
  const loading = useStore((state) => state.loading);
  const hasErrors = useStore((state) => state.hasErrors);
  const fetchData = useStore((state) => state.fetch);
  const removeStudent = useStore((state) => state.removePerson);
  const addPerson = useStore((state) => state.addPerson);
  const updatePerson = useStore((state) => state.updatePerson);
  const [change, setChange] = useState(false);
  const [modal, setModal] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Not selected");
  const [id, setId] = useState()

  const deleteHandler = (id) => {
    removeStudent(id);
  };

  const handleModalClose = (response) => {
    if (response) {
      addPerson({
        name: response.name,
        email: response.email,
        phone: response.phone,
        street: response.street,
        city: response.city,
        gender: response.gender,
      });
    }
  };

  const handleEdit = (response) => {
    updatePerson({
      name: response.name,
      email: response.email,
      phone: response.phone,
      street: response.street,
      city: response.city,
      gender: response.gender,
      id: response.id,
    });
    setChange(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Street",
      selector: (row) => row.address.street,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Delete",
      selector: (row) => (
        <ButtonElement onClick={() => deleteHandler(row.id)}>
          Delete
        </ButtonElement>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  if (hasErrors) {
    return <h3>cannot read data</h3>;
  }

  const doubleClickHandler = (row) => {
    setEmail(row.email);
    setName(row.name);
    setStreet(row.address.street);
    setCity(row.address.city);
    setPhone(row.phone);
    setGender(row.gender);
    setChange(true);
    setId(row.id)
  };

  return (
    <div>
      <ModalComponent
        modal={modal}
        setModal={setModal}
        handleModalClose={handleModalClose}
      />
      {
        <DataTable
          onRowDoubleClicked={(row) => doubleClickHandler(row)}
          columns={Columns}
          data={data}
        />
      }
      {change && (
        <>
          <BlackBg onClick={() => setChange(false)}></BlackBg>
          <ChangeModal>
            <ModalBody>
              <FormGroup>
                <Input
                  id="label"
                  value={name}
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  id="label"
                  value={email}
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Select
                  onChange={(e) => setGender(e.target.value)}
                  name="gender"
                  value={gender}
                >
                  <option value="Not selected">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">other</option>
                </Select>
                <Input
                  id="label"
                  value={street}
                  placeholder="Enter Your Street Address"
                  style={{ marginTop: "5px" }}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <Input
                  id="label"
                  value={city}
                  placeholder="Enter Your City Address"
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  id="label"
                  placeholder="Enter Your Phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  onClick={() =>
                    handleEdit({
                      name,
                      email,
                      phone,
                      street,
                      city,
                      gender,
                      id
                    })
                  }
                >
                  Edit
                </Button>
              </FormGroup>
            </ModalBody>
          </ChangeModal>
        </>
      ) }
    </div>
  );
};

export default FetchData;

const ButtonElement = styled.button`
  background: transparent;
  border-radius: 3px;
  color: black;
  margin: 0 1em;
  outline: none;
  border: 1px solid black;
  padding: 0.25em 1em;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    transition: 0.5s;
  }
`;

const ChangeModal = styled.div`
  position: absolute;
  width: 50%;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius:10px;
  z-index: 3;
`;

const BlackBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
`;


const FormGroup = styled.form`
  color: palevioletred;
  display: block;
  width: 300px;
  margin: 50px auto;
`;

const Input = styled.input`
  padding: 0.5em;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const Select = styled.select`
  width: 300px;
  background-color: papayawhip;
  height: 45px;
  outline: none;
`;
