import type { FC } from 'react';

import { useNavigate } from 'react-router';

import type { DirectoryItemProps } from './directory-item.types';

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from './directory-item.styles';

const DirectoryItem: FC<DirectoryItemProps> = ({ directory }) => {
  const { title, imageUrl, route } = directory;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer
      data-testid="directory-item"
      onClick={onNavigateHandler}
    >
      <BackgroundImage $imageUrl={imageUrl}></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Show Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
