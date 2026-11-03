-- Fix: Add UPDATE policy for orders table (for cancel order functionality)
-- Run this in Supabase SQL Editor AFTER running complete-migration.sql

-- Drop existing orders policies
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update own orders" ON public.orders;

-- Recreate orders policies with UPDATE grant
REVOKE ALL ON public.orders FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON public.orders FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'orders';