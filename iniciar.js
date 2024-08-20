const { exec } = require('child_process');

const runCommand = (command, cwd) => {
  const process = exec(command, { cwd });
  process.stdout.on('data', (data) => {
    console.log(`[${cwd}] ${data}`);
  });
  process.stderr.on('data', (data) => {
    console.error(`[${cwd}] ${data}`);
  });
  return process;
};

console.log('Iniciando frontend e backend...');

// Inicie o backend
const backendProcess = runCommand('uvicorn main:app --reload', './backend');

// Inicie o frontend
const frontendProcess = runCommand('npm start', './frontend');

process.on('SIGINT', () => {
  console.log('Encerrando processos...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit();
});
