import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import InputField from "../InputField/InputField";
import { useDispatch } from "react-redux";
import { openEmailBox } from "../../redux/actions/userActions";
import { downloadPdf } from "../../redux/actions/authActions";

const AskForEmailDialogBox = ({ isModalOpen }) => {
  const dispatch = useDispatch()
  const [isOpen, setisOpen] = useState(isModalOpen);
  const [email, setEmail] = useState("");

  const handleCancel = () => {
    dispatch(openEmailBox(false))
    setisOpen(false);
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
        dispatch(downloadPdf(email))
        setEmail("")
        // dispatch(openEmailBox(false))
        // setisOpen(false);
  }
  return (
    <>
      <Modal
        maskClosable={false}
        title="Basic Modal"
        open={isOpen}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            label={"Please enter your email"}
            placeholder={"Enter your email"}
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
          />

          <button className="btn my-2" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AskForEmailDialogBox;
