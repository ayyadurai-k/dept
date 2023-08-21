import { changeSelect } from "../app/slicers/navSlicer";
import { useDispatch } from "react-redux";


//image
import PNF from '../assets/PageNotFound.svg';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet';
import { useEffect } from "react";

const PageNotFound = () => {

  const dispatch = useDispatch();

   useEffect(()=>{
      dispatch(changeSelect(0))
   },[dispatch])

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Page Not Found</title>
        </Helmet>
      <main className='flex justify-center items-center p-10'>
          <img src={PNF} alt='Page Not Found' className='w-[500px]'></img>
    </main>
      </HelmetProvider>
    </>
  )
}

export default PageNotFound