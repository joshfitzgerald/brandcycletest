import React from 'react';
import './App.css';
import { useEffect, useState } from "react"
import { DrinkOptionProps, SizeOptionProps, MilkOptionProps, drinkOrderProps } from './types/drinkMenuTypes'

const fetchPageOptions = async () => {
  const fakeResponse = {
    drinkOptions: [
      {
        id: 'coffee',
        name: 'Coffee',
        prices: {
          small: '$1',
          medium: '$2',
          large: '$3',
        },
      },
      {
        id: 'espresso',
        name: 'Espresso',
        prices: {
          small: '$2',
          medium: '$4',
          large: '$6',
        },
      },
      {
        id: 'green_tea',
        name: 'Green Tea',
        prices: {
          small: '$3',
          medium: '$6',
          large: '$9',
        },
      },
    ],
    milkOptions: [
      {
        id: 'cream',
        name: 'Cream',
        price: '+$0.20'
      },
      {
        id: 'milk',
        name: 'Milk',
        price: '+$0.20'
      },
      {
        id: 'almond',
        name: 'Almond',
        price: '+$0.30'
      },
    ],
    sizeOptions: [
      {
        id: 'small',
        name: 'Small'
      },
      {
        id: 'medium',
        name: 'Medium'
      },
      {
        id: 'large',
        name: 'Large'
      },
    ]
  }

  return Promise.resolve(fakeResponse)
}

const submitDrinkRequest = (drinkOrder: drinkOrderProps) => {
  alert(JSON.stringify(drinkOrder, null, 2))
}


export function SelectDrinkPage() {
  const [drinkOptions , setDrinkOptions] = useState<DrinkOptionProps[]>([])
  const [milkOptions, setMilkOptions] = useState<MilkOptionProps[]>([])
  const [sizeOptions, setSizeOptions] = useState<SizeOptionProps[]>([])

  const [selectedDrink, setSelectedDrink] = useState('')
  const [selectedMilk, setSelectedMilk] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    (async () => {
      const response = await fetchPageOptions()
      setDrinkOptions(response.drinkOptions)
      setMilkOptions(response.milkOptions)
      setSizeOptions(response.sizeOptions)
    })()
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const drinkOrder = {
      type: selectedDrink,
      size: selectedSize,
      milk: selectedMilk
    }

    submitDrinkRequest(drinkOrder)
  }

  return (
    <div>
      <h3>Drinks</h3>
      <table>
        <thead>
          <tr>
          <th>Sm</th>
          <th>Med</th>
          <th>Lg</th>
          </tr>
        </thead>
        <tbody>
          {drinkOptions.map((drinkOption) => (
            <tr>
              <td>{drinkOption.name}</td>
              <td>{drinkOption.prices.small}</td>
              <td>{drinkOption.prices.medium}</td>
              <td>{drinkOption.prices.large}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Milk Options</h3>
      <table>
        <tbody>
          {milkOptions.map((milkOption) => (
            <tr>
              <td>{milkOption.name}</td>
              <td>{milkOption.price}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h2>Select your drink</h2>

      <form onSubmit={onSubmit}>
        <h4>Size</h4>
        <select 
          value={selectedSize} 
          onChange={(event) => setSelectedSize(event.target.value)}
        >
          <option value=""></option>
          {sizeOptions.map((sizeOption) => (
            <option 
              key={sizeOption.id} 
              value={sizeOption.id}
            >
              {sizeOption.name}
            </option>
          ))}
        </select>

        <h4>Type</h4>
        <select 
          value={selectedDrink} 
          onChange={(event) => setSelectedDrink(event.target.value)}
        >
          <option value=""></option>
          {drinkOptions.map((drinkOption) => (
            <option 
              key={drinkOption.id} 
              value={drinkOption.id}
            >
              {drinkOption.name}
            </option>
          ))}
        </select>

        <h4>Milk Option</h4>
        <select 
          value={selectedMilk} 
          onChange={(event) => setSelectedMilk(event.target.value)}
        >
          <option value=""></option>
          {milkOptions.map((milkOption) => (
            <option 
              key={milkOption.id} 
              value={milkOption.id}>{milkOption.name}
            </option>
          ))}
        </select>

        <button type="submit">Add to Cart</button>
      </form>
    </div>
  )
}

export default SelectDrinkPage;