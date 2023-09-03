import React, { useEffect } from "react";
import { HelmetProvider,Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { changeSelect } from "../app/slicers/navSlicer";
const About = () => {

    const dispatch = useDispatch();

   useEffect(()=>{
      dispatch(changeSelect(5))
   },[dispatch])
    
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>About</title>
                </Helmet>
                <main className="p-3">
                    <section className="bg-gray-600 text-white p-3 lg:p-10 mt-10 w-full lg:w-3/4 mx-auto rounded-2xl">
                        <h1 className="text-3xl font-bold text-center">About</h1>
                        <div className="bg-white rounded-xl text-black mt-3 p-5">
                            <h1 className="font-bold text-xl text-center">
                                The Madura College
                            </h1>
                            <p className="w-[60%] mt-5 mx-auto text-center font-bold text-gray-700">
                            The Madura College established in 1889, is one of the oldest academic institutions in Madurai, India. It is an autonomous arts and science college affiliated to the Madurai Kamaraj University.  
                            </p>
                        </div>
                    </section>
                </main>
            </HelmetProvider>
        </>
    );
};

export default About;
