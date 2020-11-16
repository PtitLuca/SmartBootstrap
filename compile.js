// Step 1 : Get all files in the contracts folder.
const fs = require('fs');
const path = require('path');
const solc = require('solc');

function getContractsFiles() {
  const contractFolderPath = path.join(__dirname, 'contracts/');
  const files = fs.readdirSync(contractFolderPath);
  const fileToContent = new Map();
  files.forEach((file) => {
    const content = fs.readFileSync(contractFolderPath + file, 'utf-8');
    fileToContent.set(file, content);
  });
  return fileToContent
}

// Step 2 : Compile contract
function compileContracts(filenameToContent) {
  let preCompile = {
    language: 'Solidity',
    sources: {},
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
  let sources = {};
  filenameToContent.forEach((value, key) => {
    sources[key] = {
      content: value,
    };
  });
  preCompile.sources = sources;
  const { contracts } = JSON.parse(solc.compile(JSON.stringify(preCompile)));

  return contracts;
}

// Step 3 : Write abi and bytecode to files.
function writeToFile(data, filename) {
  const outputFilePath = path.join(__dirname, './out/') + filename + '.json';
  fs.writeFileSync(outputFilePath, data);
}

function writeOutputToFiles(contractFiles) {
  for (const file in contractFiles) {
    if (contractFiles.hasOwnProperty(file)) {
      for (const contract in contractFiles[file]) {
        if (contractFiles[file].hasOwnProperty(contract)) {
          const abi = contractFiles[file][contract].abi;
          const bytecode = contractFiles[file][contract].evm.bytecode;
          writeToFile(JSON.stringify(abi), contract.toLowerCase() + '-abi');
          writeToFile(JSON.stringify(bytecode), contract.toLowerCase() + '-bytecode');
        }
      }
    }
  }
}

writeOutputToFiles(compileContracts(getContractsFiles()));