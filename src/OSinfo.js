import os from 'os';

const getEOL = () => {
    return JSON.stringify(os.EOL);
}

const getCPUsInfo = () =>{
    return JSON.stringify(os.cpus());
}

const getHomeDerictory = () => {
    return os.homedir();
}

const getCurrentSystemUsername = () => {
   return os.userInfo().username;
}

const getArchitecture = () => {
    return JSON.stringify(os.arch());
}
const osInfo = {
    'EOL': getEOL,
    'cpus': getCPUsInfo,
    'homedir': getHomeDerictory,
    'username': getCurrentSystemUsername,
    'architecture': getArchitecture
};

export default osInfo;
