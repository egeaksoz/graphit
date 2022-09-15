import React from 'react';
import './App.css';
import axios from 'axios';
import { Grid, Segment, Button, Header, Form, Icon, Select, Table } from 'semantic-ui-react';
import Months from './components/Months';
import Data from './components/Data';

class App extends React.Component {
  constructor() {
    super();
    this.state = { name: '', origin: '', month: '', months: [], price: '', year: '', monthsOptions: this.monthsOptions, data: [] }
    this.addMonthComponent = this.addMonthComponent.bind(this);
  }

  addMonthComponent() {
    let month = this.state.month;
    let monthsSize = this.state.months.length + 1
    let price = this.state.price;
    this.setState({ months: [...this.state.months, { id: monthsSize, title: month, price: price }], monthsOptions: this.state.monthsOptions.filter(item => item.value !== month) })
  }

  sortByMonth(arr) {
    var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    arr.sort(function (a, b) {
      return months.indexOf(a.title)
        - months.indexOf(b.title);
    })
  };

  monthsOptions = [
    { key: 1, text: 'January', value: 'January' },
    { key: 2, text: 'February', value: 'February' },
    { key: 3, text: 'March', value: 'March' },
    { key: 4, text: 'April', value: 'April' },
    { key: 5, text: 'May', value: 'May' },
    { key: 6, text: 'June', value: 'June' },
    { key: 7, text: 'July', value: 'July' },
    { key: 8, text: 'August', value: 'August' },
    { key: 9, text: 'September', value: 'September' },
    { key: 10, text: 'October', value: 'October' },
    { key: 11, text: 'November', value: 'November' },
    { key: 12, text: 'December', value: 'December' }
  ]

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.delete("/delete")

    let monthStates = this.state.months
    this.sortByMonth(monthStates)

    axios.post('/add_data', {
      name: this.state.name,
      origin: this.state.origin,
      year: this.state.year,
      months: this.state.months
    }).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    });

    axios.get('/data')
      .then(res => {
        let dataArray = res.data.shift();

        let monthInfo = []

        for (let month = 0; month < dataArray.months.length; month++) {
          monthInfo = [...monthInfo, { title: dataArray.months[month].title, price: dataArray.months[month].price }]
        }

        let dataSize = dataArray.length + 1;

        this.setState({ data: [...this.state.data, { id: dataSize, name: dataArray.name, year: dataArray.year, monthInfo }] });
      })
      .catch(e => {
        console.log(e);
      });

  }

  deleteAllData(event) {
    event.preventDefault();
    axios.delete("/delete");
    this.setState({ name: '', origin: '', year: '', price: '', monthsOptions: this.monthsOptions, months: [], data: [] })
  };

  deleteMonth = title => {
    let deletedMonth = this.monthsOptions.filter(item => item.value === title)
    this.setState({ months: this.state.months.filter(item => item.title !== title), monthsOptions: [...this.state.monthsOptions, { key: deletedMonth[0].key, text: deletedMonth[0].text, value: deletedMonth[0].value }].sort((a, b) => (a.key > b.key) ? 1 : -1) })
  }

  render() {

    return (
      <div className="App">
        <Header size="large">GRAPH</Header>
        <Icon name="area graph" size="large"></Icon>
        <Header size="small"><i>or it did not happen!</i></Header>
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>
                <Header size="small">Fill info about your product</Header>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field required>
                    <label>Name of the product</label>
                    <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" maxLength="10" />
                  </Form.Field>
                  <Form.Field required>
                    <label>Country of origin</label>
                    <input name="origin" value={this.state.origin} onChange={this.handleChange} placeholder="Country" />
                  </Form.Field>
                  <Form.Field required>
                    <label>Year</label>
                    <input name="year" type="number" value={this.state.year} onChange={this.handleChange} placeholder="Year" />
                  </Form.Field>
                  <Form.Group inline>
                    <Form.Field required>
                      <label>Months</label>
                      <Select options={this.state.monthsOptions} onChange={(e, { value }) => this.setState({ month: value })} />
                    </Form.Field>
                    <Form.Field required>
                      <label>Price</label>
                      <input name="price" type="number" value={this.state.price} onChange={this.handleChange} placeholder="Price"></input>
                    </Form.Field>
                    <Form.Field>
                      <Button style={addButtonStyle} type="button" onClick={this.addMonthComponent}>Add</Button>
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Table fixed>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Month</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Months months={this.state.months} delButton={this.deleteMonth}></Months>
                  </Table.Body>

                </Table>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Data data={this.state.data} ></Data>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br></br>
        <Button type="submit" onClick={this.handleSubmit.bind(this)}>GRAPH IT!</Button>
        <Button onClick={this.deleteAllData.bind(this)}>Reset</Button>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const addButtonStyle = {
  marginTop: "20px"
}

export default App;
