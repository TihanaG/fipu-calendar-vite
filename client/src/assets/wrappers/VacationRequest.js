import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;

  .vacation-form {
  //padding: 20px;
}

.form-content {
  display: flex;
  //justify-content: space-between;
  align-items: center;
  //justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.calendar-container {
  //flex: 1;
  //display: flex;
  //justify-content: center;
  align-items: center;
  // background-color:blue;
}

.form-inputs {
  max-width: 30rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 1rem;
}

.date-input-group {
  flex-direction: row;
}

label {
  margin-top: 1rem;
}

textarea {
  //flex: 1;
  height:150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-container {
  display: flex;
  gap: 0.5rem;
}
.btn {
  flex: 1;
  padding: 10px 20px;
  background-color: #215dd6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-content {
  justify-content: center;
}
}

`;

export default Wrapper;
