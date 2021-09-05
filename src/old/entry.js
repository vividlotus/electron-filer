const path = require('path');
const Type = require(path.resolve('src') + '/type');
const Util = require(path.resolve('src') + '/util');

class Entry
{
    constructor(type, filepath, size = 0)
    {
        this.rawType = type;
        this.filepath = filepath;
        this.rawSize = size;

        this.name = '';
        this.ext = '';

        this._init();
    }

    _init()
    {
        this.name = path.basename(this.filepath);
        this.ext = path.extname(this.filepath);
    }

    get size()
    {
        return Util.size(this.rawSize);
    }

    get type()
    {
        switch (this.rawType)
        {
            case Type.DRIVE:
                return 'DRIVE';
            case Type.SYMBOLIC_LINK:
                return 'SYMBOLIC_LINK';
            case Type.DIRECTORY:
                return 'DIRECTORY';
            case Type.FILE:
                return 'FILE';
            case Type.SOCKET:
                return 'SOCKET';
            case Type.FIFO:
                return 'FIFO';
            default:
                return 'UNKNOWN';
        }
    }

    isFile()
    {
        return this.rawType == Type.FILE;
    }

    isDir()
    {
        return this.rawType == Type.DIRECTORY;
    }

    isDrive()
    {
        return this.rawType == Type.DRIVE;
    }
}

module.exports = Entry;