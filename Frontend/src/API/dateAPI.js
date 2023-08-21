import axios from 'axios';

import React from 'react'

export const getDate = async() => {
   return await axios.get('/date')
}

