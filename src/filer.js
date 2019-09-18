const path = require('path');
const fs = require('fs');
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

                let entry = this.constructor._factoryDriveEntry(drive, sizes);
                if (entry) results.push(entry);
            }

            return results;
        }

        return fs
            .readdirSync(this.filepath, { withFileTypes: true })
            .reduce((accumulator, dirent) => {
                let entry = this.constructor._factoryEntry(this.filepath + `/${dirent.name}`);

                if (entry) accumulator.push(entry);

                return accumulator;
            }, []);
    }

    async open()
    {
    }

    static _factoryEntry(filepath)
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

    static _factoryDriveEntry(drive, sizes)
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

    static folderSize()
    {
        // ドライブは指定しないほうがいい
        // (Get-ChildItem D:/a/b/c/ -Recurse | Measure-Object -Property Length -Sum).Sum
    }
}

module.exports = Filer;