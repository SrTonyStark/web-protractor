import os from 'os';
import { env } from '../support/environment';
import { resolutions } from '../data';

const device = resolutions[env.resolution].device;

function getOSName(): string {
  if (/^win/i.test(process.platform)) {
    return 'windows';
  } else if (process.platform == 'darwin') {
    return 'osx';
  } else {
    return 'linux';
  }
}

export const metadata = {
  'device': device,
  'platform': {
    'name': device === 'desktop' ? getOSName() : 'iOS',
    'version': device === 'desktop' ? os.release() : undefined,
  },
};
