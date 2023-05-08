import React from 'react'
import { FoodTruckPermit } from '../swagger-codegen'
import { Button, Modal, Table } from 'react-bootstrap'

interface Props {
  foodTruckPermit: FoodTruckPermit
  handleClose: () => void
}

export const FoodTruckPermitDetail = (props: Props): JSX.Element => {
   const {
    foodTruckPermit: ftp,
    handleClose,
   } = props

   return (
    <Modal show={ftp ? true : false} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ftp.permit}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped="columns" bordered hover>
          <tbody>
            <tr>
              <td>Address</td>
              <td>{ftp.address}</td>
            </tr>
            <tr>
              <td>Location Description</td>
              <td>{ftp.locationdescription}</td>
            </tr>
            <tr>
              <td>Applicant</td>
              <td>{ftp.applicant}</td>
            </tr>
            <tr>
              <td>Facility Type</td>
              <td>{ftp.facilitytype}</td>
            </tr>
            <tr>
              <td>Food Items</td>
              <td>{ftp.fooditems}</td>
            </tr>            
          </tbody>

        </Table>

        {ftp.latitude !== 0 && <a target="_blank" href={`https://www.google.com/maps/@${ftp.latitude},${ftp.longitude},18z`} rel="noopener noreferrer">
        <Button variant="success">View in Google Maps</Button>
        </a>}
        {ftp.latitude === 0 && 'Map link not available'}

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
   )
}