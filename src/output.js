const chalk = require('chalk');
const cliui = require('cliui');
const readline = require('readline');

function Output() {
  /**
   * @param {string} txt
   */
  const outputText = (txt) => {
    const ui = cliui({
      width: 100,
    });
    ui.div(txt);
    console.log(ui.toString());
  };
  /**
   * @param {object} obj
   */
  const outputJson = obj => console.log(JSON.stringify(obj, null, 2));
  /**
   * @param {string} txt
   */
  this.green = txt => chalk.green(txt);
  /**
   * @param {string} txt
   */
  this.red = txt => chalk.red(txt);
  /**
   * @param {string} txt
   */
  this.errorText = txt => outputText(this.red(txt));
  /**
   * @param {string} txt
   */
  this.errorJson = txt => outputJson({ error: txt });
  /**
   * @param {boolean} json
   * @param {string} txt
   */
  this.error = (json, txt) => {
    if (json) this.errorJson(txt);
    else this.errorText(txt);
    process.exit(1);
  };
  /**
   * @param {string} txt
   */
  this.okText = txt => outputText(this.green(txt));
  /**
   * @param {string} txt
   */
  this.okJson = txt => outputJson({ success: true, message: txt });
  /**
   * @param {boolean} json
   * @param {string} txt
   */
  this.ok = (json, txt) => {
    if (json) this.okJson(txt);
    else this.okText(txt);
  };
  /**
   * @param {Array} arr
   */
  this.tableText = (arr) => {
    let txt = '';
    for (let row = 0; row < arr.length; row += 1) {
      if (row > 0) txt += '\n';
      for (let column = 0; column < arr[row].length; column += 1) {
        if (column > 0) txt += ' \t';
        if (typeof (arr[row][column]) !== 'undefined' && arr[row][column] !== null) txt += arr[row][column];
        else txt += '';
      }
    }
    outputText(txt);
  };
  /**
   * @param {Array} arr
   */
  this.tableJson = arr => outputJson(arr);
  /**
   * @param {boolean} json
   * @param {Array} arr
   */
  this.table = (json, arr) => {
    if (json) this.tableJson(arr);
    else this.tableText(arr);
  };
  /**
   * @param {Object} obj
   */
  this.propsJson = obj => outputJson(obj);
  /**
   * @param {Object} obj
   */
  this.propsText = (obj) => {
    let txt = 'KEY\tVALUE\n';
    let was = false;
    Object.keys(obj).forEach((key) => {
      if (was) txt += '\n';
      const name = key.split('_').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
      let val;
      if (typeof (obj[key]) !== 'undefined' && obj[key] !== null) val = obj[key];
      else val = '';
      txt += `${name} \t${val}`;
      was = true;
    });
    outputText(txt);
  };
  /**
   * @param {boolean} json
   * @param {object} obj
   */
  this.props = (json, obj) => {
    if (json) this.propsJson(obj);
    else this.propsText(obj);
  };
  /**
   * @param {function} done
   */
  this.askForMore = (done) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('(Hit enter for more)', () => {
      readline.moveCursor(rl, 0, -1);
      readline.clearLine(rl, 0);
      rl.write('\r');
      rl.close();
      done();
    });
  };
}

module.exports = new Output();
