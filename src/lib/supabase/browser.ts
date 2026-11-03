"use client";
import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfig } from "./config";
let client: ReturnType<typeof createBrowserClient> | undefined;
export function createBrowserSupabaseClient() { if (!client) { const {url,key}=supabaseConfig(); client=createBrowserClient(url,key); } return client; }
