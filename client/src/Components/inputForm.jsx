import "react-bootstrap";
import { useState } from "react";

const InputForm = (props) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const errorMeassages = {
    email: "Enter a valid Email !! (ahmed123@gmail.com)",
    password:
      "Password must contain Minimum of eight characters, at least one letter and one number",
    name: "Enter your name",
    userEmail: "Enter your email",
    userPassword: "Enter your password",
    calories: "please provide number of calories consumed in this meal",
  };

  const {
    name,
    type,
    value,
    onChange,
    placeholder,
    pattern,
    required,
    errorMessage,
    label,
    id,
    className,
  } = props;

  return (
    <div>
      <label className={`labelStyling ${className}`}> {label}</label>
      <div className="mb-3">
        <input
          id={id}
          className={`inputStyling ${className}`}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          pattern={pattern}
          onBlur={handleFocus}
          focused={focused.toString()}
          required={required}
        />

        <span className="errorMessage">{errorMeassages[errorMessage]}</span>
      </div>
    </div>
  );
};

export default InputForm;
