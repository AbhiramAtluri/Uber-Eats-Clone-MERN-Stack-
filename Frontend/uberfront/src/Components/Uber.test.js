import React from 'react'
// import {rest} from 'msw'
// import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { Restaurantinit } from './RestaurantComponents/Restaurantinit'
import { Button } from 'bootstrap'
import { ExpansionPanelActions } from '@material-ui/core'
import Home from '../Home'



it("renders page correctly",()=>
{
    // const { Rest_init } = render(<div label = "Rest_init"  />)
    // expect(getByTestId("Rest_init"))
  render(<Home/>)
 const testelement = screen.getByText(/Restaurant Login/i);
 expect(testelement).toBeInTheDocument();


})

