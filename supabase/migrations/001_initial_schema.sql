```sql
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create users table
create table if not exists public.users (
  id uuid default uuid_generate_v4() primary key,
  telegram_id text unique not null,
  username text,
  first_name text,
  last_name text,
  avatar_url text,
  is_premium boolean default false,
  level integer default 1,
  experience integer default 0,
  generations_today integer default 0,
  generations_total integer default 0,
  balance decimal default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tracks table
create table if not exists public.tracks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  genre text not null,
  mood text not null,
  prompt text not null,
  audio_url text not null,
  cover_url text,
  duration integer not null,
  plays integer default 0,
  likes_count integer default 0,
  is_public boolean default true,
  author_id uuid references public.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create likes table
create table if not exists public.likes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  track_id uuid references public.tracks(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, track_id)
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.tracks enable row level security;
alter table public.likes enable row level security;

-- Create policies
create policy "Users can read their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

create policy "Anyone can read public tracks" on public.tracks
  for select using (is_public = true);

create policy "Users can create their own tracks" on public.tracks
  for insert with check (auth.uid() = author_id);

create policy "Users can update their own tracks" on public.tracks
  for update using (auth.uid() = author_id);
```
