import { createClient } from '@supabase/supabase-js'

const url = 'https://lpmkcxkcnjebkyzcuuns.supabase.co'
const anonKey = `${process.env.VITE_SUPABASE_ANON_KEY}`
export const url = 'https://lpmkcxkcnjebkyzcuuns.supabase.co'

export const supabase = createClient(url, anonKey)