-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create a table for domains
create table domains (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create a table for paths
create table paths (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  domain_id uuid references domains(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (name, domain_id)
);

-- Create a table for images
create table images (
  id uuid default uuid_generate_v4() primary key,
  path_id uuid references paths(id) on delete cascade,
  src text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on all tables
alter table domains enable row level security;
alter table paths enable row level security;
alter table images enable row level security;

-- Create policies for domains
create policy "Users can create their own domains"
  on domains for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own domains"
  on domains for select
  using (auth.uid() = user_id);

create policy "Users can update their own domains"
  on domains for update
  using (auth.uid() = user_id);

create policy "Users can delete their own domains"
  on domains for delete
  using (auth.uid() = user_id);

-- Create policies for paths
create policy "Users can create paths in their domains"
  on paths for insert
  with check (auth.uid() = (select user_id from domains where id = domain_id));

create policy "Users can view paths in their domains"
  on paths for select
  using (auth.uid() = (select user_id from domains where id = domain_id));

create policy "Users can update paths in their domains"
  on paths for update
  using (auth.uid() = (select user_id from domains where id = domain_id));

create policy "Users can delete paths in their domains"
  on paths for delete
  using (auth.uid() = (select user_id from domains where id = domain_id));

-- Create policies for images
create policy "Users can insert images in their paths"
  on images for insert
  with check (auth.uid() = (select user_id from domains where id = (select domain_id from paths where id = path_id)));

create policy "Users can view images in their paths"
  on images for select
  using (auth.uid() = (select user_id from domains where id = (select domain_id from paths where id = path_id)));

create policy "Users can update images in their paths"
  on images for update
  using (auth.uid() = (select user_id from domains where id = (select domain_id from paths where id = path_id)));

create policy "Users can delete images in their paths"
  on images for delete
  using (auth.uid() = (select user_id from domains where id = (select domain_id from paths where id = path_id)));

-- Create indexes for better query performance
create index idx_domains_user_id on domains(user_id);
create index idx_paths_domain_id on paths(domain_id);
create index idx_images_path_id on images(path_id);
