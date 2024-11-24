import { Link, useParams } from "react-router-dom";
import { getClass } from "../utils/class";
import { useEffect, useState } from "react";
import {
  downloadAttendanceCertificate,
  fetchFullAttendance,
  getAttendanceData,
} from "../API/attendanceAPI";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const FullAttendanceDetails = () => {
  const { dept, year, month } = useParams();

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    async function api() {
      try {
        setLoading(true);
        const { data } = await fetchFullAttendance(dept, year, month);
        setDetails(data.data);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    api();
  }, [dept, year, month]);

  const handleCertificateDownload = async (regno) => {
    try {
      await downloadAttendanceCertificate(regno, month);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && !error && (
        <main className="bg-gray-300  w-full p-2 h-full">
          <section className="bg-white w-11/12  border border-black mx-auto rounded-xl p-5 mt-5 mb-16">
            <div className="flex justify-between">
              <h1 className="font-bold text-black text-2xl center">
                {getClass(dept, year)} - 100 % Attendance Students
              </h1>
              <Link
                to={"/staff"}
                className="rounded-lg bg-black font-bold text-sm px-3 py-1"
              >
                <label className="cursor-pointer text-white ">Back</label>
              </Link>
            </div>
            <div className="hidden md:block ">
              <table className="w-full mt-5  ">
                <thead className="bg-blue-500 border-b-2 rounded border-gray-600 text-xl">
                  <tr className="">
                    <th className="p-3">RegNo</th>
                    <th className="p-3">Present</th>
                    <th className="p-3">Absent</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center font-bold divide-y divide-gray-800">
                  {details.map((detail, index) => {
                    const sNo = index + 1;
                    return (
                      <tr
                        className={`${sNo % 2 === 0 && "bg-blue-300"} `}
                        key={detail.regno}
                      >
                        <td className="p-2 ">{detail?.regno}</td>
                        <td className="p-2 ">{detail?.present}</td>
                        <td className="p-2 ">{detail?.absent}</td>
                        <td className="p-2  flex justify-center">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleCertificateDownload(detail?.regno);
                            }}
                            className="flex items-center justify-center space-x-2 cursor-pointer "
                          >
                            <span>Download Certificate</span>
                            <span className="font-bold">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-1"
                                width="30" // Set desired width here
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="md:hidden">
              {details.map((detail) => {
                return (
                  <div
                    className="bg-blue-400  rounded-2xl shadow- mt-2"
                    key={detail.regno}
                  >
                    <div className="flex flex-col md:flex">
                      <div className="w-full md:w-1/4 py-3 flex bg-blue-500 rounded-t-2xl">
                        <h1 className="m-auto  text-center font-bold text-lg">
                          {detail.regno}
                        </h1>
                      </div>
                      <div className="w-full md:w-3/4 flex p-5">
                        <div className="my-auto ">
                          <h1 className="font-bold text-gray-700">
                            <span>Present : </span>
                            {detail.present}
                          </h1>
                          <h1 className="font-bold text-gray-700">
                            <span>Absent : </span>
                            {detail.absent}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}
      {!loading && error && (
        <main className="flex justify-center items-center w-full ">
          <section className="my-auto w-full">
            <div className="w-full lg:w-1/3 p-5 rounded-lg mx-auto mt-24">
              <h1 className="font-bold text-2xl text-center">Issue</h1>
              <p className="bg-red-500 rounded-lg p-5 font-bold text-lg text-center my-3">
                <span>{error}</span>
                <span className="block">Please Make Correct Selection</span>
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    navigate("/staff");
                  }}
                  className="font-bold text-md text-center text-gray-800"
                >
                  Please Go Back{" "}
                </button>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default FullAttendanceDetails;
