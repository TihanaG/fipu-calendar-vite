import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 20px;
  width: 30rem;
  max-width: 80%;
`;

export const Modal = ({ children, shouldShow, onRequestClose }) => {
  return (
    <>
      {shouldShow && (
        <ModalBackground onClick={onRequestClose}>
          <ModalBody onClick={(e) => e.stopPropagation()}>
            {/** Kako se Modal nebi zatvarao kad koristenja */}
            <button className="btn" onClick={onRequestClose}>
              Close
            </button>
            {children}
          </ModalBody>
        </ModalBackground>
      )}
    </>
  );
};
