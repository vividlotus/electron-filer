import Encoding from 'encoding-japanese'
import Env from '@/env'
import Type from '@/type'

const { exec, execSync } = NodeApi.child_process
const fs = NodeApi.fs

export default class LocalDatasource
{
  constructor ()
  {
  }

  async driveList ()
  {
    let buffer = execSync('wmic logicaldisk get name')
    let res = Encoding.convert(buffer, { to: 'UNICODE', type: 'string' })
    let matches = [...res.matchAll(/([A-Z]{1}):/gi)]
    let drives = matches.map(match => {
      return {
        path: match[1] + ':/',
        letter: match[1],
      }
    })

    return drives
  }

  async driveSize (letter)
  {
    let buffer = execSync(`fsutil volume diskfree ${letter}:/`)
    let res = Encoding.convert(buffer, { to: 'UNICODE', type: 'string' })

    let matches = res.match(/:\s+([0-9,]+)/gi)
    let free = Number(matches[0].match(/:\s+([0-9,]+)/i)[1].replace(/,/g, ''))
    let total = Number(matches[1].match(/:\s+([0-9,]+)/i)[1].replace(/,/g, ''))

    return {
      // 空きバイト数
      free: free,
      // 使用バイト数
      use: total - free,
      // バイト総数
      total: total
    }
  }

  static homeDir ()
  {
    return Env.isWin() ? Env.variable('USERPROFILE') : Env.variable('HOME')
  }

  async ls (dir)
  {
    const excludes = [
      '$recycle.bin',
      'thumbs.db',
    ]

    return fs
      .readdirSync(dir, { withFileTypes: true })
      .reduce((accumulator, dirent) => {
        if (excludes.includes(dirent.name.toLowerCase())) return accumulator

        let entry = null
        try
        {
          const path = `${dir}/${dirent.name}`
          const stats = fs.statSync(path)
          entry = {
            type: Type.getFromStats(stats),
            path: path,
            size: stats.isFile() ? stats.size : null,
          }
        }
        catch (e)
        {
          // console.warn(e)
        }

        if (entry) accumulator.push(entry)

        return accumulator
      }, [])
  }

  async folderSize(dir)
  {
    return new Promise((resolve, reject) => {
      exec(
        `(Get-ChildItem "${dir}" -Recurse -ErrorAction "SilentlyContinue" | Measure-Object -Property Length -Sum).Sum`,
        { 'shell': 'powershell.exe', encoding: 'Shift_JIS' },
        (err, stdout, stderr) => {
          if (err)
          {
            reject(err)
          }
          else
          {
            stdout = Encoding.convert(stdout, { from: 'SJIS', to: 'UNICODE', type: 'string' })
            // console.log(`${dir} => ${stdout}`)
            resolve(stdout)
          }
        }
      )
    })
  }
}
