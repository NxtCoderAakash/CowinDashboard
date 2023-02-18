import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {cowinData: '', fetchState: stateConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({fetchState: stateConstants.loading})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      const formattedData = this.getCamelData(data)
      this.setState({
        cowinData: formattedData,
        fetchState: stateConstants.success,
      })
    } else {
      this.setState({fetchState: stateConstants.failure})
    }
  }

  getCamelData = data => {
    const last7DaysVaccination = data.last_7_days_vaccination.map(item => ({
      vaccineDate: item.vaccine_date,
      dose1: item.dose_1,
      dose2: item.dose_2,
    }))
    const formattedData = {
      last7DaysVaccination,
      vaccinationByAge: data.vaccination_by_age,
      vaccinationByGender: data.vaccination_by_gender,
    }
    return formattedData
  }

  renderLoadingPage = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailurePage = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </>
  )

  renderSuccessPage = () => {
    const {cowinData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = cowinData

    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  checkFetchStatus = fetchState => {
    switch (fetchState) {
      case 'LOADING':
        return this.renderLoadingPage()
      case 'FAILURE':
        return this.renderFailurePage()
      case 'SUCCESS':
        return this.renderSuccessPage()
      default:
        return null
    }
  }

  render() {
    const {fetchState} = this.state

    return (
      <div className="bg-container">
        <div className="container-card">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-image"
            />
            <h1 className="logo-label">Co-WIN</h1>
          </div>
          <h1>CoWIN Vaccination in India</h1>
          <div className="data-container">
            {this.checkFetchStatus(fetchState)}
          </div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard

// import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

// const data = [
//   {
//     count: 809680,
//     language: 'Telugu',
//   },
//   {
//     count: 4555697,
//     language: 'Hindi',
//   },
//   {
//     count: 12345657,
//     language: 'English',
//   },
// ]

// const CowinDashboard = () => (
//   <ResponsiveContainer width="100%" height={300}>
//     <PieChart>
//       <Pie
//         cx="70%"
//         cy="40%"
//         data={data}
//         startAngle={0}
//         endAngle={360}
//         innerRadius="40%"
//         outerRadius="70%"
//         dataKey="count"
//       >
//         <Cell name="Telugu" fill="#fecba6" />
//         <Cell name="Hindi" fill="#b3d23f" />
//         <Cell name="English" fill="#a44c9e" />
//       </Pie>
//       <Legend
//         iconType="circle"
//         layout="vertical"
//         verticalAlign="middle"
//         align="right"
//       />
//     </PieChart>
//   </ResponsiveContainer>
// )

// export default CowinDashboard
