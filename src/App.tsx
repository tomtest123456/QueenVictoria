import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import Confetti from 'react-confetti';

// Styled components
const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  background: #fff;
  font-family: 'Poppins', sans-serif;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Section = styled.section`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  color: #ff69b4;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-top: 5rem;
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #ff69b4, #ff8da1);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  margin: 1rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Card = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
`;

const LoveMeter = styled.div`
  width: 100%;
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
`;

const LoveMeterFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(135deg, #ff69b4, #ff8da1);
`;

const App: React.FC = () => {
  const [membershipCount] = useState(1);
  const [currentReason, setCurrentReason] = useState(0);
  const [compliment, setCompliment] = useState('');
  const [lovePercentage, setLovePercentage] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [showConfetti, setShowConfetti] = useState(false);
  const [canClaimKiss, setCanClaimKiss] = useState(false);

  const reasons = [
    "You make every day brighter than the sun!",
    "Your laugh is scientifically proven to be contagious!",
    "Your hugs could cure any bad mood.",
    "You smell way better than everyone else.",
    "Your brain is an infinite source of genius and kindness."
  ];

  const compliments = [
    "If happiness had a face, it'd look just like you.",
    "Your presence is like WiFi—without you, everything just lags.",
    "Your cuddles have been rated 5 stars by ME.",
    "You're the human equivalent of a warm cookie on a cold day.",
    "Your smile could power a small city!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReason((prev) => (prev + 1) % reasons.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          setCanClaimKiss(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleComplimentClick = () => {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setCompliment(randomCompliment);
  };

  const handleLoveMeterClick = () => {
    setLovePercentage((prev) => Math.min(prev + 50, 999));
  };

  const handleClaimKiss = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <AppContainer>
      {showConfetti && <Confetti />}
      <Navbar>
        <a href="#home">Home</a>
        <a href="#kiss">Claim Your Kiss</a>
      </Navbar>

      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Official Fan Club of Victoria
      </Title>

      <Section>
        <Card>
          <h3>Membership Count: {membershipCount}</h3>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Sorry, only one fan allowed!"
            disabled
          >
            Join Fan Club
          </Button>
        </Card>

        <Card
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Why Victoria Is Amazing</h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentReason}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {reasons[currentReason]}
            </motion.p>
          </AnimatePresence>
        </Card>

        <Card>
          <h2>Compliment Generator</h2>
          {compliment && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {compliment}
            </motion.p>
          )}
          <Button onClick={handleComplimentClick}>Give Me a Compliment!</Button>
        </Card>

        <Card>
          <h2>Love-o-Meter</h2>
          <LoveMeter>
            <LoveMeterFill
              initial={{ width: '100%' }}
              animate={{ width: `${lovePercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </LoveMeter>
          <p>Love at {lovePercentage}%!</p>
          <Button onClick={handleLoveMeterClick}>Measure Love Again</Button>
        </Card>

        <Card id="kiss">
          <h2>Next Kiss Countdown</h2>
          {timeRemaining > 0 ? (
            <p>{formatTime(timeRemaining)}</p>
          ) : (
            <>
              <p>Redeemable anytime, anywhere!</p>
              {canClaimKiss && (
                <Button onClick={handleClaimKiss}>Claim Your Kiss</Button>
              )}
            </>
          )}
        </Card>
      </Section>
    </AppContainer>
  );
};

export default App;
