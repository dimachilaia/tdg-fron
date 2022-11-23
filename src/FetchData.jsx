import React, { useEffect, useState } from "react";
import useStore from "./store";
import styled from "styled-components";
import Loading from "./Loading/Loading";
import DataTable from "react-data-table-component";
import ModalComponent from "./Modal/ModalComponent";
import EditPerson from "./Edit/EditPerson";
import PieRechartComponent from "./chart/Chart";

const FetchData = () => {
  const data = useStore((state) => state.data);
  const loading = useStore((state) => state.loading);
  const hasErrors = useStore((state) => state.hasErrors);
  const fetchData = useStore((state) => state.fetch);
  const removeStudent = useStore((state) => state.removePerson);
  const addPerson = useStore((state) => state.addPerson);

  const [change, setChange] = useState(false);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Not selected");
  const [id, setId] = useState();

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
    setId(row.id);
  };

  return (
    <div>
      <ModalComponent
        modal={modal}
        setModal={setModal}
        handleModalClose={handleModalClose}
      />
      <PieRechartComponent/>
      {
        <DataTable
          onRowDoubleClicked={(row) => doubleClickHandler(row)}
          columns={Columns}
          data={data}
        />
      }
      {change && (
        <EditPerson
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          city={city}
          setCity={setCity}
          street={street}
          setStreet={setStreet}
          gender={gender}
          setGender={setGender}
          id={id}
          setId={setId}
          change={change}
          setChange={setChange}
        />
      )}
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
