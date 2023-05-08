import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { FoodTruckPermitGallery } from './FoodTruckPermitGallery';

export enum Action {
  DASHBOARD, PENDING, SEARCH
}

export const App = (): JSX.Element => {

  const [action, setAction] = useState<Action>(Action.DASHBOARD)
  const [searchInput, setSearchInput] = useState<string>()

  return (
    <div className="App">
      <Header setAction={setAction} setSearchInput={setSearchInput}/>
      <Container fluid>
        <Row>
          <Sidebar setAction={setAction}/>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
             
            </div>

            {action === Action.DASHBOARD && <h3>All Historical Permits</h3>}
            {action === Action.PENDING && <h3>Requested Permits Pending Approval</h3>}
            <FoodTruckPermitGallery action={action} input={searchInput} />
          </main>
        </Row>
      </Container>
    </div>
  );
}