import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft } from 'react-icons/fa';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CardDarkSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#29282E" highlightColor="#1B1B20">
      <Base>
        <QuoteContainer>
          <FaQuoteLeft />
        </QuoteContainer>
        <Text count={2} width="300px" height="20px" />
        <PlaceName width="150px" height="15px" />
      </Base>
    </SkeletonTheme>
  );
};

export default CardDarkSkeleton;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: calc(387px - 5px);
  height: 161px;
  border: 1px solid ${({ theme }) => theme.color.cardBorder};
  border-radius: 16px;

  padding: 24px 30px;
`;

const QuoteContainer = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.color.cardBorder};
`;

const PlaceName = styled(Skeleton)`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Text = styled(Skeleton)`
  margin-top: 8px;

  width: 100%;
  height: 40px;
`;
