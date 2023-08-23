import React from 'react'
import Profile from "./Profile";
import Report from "./Report";

import { Link } from "react-router-dom";

const StudentContent = () => {
    return (
        <>
            <Profile />
          <div className=" w-11/12 rounded mx-auto mb-28">
            <div className="mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Report />
                <div>
                  <div className="lg:p-5 p-3 rounded-xl shadow-xl  bg-gradient-to-r from-red-500 to-orange-500 pb-5">
                    <h1 className="font-bold  text-2xl text-center lg:text-left">
                      Study Materials
                    </h1>
                    <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 ">
                      <div className="flex flex-col">
                        <Link
                          target="_blank"
                          className=" m-1 bg-white font-bold rounded-lg tracking-wider p-1  shadow-xl"
                          to="https://www.w3schools.com/js/default.asp"
                        >
                          &gt;&gt; Javascript
                        </Link>
                        <Link
                          target="_blank"
                          className=" m-1 bg-white font-bold rounded-lg tracking-wider  p-1 shadow-xl"
                          to="https://www.w3schools.com/python/"
                        >
                          &gt;&gt; Python
                        </Link>
                        <Link
                          target="_blank"
                          className=" m-1 bg-white font-bold rounded-lg tracking-wider p-1  shadow-xl"
                          to="https://www.w3schools.com/sql/"
                        >
                          &gt;&gt; SQL
                        </Link>
                      </div>
                      <div className="flex flex-col">
                        <Link
                          target="_blank"
                          className="mt-1 m-1 bg-white font-bold rounded-lg tracking-wider p-1  shadow-xl"
                          to="https://www.w3schools.com/java/"
                        >
                          &gt;&gt; Java
                        </Link>
                        <Link
                          target="_blank"
                          className="mt-1 m-1 bg-white font-bold rounded-lg tracking-wider p-1  shadow-xl"
                          to="https://www.w3schools.com/git/"
                        >
                          &gt;&gt; Git
                        </Link>
                        <Link
                          target="_blank"
                          className="mt-1 m-1 bg-white font-bold rounded-lg tracking-wider p-1  shadow-xl"
                          to="https://www.w3schools.com/aws/"
                        >
                          &gt;&gt; AWS
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}

export default StudentContent