export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary: string;
  postedAt: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
  contactEmail: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: "Report" | "Guide" | "Template" | "Toolkit";
  link: string;
  author: string;
  updatedAt: string;
  highlights: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  content: string[];
};
