const chalk = require('chalk');
const ui = require('cliui')({
  width: 80,
});

function Output() {
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
  this.error = (txt) => {
    ui.div(this.red(txt));
    console.log(ui.toString());
  };
  /**
   * @param {string} txt
   */
  this.ok = (txt) => {
    ui.div(this.green(txt));
    console.log(ui.toString());
  };
  /**
   * @param {string} txt
   */
  this.dsl = (txt) => {
    ui.div(txt);
    console.log(ui.toString());
  };
}

module.exports = new Output();
