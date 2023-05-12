import Nav from "../Components/Nav";
import { Container } from "react-bootstrap";
import InputForm from "../Components/inputForm";
import MacroStore from "../stores/MacroStore";
import Progress from "../Components/Progress";

import React, { Fragment } from "react";

const Dashboard = () => {
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
              <option value="">--Please select--</option>
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
      <Progress />
    </Fragment>
  );
};

export default Dashboard;
