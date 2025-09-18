export type Member = {
  id: string;
  name: string;
  url: string;
  category?: "model" | "tool" | "infra" | "agent";
  price?: "free" | "freemium" | "paid";
  openSource?: boolean;
  score?: number;
  desc?: string;
  logo?: string;
  clicks7d?: number;
  createdAt?: string;
};
