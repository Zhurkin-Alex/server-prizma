pm2 start dist/server.js --name server
pm2 restart server
pm2 kill

After updating the schema (if needed), run the following commands to apply changes:

npx prisma migrate dev --name update-site-schema
npx prisma generate