import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  height: 100%;
  min-height: 40px;
  padding: 4px 0;
`;

const Cell = styled.div`
  align-items: center;
  border-radius: 50%;
  ${(props) => props.isSelected && "border-radius: 0;"}
  ${(props) => props.isStart && "border-radius: 50% 0 0 50%;"}
    ${(props) => props.isEnd && "border-radius: 0 50% 50% 0;"}

  background-color: ${(props) => (props.isSelected ? "#215dd660" : "white")};
  background-color: ${(props) => (props.isStart && "#215dd6")};
  background-color: ${(props) => (props.isEnd && "#215dd6")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  display: flex;
  justify-content: center;
  height: 100%;

  :hover {
    color: white;
    background-color: ${(props) => (props.isSelected ? "#215dd6" : "black")};
  }
`;

export const PillCell = ({ isSelected, isStart, isEnd, dateNumber = "" }) => {
  return (
    <Container>
      <Cell isSelected={isSelected} isStart={isStart} isEnd={isEnd}>
        {dateNumber}
      </Cell>
    </Container>
  );
};
