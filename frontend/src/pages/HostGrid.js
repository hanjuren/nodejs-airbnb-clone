import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import Map from '../components/map/Map'
import Host from '../components/hosts/Host';
import Category from '../components/hosts/Category';

const HostsPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-top: 0.2rem solid #E6E6E6;
`;

const HostsContent = styled.div`
  width: 50%;
`;

const MapComponent = styled.div`
  position: fixed;
  right: 0px;
  width: 50%;
  background-color: lightgray;
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
    
     <HostsPage>
      <HostsContent>
        <Category />
        {/* 숙소 컴포넌트 */}
        {hosts.map((host, index) => (
            <Host 
            key={index} 
            host={host}
            image={host.Images}
            />
        ))}
      </HostsContent>

      <MapComponent>
          <Map addr={address} city={city}/>
      </MapComponent>
     </HostsPage>
    
  );
};

export default HostGrid;