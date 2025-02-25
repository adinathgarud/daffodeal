import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { CgSpinner } from "react-icons/cg";

const ShopCreate = () => {
  const [step, setStep] = useState(1);
  const [gstNumber, setGstNumber] = useState("");
  const [gstData, setGstData] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [loading] = useState(false);

  const verifyGST = async () => {
    setError("");
    setGstData(null);

    if (!gstNumber) {
      setError("Please enter a GST number.");
      return;
    }

    try {
      const response = await axios.get(`${server}/shop/verify-gst/${gstNumber}`);
      setGstData(response.data.data);
    } catch (err) {
      setError("Invalid GST Number or API issue.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      gstNumber: gstNumber, // Include the GST number
      gstDetails: gstData,  // Include the fetched GST data
    };

    try {
      const response = await axios.post(`${server}/shop/create-shop`, dataToSend);
      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        password: "",
      });
      setStep(1);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gstNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GST Number
                  </label>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter GST Number"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={verifyGST}
                      className="mt-2 text-sm text-blue-600"
                    >
                      Verify GST
                    </button>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {gstData && (
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-2">GST Details</h4>
                        <table className="w-full border-collapse border border-gray-300">
                          <tbody>
                            <tr className="bg-gray-200">
                              <td className="border px-4 py-2 font-semibold">GSTIN</td>
                              <td className="border px-4 py-2">{gstData.gstin}</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-semibold">Legal Name</td>
                              <td className="border px-4 py-2">{gstData.legal_name}</td>
                            </tr>
                            <tr className="bg-gray-200">
                              <td className="border px-4 py-2 font-semibold">Business Constitution</td>
                              <td className="border px-4 py-2">{gstData.business_constitution}</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-semibold">Type</td>
                              <td className="border px-4 py-2">{gstData.type}</td>
                            </tr>
                            <tr className="bg-gray-200">
                              <td className="border px-4 py-2 font-semibold">Status</td>
                              <td className="border px-4 py-2">{gstData.status}</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-semibold">Trade Name</td>
                              <td className="border px-4 py-2">{gstData.trade_name}</td>
                            </tr>
                            <tr className="bg-gray-200">
                              <td className="border px-4 py-2 font-semibold">Registration Date</td>
                              <td className="border px-4 py-2">{gstData.registration_date}</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-semibold">State Jurisdiction</td>
                              <td className="border px-4 py-2">{gstData.state_jurisdiction}</td>
                            </tr>
                            <tr className="bg-gray-200">
                              <td className="border px-4 py-2 font-semibold">Centre Jurisdiction</td>
                              <td className="border px-4 py-2">{gstData.centre_jurisdiction}</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-semibold">Business Activity Nature</td>
                              <td className="border px-4 py-2">{gstData.business_activity_nature.join(", ")}</td>
                            </tr>
                            <tr className="bg-gray-200">
                              <td className="border px-4 py-2 font-semibold">Cancellation Date</td>
                              <td className="border px-4 py-2">{gstData.cancellation_date || "Not Available"}</td>
                            </tr>
                          </tbody>
                        </table>

                        <h5 className="text-lg font-semibold mt-6 mb-2">Principal Place of Business</h5>
                        <table className="w-full border-collapse border border-gray-300">
                          <tbody>
                            <tr className="bg-gray-200">
                              <td className="border px-4 py-2 font-semibold">Address</td>
                              <td className="border px-4 py-2">
                                {gstData.place_of_business_principal.address.building_name},{" "}
                                {gstData.place_of_business_principal.address.street},{" "}
                                {gstData.place_of_business_principal.address.location}
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-semibold">City</td>
                              <td className="border px-4 py-2">{gstData.place_of_business_principal.address.district}</td>
                            </tr>
                            <tr className="bg-gray-200">
                              <td className="border px-4 py-2 font-semibold">Pin Code</td>
                              <td className="border px-4 py-2">{gstData.place_of_business_principal.address.pin_code}</td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2 font-semibold">Nature of Business</td>
                              <td className="border px-4 py-2">
                                {gstData.place_of_business_principal.nature.join(", ")}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={visible ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {visible ? (
                      <AiOutlineEye
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
          <div className={`${styles.noramlFlex} w-full mt-4`}>
            <h4>Already have an account?</h4>
            <Link to="/shop-login" className="text-blue-600 pl-2">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
