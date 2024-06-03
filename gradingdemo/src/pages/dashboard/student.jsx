import React from "react";
import Check from "./check";
import { Card, CardHeader, Typography } from "@material-tailwind/react";

export function Student() {
  let student = true;
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" className="mb-8 p-6">
          <Typography variant="h4" color="Black">
            Uploaded Documents By Students
          </Typography>
        </CardHeader>
      </Card>
      <Check student={student} />

    </div>
  );
}

export default Student;
