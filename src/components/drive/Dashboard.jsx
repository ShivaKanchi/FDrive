import { Container } from "react-bootstrap";
import HeaderComponent from "../HeaderComponent";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../../hooks/useFolder";

export default function Dashboard() {
  const { folder } = useFolder();

  return (
    <>
      <HeaderComponent />
      <Container fluid>
        <AddFolderButton currentFolder={folder} />
      </Container>
    </>
  );
}
