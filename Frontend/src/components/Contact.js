import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeSelect } from "../app/slicers/navSlicer";

const Contact = () => {

   const dispatch = useDispatch();

   useEffect(()=>{
      dispatch(changeSelect(4))
   },[dispatch])
    

  return (
    <>
          <HelmetProvider>
              <Helmet>
                  <title>Contact Us</title>
              </Helmet>
        <main className="p-3">
          <section className="bg-gray-600 text-white p-3 lg:p-10 mt-10 w-full lg:w-3/4 mx-auto rounded-2xl">
            <h1 className="text-3xl font-bold text-center">Contact Us</h1>
            <div className="bg-white rounded-xl text-black mt-3 p-5">
              <h1 className="font-bold text-xl text-center">
                The Madura College
              </h1>
              <div className="flex mt-5  justify-center ">
                <div>
                  <label className="flex mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-blue-500 text-white font-bold p-1 rounded-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <span className="ml-2 font-bold">
                      <p>(0452) 2673354</p>
                    </span>
                  </label>
                  <label className="flex mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-blue-500 text-white font-bold p-1 rounded-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>

                    <span className="ml-2 font-bold">
                      <Link to="mailto:hodofcsit@maduracollege.com">
                        hodofcsit@maduracollege.com
                      </Link>
                    </span>
                  </label>
                  <label className="flex mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-blue-500 text-white font-bold p-1 rounded-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <span className="flex flex-col">
                      <span className="ml-2 font-bold block">
                        The Madura College
                      </span>

                      <span className="ml-2 text-gray-600 font-bold">
                        Vidaya Nagar,
                      </span>
                      <span className="ml-2 text-gray-600 font-bold">
                        TPK Main Road,
                      </span>
                      <span className="ml-2 text-gray-600 font-bold">
                        Madurai-11,
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        </main>
      </HelmetProvider>
    </>
  );
};

export default Contact;
