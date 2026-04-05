'use strict';

const { getGitInfo } = require('../../utils/gitInfo');

// Start the overmoderator bot
console.log('[airhornbot] Starting overmoderator...');
getGitInfo().then(gitInfo => {
  console.log(`[airhornbot] Git: branch=${gitInfo.branch} commit=${gitInfo.commit ? gitInfo.commit.slice(0, 7) : 'unknown'}`);
}).catch(() => {});
