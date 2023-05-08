import React from 'react'
import { Action } from './App'

interface Props {
  setAction: (action: Action) => void
  setSearchInput: (searchInput: string | undefined) => void
}

export const Header = (props: Props): JSX.Element => {

  const {
    setAction,
    setSearchInput,
  } = props

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Jon Graf's Food Truck Permit Showcase</a>
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <input 
        className="form-control form-control-dark w-100 rounded-0 border-0" 
        type="text" 
        placeholder="Search any objectid, food or applicant name" 
        aria-label="Search"
        onChange={(event) => {
          event.stopPropagation()
          if (event.currentTarget.value) {
            setAction(Action.SEARCH)
            setSearchInput(event.currentTarget.value)
          } else {
            setSearchInput(undefined)
            setAction(Action.DASHBOARD)
          }
        }}
        />
      
    </header>
  )
}