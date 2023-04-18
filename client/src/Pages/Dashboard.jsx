import Nav from "../Components/Nav";
import { Container, Row, Col } from "react-bootstrap";
import InputForm from "../Components/inputForm";
import MacroStore from "../stores/MacroStore";

import React, { Fragment, useState } from "react";

const Dashboard = () => {
  // Get today's date and format it as yyyy-mm-dd
  const today = new Date().toISOString().slice(0, 10);

  // Set the default date value to today's date using state
  const [date] = useState(today);

  const store = MacroStore();

  const addMacros = async (e) => {
    e.preventDefault();
    await store.addMacro();
    window.location.reload();
  };
  return (
    <Fragment>
      <Nav />
      <Container>
        <h2 className="mt-4">Add Macros consumed</h2>
        <form onSubmit={addMacros}>
          <Container>
            <InputForm
              label="Calories:"
              placeholder="700"
              name="calories"
              value={store.values.calories}
              onChange={store.handleChange}
              errorMessage="calories"
              required={true}
            />
            <label className="labelStyling">Meal type:</label>
            <select
              className="inputStyling mb-3"
              name="meal_type"
              value={store.values.meal_type}
              onChange={store.handleChange}
            >
              <option value="other">other</option>
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="snack">snack</option>
              <option value="dinner">dinner</option>
            </select>
            <InputForm
              label="Date:"
              type="date"
              name="date"
              value={date}
              onChange={store.handleChange}
            />
            <div>
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </div>
          </Container>
        </form>
      </Container>
      <wbr />
      <Container fluid className="bg-white mt-4 p-3 rounded">
        <h3 className="mt-1">Progress</h3>
        <Row>
          <Col>
            <label className="labelStyling">Show:</label>
            <select className="inputStyling mb-3">
              <option value="all">show all</option>
              <option value="week">this week</option>
              <option value="month">this month</option>
            </select>
          </Col>
          <Col>
            {/*<p className="text-center">Your BMI is: 25.7</p>
            <p className="text-center">Macros: 2183.91</p>*/}
          </Col>
          <Col>
            {/*<p className="text-center">
              Suggested Macros to get in shape: 1900.82
            </p>*/}
          </Col>
        </Row>
        <Row className="mt-5 progressHead">
          <Col>
            <p>Date</p>
          </Col>
          <Col>
            <p>Consumed Calories</p>
          </Col>
          <Col>
            <p>Statues</p>
          </Col>
          <Col>
            <p>Added Macros</p>
          </Col>
        </Row>
        <Row className="progressBody">
          <Col>
            <p>1/1/2023</p>
          </Col>
          <Col>
            <p>1978.62</p>
          </Col>
          <Col>
            <p>Achieved</p>
          </Col>
          <Col>
            <button className="btn btn-secondary">Breakfast 200 | X</button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
