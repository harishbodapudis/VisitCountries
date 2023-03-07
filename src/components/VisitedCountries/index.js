import {Component} from 'react'
import './index.css'

class VisitedCountries extends Component {
  constructor(props) {
    super(props)
    const {initialCountriesList} = this.props
    const initialList = initialCountriesList.filter(
      cont => cont.name === 'India' || cont.name === 'United Kingdom',
    )
    this.state = {data: initialCountriesList, visitedCountriesList: initialList}
  }

  addToVisitedList = item => {
    this.setState(prevState => ({
      visitedCountriesList: [...prevState.visitedCountriesList, item],
    }))
  }

  detailsCard = item => {
    const {visitedCountriesList} = this.state

    const visited = visitedCountriesList.filter(data => data.id === item.id)

    return (
      <li className="item-box" key={item.id}>
        <div className="para-btn-box">
          <p>{item.name}</p>
          <div>
            {visited.length === 0 ? (
              <button
                type="button"
                onClick={() => this.addToVisitedList(item)}
                className="visit-btn"
              >
                Visit
              </button>
            ) : (
              <p className="visited-para">Visited</p>
            )}
          </div>
        </div>
      </li>
    )
  }

  removeCountry = country => {
    const {visitedCountriesList} = this.state
    const newData = visitedCountriesList.filter(data => data.id !== country.id)
    this.setState({visitedCountriesList: newData})
  }

  countryDetails = country => (
    <li className="country-card" key={country.id}>
      <img src={country.imageUrl} alt="thumbnail" className="country-img" />
      <div className="para-remove-btn-box">
        <p>{country.name}</p>
        <button
          type="button"
          onClick={() => this.removeCountry(country)}
          className="remove-btn"
        >
          Remove
        </button>
      </div>
    </li>
  )

  render() {
    const {data, visitedCountriesList} = this.state

    visitedCountriesList.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })

    console.log(visitedCountriesList)

    return (
      <div className="countries-visited-page">
        <h1 className="countries-heading">Countries</h1>
        <ul className="items-box">
          {data.map(item => this.detailsCard(item))}
        </ul>
        <div>
          <h1 className="visited-countries-heading">Visited Countries</h1>
          <ul className="visited-countries-box">
            {visitedCountriesList.length > 0 ? (
              visitedCountriesList.map(country => this.countryDetails(country))
            ) : (
              <div className="no-countries">
                <p className="no-countries-para">No Countries Visited Yet</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default VisitedCountries
