// Test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    // Check if environment variables are available
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    console.log('=== Supabase Connection Test ===')
    console.log('URL configured:', !!supabaseUrl)
    console.log('Key configured:', !!supabaseKey)
    
    if (supabaseUrl) {
      console.log('Supabase URL:', supabaseUrl)
    } else {
      console.log('❌ VITE_SUPABASE_URL not found')
    }
    
    if (supabaseKey) {
      console.log('Supabase Key:', supabaseKey.substring(0, 20) + '...')
    } else {
      console.log('❌ VITE_SUPABASE_ANON_KEY not found')
    }
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials in environment variables')
    }
    
    // Try to import and initialize Supabase
    const { supabase } = await import('../services/supabase')
    
    // Test basic connection
    const { data, error } = await supabase.from('_supabase_test').select('*').limit(1)
    console.log('Connection test result:', { data, error })
    
    return {
      success: true,
      url: supabaseUrl,
      keyConfigured: !!supabaseKey,
      connectionTest: { data, error }
    }
  } catch (err) {
    console.error('Supabase connection test failed:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error'
    }
  }
}