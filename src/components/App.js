import React, { useEffect, useState } from 'react'
import Service from '../lib/service'
import { formatUpdateDate, findCountry } from '../lib'
import CountrySelect from './CountrySelect'
import CountryData from './CountryData'
import CountryTotal from './CountryTotal'
import WorldData from './WorldData'

import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [country, setCountry] = useState('Russia')
  const [countryObj, setCountryObj] = useState(null)

  const onCountryChange = e => {
    setCountry(e.target.value)
    setCountryObj(findCountry(data.countries, e.target.value))
  }

  useEffect(() => {
    async function fetchData () {
      const [err, data] = await Service.fetchData()
      if (!err) {
        setData(data)
        setCountryObj(findCountry(data.countries, country))
      }
      else {
        setData(null)
      }
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
      { data && data.countries.length > 0 ? (
      <div className="covid19-App">
        <div className="covid19-App__header">
          <CountrySelect
            value={ country }
            countries={ data.countries }
            onChange={ onCountryChange }
          />

          { data.updated
            ? (<span className="covid19-App__updated">Данные обновлены: { formatUpdateDate(data.updated) }</span>)
            : ''
          }
        </div>

        { countryObj ? (
          <>
            <CountryTotal country={ countryObj } />
            <CountryData data={ countryObj } />
          </>
        ) : '' }

        { data.data ? <WorldData data={ data.data } /> : '' }
      </div>
    ) : '' }
    </React.Fragment>
  )
}

export default App
