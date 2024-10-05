import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Formik } from "formik";

export const LandingPage = () => {
  const navigate = useNavigate();

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
        validateOnChange
        initialValues={{ phone: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.phone) {
            errors.phone = "Required";
          } else if (!/^[6-9]\d{9}$/i.test(values.phone)) {
            errors.phone = "Invalid valid phone number";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="formContainer">
            <div className="formHeader">
              Check eligibility for mutual fund portfolio
            </div>
            <div className="formSubHeaderContainer">
              <CheckCircleIcon className="checkIcon" />

              <div className="formSubHeader">No impact on CIBIL score</div>
            </div>
            <div className="fieldsContainer w-full">
              <div class="relative pb-4 w-full">
                <input
                  type="number"
                  name="phone"
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer w-full"
                  placeholder="Enter Phone Number"
                />
                <label
                  for="floating_outlined"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[44%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Enter Phone Number
                </label>
                {errors.phone && touched.phone && errors.phone}
              </div>
              <div className="relative pb-4 w-full">
                <input
                  type="text"
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer w-full"
                  placeholder="Enter PAN"
                />
                <label
                  for="floating_outlined"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[44%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Enter PAN
                </label>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>

      {/* <button onClick={() => navigate("/page2")}>Go to Page 2</button> */}
    </div>
  );
};
