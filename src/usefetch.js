import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

        useEffect(() =>{
         const abortCont = new AbortController();
            setTimeout(()=> {
             fetch(url, {signal: abortCont.signal})
            .then(res => {
                if(!res.ok){
                  throw Error('couldnt fetch the data for that resource')
                }
                return res.json()
             })
             .then(data => {
                console.log(data)
                setData(data);
                setIsLoading(false);
                setError(null);
             })
             .catch(err => {
               if(err.name === 'AbortError'){
                  console.log('Aborted')
               }else{  
                setError(err.message);
                setIsLoading(false);
               }
             });
             return ()=> abortCont.abort();
            }, 1000)
            }, [url]);
            return {data, isLoading, error}
}
 
export default useFetch;