-- Native portfolio CMS. Run once in the Supabase SQL editor.

create table if not exists public.content_sections (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id)
);

alter table public.content_sections enable row level security;

drop policy if exists "Public can read content" on public.content_sections;
drop policy if exists "Authenticated can insert content" on public.content_sections;
drop policy if exists "Authenticated can update content" on public.content_sections;

create policy "Public can read content"
  on public.content_sections
  for select
  to anon, authenticated
  using (true);

create policy "Authenticated can insert content"
  on public.content_sections
  for insert
  to authenticated
  with check (true);

create policy "Authenticated can update content"
  on public.content_sections
  for update
  to authenticated
  using (true)
  with check (true);

create or replace function public.set_content_section_meta()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$;

drop trigger if exists content_sections_set_meta on public.content_sections;
create trigger content_sections_set_meta
  before insert or update on public.content_sections
  for each row
  execute function public.set_content_section_meta();

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read media" on storage.objects;
drop policy if exists "Authenticated upload media" on storage.objects;
drop policy if exists "Authenticated update media" on storage.objects;
drop policy if exists "Authenticated delete media" on storage.objects;

create policy "Public read media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "Authenticated upload media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "Authenticated update media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

create policy "Authenticated delete media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'media');

create table if not exists public.seo_integrations (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'google',
  connected_email text,
  refresh_token text,
  access_token text,
  access_token_expires_at timestamptz,
  gsc_site_url text,
  ga4_property_id text,
  gbp_account_name text,
  gbp_location_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists seo_integrations_provider_idx on public.seo_integrations (provider);

alter table public.seo_integrations enable row level security;

drop policy if exists "Authenticated manage seo integrations" on public.seo_integrations;
create policy "Authenticated manage seo integrations"
  on public.seo_integrations
  for all
  to authenticated
  using (true)
  with check (true);

create table if not exists public.seo_insight_snapshots (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'combined',
  time_window text not null default '28d',
  payload jsonb not null default '{}'::jsonb,
  fetched_at timestamptz not null default now()
);

alter table public.seo_insight_snapshots enable row level security;

drop policy if exists "Authenticated manage seo snapshots" on public.seo_insight_snapshots;
create policy "Authenticated manage seo snapshots"
  on public.seo_insight_snapshots
  for all
  to authenticated
  using (true)
  with check (true);

create table if not exists public.seo_score_history (
  id uuid primary key default gen_random_uuid(),
  target text not null,
  overall integer not null,
  seo integer not null,
  aeo integer not null,
  geo integer not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists seo_score_history_target_idx on public.seo_score_history (target, created_at desc);
create index if not exists seo_insight_snapshots_fetched_idx on public.seo_insight_snapshots (fetched_at desc);
create index if not exists seo_engine_log_run_id_idx on public.seo_engine_log (run_id);

alter table public.seo_score_history enable row level security;

drop policy if exists "Authenticated manage seo score history" on public.seo_score_history;
create policy "Authenticated manage seo score history"
  on public.seo_score_history
  for all
  to authenticated
  using (true)
  with check (true);

create table if not exists public.seo_engine_settings (
  id uuid primary key default gen_random_uuid(),
  mode text not null default 'suggest',
  provider_preference text,
  updated_at timestamptz not null default now()
);

alter table public.seo_engine_settings enable row level security;

drop policy if exists "Authenticated manage seo engine settings" on public.seo_engine_settings;
create policy "Authenticated manage seo engine settings"
  on public.seo_engine_settings
  for all
  to authenticated
  using (true)
  with check (true);

create table if not exists public.seo_field_pins (
  field_path text primary key,
  reason text not null default 'Manual CMS edit',
  updated_at timestamptz not null default now()
);

alter table public.seo_field_pins enable row level security;

drop policy if exists "Authenticated manage seo field pins" on public.seo_field_pins;
create policy "Authenticated manage seo field pins"
  on public.seo_field_pins
  for all
  to authenticated
  using (true)
  with check (true);

create table if not exists public.seo_engine_log (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null,
  target text not null,
  provider text not null default 'heuristic',
  mode text not null default 'suggest',
  applied jsonb not null default '{}'::jsonb,
  queued jsonb not null default '{}'::jsonb,
  rejected jsonb not null default '[]'::jsonb,
  reason text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists seo_engine_log_created_idx on public.seo_engine_log (created_at desc);

alter table public.seo_engine_log enable row level security;

drop policy if exists "Authenticated manage seo engine log" on public.seo_engine_log;
create policy "Authenticated manage seo engine log"
  on public.seo_engine_log
  for all
  to authenticated
  using (true)
  with check (true);

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
