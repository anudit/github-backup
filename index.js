require('dotenv').config();
const { Octokit, App } = require("octokit");
const fs = require('fs/promises')

const octokit = new Octokit({ auth: process.env.PERSONAL_ACCESS_TOKEN });

async function start(){
  const res = await octokit.rest.users.getAuthenticated();

  let repos = [];
  let repoTemp = [];
  let page = 0;
  do {
    console.log('Getting Page', page);
    repoTemp = await octokit.request('GET /users/{username}/repos', {
      username: res.data.login,
      per_page: 100,
      page,
    });
    repos = repos.concat(repoTemp.data);
    page+=1;
  } while (repoTemp.data.length>0);

  for (let index = 0; index < repos.length; index++) {
    const repo = repos[index];
    console.log('Downloading', repo.full_name, `${index+1}/${repos.length}`);
    try{
      let download = await octokit.rest.repos.downloadZipballArchive({
        owner: res.data.login,
        repo: repo.name,
      })
      await fs.writeFile(`./repos/${repo.name}.zip`, Buffer.from(download.data));
    }
    catch{
      console.error(`🔴 Downloading ${repo.full_name} Failed`);
      continue;
    }
  }

}

start();
