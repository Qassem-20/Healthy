import WelcomingNav from "../Components/WelcomingNav";
import { Container, Row, Col } from "react-bootstrap";
import Icon from "../assets/images/HealthyIcon.png";
import InputForm from "../Components/inputForm";

import React, { Fragment, useState } from "react";

const WelcomingPage = () => {
  const [suggestedMacros, setSuggestedMacros] = useState({});
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [sex, setSex] = useState("");
  const [bmi, setBmi] = useState();

  function calculateBmi() {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  }
  function calculateMacros(weight, age, height, activityLevel, sex) {
    const BMR = calculateBMR(weight, height, age, sex);
    const TDEE = calculateTDEE(BMR, activityLevel);
    const protein = calculateProtein(weight);
    const carbs = calculateCarbs(TDEE);
    const fat = calculateFat(TDEE);

    return {
      protein,
      carbs,
      fat,
    };
  }

  function calculateBMR(weight, height, age, sex) {
    const weightInKg = weight;
    const heightInCm = height;
    const ageInYears = age;

    let BMR = 0;

    if (sex === "male") {
      BMR =
        88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageInYears;
    } else if (sex === "female") {
      BMR =
        447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * ageInYears;
    }

    return BMR;
  }

  function calculateTDEE(BMR, activityLevel) {
    let TDEE = 0;

    switch (activityLevel) {
      case "sedentary":
        TDEE = BMR * 1.2;
        break;
      case "lightlyActive":
        TDEE = BMR * 1.375;
        break;
      case "moderatelyActive":
        TDEE = BMR * 1.55;
        break;
      case "veryActive":
        TDEE = BMR * 1.725;
        break;
      case "superActive":
        TDEE = BMR * 1.9;
        break;
      default:
        TDEE = BMR * 1.2;
    }

    return TDEE;
  }

  function calculateProtein(weight) {
    const proteinInGrams = weight * 2.2;
    return proteinInGrams;
  }

  function calculateCarbs(TDEE) {
    const carbsInGrams = (TDEE * 0.45) / 4;
    return carbsInGrams;
  }

  function calculateFat(TDEE) {
    const fatInGrams = (TDEE * 0.25) / 9;
    return fatInGrams;
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Call a function to calculate the suggested macros based on the user input
    calculateMacros(weight, age, height, activityLevel, sex);
    // Display the suggested macros to the user
    setSuggestedMacros(calculatedMacros);
  };
  const calculatedMacros = calculateMacros(
    weight,
    age,
    height,
    activityLevel,
    sex
  );

  return (
    <Fragment>
      <WelcomingNav />
      <form onSubmit={handleFormSubmit}>
        <Container className="mt-5">
          <Row>
            <Col>
              <Container className="d-flex justify-content-center">
                <img src={Icon} alt="Icon" className="img-fluid" />
              </Container>

              <Container className="d-flex justify-content-center">
                <a className="btn btn-dark" href="/profile">
                  monitor your daily progress
                </a>
              </Container>
            </Col>
            <Col>
              <InputForm
                label="Weight:"
                placeholder="62(Kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <InputForm
                label="Height:"
                type="number"
                placeholder="168(Cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <InputForm
                label="Age:"
                placeholder="24"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <label className="labelStyling">Activity:</label>
              <select
                className="inputStyling mb-3"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
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
                  Super Active (very hard exercise or sports, physical job or
                  training twice a day)
                </option>
              </select>
              <label className="labelStyling">
                Sex:
                <br />
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  onChange={(e) => setSex(e.target.value)}
                />
                &nbsp;Male
                <br />
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  onChange={(e) => setSex(e.target.value)}
                />
                &nbsp;Female
              </label>
              <div>
                <button
                  className="btn btn-dark mt-2"
                  onClick={calculateBmi}
                  type="submit"
                >
                  Calculate
                </button>
              </div>
              <Row>
                <Col>
                  <div className="macros p-2 m-1 rounded">
                    Suggested Macros:
                    <div className="m-0">
                      Protein:
                      <p className="m-0">
                        {suggestedMacros.protein !== undefined
                          ? (suggestedMacros.protein * 4).toFixed(0) + " cal"
                          : ""}
                      </p>
                      <p className="m-0">
                        {suggestedMacros.protein !== undefined
                          ? suggestedMacros.protein.toFixed(1) + " g"
                          : ""}
                      </p>
                    </div>
                    <div className="m-0">
                      Fat:
                      <p className="m-0">
                        {suggestedMacros.fat !== undefined
                          ? (suggestedMacros.fat * 9).toFixed(0) + " cal"
                          : ""}
                      </p>
                      <p className="m-0">
                        {suggestedMacros.fat !== undefined
                          ? suggestedMacros.fat.toFixed(1) + " g"
                          : ""}
                      </p>
                    </div>
                    <div className="m-0">
                      Carbs:
                      <p className="m-0">
                        {suggestedMacros.carbs !== undefined
                          ? (suggestedMacros.carbs * 4).toFixed(0) + " cal"
                          : ""}
                      </p>
                      <p className="m-0">
                        {suggestedMacros.carbs !== undefined
                          ? suggestedMacros.carbs.toFixed(1) + " g"
                          : ""}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <p className="bmi p-2 m-1 rounded">
                    Your Bmi is:&nbsp; <span>{bmi}</span>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </form>
    </Fragment>
  );
};

export default WelcomingPage;
