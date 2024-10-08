export default ({ config }) => {
    return {
      ...config,
      extra: {
        "eas": {
          "projectId": "eb90097e-a1f2-4118-ad15-d4c205f0ccec"
        },
        supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
        supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_KEY,
        hereApiKey: process.env.EXPO_PUBLIC_HERE_API_KEY,
      },
    };
  };