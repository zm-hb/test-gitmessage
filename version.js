import cp from 'child_process'
import fs from 'fs'
const execSync = cp.execSync;
// 读取package.json文件
const data = fs.readFileSync('./package.json');
const packageData = JSON.parse(data);

// 获取git信息的相关命令
const COMMITHASH_COMMAND = 'rev-parse HEAD';
const VERSION_COMMAND = 'describe --always';
const BRANCH_COMMAND = 'rev-parse --abbrev-ref HEAD';
const NEW_COMMIT_MESSAGE = 'log -1 --pretty=%B';
const COMMIT_TIME = 'show -s --format=%cd';
try {
    const d = new Date();
    const commitId = execSync(`git ${COMMITHASH_COMMAND}`).toString().trim();
    const branch = execSync(`git ${BRANCH_COMMAND}`).toString().trim();
    const release = execSync(`git ${VERSION_COMMAND}`).toString().trim();
    const commitMessage = execSync(`git ${NEW_COMMIT_MESSAGE}`).toString().trim();
    const commitTime = execSync(`git ${COMMIT_TIME}`).toString().trim();
    const versionStr = `
      COMMIT_ID: ${commitId}

      Branch: ${branch}

      Release: ${release}

      CommitMessage: ${commitMessage}

      CommitTime: ${commitTime}

      PackingTime: ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}

      Version: ${packageData.version}
  `;

    fs.writeFileSync(`dist/version.txt`, versionStr);
} catch (e) {
    throw new Error(e);
}
