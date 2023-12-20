import React from 'react';
import styled from 'styled-components';
import { LocationType } from '../../../../model/interface';
import { HiLocationMarker } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import BookmarkBtn from './BookmarkBtn';
import ContentsSection from './ContentsSection';

const PlaceContentsDetail: React.FC<{ placeDb: LocationType | null }> = ({
  placeDb,
}) => {
  if (!placeDb) return;
  const { Category, storeName, address, Posts, starAvg } = placeDb;
  return (
    <Base>
      <BodyContainer>
        <ImageHeader imageURL={Posts[0].imgUrl} />
        <PlaceName>{storeName}</PlaceName>
        <Address>
          <HiLocationMarker />
          {address}
        </Address>
        <RatingContainer>
          {Array.from({ length: 5 }, (_, idx) => (
            <StarWrapper key={idx}>
              {idx < starAvg ? <FaStar /> : <FaRegStar />}
            </StarWrapper>
          ))}
          <span>{starAvg}점</span>
        </RatingContainer>
        <BookmarkBtn />
        {/* <ContentsSection Posts={Posts} /> */}
      </BodyContainer>
    </Base>
  );
};

export default PlaceContentsDetail;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 420px;
  height: calc(100vh - 60px);

  background-color: ${({ theme }) => theme.color.bg};
  border-right: 1px solid #d9d9d9;
  z-index: 4;
  overflow-y: scroll;
  transition: all 600ms ease;
`;

const ImageHeader = styled.div<{ imageURL: string }>`
  width: 100%;
  height: 186px;
  background: gray;
  background-image: ${({ imageURL }) => `url(${imageURL})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const BodyContainer = styled.div`
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const PlaceName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
  padding: 20px 20px 0 20px;
`;

const Address = styled.div`
  margin-top: 13px;
  color: #44a5ff;
  font-size: 16px;
  font-weight: 500;
  padding: 0 20px;
`;

const RatingContainer = styled.div`
  margin-top: 10px;

  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2px;
  span {
    margin-top: 5px;
    text-align: center;
    color: ${({ theme }) => theme.color.text};
    font-size: 16px;
    font-weight: 700;
  }
  margin-bottom: 15px;
  padding: 0 20px;
`;

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 20px;
  color: #f97393;
`;
