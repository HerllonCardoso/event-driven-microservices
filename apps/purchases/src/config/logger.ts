import { createLogger, format, transports } from 'winston';
import { join } from 'path';
const packagePath = join(process.cwd(), 'package.json');

const { combine, timestamp, json, prettyPrint } = format;
const _console = new transports.Console();
const packageJson = require(packagePath);

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    json(),
  ),
  defaultMeta: {
    service: packageJson.name,
    serviceVersion: packageJson.version,
    pid: process.pid,
  },
  transports: [_console],
});

export default logger;
