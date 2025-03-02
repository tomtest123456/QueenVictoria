import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import Confetti from 'react-confetti';

// Enhanced styled components
const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f7 0%, #fff 100%);
  font-family: 'Poppins', sans-serif;
`;

const Navbar = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const Section = styled(motion.section)`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled(motion.h1)`
  color: #ff69b4;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-top: 5rem;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.1);
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
  box-shadow: 0 4px 6px rgba(255, 105, 180, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(255, 105, 180, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Card = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const LoveMeter = styled.div`
  width: 100%;
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoveMeterFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(135deg, #ff69b4, #ff8da1);
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
`;

const HeartIcon = styled(motion.span)`
  display: inline-block;
  margin: 0 0.5rem;
  font-size: 1.2rem;
  color: #ff69b4;
`;

const ImageOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
`;

const BenjiImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const App: React.FC = () => {
  const [membershipCount] = useState(1);
  const [currentReason, setCurrentReason] = useState(0);
  const [compliment, setCompliment] = useState('');
  const [lovePercentage, setLovePercentage] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [showConfetti, setShowConfetti] = useState(false);
  const [canClaimKiss, setCanClaimKiss] = useState(false);
  const [showBenjiImage, setShowBenjiImage] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  // Enhanced reasons array
  const reasons = [
    "You make every day brighter than the sun! ☀️",
    "Your laugh is scientifically proven to be contagious! 😊",
    "Your hugs could cure any bad mood. 🤗",
    "You smell way better than everyone else! 🌸",
    "Your brain is an infinite source of genius and kindness. 🧠✨",
    "You're the human equivalent of a warm cookie! 🍪",
    "Your smile lights up the entire room! 😊",
    "You make ordinary moments extraordinary! ✨",
    "Your heart is pure gold! 💝",
    "You're the best adventure partner ever! 🌎"
  ];

  // Enhanced compliments array
  const compliments = [
    "If happiness had a face, it'd look just like you! ✨",
    "Your presence is like WiFi—without you, everything just lags! 📶",
    "Your cuddles have been rated 5 stars by ME! ⭐⭐⭐⭐⭐",
    "You're the human equivalent of a warm cookie on a cold day! 🍪",
    "Your smile could power a small city! 🌟",
    "You're the reason why unicorns are jealous! 🦄",
    "Being with you is better than finding money in old pockets! 💝",
    "You make my heart do the cha-cha! 💃",
    "You're the sweetest thing since Nutella! 🍫",
    "You're my favorite notification! 📱"
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
    setLovePercentage((prev) => {
      const newValue = Math.min(prev + 50, 999);
      if (newValue >= 500) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      return newValue;
    });
  };

  const handleClaimKiss = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleBenjiKissRequest = () => {
    setShowBenjiImage(true);
    setTimeout(() => {
      // Zoom in animation sequence
      setImageZoom(2);
      setTimeout(() => {
        setImageZoom(3);
        setTimeout(() => {
          setImageZoom(1);
          setTimeout(() => {
            setShowBenjiImage(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <AppContainer>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <AnimatePresence>
        {showBenjiImage && (
          <ImageOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBenjiImage(false)}
          >
            <BenjiImage
              src="https://raw.githubusercontent.com/tomtest123456/QueenVictoria/main/WhatsApp%20Image%202025-03-02%20at%2015.20.00_f4c67c38.jpg"
              alt="Benji's Kiss"
              animate={{ scale: imageZoom }}
              transition={{ duration: 1 }}
            />
          </ImageOverlay>
        )}
      </AnimatePresence>

      <Navbar
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <a href="#home">Home</a>
        <a href="#kiss">Claim Your Kiss</a>
      </Navbar>

      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Official Fan Club of Victoria{' '}
        <HeartIcon
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ❤️
        </HeartIcon>
      </Title>

      <Section>
        <Card
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
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
              style={{ fontSize: '1.2rem', color: '#444' }}
            >
              {reasons[currentReason]}
            </motion.p>
          </AnimatePresence>
        </Card>

        <Card>
          <h2>Compliment Generator</h2>
          <AnimatePresence>
            {compliment && (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{ fontSize: '1.2rem', color: '#444' }}
              >
                {compliment}
              </motion.p>
            )}
          </AnimatePresence>
          <Button
            onClick={handleComplimentClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Give Me a Compliment! ✨
          </Button>
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
          <motion.p
            animate={{ scale: lovePercentage > 500 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            Love at {lovePercentage}%! {lovePercentage > 500 ? '🚀' : '❤️'}
          </motion.p>
          <Button
            onClick={handleLoveMeterClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Measure Love Again 💝
          </Button>
        </Card>

        <Card id="kiss">
          <h2>Next Kiss Countdown</h2>
          {timeRemaining > 0 ? (
            <motion.p
              animate={{ scale: timeRemaining < 10 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: '2rem', color: '#ff69b4' }}
            >
              {formatTime(timeRemaining)}
            </motion.p>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Redeemable anytime, anywhere! 💋
              </motion.p>
              {canClaimKiss && (
                <>
                  <Button
                    onClick={handleClaimKiss}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Claim Your Kiss 💋
                  </Button>
                  <Button
                    onClick={handleBenjiKissRequest}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ background: 'linear-gradient(135deg, #4CAF50, #8BC34A)' }}
                  >
                    Request a Kiss from Benji 🐕
                  </Button>
                </>
              )}
            </>
          )}
        </Card>
      </Section>
    </AppContainer>
  );
};

export default App;
