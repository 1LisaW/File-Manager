import os from 'os';

const getEOL = () => {
    return JSON.stringify(os.EOL);
}

const getCPUsInfo = () =>{
    return os.cpus();
}

const getHomeDerictory = () => {
    return os.homedir();
}

const getCurrentSystemUsername = () => {
   return os.userInfo().username;
}

const getArchitecture = () => {
    return os.arch();
}
const osInfo = {
    'EOL': getEOL,
    'cpus': getCPUsInfo,
    'homedir': getHomeDerictory,
    'username': getCurrentSystemUsername,
    'architecture': getArchitecture
};

export default osInfo;
