import React from 'react';
import './appV2.scss';
import { useEffect, useState } from "react"
import { DrinkOptionProps, SizeOptionProps, MilkOptionProps, DrinkOrderProps } from './types/drinkMenuTypes'

const fetchPageOptions = async () => {
  const fakeResponse = {
    drinkOptions: [
      {
        id: 'coffee',
        name: 'Coffee',
        prices: {
          small: 1,
          medium: 2,
          large: 3,
        },
      },
      {
        id: 'espresso',
        name: 'Espresso',
        prices: {
          small: 2,
          medium: 4,
          large: 6,
        },
      },
      {
        id: 'green_tea',
        name: 'Green Tea',
        prices: {
          small: 3,
          medium: 6,
          large: 9,
        },
      },
    ],
    milkOptions: [
      {
        id: 'cream',
        name: 'Cream',
        price: 0.2
      },
      {
        id: 'milk',
        name: 'Milk',
        price: 0.2
      },
      {
        id: 'almond',
        name: 'Almond',
        price: 0.3
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

const formatCurrencyDecimals = (amount: number) => { 
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
}

const formatCurrencyCents = (amount: number) => {
  return `${Math.round(amount * 100)}¢`
}

const formatCurrencyNoDecimals = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)
}

const submitDrinkRequest = (drinkOrder: DrinkOrderProps) => {
  alert(JSON.stringify(drinkOrder, null, 2))
}

export function SelectDrinkPageV2() {
  const [drinkOptions , setDrinkOptions] = useState<DrinkOptionProps[]>([]);
  const [milkOptions, setMilkOptions] = useState<MilkOptionProps[]>([]);
  const [sizeOptions, setSizeOptions] = useState<SizeOptionProps[]>([]);

  const [selectedDrink, setSelectedDrink] = useState('');
  const [selectedMilk, setSelectedMilk] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const [drinkCost, setDrinkCost] = useState(0);
  const [extraCost, setExtraCost] = useState(0);

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
      milk: selectedMilk,
      cost: formatCurrencyDecimals(drinkCost + extraCost)
    }

    submitDrinkRequest(drinkOrder)
  }

  return (
    <main className="orderV2">
      {/* users order section, <form> used to process user order */}
      <form 
        onSubmit={onSubmit} 
        className="orderV2__order"
      >
        {/* required to submit form */}
        {!selectedDrink && (
          <h1>Select your drink</h1>
        )}
        <fieldset className="orderV2__optionList orderV2__optionList--drink">

          {drinkOptions.map((drinkOption) => (
            <label
              htmlFor={drinkOption.id} 
              className="orderV2__option orderV2__option--drink"
            >
              <img 
                src="https://placehold.co/400x400/ccc/333" 
                width="200" 
                height="200" 
                className="orderV2__optionImage" 
                alt="drinkOption.name" />
              <input 
                key={drinkOption.id} 
                onChange={(event) => setSelectedDrink(event.target.value)}
                value={drinkOption.id}
                type="radio" 
                name="drinkOption"
                id={drinkOption.id} 
              />
              {drinkOption.name}
            </label>
          ))}
        </fieldset>

        {/* requred to submit form */}
        {selectedDrink && (
        <fieldset className="orderV2__optionList orderV2__optionList--size">
          <h2>Pick a size <span>(required)</span></h2>
          {sizeOptions.map((sizeOption) => (
            <label 
              onClick={() => setDrinkCost(drinkOptions.find(drink => drink.id === selectedDrink)?.prices[sizeOption.id])}
              htmlFor={sizeOption.id} 
              className="orderV2__option orderV2__option--size"
            >
              <img 
                src="icon-drink.svg" 
                width="40" height="60" 
                className="orderV2__icon" 
                alt={sizeOption.name}
              />
              <input 
                key={sizeOption.id} 
                value={sizeOption.id}
                onChange={(event) => setSelectedSize(event.target.value)}
                type="radio" 
                name="sizeOption"
                id={sizeOption.id} 
              />
              <p className='orderV2__optionName'>{sizeOption.name}</p>
              <p className="orderV2__optionPrice">
                { formatCurrencyNoDecimals(drinkOptions.find(drink => drink.id === selectedDrink)?.prices[sizeOption.id]) }
              </p>
            </label>
          ))}
        </fieldset> 
        )}

        {selectedSize && (
          <fieldset className="orderV2__optionList orderV2__optionList--milk">
            <h2>Milk options</h2>
            <label
              onClick={() => setExtraCost(0)} 
              htmlFor="none" 
              className="orderV2__option orderV2__option--milk"
            >
              <img src="icon-none.svg" width="42" height="42" className="orderV2__icon orderV2__icon--dairy" alt="No dairy" />  
              <input 
                key="none" 
                value=""
                onChange={(event) => setSelectedMilk(event.target.value)}
                type="radio" 
                name="milkOption"
                id="none" 
              />
              <p className="orderV2__optionName">None</p>
            </label>
            
            {milkOptions.map((milkOption) => (
              <label 
                onClick={() => setExtraCost(milkOption.price)}
                htmlFor={milkOption.id} 
                className="orderV2__option orderV2__option--milk"
              >
                <img src="icon-dairy.svg" width="22" height="40" className="orderV2__icon orderV2__icon--dairy" alt={milkOption.name} />
                <input 
                  key={milkOption.id} 
                  value={milkOption.id}
                  onChange={(event) => setSelectedMilk(event.target.value)}
                  type="radio" 
                  name="milkOption"
                  id={milkOption.id} 
                />
                <p className="orderV2__optionName">{milkOption.name}</p>
                <p className="orderV2__optionPrice">
                  { formatCurrencyCents(milkOption.price) }
                </p>
              </label>
            ))}
          </fieldset> 
        )}

        <div className="orderV2__addToCart">
          <button 
            className="orderV2__ctaButton" 
            type="submit" 
            disabled={!selectedDrink || !selectedSize}
          >Add to Cart
            {selectedSize && (
              <span className="orderV2__addToCartAmount">
                {formatCurrencyDecimals(drinkCost + extraCost)}
              </span>
            )}
          </button>
        </div>
      </form>
    </main>
  )
}

export default SelectDrinkPageV2;