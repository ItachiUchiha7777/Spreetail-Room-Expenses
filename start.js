const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Shared Flatmate Expenses App...');

const runProcess = (command, args, cwd, label, colorCode) => {
  // On Windows, npm commands need to run inside a shell
  const isWin = process.platform === 'win32';
  const proc = spawn(isWin ? 'cmd.exe' : command, isWin ? ['/c', command, ...args] : args, {
    cwd,
    shell: true
  });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`\x1b[${colorCode}m[${label}]\x1b[0m ${line.trim()}`);
      }
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.error(`\x1b[31m[${label} ERROR]\x1b[0m ${line.trim()}`);
      }
    });
  });

  proc.on('close', (code) => {
    console.log(`[${label}] process exited with code ${code}`);
  });

  return proc;
};

// Start Backend Server on Port 5000
const backendCwd = path.join(__dirname, 'backend');
const backend = runProcess('npm', ['run', 'dev'], backendCwd, 'Backend', '36'); // Cyan

// Start Frontend Dev Server on Port 5173
const frontendCwd = path.join(__dirname, 'frontend');
const frontend = runProcess('npm', ['run', 'dev'], frontendCwd, 'Frontend', '32'); // Green

// Handle clean shutdown
const cleanup = () => {
  console.log('\nStopping servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
