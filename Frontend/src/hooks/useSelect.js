import  { useState } from 'react'

const useSelect = () => {
    const [select, setSelect] = useState(1);

    return { select, setSelect };
}

export default useSelect