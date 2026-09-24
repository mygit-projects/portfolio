-- Run in the Supabase SQL editor if seo_sitemap is not in your project yet.

create table if not exists public.seo_sitemap (
  id uuid primary key default gen_random_uuid(),
  entries jsonb not null default '[]'::jsonb,
  generated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id)
);

alter table public.seo_sitemap enable row level security;

drop policy if exists "Authenticated manage seo sitemap" on public.seo_sitemap;
create policy "Authenticated manage seo sitemap"
  on public.seo_sitemap
  for all
  to authenticated
  using (true)
  with check (true);
