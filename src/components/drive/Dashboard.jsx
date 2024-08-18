import { Container } from "react-bootstrap";
import HeaderComponent from "../HeaderComponent";
import AddFolderButton from "./AddFolderButton";

export default function Dashboard() {
  return (
    <>
      <HeaderComponent />
      <Container fluid>
        <AddFolderButton />
      </Container>
    </>
  );
}
