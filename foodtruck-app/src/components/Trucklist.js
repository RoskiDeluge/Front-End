import React, { useEffect } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import Loader from "react-loader-spinner";

import { getData } from '../actions';

const Main = styled.div`
  background: white;
  padding: 25px;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.4rem 1.5rem DimGrey;
  position: relative;
  margin: 10% auto;
  max-width: 350px;
`;

const Header = styled.div`
  position: absolute;
  background: #CF3E4D;
  font-size: 22px;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0.4rem 0.4rem 0 0;
`;

const SubText = styled.div`
  font-size: 18px;
  padding: 20px;
  color: gray;
`;

const Trucklist = ({getData, trucks, error}) => {

  // const [ isLoading, setIsLoading ] = useState(false);

  // const loading = () => {
  //   setIsLoading(true);
  // }

   useEffect(() => {
     getData();
    // loading();
  }, [getData]);


  return (
      <div>
        {/* {isLoading && (
        <div>
          <Loader type="Puff" color="#204963" height={60} width={60} />
          <p>Loading Trucks...</p>
        </div>
        )} */}
        {error ? (
          <div>{error}</div>
        ) : (trucks.map((truck) => {
          return <Main key={truck.id}>
              <Header>{truck.truckName}</Header>
              <SubText>{truck.foodType}</SubText>
              <SubText>{truck.location}</SubText>
              </Main>
        }))
        }
      </div>
  )
}

const mapStateToProps = state => {
  return {
    trucks: state.trucks,
    error: state.error
  }
}

export default connect(
  mapStateToProps,
  { getData }
)(Trucklist);