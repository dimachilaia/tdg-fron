import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useState } from "react";

const ModalComponent = ({ modal, setModal, addStudent, handleModalClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Not selected");
  const toggle = () => setModal(!modal);

  const handleSave = () => {
    handleModalClose({
      id: new Date().getUTCMilliseconds(),
      name,
      email,
      phone,
      street,
      city,
      gender,
    });
    setModal(!modal);
  };
  return (
    <MainComponent>
      <ButtonComponent color="success" outline onClick={toggle}>
        Add Your Information
      </ButtonComponent>
      <MainModal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Your Information</ModalHeader>

        <StyledModalBody>
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
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </FormGroup>
        </StyledModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </MainModal>
    </MainComponent>
  );
};

export default ModalComponent;

const MainModal = styled(Modal)``;
const MainComponent = styled.div``;

const ButtonComponent = styled(Button)`
  width: 55%;
`;
const StyledModalBody = styled(ModalBody)``;

const FormGroup = styled.div`
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
