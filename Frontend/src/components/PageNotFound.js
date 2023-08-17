import React from 'react'

//image
import PNF from '../assets/PageNotFound.svg';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet';

const PageNotFound = () => {
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