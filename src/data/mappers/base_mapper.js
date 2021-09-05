export default class
{
  static transforms (json)
  {
    return json.map(data => this.transform(data))
  }
}
