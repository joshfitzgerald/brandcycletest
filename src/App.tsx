import React from 'react';
import './App.scss';
import { useEffect, useState } from "react"
import { DrinkOptionProps, SizeOptionProps, MilkOptionProps, DrinkOrderProps } from './types/drinkMenuTypes'

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

const submitDrinkRequest = (drinkOrder: DrinkOrderProps) => {
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
    <main className="orderPage">
      <article className="orderPage__menu">

        {/* static drink menu generated from json menu data */}
        <h1>Drink Menu</h1>
        <table className="orderPage__menuTable orderPage__menuTable--drinks">
          <thead>
            <tr>
              <th><h2>Drinks</h2></th>
              <th>Sm</th>
              <th>Med</th>
              <th>Lg</th>
            </tr>
          </thead>
          <tbody>
            {/* maps over drinkOptions array to creates a row on the <table> (drink menu) */}
            {drinkOptions.map((drinkOption) => (
              <tr>
                <td onClick={() => setSelectedDrink(drinkOption.id)}>{drinkOption.name}</td>
                <td onClick={() => {setSelectedDrink(drinkOption.id); setSelectedSize('small');}}>{drinkOption.prices.small}</td>
                <td onClick={() => {setSelectedDrink(drinkOption.id); setSelectedSize('medium');}}>{drinkOption.prices.medium}</td>
                <td onClick={() => {setSelectedDrink(drinkOption.id); setSelectedSize('large');}}>{drinkOption.prices.large}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="orderPage__menuTable orderPage__menuTable--options">
          <thead>
            <tr>
              <th><h2>Milk options</h2></th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* maps over milkOptions array to creates a row on the <table> (drink menu) */}
            {milkOptions.map((milkOption) => (
              <tr onClick={() => setSelectedMilk(milkOption.id)}>
                <td>{milkOption.name}</td>
                <td>{milkOption.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ article>

      {/* users order section, <form> used to process user order */}
      <section  className="orderPage__order">
        <h1>Select your drink</h1>
        <form 
          onSubmit={onSubmit} 
          className="orderPage__orderForm"
        >
          {/* required to submit form */}
          <h2>Drink type <span>(required)</span></h2>
          <select 
            value={selectedDrink} 
            onChange={(event) => setSelectedDrink(event.target.value)}
          >
            <option value="" disabled> –– Select drink –– </option>
            {/* maps over the drinkOptions array. creates a drink options on the <select>'s dropdown */}
            {drinkOptions.map((drinkOption) => (
              <option 
                key={drinkOption.id} 
                value={drinkOption.id}
              >
                {drinkOption.name}
              </option>
            ))}
          </select>

          {/* requred to submit form */}
          <h2>Drink size <span>(required)</span></h2>
          <select 
            value={selectedSize} 
            onChange={(event) => setSelectedSize(event.target.value)}
          >
            {/* disabled default option with placeholder text */}
            <option value="" disabled> –– Select size –– </option>
            {/* maps over the sizeOptions array. creates a size options on the <select>'s dropdown */}
            {sizeOptions.map((sizeOption) => (
              <option 
                key={sizeOption.id} 
                value={sizeOption.id}
              >
                {sizeOption.name}
              </option>
            ))}
          </select>

          {/* milk is optional. "None" defaults to empty string */}
          <h2>Milk</h2>
          <select 
            value={selectedMilk} 
            onChange={(event) => setSelectedMilk(event.target.value)}
          >
            {/* disabled default option with placeholder text */}
            <option value=""> –– None –– </option>
            {/* maps over the sizeOptions array. creates a size options on the <select>'s dropdown */}
            {milkOptions.map((milkOption) => (
              <option 
                key={milkOption.id} 
                value={milkOption.id}>{milkOption.name}
              </option>
            ))}
          </select>

          {/* #TODO add client side validation when submitting in disabled state */}
          {/* button disabled until user selects a 1. drink size and 2. drink type from select dropdown menu */}
          <button 
            className="orderPage__ctaButton" 
            type="submit" 
            disabled={!selectedDrink || !selectedSize}
          >
            Add to Cart
          </button>
        </form>
      </section>
    </main>
  )
}

export default SelectDrinkPage;