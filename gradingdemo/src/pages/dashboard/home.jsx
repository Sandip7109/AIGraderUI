import React from "react";
import { Card, Typography } from "@material-tailwind/react";
export function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px",
      }}
    >
      <h3 class="block font-sans text-9xl antialiased font-semibold leading-tight tracking-normal text-inherit">
        Get Ready for the test
      </h3>
      <Card
        style={{
          width: "30%",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px",
        }}
      >
        <Typography style={{ fontSize: "30px", color: "blue" }}>
          User Name:Gowthami
        </Typography>
        <Typography style={{ fontSize: "30px", color: "blue" }}>
          Role Number:12345
        </Typography>
      </Card>
    </div>
  );
}

export default Home;
