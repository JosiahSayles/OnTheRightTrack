// global-setup.js
const { exec } = require("child_process");

module.exports = async () => {
  // Start the server
  const server = exec("npm run dev", { cwd: "../Server" });
  // Wait for server to be ready (you might need to poll or use a library like wait-on)
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simple delay
  global.serverProcess = server;
};

// global-teardown.js
module.exports = async () => {
  if (global.serverProcess) {
    global.serverProcess.kill();
  }
};
