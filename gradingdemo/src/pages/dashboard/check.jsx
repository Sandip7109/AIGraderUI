import { useState } from "react";
import FileUpload from "./FileUpload/fileUpload";
import FileList from "./FileList/fileList";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

function Check(props) {
  const [files, setFiles] = useState([]);

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  return (
    <div className="mt-1 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody>
          <FileUpload
            files={files}
            setFiles={setFiles}
            removeFile={removeFile}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader variant="gradient" className="mb-8 p-6">
          <Typography variant="h4" color="black">
            Uploaded Documents
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <FileList props={props} files={files} removeFile={removeFile} />
        </CardBody>
      </Card>
    </div>
  );
}

export default Check;
