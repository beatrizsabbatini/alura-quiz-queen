/* eslint-disable react/prop-types */
import React from 'react';
import { Lottie } from '@crello/react-lottie';

// import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import db from '../../../db.json';
import loadingAnimation from './animations/loading.json';
import { motion } from 'framer-motion';
import Link from 'next/link';


interface ResultWidgetProps{
  results: boolean[]
}

const ResultWidget: React.FC<ResultWidgetProps> = ({ results }) => {
  return (
    <>
      <Widget>
        <Widget.Header>
          Tela de Resultado:
        </Widget.Header>

        <Widget.Content>
          <p>
            Você acertou
            {' '}
            {results.filter((x) => x).length}
            {' '}
            perguntas
          </p>
          <ul>
            {results.map((result, index) => (
              <li key={`result__${index}`}>
                #
                {index + 1}
                {' '}
                Resultado:
                {result === true
                  ? 'Acertou'
                  : 'Errou'}
              </li>
            ))}
          </ul>
        </Widget.Content>

        
      </Widget>

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
                <Widget.Topic
                  as={Link}
                  href={`/quiz/${projectName}___${githubUser}`}
                >
                  {`${githubUser}/${projectName}`}
                </Widget.Topic>
              </li>
            );
          })}
        </ul>
      </Widget.Content>
      </Widget>
  </>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

interface QuestionWidgetProps{
  question: Question,
  questionIndex: number,
  totalQuestions: number,
  onSubmit: () => void,
  addResult: (isCorrect: boolean) => void
}

interface Question{
  image: string,
  title: string,
  description?: string,
  answer: number,
  alternatives: string[]
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}: QuestionWidgetProps) {
  const [selectedAlternative, setSelectedAlternative] = React.useState<number | undefined>(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        {question.description && (
          <p>
          {question.description}
          </p>
        )}
       

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

interface QuizPageProps{
  externalQuestions: Question[],
  externalBg: string
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }: QuizPageProps) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState<boolean[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result: boolean) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {

    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);

  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
