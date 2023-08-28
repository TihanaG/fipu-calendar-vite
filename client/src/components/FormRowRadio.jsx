import React, { useState } from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import styled from "styled-components";

const Wrapper = styled.div`
  .radio-group {
    display: flex;
    flex-direction: column;
  }
  .custom-radio {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    border-bottom: 1px solid #eee;
    flex: 1;
  }
  .custom-radio:last-child {
    border-bottom: none;
  }
  .radio-group input[type="radio"] {
    display: none;
  }
  .radio-group label {
    cursor: pointer;
    padding: 8px;
    font-size: 1rem;
    flex: 1;
  }
`;

const colorMap = {
  rad: "#647acb",
  rad_od_kuce: "#a26ad6",
  bolovanje: "#d66a6a",
  sluzbeni_put: "#67b3d6",
  godisnji: "#e9b949",
};

const FormRowRadio = ({ name, options, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleOptionChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Wrapper>
      <div className="radio-group">
        {options.map((option) => (
          <div className="custom-radio" key={option.value}>
            <input
              type="radio"
              id={`${name}_${option.value}`}
              name={name}
              value={option.value}
              checked={option.value === selectedValue}
              onChange={() => handleOptionChange(option.value)}
            />

            <div
              style={{ color: colorMap[option.value] }}
              onClick={() => handleOptionChange(option.value)}
            >
              {option.value === selectedValue ? (
                <MdRadioButtonChecked />
              ) : (
                <MdRadioButtonUnchecked />
              )}
            </div>
            <label htmlFor={`${name}_${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default FormRowRadio;
