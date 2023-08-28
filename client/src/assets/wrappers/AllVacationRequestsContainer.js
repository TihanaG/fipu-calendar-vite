import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .requests {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
  }
  @media (min-width: 1120px) {
    .requests {
      //grid-template-columns: 1fr 1fr;
      //gap: 2rem;
    }
  }
`;
export default Wrapper;
