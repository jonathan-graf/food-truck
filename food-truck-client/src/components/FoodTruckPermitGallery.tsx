import React, { useEffect, useState } from 'react'
import { getAllFoodTruckPermits, getFoodTruckPermitsByStatus, searchFoodTruckPermits } from '../services/api'
import { FoodTruckPermit, PageImplFoodTruckPermit } from '../swagger-codegen'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { FoodTruckPermitDetail } from './FoodTruckPermitDetail'
import { Action } from './App'

interface Props {
  action: Action
  input?: string
}

export const FoodTruckPermitGallery = (props: Props): JSX.Element => {
  const {
    action,
    input,
  } = props
  
  const [foodTruckPermits, setFoodTruckPermits] = useState<PageImplFoodTruckPermit>()
  const [foodTruckPermitDetail, setFoodTruckPermitDetail] = useState<FoodTruckPermit>()
  const [page, setPage] = useState<number>(0)

  const size = 8

  useEffect(() => {
    switch (action) {
      case Action.DASHBOARD:
        getAllFoodTruckPermits(size, page).then(results => {
          results && setFoodTruckPermits(results)
        })
        break
      case Action.PENDING:
        getFoodTruckPermitsByStatus(['REQUESTED'], size, page).then(results => {
          results && setFoodTruckPermits(results)
        })
        break
      case Action.SEARCH:
        input && searchFoodTruckPermits(input).then(results => {
          results && setFoodTruckPermits(results)
        })
    }    
  }, [page, action, input])

  const getStatusColor = (statusCode: string): string => {
    switch (statusCode) {
      case "APPROVED": return "success"
      case "REQUESTED": return "warning"
      case "EXPIRED": return "secondary"
      case "SUSPEND": return "danger"
      default: return "secondary"
    }
  }

  return (
    <div>

      <Row xs={1} md={4} className="g-4">
        {foodTruckPermits?.content && Array.from(foodTruckPermits?.content).map(ftp => (
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>ID: {ftp.objectid}</Card.Title>
                <Card.Text>
                  <div className='fw-bold'>{ftp.applicant}</div>
                  <Badge bg={getStatusColor(ftp.status)}>{ftp.status}</Badge>
                  <div>{ftp.fooditems}</div>
                </Card.Text>
                <Button variant="primary" onClick={() => setFoodTruckPermitDetail(ftp)}>View Detail</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className='py-5 d-flex justify-content-center'>
        <ReactPaginate
          breakLabel="..."
          onPageChange={(page) => setPage(page.selected)}
          pageCount={foodTruckPermits  && foodTruckPermits.totalPages ? foodTruckPermits.totalPages : 0}
          renderOnZeroPageCount={null}
          activeClassName='page-item active'
          className='pagination'
          activeLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          pageClassName='page-item'
          pageLinkClassName='page-link'
        />
      </Row>

      {foodTruckPermitDetail && <FoodTruckPermitDetail 
        foodTruckPermit={foodTruckPermitDetail} 
        handleClose={() => {setFoodTruckPermitDetail(undefined)}}
        />}
    </div>
  )
}