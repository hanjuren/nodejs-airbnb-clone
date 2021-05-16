import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';

const HostGrid = () => {
  const [hosts, setHosts] = useState([]);

  const location = useLocation();
  const city = queryString.parse(location.search);

  useEffect(() => {
    fetch(`http://localhost:8640/host/city?city=${city.city}`)
      .then(response => response.json())
      .then((response) => {
        return setHosts(response.hosts);
      })
  },[location]);
  
  return (
    <>
    {hosts && hosts.map((hosts) => (
      <h1>{hosts.title}</h1>
    ))}
      <h1>fjsdlkaf</h1>
    </>
  );
};

export default HostGrid;