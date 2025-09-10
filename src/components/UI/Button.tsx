import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const StyledButton = styled(motion.button)<{
  $variant: ButtonProps['variant'];
  $size: ButtonProps['size'];
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.animations.fast};
  cursor: pointer;
  border: none;
  
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: 0.5rem 1rem;
          font-size: ${theme.typography.fontSize.sm};
          @media (max-width: 768px) {
            padding: 0.375rem 0.75rem;
            font-size: ${theme.typography.fontSize.xs};
          }
        `;
      case 'lg':
        return `
          padding: 1rem 1.5rem;
          font-size: ${theme.typography.fontSize.lg};
          @media (max-width: 768px) {
            padding: 0.75rem 1rem;
            font-size: ${theme.typography.fontSize.base};
          }
        `;
      default:
        return `
          padding: 0.75rem 1.25rem;
          font-size: ${theme.typography.fontSize.base};
          @media (max-width: 768px) {
            padding: 0.5rem 0.875rem;
            font-size: ${theme.typography.fontSize.sm};
          }
        `;
    }
  }}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.gradients.accent};
          color: ${theme.colors.text.primary};
          box-shadow: ${theme.shadows.glow};
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.glow}, ${theme.shadows.lg};
          }
        `;
      case 'secondary':
        return `
          background: ${theme.gradients.secondary};
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.border};
          backdrop-filter: blur(10px);
          &:hover:not(:disabled) {
            border-color: ${theme.colors.accent};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      default: // ghost
        return `
          background: transparent;
          color: ${theme.colors.text.secondary};
          &:hover:not(:disabled) {
            background: ${theme.colors.surface};
            color: ${theme.colors.text.primary};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'ghost',
  size = 'md',
  children,
  onClick,
  disabled,
  className,
  icon,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};