#!/usr/bin/env node
const fs = require('fs');
const { EOL } = require('os');

const { execSync } = require('child_process');

console.log(
  execSync(
    'kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.6/manifests/namespace.yaml', 
    { encoding: 'utf-8' }
  )
);

console.log(
  execSync(
    'kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.6/manifests/metallb.yaml', 
    { encoding: 'utf-8' }
  )
);

try {
  console.log(
    execSync(
      'kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"', 
      { encoding: 'utf-8' }
    )
  );
} catch (error) {
  console.log(
    `==========================================${EOL}`,
    error,
    `${EOL}==========================================`,
  );
}

// calc ip range
const output = execSync("docker network inspect -f '{{.IPAM.Config}}' kind", { encoding: 'utf-8' });
const octets = output.match(/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/).pop().split('.');
const network = `${octets[0]}.${octets[1]}`;
const iprange = `${network}.255.200-${network}.255.250`

// read template file
let yaml = fs.readFileSync('./k8s-metallb-config.templ', 'utf-8');
yaml = yaml.replace('{{IP_RANGE}}', iprange);

// write config file within iprange
fs.writeFileSync('./k8s-metallb-config.yaml', yaml);

// apply config
console.log(execSync('kubectl apply -f ./k8s-metallb-config.yaml', { encoding: 'utf-8' }));

// remove
// fs.unlinkSync('./k8s-metallb-config.yaml');