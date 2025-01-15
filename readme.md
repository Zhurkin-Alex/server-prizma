pm2 start public/server.js --name server
pm2 restart server
pm2 kill

After updating the schema (if needed), run the following commands to apply changes:

npx prisma migrate dev --name update-site-schema
1) npx prisma generate - после того как обновили schema нужно сгенерировать призму


### Environment Variables

Create a `.env` file with the following content:

NODE_ENV=development

PORT=4200

DATABASE_URL="postgresql://postgres:1812@localhost:5432/twitter?schema=public"
