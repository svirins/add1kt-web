declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANITY_DATASET: "development";
      NEXT_PUBLIC_SANITY_PROJECT_ID: string;
      NODE_ENV: "development" | "production";
      SANITY_API_TOKEN: string;
      SANITY_WEBHOOK_SECRET: string;
      NEXT_PUBLIC_LOGFLARE_KEY: string;
      NEXT_PUBLIC_LOGFLARE_TOKEN: string;
      NEXT_PUBLIC_PANELBEAR_SITE_ID: string;
      NEXT_PUBLIC_ALGOLIA_APP_ID: string;
      NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;
      ALGOLIA_SEARCH_ADMIN_KEY: string;
    }
  }
}

export {};
