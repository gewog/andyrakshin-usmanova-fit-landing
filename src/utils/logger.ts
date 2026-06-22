export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  timestamp: string
}

const formatEntry = (entry: LogEntry): string =>
  `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}${
    entry.context ? ` ${JSON.stringify(entry.context)}` : ''
  }`

export const createLogger = (namespace: string) => {
  const log = (level: LogLevel, message: string, context?: Record<string, unknown>) => {
    const entry: LogEntry = {
      level,
      message: `[${namespace}] ${message}`,
      context,
      timestamp: new Date().toISOString(),
    }

    const formatted = formatEntry(entry)

    switch (level) {
      case 'debug':
        console.debug(formatted)
        break
      case 'info':
        console.info(formatted)
        break
      case 'warn':
        console.warn(formatted)
        break
      case 'error':
        console.error(formatted)
        break
    }

    return entry
  }

  return {
    debug: (message: string, context?: Record<string, unknown>) => log('debug', message, context),
    info: (message: string, context?: Record<string, unknown>) => log('info', message, context),
    warn: (message: string, context?: Record<string, unknown>) => log('warn', message, context),
    error: (message: string, context?: Record<string, unknown>) => log('error', message, context),
  }
}

export const appLogger = createLogger('app')
