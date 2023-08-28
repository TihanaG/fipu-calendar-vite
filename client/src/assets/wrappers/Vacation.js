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
    grid-template-columns: 100px 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: center;
  }
  .content {
    // padding: 1rem 1.5rem;
    grid-row: 3/4;
    grid-column: 1/3;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    grid-column: 1/2;
    grid-row: 1/3;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    grid-column: 2/4;
    grid-row: 1/2;
    text-transform: capitalize;
  }
  .more-btn {
    padding: 1rem 1.5rem;
    text-align: end;
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

  @media (min-width: 590px) {
  header {
    grid-template-columns: 1fr 2fr 3fr 1fr;
    grid-template-rows: auto auto;
  }
  .status {
    grid-column: 2/3;
  }
  .content {
    grid-column: 3/4;
    grid-row: 1/3;
  }
  .edit-btn {
    grid-area: 1/3/4/5;
  }
}
  @media (min-width: 800px) {
  header {
    grid-template-columns: 1fr 2fr 3fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
  .content {
    grid-column: 3/4;
    grid-row: 1/2;
  }
  .status {
    grid-column: 4/5;
  }
}
`;

export default Wrapper;
