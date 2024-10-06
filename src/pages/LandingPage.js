import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import classnames from "classnames";
import { Button, CircularProgress } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Formik, Form, Field } from "formik";
import { useRef, useState } from "react";
import axios from "axios";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState("");
  const [errorsLocal, setErrorsLocal] = useState({});
  const [otpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (value.length === 1 && index === inputRefs.current.length - 1) {
      navigate("/page2");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const baseURL = "https://468693ab-f4ad-473d-a8c1-a8463dc74ecb.mock.pstmn.io";

  const sendOtp = async (phoneNumber) => {
    try {
      const response = await axios.post(`${baseURL}/send-otp`, { phoneNumber });
      setIsOtpSent(true);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOtp = async (otpId, otpCode) => {
    try {
      const response = await axios.post(`${baseURL}/verify-otp`, {
        otpId,
        otpCode,
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="landingPageContainer">
      <h1 className="header">
        <span className="green-color">
          {" "}
          Get loan against mutual funds.&nbsp;
        </span>
        <span>FREE eligibility check in 15 seconds</span>
      </h1>
      <Formik
        initialValues={{ phone: "", pan: "" }}
        validate={(values) => {
          const errors = errorsLocal;
          if (focusedField === "phone") {
            if (
              values.phone &&
              values.phone.length === 10 &&
              !/^[6-9]\d{9}$/i.test(values.phone)
            ) {
              errors.phone = "Enter valid phone number";
            } else if (values.phone) {
              delete errors.phone;
            }
          }
          if (focusedField === "pan") {
            if (
              values.pan &&
              values.pan.length === 10 &&
              !/[A-Za-z]{3}[Pp]{1}[A-Za-z]{1}\d{4}[A-Za-z]{1}/i.test(values.pan)
            ) {
              errors.pan = "Enter valid PAN number";
            } else if (values.pan) {
              delete errors.pan;
            }
          }
          setErrorsLocal(errors);
          return errors;
        }}
        onSubmit={(values, x) => {
          setIsLoading(true);
          sendOtp(values.phone);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldError,
        }) => {
          return (
            <Form className="formContainer">
              {!otpSent ? (
                <>
                  <div className="formHeader">
                    Check eligibility for mutual fund portfolio
                  </div>
                  <div className="formSubHeaderContainer">
                    <CheckCircleIcon className="checkIcon" />

                    <div className="formSubHeader ml-0.5">
                      No impact on CIBIL score
                    </div>
                  </div>
                  <div className="fieldsContainer w-full">
                    <div className="relative">
                      <div class="relative w-full mb-9">
                        <Field
                          name="phone"
                          type="number"
                          id="floating_outlined"
                          value={values.phone}
                          onFocus={() => setFocusedField("phone")}
                          onChange={(e) => {
                            const { value } = e.target;
                            if (value.length <= 10) {
                              setFieldValue("phone", value);
                            }
                          }}
                          onBlur={() => {
                            if (
                              values.phone &&
                              !/^[6-9]\d{9}$/i.test(values.phone)
                            ) {
                              setFieldError(
                                "phone",
                                "Enter valid phone number"
                              );
                            }
                          }}
                          className={classnames(
                            "block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer w-full",
                            errors.phone
                              ? "focus:border-red-600"
                              : "focus:border-blue-600"
                          )}
                          placeholder="Enter Phone Number"
                        />
                        <label
                          for="floating_outlined"
                          className={classnames(
                            "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                            errors.phone
                              ? "text-red-600 top-2 -translate-y-4 scale-75"
                              : "peer-focus:text-blue-600"
                          )}
                        >
                          Enter Phone Number
                        </label>
                      </div>
                      <div className="errorStyle">
                        {errors.phone && errors.phone}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="relative w-full mb-9">
                        <Field
                          type="text"
                          name="pan"
                          id="floating_outlined"
                          value={values.pan}
                          onFocus={() => setFocusedField("pan")}
                          onChange={(e) => {
                            const { value } = e.target;
                            if (value.length <= 10) {
                              setFieldValue("pan", value?.toUpperCase());
                            }
                          }}
                          onBlur={() => {
                            if (
                              values.pan &&
                              !/[A-Za-z]{3}[Pp]{1}[A-Za-z]{1}\d{4}[A-Za-z]{1}/i.test(
                                values.pan
                              )
                            ) {
                              setFieldError("pan", "Enter valid PAN number");
                            }
                          }}
                          className={classnames(
                            "block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer w-full",
                            errors.pan
                              ? "focus:border-red-600"
                              : "focus:border-blue-600"
                          )}
                          placeholder="Enter PAN"
                        />
                        <label
                          for="floating_outlined"
                          className={classnames(
                            "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                            errors.pan
                              ? "text-red-600 top-2 -translate-y-4 scale-75"
                              : "peer-focus:text-blue-600 text-gray-500"
                          )}
                        >
                          Enter PAN
                        </label>
                      </div>
                      <div className="errorStyle">
                        {errors.pan && errors.pan}
                      </div>
                    </div>
                  </div>
                  <div className="fieldsContainer w-full">
                    <button
                      className={classnames(
                        "btnStyle mt-8 mb-4 w-full",
                        values.phone?.length !== 10 ||
                          values.pan?.length !== 10 ||
                          errors.pan ||
                          errors.phone
                          ? "!bg-gray-500"
                          : ""
                      )}
                      type="button"
                      onClick={(e) => {
                        if (
                          !(
                            values.phone?.length !== 10 ||
                            values.pan?.length !== 10 ||
                            errors.pan ||
                            errors.phone
                          )
                        ) {
                          handleSubmit(e);
                        }
                      }}
                      disabled={
                        values.phone?.length !== 10 ||
                        values.pan?.length !== 10 ||
                        errors.pan ||
                        errors.phone
                      }
                    >
                      Check eligibility for FREE
                      {isLoading && (
                        <CircularProgress
                          className="btnLoader ml-1"
                          size={15}
                        />
                      )}
                    </button>
                    <div className="tncStyle">
                      By proceeding, I accept{" "}
                      <span className="text-blue-600">
                        T&Cs, Privacy Policy
                      </span>{" "}
                      and Authorize to obtain my KYC & bureau information.{" "}
                    </div>
                    <div className="item-center  mt-4">
                      <VerifiedUserOutlinedIcon className="verifiedIcon" />
                      <div className="ml-0.5 pbStyle">Powered by MFCentral</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="formHeader">MFCentral has sent an OTP</div>
                  <div className="otpsubHeader mb-8">
                    OTP sent to <span className="ml-0.5">{values.phone}</span>
                  </div>
                  <div class="flex space-x-2 justify-center mb-8">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-10 h-14 text-center border-1 border-gray-300 focus:border-blue-500 focus:outline-none rounded-md"
                        onChange={(e) => handleOtpChange(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
      <div id="recaptcha-container"></div>
      {/* <button onClick={() => navigate("/page2")}>Go to Page 2</button> */}
    </div>
  );
};
