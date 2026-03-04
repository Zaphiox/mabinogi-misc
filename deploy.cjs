const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

const remote = process.env.DEPLOY_REMOTE;

if (!remote) {
    console.error("Error: DEPLOY_REMOTE not found in .env.local");
    process.exit(1);
}

try {
    // Execute commands one by one to ensure pathing is correct
    execSync('npm run build', { stdio: 'inherit' });
    process.chdir('dist');
    execSync('git init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Deploy"', { stdio: 'inherit' });
    execSync('git push -f origin master:gh-pages', { stdio: 'inherit' });
    console.log('Ready for deployment action!');
} catch (e) {
    console.error('build failed');
    process.exit(1);
}