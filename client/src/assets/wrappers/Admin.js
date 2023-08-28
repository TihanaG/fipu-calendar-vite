import styled from "styled-components";

const Wrapper = styled.section`
  .table-container {
    margin-top: 20px;
  }

  .table-scroll {
    overflow: auto;
  }

  .minimal-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
  }

  .minimal-table th,
  .minimal-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  .name-column {
    width: 20%;
    background-color: #f2f2f2;
  }

  .date-column {
    background-color: #f2f2f2;
  }

  .name-cell {
    text-align: left;
  }

  .data-cell {
    font-weight: bold;
  }

  .weekend {
    background-color: #ffeeaa;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
export default Wrapper;
