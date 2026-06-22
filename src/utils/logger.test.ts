import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { createLogger } from './logger'

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'debug').mockImplementation(() => undefined)
    vi.spyOn(console, 'info').mockImplementation(() => undefined)
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logs debug messages', () => {
    const logger = createLogger('test')
    logger.debug('hello', { id: 1 })
    expect(console.debug).toHaveBeenCalled()
  })

  it('logs info messages', () => {
    const logger = createLogger('test')
    logger.info('hello')
    expect(console.info).toHaveBeenCalled()
  })

  it('logs warn messages', () => {
    const logger = createLogger('test')
    logger.warn('hello')
    expect(console.warn).toHaveBeenCalled()
  })

  it('logs error messages', () => {
    const logger = createLogger('test')
    logger.error('hello')
    expect(console.error).toHaveBeenCalled()
  })

  it('includes namespace in message', () => {
    const logger = createLogger('forms')
    const entry = logger.info('submitted')
    expect(entry.message).toContain('[forms]')
  })
})
