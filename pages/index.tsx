import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Queen Quiz</title>
      </Head>
      <QuizContainer>
        <motion.div 
          animate={{ scale: 1 }} 
          initial={{ scale: 0 }} 
          transition={{ duration: 0.5, delay: 1 }} 
        >
          <QuizLogo />
        </motion.div>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Queen</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(e: any) => setName(e.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar`}
              </Button>
            </form>
          </Widget.Content>
       

       
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Link href={`/quiz/${projectName}___${githubUser}`}>
                      <Widget.Topic>
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <motion.div
           initial={{ x: "-1000px" }}
           animate={{ x: 0 }}
           transition={{ duration: 0.5, delay: 1.5 }} 
        >
          <Footer />
        </motion.div>
        
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/beatrizsabbatini/alura-quiz-queen" />
    </QuizBackground>
  );
}
