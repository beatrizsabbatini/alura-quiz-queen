import React from 'react';

import styled from 'styled-components';

function Logo() {
  return (
    <LogoContainer>
      <LogoImage  
        src="/queen-logo.png"
        alt="Picture of the logo"
      />
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  background:  rgba(255, 255, 255, 0.5);
  width: fit-content;
  padding: 25px;
  border-radius: 100%;
  backdrop-filter: blur(10px);
  margin-top: 50px;
`

const LogoImage = styled.img`
  object-fit: contain;
  height: 130px;
  width: 130px;
`

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;
