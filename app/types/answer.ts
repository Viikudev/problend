export type AnswerProps = {
  id: string;
  content: string;
  imageUrl?: string;
  issueId: string;
  userId: string;
  createdAt: Date;
  User?: UserProps;
};


export type UserProps = {
  firstname?: string;
  lastname?: string;
};