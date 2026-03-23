const required = [
  "MONGO_URI",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

export const validateEnv = () =>{
    const missing = required.filter((key) => !process.env[key])

    if(missing.length > 0){
        console.error('/n[env] Missing required environment variables:')
        missing.forEach((key)=> console.error(`${key}`));
        console.error('\nCopy .env.example to .env and fill in the values.\n');
        process.exit(1);
    }
    console.log('[env] All required environment variables present');
}
