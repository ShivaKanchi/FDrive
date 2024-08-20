import { Container } from "react-bootstrap";
import HeaderComponent from "../HeaderComponent";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";
import { useParams } from "react-router-dom";
import FolderBreadcrumb from "./FolderBreadcrumb";

export default function Dashboard() {
  const { folderId } = useParams();
  const { folder, childFolders } = useFolder(folderId);
  console.log(childFolders);
  return (
    <>
      <HeaderComponent />
      <Container fluid>
        <FolderBreadcrumb currentFolder={folder} />
        <AddFolderButton currentFolder={folder} />

        {childFolders.length > 0 && (
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
