import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const UPLOEAD_PHOTO = gql`
  fragment FeedPhoto on Photo {
    ...PhotoFragment
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${PHOTO_FRAGMENT}
`;
