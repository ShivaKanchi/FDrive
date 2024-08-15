import { Button } from "react-bootstrap";

export default function AddFolderButton() {
  function openModal() {}
  return (
    <Button onClick={openModal} variant="outline-success" size="sm">
      Open
    </Button>
  );
}
