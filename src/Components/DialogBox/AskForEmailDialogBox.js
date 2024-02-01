import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import InputField from "../InputField/InputField";

const AskForEmailDialogBox = ({ isModalOpen }) => {
  const [isOpen, setisOpen] = useState(isModalOpen);
  const [email, setEmail] = useState("");
  const showModal = () => {
    setisOpen(true);
  };

  const handleCancel = () => {
    setisOpen(false);
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    alert(email)
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
