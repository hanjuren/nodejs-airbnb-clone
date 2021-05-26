import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import Map from '../components/map/Map'

const HostsPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const HostsContent = styled.div`
  width: 50%;
  border-right: 1px solid black;
`;

const MapComponent = styled.div`
  width: 50%;
  height: 100vh;
  background-color: blue;
`;

const HostGrid = () => {
  const [hosts, setHosts] = useState([]);
  const [address, setAddress] = useState([]);
  
  const location = useLocation();
  const city = queryString.parse(location.search);
  
  useEffect(() => {
    fetch(`http://localhost:8640/host/city?city=${city.city}`)
      .then(response => response.json())
      .then((response) => {
        return setHosts(response.hosts);  
      })
  },[location]);

  useEffect(() => {
    let addr = [];
    hosts.map((host) => {
      addr.push(host.hostaddress);
    });
    setAddress(addr);
  }, [hosts]);
    
  return (
    <>
     <HostsPage>
      <HostsContent>
        {hosts.map((host, index) => (
          <>
          <h3 key={index}>{host.title}</h3>
          <h5>{host.hostaddress}</h5>
          </>
        ))}
      </HostsContent>

      <MapComponent>
          <Map addr={address}/>
      </MapComponent>
     </HostsPage>
    </>
  );
};

export default HostGrid;