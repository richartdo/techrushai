-- Additive learner-owned profile settings. No existing learner records are removed or rewritten.
alter table public.profiles
  add column if not exists resume_status text not null default 'not_provided' check (resume_status in ('not_provided','preparing','uploaded')),
  add column if not exists profile_visibility text not null default 'private' check (profile_visibility in ('private','unlisted'));
