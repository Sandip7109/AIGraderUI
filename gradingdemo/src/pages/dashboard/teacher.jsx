import React from "react";
import Check from "./check";
import { Card, CardHeader, Typography } from "@material-tailwind/react";

export function Teacher() {
  let teacher = true;
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" className="mb-8 p-6">
          <Typography variant="h4" color="black">
            Uploaded Documents By Teachers
          </Typography>
        </CardHeader>
      </Card>
      <Check teacher={teacher} />
    </div>
  );
}

export default Teacher;
