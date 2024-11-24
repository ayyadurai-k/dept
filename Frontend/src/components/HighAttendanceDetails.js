import { Link, useParams } from "react-router-dom";
import { getClass } from "../utils/class";
import { useEffect, useState } from "react";
import { fetchHighAttendance, getAttendanceData } from "../API/attendanceAPI";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const HighAttendanceDetails = () => {
  const { dept, year, month } = useParams();

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    async function api() {
      try {
        setLoading(true);
        console.log("dept, year, month : ", dept, year, month);

        const { data } = await fetchHighAttendance(dept, year, month);
        setDetails(data.data);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    api();
  }, [dept, year, month]);
  return (
    <>
      {loading && <Loader />}
      {!loading && !error && (
        <main className="bg-gray-300  w-full p-2 h-full">
          <section className="bg-white w-11/12  border border-black mx-auto rounded-xl p-5 mt-5 mb-16">
            <div className="flex justify-between">
              <h1 className="font-bold text-black text-2xl center">
                {getClass(dept, year)}
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
                        <td className="p-2 ">{detail.regno}</td>
                        <td className="p-2 ">{detail.present}</td>
                        <td className="p-2 ">{detail.absent}</td>
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
            <div>
              <div className="flex justify-end mt-3 mr-3">
                <Link
                  to={`/staff/${dept}/${year}/${month}/75/attendance/`}
                  className="rounded-lg bg-black font-bold text-md px-3.5 py-1.5 mx-2"
                >
                  <label className="cursor-pointer text-white ">
                    <span>{"Above 75 % >"}</span>
                  </label>
                </Link>

                <Link
                  to={`/staff/${dept}/${year}/${month}/full/attendance/`}
                  className="rounded-lg bg-black font-bold text-md px-3.5 py-1.5 mx-2"
                >
                  <label className="cursor-pointer text-white ">
                    {"100 % >"}
                  </label>
                </Link>
              </div>
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

export default HighAttendanceDetails;
