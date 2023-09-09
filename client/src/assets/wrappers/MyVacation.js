import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: 200px 3fr 1fr 1fr;
    align-items: center;
  }
  .info {
    padding: 0 1rem 0 1rem;
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
    margin-left: 1rem;
  }
  .more-btn {
    //padding: 1rem 1.5rem;
    text-align: end;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
  @media (max-width: 900px) {
  header {
    grid-template-columns: 3fr 2fr 1fr;
    grid-template-rows: auto auto;
  }
  .status {
    grid-row: 1;
    grid-column: 2;
  }
  .info {
    grid-row: 2/3;
    grid-column: 1/4;
    padding: 1rem 0 0 0;
  }
  
}
`;

export default Wrapper;
