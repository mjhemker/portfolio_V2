import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Download, MapPin, Calendar } from 'lucide-react';
import { Button } from '../UI/Button';

const AboutContainer = styled(motion.div)`
  padding: 6rem 2rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 6rem 1rem 1rem;
  }
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const ProfileImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
  border: 3px solid ${({ theme }) => theme.colors.accent};

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const AboutTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

const AboutSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: 1rem;
`;

const AboutLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const HeroSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ProfileCard = styled(motion.div)`
  background: ${({ theme }) => theme.gradients.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 100%;
  max-width: 400px;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ theme }) => theme.gradients.purple};
    opacity: 0.1;
    transform: rotate(45deg);
    transition: all ${({ theme }) => theme.animations.slow};
  }

  &:hover::before {
    transform: rotate(45deg) scale(1.1);
    opacity: 0.2;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.gradients.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  text-align: center;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AboutSection = styled(motion.div)`
  background: ${({ theme }) => theme.gradients.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradients.glow};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.normal};
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BioText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const SkillCategory = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillCategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.75rem;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;

  &:before {
    content: '•';
    color: ${({ theme }) => theme.colors.accent};
    position: absolute;
    left: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactSection = styled(motion.div)`
  grid-column: 1 / -1;
  background: ${({ theme }) => theme.gradients.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradients.glow};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.normal};
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ContactButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.animations.fast};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const skills = {
  'Frontend Development': [
    'React & Next.js',
    'TypeScript',
    'CSS & Styled Components',
    'Framer Motion',
    'Responsive Design'
  ],
  'Backend Development': [
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'REST APIs'
  ],
  'Design & Art': [
    'Digital Painting',
    'Traditional Media',
    'UI/UX Design',
    'Adobe Creative Suite',
    'Figma'
  ],
  'Tools & Technologies': [
    'Git & GitHub',
    'Docker',
    'AWS',
    'Vercel',
    'VS Code'
  ]
};

export const AboutTab: React.FC = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <AboutHeader>
        <ProfileImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
          alt="Profile"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        <AboutTitle>Michael Hemker</AboutTitle>
        <AboutSubtitle>Full-Stack Developer & Digital Artist</AboutSubtitle>
        <AboutLocation>
          <MapPin size={16} />
          San Francisco, CA
        </AboutLocation>
      </AboutHeader>

      <AboutContent>
        <HeroSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <ProfileCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <ProfileImage
              src="/images/art/2024/IMG_0774 2.jpg"
              alt="Michael Hemker"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            />
            <AboutTitle>Michael Hemker</AboutTitle>
            <AboutSubtitle>Full-Stack Developer & Digital Artist</AboutSubtitle>
            <AboutLocation>
              <MapPin size={16} />
              San Francisco, CA
            </AboutLocation>
            
            <StatsGrid>
              <StatCard whileHover={{ scale: 1.05 }}>
                <StatNumber>5+</StatNumber>
                <StatLabel>Years</StatLabel>
              </StatCard>
              <StatCard whileHover={{ scale: 1.05 }}>
                <StatNumber>50+</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatCard>
              <StatCard whileHover={{ scale: 1.05 }}>
                <StatNumber>∞</StatNumber>
                <StatLabel>Ideas</StatLabel>
              </StatCard>
            </StatsGrid>
          </ProfileCard>

          <ContactSection
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <SectionTitle>Let's Connect</SectionTitle>
            <BioText>
              I'm always open to discussing new opportunities, collaborating on interesting 
              projects, or just having a conversation about technology and art.
            </BioText>
            
            <ContactButtons>
              <Button
                variant="primary"
                icon={<Mail size={16} />}
                onClick={() => window.location.href = 'mailto:hello@example.com'}
              >
                Send Email
              </Button>
              <Button
                variant="secondary"
                icon={<Download size={16} />}
                onClick={() => {
                  alert('Resume download would start here');
                }}
              >
                Download Resume
              </Button>
            </ContactButtons>

            <SocialLinks>
              <SocialLink
                href="https://github.com/example"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </SocialLink>
              <SocialLink
                href="https://linkedin.com/in/example"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </SocialLink>
            </SocialLinks>
          </ContactSection>
        </HeroSection>

        <AboutSection
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <SectionTitle>
            <Calendar size={20} />
            About Me
          </SectionTitle>
          <BioText>
            I'm a passionate full-stack developer and digital artist with a love for creating 
            beautiful, functional experiences. My journey started with traditional art, which 
            taught me to see design from both aesthetic and technical perspectives.
          </BioText>
          <BioText>
            When I'm not coding, you'll find me painting, exploring new technologies, or 
            listening to music that inspires my next project. I believe in the power of 
            combining creativity with technology to solve real problems.
          </BioText>
          <BioText>
            My goal is to create digital experiences that are not only functional but also 
            emotionally engaging and visually stunning.
          </BioText>

          <SectionTitle style={{ marginTop: '2rem' }}>Skills & Expertise</SectionTitle>
          <SkillsGrid>
            {Object.entries(skills).map(([category, skillList]) => (
              <SkillCategory key={category}>
                <SkillCategoryTitle>{category}</SkillCategoryTitle>
                <SkillList>
                  {skillList.map((skill) => (
                    <SkillItem key={skill}>{skill}</SkillItem>
                  ))}
                </SkillList>
              </SkillCategory>
            ))}
          </SkillsGrid>
        </AboutSection>
      </AboutContent>
    </AboutContainer>
  );
};