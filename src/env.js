export default class
{
  static platform()
  {
    if (process.platform == 'browser')
    {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.indexOf("windows nt") !== -1)
      {
        return 'win32'
      }
      else if(ua.indexOf("mac os x") !== -1)
      {
        return 'darwin'
      }
      else
      {
        return 'linux'
      }
    }
    else
    {
      return process.platform
    }
  }

  static variable(name = null)
  {
    if (name != null && process.env[name])
    {
      return process.env[name]
    }
    else
    {
      return null
    }
  }

  static isWin()
  {
    return this.platform() == 'win32'
  }

  static isMac()
  {
    return this.platform == 'darwin'
  }

  static isLinux()
  {
    return !this.isWin()
  }
}
