import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './sign.scss'
export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const handelSubmit = (e) => {
    
  };
  return (
    <section className="ml-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-5">
        <div className="text-center">
          <Typography variant="h2" color="black" className="font-bold mb-4">
            {" "}
            Grade AI Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="black"
            className="text-lg font-normal"
          >
            Enter your username and password to Sign In.
          </Typography>
        </div>
        <form
          style={{ height: "500px", paddingTop: "30px", paddingBottom: "30px" }}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div
            style={{ width: "100%", paddingRight: "20px", paddingLeft: "20px" }}
            className="mb-1 flex flex-col gap-6"
          >
            <Typography
              variant="large"
              color="black"
              className="-mb-3 font-medium"
            >
              Username
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="Username"
              style={{ color: "black", fontSize: "18px" }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography
              variant="large"
              color="black"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              style={{ color: "black", fontSize: "18px" }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Checkbox
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
            onClick={(e) => setCheck(e.target.value)}
            containerProps={{ className: "-ml-2.5" }}
          />
          <Link to="/dashboard/home" className="text-blue-900 ml-1">
            <Button
              className="mt-6"
              color="blue"
              fullWidth
              onClick={handelSubmit}
            >
              Sign In
            </Button>
          </Link>

          <div className="flex items-right gap-2 mt-6">
            <Typography variant="small" className="font-medium text-blue-900">
              <a href="#">Forgot Password</a>
            </Typography>
          </div>

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Not registered?
            <Link to="/auth/sign-up" className="text-blue-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div
        style={{ marginTop: "85px", marginLeft: "60px" }}
        className="w-2/5 h-full hidden lg:block"
      >
        <img
          style={{ width: "100%", marginTop: "50px", marginLeft: "-200px" }}
          src="/img/signup.gif"
          className="h-full w-full object-cover rounded-3xl"
        />{" "}
      </div>
    </section>
  );
}

export default SignIn;
