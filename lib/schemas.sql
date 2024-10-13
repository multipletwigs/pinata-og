create table paths (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (name, user_id)
);

alter table paths enable row level security;

create policy "Users can create their own paths"
  on paths for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own paths"
  on paths for select
  using (auth.uid() = user_id);

create policy "Users can update their own paths"
  on paths for update
  using (auth.uid() = user_id);

create policy "Users can delete their own paths"
  on paths for delete
  using (auth.uid() = user_id);

create index idx_paths_user_id on paths(user_id);
