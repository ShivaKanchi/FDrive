import { Breadcrumb } from "react-bootstrap";

export default function FolderBreadcrumb({ currentFolder }) {
  return (
    <div className="d-flex align-items-center">
      <Breadcrumb
        className="flex-grow-1 "
        listProps={{ className: "bg-white p-0 m-0" }}
      >
        {currentFolder && (
          <Breadcrumb.Item>{currentFolder.name}</Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  );
}
