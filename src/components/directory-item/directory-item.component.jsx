import { useNavigate } from 'react-router';

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from './directory-item.styles.jsx';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage $imageUrl={imageUrl}></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Show Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
