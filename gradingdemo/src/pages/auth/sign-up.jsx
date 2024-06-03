import {
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import React, { useState } from "react";
import './sign.scss'
export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNum, setMobileNum] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          style={{ width: "100%", marginTop: "50px", marginLeft: "100px" }}
          src="/img/signup.gif"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" color="black" className="font-bold mb-0">
            Grade AI Sign Up
          </Typography>
        </div>
        <form
          style={{ paddingTop: "30px", paddingBottom: "30px" }}
          onSubmit={onSubmit}
          className=" mb-2 mx-auto w-60 max-w-screen-lg lg:w-1/2"
        >
          <div style={{width:"100%", paddingRight:"20px", paddingLeft:"20px",}} className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="black"
              className="-mb-3 font-medium"
            >
              User Name
            </Typography>
            <Input
              size="lg"
              placeholder="UserName"
              value={username}
              required
              style={{ color: "black", fontSize: "18px", width:"100%" }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{width:"100%", paddingRight:"20px", paddingLeft:"20px",}} className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="black"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <Input
              size="lg"
              value={email}
              required
              type="email"
              placeholder="name@mail.com"
              style={{ color: "black", fontSize: "18px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{width:"100%", paddingRight:"20px", paddingLeft:"20px",}} className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="black"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              size="lg"
              type="password"
              value={password}
              style={{ color: "black", fontSize: "18px" }}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{width:"100%", paddingRight:"20px", paddingLeft:"20px",}} className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="black"
              className="-mb-3 font-medium"
            >
              Mobile Number
            </Typography>
            <Input
              size="lg"
              type="number"
              value={mobileNum}
              required
              style={{ color: "black", fontSize: "18px" }}
              placeholder="Enter Mobile Number"
              onChange={(e) => setMobileNum(e.target.value)}
            />
          </div>
          <div style={{width:"100%", paddingRight:"20px", paddingLeft:"20px",}} className="mb-1 mt-1  flex flex-col gap-6">
            <Typography
              variant="small"
              color="black"
              className="-mb-3 font-medium"
            >
              Teacher/Student
            </Typography>

            <Select
              style={{
                width:"100%", paddingRight:"20px", paddingLeft:"20px",
                backgroundColor: "white",
                border: "1px solid gray",
              }}
              size="lg"
              placeholder="Select Your Role"
              value={selectedOption}
              required
              onChange={(e) => setSelectedOption(e)}
            >
              <Option value="teacher">Teacher</Option>
              <Option value="student">Student</Option>
            </Select>
          </div>
          <Checkbox
            checked={check}
            label={
              <Typography
                variant="small"
                color="black"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-blue-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            onChange={() => setCheck(!check)}
          />
          <Link to="/auth/sign-in" className="text-blue-900 ml-1">
            <Button className="mt-6" color="blue" fullWidth type="submit">
              Register Now
            </Button>
          </Link>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link to="/auth/sign-in" className="text-blue-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
