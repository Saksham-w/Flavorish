// Shared TypeScript types for the application

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  img?: string | null;
}

export interface Post {
  id: string;
  title: string;
  subtitle?: string | null;
  desc: string;
  img?: string | null;
  images?: string[];
  slug: string;
  catSlug: string;
  rating?: number;
  location?: string | null;
  views: number;
  userEmail: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  desc: string;
  createdAt: Date;
  userEmail: string;
  postSlug: string;
  user: User;
}

export interface CardProps {
  item: Post;
}

export interface MenuProps {
  showRecent?: boolean;
}
