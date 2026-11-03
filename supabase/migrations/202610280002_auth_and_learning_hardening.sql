-- Additive Phase 2 migration. Apply only through Supabase migrations/SQL editor; it does not delete data.
create table if not exists public.learner_skill_mastery (id uuid primary key default uuid_generate_v4(), user_id uuid not null references public.profiles(id) on delete cascade, skill_name text not null, mastery_score numeric not null check(mastery_score between 0 and 100), latest_evidence text, updated_at timestamptz not null default now(), unique(user_id,skill_name));
create index if not exists learner_skill_mastery_owner_idx on public.learner_skill_mastery(user_id,updated_at desc);
alter table public.learner_skill_mastery enable row level security;
create policy "own skill mastery" on public.learner_skill_mastery for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "own module writes" on public.learning_modules for insert with check(exists(select 1 from public.learning_paths p where p.id=learning_path_id and p.user_id=auth.uid()));
create policy "own module changes" on public.learning_modules for update using(exists(select 1 from public.learning_paths p where p.id=learning_path_id and p.user_id=auth.uid())) with check(exists(select 1 from public.learning_paths p where p.id=learning_path_id and p.user_id=auth.uid()));
create policy "own module deletes" on public.learning_modules for delete using(exists(select 1 from public.learning_paths p where p.id=learning_path_id and p.user_id=auth.uid()));
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'display_name','')); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
