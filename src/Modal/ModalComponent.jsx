import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const ModalComponent = ({ modal, setModal }) => {
  const toggle = () => setModal(!modal);

  return (
    <MainComponent>
      <ButtonComponent color="success" outline onClick={toggle}>
        Add Your Information
      </ButtonComponent>
      <MainModal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Your Information</ModalHeader>

        <StyledModalBody>
          <FormGroup>
            <Input id="label" placeholder="Enter Your Name" />
            <Input id="label" placeholder="Enter Your Email" />
            <Select name="gender" defaultValue={"none"}>
              <option defaultValue="none" selected>
                Select Gender
              </option>
              <option defaultValue="male">Male</option>
              <option defaultValue="female">Female</option>
              <option defaultValue="other">other</option>
            </Select>
            <Input
              id="label"
              placeholder="Enter Your Street Address"
              style={{ marginTop: "5px" }}
            />
            <Input id="label" placeholder="Enter Your City Address" />
            <Input id="label" placeholder="Enter Your Phone" />
          </FormGroup>
        </StyledModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggle}>
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
