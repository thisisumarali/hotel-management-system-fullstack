import { useState } from "react";
import { Button } from "./button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "./Modal";

const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpenModal((show) => !show)}
        className=" my-2"
      >
        Add New Cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddCabin;
