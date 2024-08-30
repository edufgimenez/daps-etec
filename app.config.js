export default ({ config }) => {
    return {
      ...config,
      extra: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_KEY,
      },
    };
  };