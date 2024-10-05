import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import classnames from "classnames";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState("");
  const [errorsLocal, setErrorsLocal] = useState({});
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [message, setMessage] = useState("");

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha resolved");
        },
      },
      auth
    );
  };

  const sendOTP = async (phone) => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent to " + phone);
    } catch (error) {}
  };

  const verifyOTP = async () => {
    if (!verificationId) {
      return;
    }

    const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
    try {
      const user = await auth.signInWithCredential(credential);
      console.log("User signed in:", user);
      setMessage("User verified successfully!");
    } catch (error) {}
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
          console.log("INTEL ==> ON SUBMIT", values, x);
          // sendOTP(values.phone);
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
                          setFieldError("phone", "Enter valid phone number");
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
                  <div className="errorStyle">{errors.pan && errors.pan}</div>
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
                </button>
                <div className="tncStyle">
                  By proceeding, I accept{" "}
                  <span className="text-blue-600">T&Cs, Privacy Policy</span>{" "}
                  and Authorize to obtain my KYC & bureau information.{" "}
                </div>
                <div className="item-center  mt-4">
                  <VerifiedUserOutlinedIcon className="verifiedIcon" />
                  <div className="ml-0.5 pbStyle">Powered by MFCentral</div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div id="recaptcha-container"></div>
      {/* <button onClick={() => navigate("/page2")}>Go to Page 2</button> */}
    </div>
  );
};
