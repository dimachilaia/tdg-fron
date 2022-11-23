import styled from "styled-components";
import useStore from "../store";
import { Button, ModalBody } from "reactstrap";

const EditPerson = ({
  setChange,
  setName,
  email,
  setEmail,
  setGender,
  gender,
  street,
  setStreet,
  city,
  setCity,
  phone,
  setPhone,
  id,
  name,
}) => {
  const updatePerson = useStore((state) => state.updatePerson);

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

  return (
    <div>
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
              style={{ fontSize: "14px" }}
              onClick={() =>
                handleEdit({
                  name,
                  email,
                  phone,
                  street,
                  city,
                  gender,
                  id,
                })
              }
            >
              Edit
            </Button>
            <Button
              style={{ fontSize: "14px", marginLeft: "180px" }}
              onClick={() => setChange(false)}
            >
              Cancel
            </Button>
          </FormGroup>
        </ModalBody>
      </ChangeModal>
    </div>
  );
};

export default EditPerson;

const ChangeModal = styled.div`
  position: absolute;
  width: 36%;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
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
