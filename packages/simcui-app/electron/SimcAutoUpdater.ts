/* eslint-disable class-methods-use-this */
import { EventEmitter } from 'events';
import axios from 'axios';
import parseDirectoryIndex from 'parse-apache-directory-index';
import path from 'path';

const getRemoteVersions = async () => {
  try {
    const response = await axios.get('http://downloads.simulationcraft.org/nightly/');
    console.log(parseDirectoryIndex(response.data));
  } catch (e) {
    console.log(e);
  }
};

export default class SimcUpdater extends EventEmitter {
  // eslint-disable-next-line global-require
  private readonly app = require('electron').app;

  private readonly executablePath = path.resolve(this.app.getPath('userData'));

  public chackForUpdatesAndNotify() {
    console.log('㊙️ Here');
    getRemoteVersions();
  }
}
