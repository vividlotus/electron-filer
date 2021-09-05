const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const Encoding = require('encoding-japanese');
const Env = require(path.resolve('src') + '/env');
const Type = require(path.resolve('src') + '/type');
const Drive = require(path.resolve('src') + '/drive');
const Entry = require(path.resolve('src') + '/entry');
const DriveEntry = require(path.resolve('src') + '/drive_entry');

class Filer
{
    constructor(filepath = null)
    {
        this.filepath = filepath;

        if (!Env.isWin() && this.filepath == null)
        {
            this.filepath = this.constructor.homeDir();
        }
    }

    static homeDir()
    {
        return Env.isWin() ? Env.variable('USERPROFILE') : Env.variable('HOME');
    }

    pwd()
    {
        return this.filepath;
    }

    async ls()
    {
        if (Env.isWin() && this.filepath == null)
        {
            let drives = await Drive.list().catch(e => { return []; });
            let results = [];

            for (let i in drives)
            {
                let drive = drives[i];
                let sizes = await Drive.size(drive).catch(e => { return {}; });

                let entry = this._factoryDriveEntry(drive, sizes);
                if (entry) results.push(entry);
            }

            return results;
        }

        return fs
            .readdirSync(this.filepath, { withFileTypes: true })
            .reduce((accumulator, dirent) => {
                let entry = this._factoryEntry(this.filepath + `/${dirent.name}`);
                if (entry) accumulator.push(entry);

                return accumulator;
            }, []);
    }

    async folderSize(dirpath)
    {
        return new Promise((resolve, reject) => {
            if (!Env.isWin()) reject('windows only.');

            exec(
                `(Get-ChildItem "${dirpath}" -Recurse -ErrorAction "SilentlyContinue" | Measure-Object -Property Length -Sum).Sum`,
                { 'shell': 'powershell.exe', encoding: 'Shift_JIS' },
                (err, stdout, stderr) => {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        stdout = Encoding.convert(stdout, { from: 'SJIS', to: 'UNICODE', type: 'string' });
                        // console.log(`${dirpath} => ${stdout}`);
                        resolve(stdout);
                    }
                }
            );
        });
    }

    async open()
    {
    }

    _factoryEntry(filepath)
    {
        try
        {
            let stats = fs.statSync(filepath);
            let type = Type.getFromStats(stats);

            return new Entry(
                type,
                filepath,
                stats.isFile() ? stats.size : 0
            );
        }
        catch (e)
        {
            // console.warn(e);
            return null;
        }
    }

    _factoryDriveEntry(drive, sizes)
    {
        try
        {
            return new DriveEntry(
                drive,
                sizes.use,
                sizes.total
            );
        }
        catch (e)
        {
            // console.warn(e);
            return null;
        }
    }
}

module.exports = Filer;