import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// const data = [
//   {
//     group_name: 'Group A',
//     boys: 200,
//     girls: 400,
//   },
//   {
//     group_name: 'Group B',
//     boys: 3000,
//     girls: 500,
//   },
//   {
//     group_name: 'Group C',
//     boys: 1000,
//     girls: 1500,
//   },
//   {
//     group_name: 'Group D',
//     boys: 700,
//     girls: 1200,
//   },
// ]

const VaccinationCoverage = props => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  const {last7DaysVaccination} = props
  return (
    <div className="graph-card">
      <h1>Vaccination Coverage</h1>
      <div className="graph-element">
        <ResponsiveContainer width="95%" height={400}>
          <BarChart
            data={last7DaysVaccination}
            margin={{
              top: 5,
            }}
          >
            <XAxis
              dataKey="vaccineDate"
              tick={{
                stroke: 'gray',
                strokeWidth: 1,
              }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: 'gray',
                strokeWidth: 0,
              }}
            />
            <Legend
              wrapperStyle={{
                padding: 30,
              }}
            />
            <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
            <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VaccinationCoverage
