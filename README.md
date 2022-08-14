# Github Backup

### Step 1: Create a Personal Access Token (PAT)
[GitHub Docs](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) on how to create one.

### Step 2: Add PAT to .env file.
Create a `.env` file with your PAT as show below (just like the `.env.sample` file).

```filename=".env"
PERSONAL_ACCESS_TOKEN="your access token"
```
  
### Step 3: Install Dependencies and Run the Script.
```
npm i
node index.js
```
