import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  textarea {
    flex: 1;
    width: 100%;
    height: 100px;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--grey-300);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    background: var(--background-color);
    color: var(--text-color);
  }
  label {
    display: block;
    font-size: var(--small-text);
    margin-bottom: 0.75rem;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    line-height: 1.5;
  }
  .description {
    margin-bottom: 1rem;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
