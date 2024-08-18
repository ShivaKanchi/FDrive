import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { database } from "../../utils/firebase-config";

export default function AddFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  function handleSubmitClick(e) {
    e.preventDefault();
    // Create a folder in the database
    database
    setName("");
    closeModal();
  }
  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>

      <Modal show={open} onHide={closeModal}>
        <Form>
          <Modal.Body>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit" onClick={handleSubmitClick}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
