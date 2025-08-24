

export type JobCardProps = {
  id: string;
  title: string;
  description: string;
  createdAt: string; // same note: Date if Prisma, string if serialized
  createdBy: {
    name: string;
    email: string;
  };
  skills: {
    id: string;
    name: string;
  }[];
};