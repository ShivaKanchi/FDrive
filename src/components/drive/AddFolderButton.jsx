import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addFolder } from "../../utils/firebase-config";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  async function handleSubmitClick(e) {
    e.preventDefault();
    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    setLoading(true); // Start loading
    try {
      await addFolder(name, currentFolder.id, currentUser.uid, path);
      setName("");
      closeModal();
    } catch (error) {
      console.error("Failed to add folder: ", error);
      // Optionally, display an error message to the user here
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>

      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmitClick}>
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
            <Button variant="secondary" onClick={closeModal} disabled={loading}>
              Close
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
