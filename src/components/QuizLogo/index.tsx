import React from 'react';

import Image from 'next/image'
import styled from 'styled-components';


interface LogoProps{
  className?: string
}

function Logo({ className }: LogoProps) {
  return (
    <LogoContainer>
      <Image  
        src="/queen-logo.png"
        alt="Picture of the logo"
        width={150}
        height={150}
        objectFit="contain"
      />
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  background:  rgba(255, 255, 255, 0.5);
  width: fit-content;
  padding: 30px;
  border-radius: 100%;
  backdrop-filter: blur(10px);
`

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;
