# Supabase Setup for Safemateofficial

## 🔗 Connect to Your Supabase Project

### 1. Create Environment Variables File

Create a `.env.local` file in your project root with your Safemateofficial Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-safemateofficial-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-safemateofficial-anon-key
```

### 2. Find Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your **Safemateofficial** project
4. Go to **Settings** → **API**
5. Copy the following:
   - **Project URL** (use for `VITE_SUPABASE_URL`)
   - **Anon/Public key** (use for `VITE_SUPABASE_ANON_KEY`)

### 3. Database Setup (Optional)

If you want to set up user profiles, create this table in your Supabase SQL editor:

```sql
-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- Create function to automatically create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signups
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Test the Connection

After setting up your environment variables, restart the development server:

```bash
npm run dev
```

The app will automatically connect to your Safemateofficial Supabase project and you'll be ready to implement authentication and database features.

## 🔧 Troubleshooting

- Make sure your `.env.local` file is in the project root (same level as `package.json`)
- Ensure the environment variable names start with `VITE_` for Vite to recognize them
- Restart the development server after adding environment variables
- Check that your Supabase project is active and the credentials are correct