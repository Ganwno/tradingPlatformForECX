import { Form, Formik } from "formik";
import React from "react";

import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import Background from "../asset/bg.png";
import FormField from "../components/FormField";

function SignUpPage() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    phoneNumber: Yup.string().required().label("Phone Number"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });

  const handleSignup = async (values) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen py-5 items-center justify-center w-full">
      <div className="flex justify-center items-center flex-wrap h-[90%] w-[90%] sm:w-[80%] md:w-[90%] text-gray-800">
        <div className=" w-[100%] xl:w-10/12">
          <div className="block border-[1px] border-slate-200 shadow-xl rounded-lg">
            <div className="lg:flex lg:flex-wrap g-0">
              <div className="w-[100%] lg:w-6/12 px-2 md:px-0">
                <div className="p-15 md:mx-6">
                  <div className="text-center">
                    <h4 className="text-xl font-semibold pb-1">ECX eTrading</h4>
                  </div>
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      phoneNumber: "",
                      email: "",
                      password: "",
                    }}
                    onSubmit={(values) => {
                      handleSignup(values);
                    }}
                    validationSchema={validationSchema}
                  >
                    {({ isSubmitting, setFieldValue }) => (
                      <Form className="flex flex-col flex-wrap w-[100%] items-center rounded-lg">
                        <FormField
                          label="First Name"
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                        />
                        <FormField
                          label="Last Name"
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                        />

                        <FormField
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Email"
                        />
                        <FormField
                          label="Phone Number"
                          name="phoneNumber"
                          type="text"
                          placeholder="Phone Number"
                        />
                        <FormField
                          label="Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        <div className="flex flex-col justify-center my-5 items-center w-full">
                          <button
                            type="submit"
                            className="bg-[#232536] px-10 py-2 xs:w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] rounded-lg text-white"
                            // disabled={isSubmitting}
                          >
                            Sign up
                          </button>

                          <NavLink to="/login" className="text-[#232536] my-5">
                            Already have an Account? Login
                          </NavLink>
                          <NavLink to="/" className="text-[#4a764d] my-5">
                            Back to home
                          </NavLink>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="lg:w-6/12 hidden lg:flex bg-slate-100 justify-center items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                  <img src={Background} style={{ width: "1920px" }}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;