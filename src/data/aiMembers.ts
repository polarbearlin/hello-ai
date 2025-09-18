export type Member = {
  id: string;          // 稳定 ID
  name: string;        // 名称
  url: string;         // 官网链接
  score: number;       // 排名依据（越大越靠前）
  category?: "model" | "tool" | "infra" | "agent";
  logo?: string;       // public 下相对路径或远程图
};

export const members: Member[] = [
  { id: "openrouter", name: "OpenRouter", url: "https://openrouter.ai", score: 96, category: "infra", logo: "/logos/openrouter.png" },
  { id: "perplexity", name: "Perplexity", url: "https://www.perplexity.ai", score: 94, category: "agent", logo: "/logos/perplexity.png" },
  { id: "vapi", name: "Vapi", url: "https://vapi.ai", score: 90, category: "infra", logo: "/logos/vapi.png" },
  { id: "midjourney", name: "Midjourney", url: "https://www.midjourney.com", score: 92, category: "tool", logo: "/logos/midjourney.png" },
  { id: "openai", name: "OpenAI", url: "https://openai.com", score: 98, category: "model", logo: "/logos/openai.png" }
];
