const { execSync } = require('child_process');
require('dotenv').config({ path: '.env.local' });

const remote = process.env.DEPLOY_REMOTE;

try {
    console.log('Building...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('Deploying to GitHub Pages...');
    const commands = [
        `cd dist`,
        `git init`,
        `git add .`,
        `git commit -m "Deploy"`,
        `git remote add origin ${remote}`,
        `git push -f origin master:gh-pages`
    ];

    execSync(commands.join(' && '), { stdio: 'inherit' });
    console.log('Successfully deployed!');
} catch (error) {
    console.error('Deployment failed:', error.message);
}