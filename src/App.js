import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
 
const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);
 
  return [{ data, isLoading, isError }, setUrl];
};
 
function App() {
  const [query, setQuery] = useState('');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://api.hatchways.io/assessment/work_orders',
    { orders: []},
  );
  


  return (
    
    <Fragment>
      <body>
      <form
        onSubmit={event => {
          doFetch(
            `https://api.hatchways.io/assessment/workers/1`,
        {orders: [data.worker]}
          );
           
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
 
      {isError && <div>Something went wrongg ...</div>}
 
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
       <>
        doFetch(`https://api.hatchways.io/assessment/workers/1`,
        employee: [(data.worker)],
          );

        {console.log(data.orders)}
        <ul>
          
        
          {data.orders.map(item => (
            <li key={item.objectID}>
              <a href={item.name}>{item.name}</a>
            </li>
          ))}
        </ul>
       
      </>
      )}
      </body>
    </Fragment>
  );
}
 
export default App