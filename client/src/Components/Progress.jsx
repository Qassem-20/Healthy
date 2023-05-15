import { Container, Row, Col } from "react-bootstrap";
import MacroStore from "../stores/MacroStore";

import React, { Fragment, useEffect } from "react";

const Progress = () => {
  const store = MacroStore();

  const storeDelete = MacroStore((storeDelete) => {
    return {
      deleteMacro: storeDelete.deleteMacro,
    };
  });

  useEffect(() => {
    store.fetchMacros();
  }, []);
  if (!store.macros) {
    return (
      <div className="bg-white mt-4 p-3 rounded text-center">
        Still you haven't entered any macros...
      </div>
    );
  }
  return (
    <Fragment>
      <Container fluid className="bg-white mt-4 p-3 rounded">
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
        {store.macros.map((macro) => (
          <Row className="progressBody" key={macro._id}>
            <Col>
              <p>{macro._id}</p>
            </Col>
            <Col>
              <p>{macro.totalCalories}</p>
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
        ))}
      </Container>
    </Fragment>
  );
};
export default Progress;
