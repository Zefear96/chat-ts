export type MessageProps = {
  id: string;
  data: {
    dislayName?: string;
    email?: string;
    timestamp?: any;
    message: string;
    photo: string;
    uid: string;
  };
}

export type StyledProps = {
  user: string;
  uid: string;
}

