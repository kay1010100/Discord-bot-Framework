require("dotenv").config();
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./src/bot.js', { token: process.env.TOKEN, respawn: true, mode: 'process', execArgv: ['--trace-warnings'], totalShards: 'auto' });

console.log('Starting...');

function managerLog(data) {
    const time = () => {
        var date = new Date();
        const day = (`0`+date.getDate()).slice(-2);
        const month = (`0`+(date.getMonth()+1)).slice(-2);
        const year = (`0`+date.getFullYear()).slice(-2);
        const dateFormat = `[${day}-${month}-${year}]`;

        const hours = ('0'+date.getHours()).slice(-2);
        const minutes = ('0'+date.getMinutes()).slice(-2);
        const timeFormat = `[${hours}:${minutes}]`;

        return dateFormat+' '+timeFormat;
    };
    console.log(`${time()} [shard-manager]: `+data);
};

manager.on('shardCreate', (shard) => {
    managerLog(`Creating shard `+shard.id);

    shard.on('message', (message) => {
        if (message._result == 'restart') {
            shard.respawn().catch(err => managerLog(err));
            managerLog(`Restarting shard_${shard.id}`);
        } else if (message._result == 'stop') {
            managerLog(`Terminated process`);
            process.exit();
        };
    });

    shard.on('death', (child) => {
        managerLog(`Shard:${shard.id} ExitCode: ${child.exitCode}`);
    });

    shard.on('error', (err) => {
        managerLog(`Shard:${shard.id} Error: ${err}`);
    });
});

manager.spawn();