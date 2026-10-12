-- Aureum demo şeması. Supabase SQL Editor'da çalıştırılabilir.
-- Üretimde insert politikalarını kısıtlayın veya kayıtları bir server action üzerinden alın.

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  service_id text not null,
  appointment_date date not null,
  appointment_time text not null,
  full_name text not null,
  phone text not null,
  email text not null,
  note text,
  contact_channel text not null default 'whatsapp' check (contact_channel in ('phone', 'whatsapp', 'email')),
  visitor_origin text not null default 'local' check (visitor_origin in ('local', 'abroad')),
  locale text not null check (locale in ('tr', 'en')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  locale text not null check (locale in ('tr', 'en')),
  status text not null default 'new',
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;
alter table public.contact_messages enable row level security;

create policy "demo insert appointments"
  on public.appointments
  for insert
  to anon, authenticated
  with check (true);

create policy "demo insert messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
