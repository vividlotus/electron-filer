const path = require('path');
const { exec } = require('child_process');
const Env = require(path.resolve('src') + '/env');

class Drive
{
    static driveLetter(filepath)
    {
        if (!this.isDrive(filepath)) return null;

        let matches = filepath.match(/([A-Z]{1}):(\\|\/)?$/i);

        return matches[1];
    }

    static isDrive(filepath)
    {
        return filepath.match(/^(file:\/\/\/?)?([A-Z]{1}):(\\|\/)?$/gi);
    }

    static async list()
    {
        return new Promise((resolve, reject) => {
            if (!Env.isWin()) reject('winows only.');

            exec('wmic logicaldisk get name', (err, stdout, stderr) => {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    let drives = stdout.match(/([A-Z]{1}):/gi);
                    resolve(drives.map(drive => `${drive}/`));
                }
            });
        });
    }

    static async size(drive)
    {
        return new Promise((resolve, reject) => {
            if (!Env.isWin()) reject('windows only.');

            let dl = this.driveLetter(drive);

            exec(`fsutil volume diskfree ${dl}:/`, (err, stdout, stderr) => {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    let matches = stdout.match(/:\s([0-9,]+)/gi);
                    let free = Number(matches[0].match(/:\s([0-9,]+)/i)[1].replace(/,/g, ''));
                    let total = Number(matches[1].match(/:\s([0-9,]+)/i)[1].replace(/,/g, ''));
                    resolve({
                        // 空きバイト数
                        free: free,
                        // 使用バイト数
                        use: total - free,
                        // バイト総数
                        total: total
                    });
                }
            });
        });
    }
}

module.exports = Drive;