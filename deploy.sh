echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* yukesh2@74.96.70.148:/var/www/74.96.70.148/

echo "Done"