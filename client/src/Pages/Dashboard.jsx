import Nav from "../Components/Nav";
import { Container, Row, Col } from "react-bootstrap";
import InputForm from "../Components/inputForm";
import MacroStore from "../stores/MacroStore";

import React, { Fragment, useEffect } from "react";

const Dashboard = () => {
  const store = MacroStore();

  const storeDelete = MacroStore((storeDelete) => {
    return {
      deleteMacro: storeDelete.deleteMacro,
    };
  });

  const addMacros = async (e) => {
    e.preventDefault();
    await store.addMacro();
    window.location.reload();
  };

  useEffect(() => {
    store.fetchMacros();
  }, [store]);
  if (!store.macros) {
    return <div>Loading...</div>;
  }
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
            <div>
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </div>
          </Container>
        </form>
      </Container>
      <wbr />
      {store.macros.map((macro) => (
        <Container fluid className="bg-white mt-4 p-3 rounded" key={macro._id}>
          <h3 className="mt-1">Progress</h3>
          <Row>
            <Col>
              {/* still not working*/}
              <label className="labelStyling">Show:</label>
              <select className="inputStyling mb-3">
                <option value="all">show all</option>
                <option value="week">this week</option>
                <option value="month">this month</option>
              </select>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row className="mt-5 progressHead">
            <Col>
              <p>Date</p>
            </Col>
            <Col>
              <p>Consumed Calories</p>
            </Col>
            <Col>
              <p>Added Macros</p>
            </Col>
          </Row>
          <Row className="progressBody">
            <Col>
              <p>{macro._id}</p>
            </Col>
            <Col>
              <p>1978.62</p>
            </Col>
            <Col>
              {macro.macros.map((m) => (
                <button
                  className="btn btn-secondary btn-sm m-1"
                  onClick={() => storeDelete.deleteMacro(m._id)}
                  key={m._id}
                >
                  {m.meal_type} - {m.calories} calories | X
                </button>
              ))}
            </Col>
          </Row>
        </Container>
      ))}
    </Fragment>
  );
};

export default Dashboard;
