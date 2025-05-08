import React, { useState, useEffect } from 'react'; // Add React import
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

// Import components
import { Logo } from '../components/core/Logo';
import { PrimaryButton, Button } from '../components/core/Button';
import { colors } from '../theme';

// Styled components remain the same
const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 75px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.footer`
  background: ${darken(0.02, colors.background)};
  border-top: 1px solid ${colors.borders};
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
  font-size: 0.8em;
  color: ${lighten(0.3, colors.background)};

  @media screen and (max-width: 850px) {
    padding: 0 15px;
  }

  a {
    text-decoration: none;
    color: ${lighten(0.3, colors.background)};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Copyright = styled.span`
  flex: 1;
`;

const HiddenInput = styled.input`
  display: none;
`;

export default function ResumeGen() {
  const navigate = useNavigate();
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    setHasSession(!!localStorage.getItem('jsonResume'));
  }, []);

  const startNewSession = () => {
    localStorage.clear();
    navigate('/generator');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonResume = JSON.parse(event.target?.result as string);
        localStorage.setItem('jsonResume', JSON.stringify(jsonResume));
        navigate('/generator');
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Wrapper>
      <Main>
        <Logo marginBottom="0.75em" />
        <PrimaryButton onClick={startNewSession}>Make New Resume</PrimaryButton>
        {hasSession && (
          <Button as="a" href="/generator" style={{ textDecoration: 'none' }}>
            Continue Session
          </Button>
        )}
        <Button as="label" htmlFor="import-json">
          Import JSON
        </Button>
        <HiddenInput
          id="import-json"
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
        />
      </Main>
      <Footer>
        <Copyright>© {new Date().getFullYear()} Saad Quadri</Copyright>
        <a href="/about">About</a>
        <a href="https://github.com/saadq/resumake" target="_blank" rel="noopener noreferrer">
          Source
        </a>
        <a href="https://github.com/saadq/resumake/issues" target="_blank" rel="noopener noreferrer">
          Issues
        </a>
      </Footer>
    </Wrapper>
  );
}