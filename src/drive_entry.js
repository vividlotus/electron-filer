const path = require('path');
const Type = require(path.resolve('src') + '/type');
const Drive = require(path.resolve('src') + '/drive');
const Util = require(path.resolve('src') + '/util');
const Entry = require(path.resolve('src') + '/entry');

class DriveEntry extends Entry
{
    constructor(filepath, useSize, totalSize)
    {
        super(Type.DRIVE, filepath, useSize);

        this.letter = Drive.driveLetter(this.filepath);
        this.rawTotalSize = totalSize >= 0 ? totalSize : 0;

        this._init();
    }

    _init()
    {
        this.name = this.letter;
    }

    get size()
    {
        return Util.size(this.rawSize);
    }

    get totalSize()
    {
        return Util.size(this.rawTotalSize);
    }

    get freeSize()
    {
        return Util.size(this.rawTotalSize - this.rawSize);
    }
}

module.exports = DriveEntry;