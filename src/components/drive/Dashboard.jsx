import { Container } from "react-bootstrap";
import HeaderComponent from "../HeaderComponent";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";

export default function Dashboard() {
  const { folder, childFolders } = useFolder("kw7BS1wkFhRtJDEmi5eC");
  console.log(childFolders);

  return (
    <>
      <HeaderComponent />
      <Container fluid>
        <AddFolderButton currentFolder={folder} />

        {childFolders.lenght > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
