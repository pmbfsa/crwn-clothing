export type DirectoryItem = {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
};

export type DirectoryItemProps = {
  directory: DirectoryItem;
};

export type BackgroundImageProps = {
  $imageUrl: string;
};
