class Env
{
    static platform()
    {
        return process.platform;
    }

    static variable(name = null)
    {
        if (name != null && process.env[name])
        {
            return process.env[name];
        }
        else
        {
            return null;
        }
    }

    static isWin()
    {
        return this.platform() == 'win32';
    }

    static isMac()
    {
        return this.platform == 'darwin';
    }

    static isLinux()
    {
        return !this.isWin();
    }
}

module.exports = Env;