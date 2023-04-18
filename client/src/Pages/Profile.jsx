import Nav from "../Components/Nav";
import { Container, Row, Col } from "react-bootstrap";
import InputForm from "../Components/inputForm";
import UserStore from "../stores/UserStore.js";

import React, { Fragment, useEffect } from "react";

const Profile = () => {
  const store = UserStore();

  const handleUpdate = async (e) => {
    e.preventDefault();
    await store.updateUser();
    window.location.reload();
  };

  useEffect(() => {
    store.fetchUserProfile();
  }, [store]);
  if (!store.user) {
    return <div>Loading...</div>;
  }
  return (
    <Fragment>
      <Nav />
      <Container fluid>
        <h5>Hello, {store.user.name}</h5>
        {!store.updateProfile._id && (
          <Container className="bg-white rounded p-3 mt-4">
            <h3>this is your current materics</h3>
            <Row>
              <Col>
                <p>
                  Age: <span>{store.user.age}</span>
                </p>
                <p>
                  Weight(Kg): <span>{store.user.weight}</span>
                </p>

                <p>
                  Height(Cm): <span>{store.user.height}</span>
                </p>
              </Col>
              <Col>
                <p>
                  Sex: <span>{store.user.sex}</span>
                </p>
                <p>
                  Weight Goal(Kg): <span>{store.user.weight_goal}</span>
                </p>
                <p>
                  Activity level: <span>{store.user.activity_level}</span>
                </p>
              </Col>
              <Col>
                <p className="mt-5"></p>
                <button
                  className="btn btn-dark mt-5 ml-2"
                  onClick={() => store.toggleUpdate(store.user)}
                >
                  Update
                </button>
              </Col>
            </Row>
          </Container>
        )}
        {store.updateProfile._id && (
          <form onSubmit={handleUpdate}>
            <Container className="bg-white rounded p-3">
              <h3>Update your profile</h3>
              <Row>
                <Col>
                  <InputForm
                    label="Name:"
                    type="text"
                    name="name"
                    value={store.updateProfile.name}
                    onChange={store.handleUpdate}
                  />
                  <InputForm
                    label="Weight(Kg):"
                    type="text"
                    name="weight"
                    value={store.updateProfile.weight}
                    onChange={store.handleUpdate}
                  />
                  <InputForm
                    label="Height(Cm):"
                    type="text"
                    name="height"
                    value={store.updateProfile.height}
                    onChange={store.handleUpdate}
                  />
                </Col>
                <Col>
                  <InputForm
                    label="Weight Goal(Kg):"
                    type="text"
                    name="weight_goal"
                    value={store.updateProfile.weight_goal}
                    onChange={store.handleUpdate}
                  />
                  <label className="labelStyling">Sex:</label>
                  <select
                    className="inputStyling mb-3"
                    name="sex"
                    defaultValue={store.updateProfile.sex}
                    onChange={store.handleUpdate}
                  >
                    <option value=""></option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                  <label className="labelStyling">Activity level:</label>
                  <select
                    className="inputStyling"
                    name="activity_level"
                    defaultValue={store.updateProfile.activity_level}
                    onChange={store.handleUpdate}
                  >
                    <option value="">--Select--</option>
                    <option value="sedentary">
                      Sedentary (little or no exercise)
                    </option>
                    <option value="lightlyActive">
                      Lightly Active (light exercise or sports 1-3 days a week)
                    </option>
                    <option value="moderatelyActive">
                      Moderately Active (moderate exercise or sports 3-5 days a
                      week)
                    </option>
                    <option value="veryActive">
                      Very Active (hard exercise or sports 6-7 days a week)
                    </option>
                    <option value="superActive">
                      Super Active (very hard exercise or sports, physical job
                      or training twice a day)
                    </option>
                  </select>
                </Col>
                <Col>
                  <InputForm
                    label="Age:"
                    type="text"
                    name="age"
                    value={store.updateProfile.age}
                    onChange={store.handleUpdate}
                  />
                  <button className="btn btn-dark mt-5 ml-2" type="submit">
                    Update My Profile
                  </button>
                </Col>
              </Row>
            </Container>
          </form>
        )}
      </Container>
    </Fragment>
  );
};

export default Profile;
