import assert from 'node:assert'
import { dirname, resolve } from 'node:path'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'
import { setup, teardown } from '../../_testHelpers/index.js'
import { BASE_URL } from '../../config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('Ruby tests', function desc() {
  beforeEach(() =>
    setup({
      servicePath: resolve(__dirname),
    }),
  )

  afterEach(() => teardown())

  //
  ;[
    {
      description: 'should work with ruby',
      expected: {
        message: 'Hello Ruby!',
      },
      path: '/dev/hello',
    },
  ].forEach(({ description, expected, path }) => {
    it(description, async function it() {
      if (!env.RUBY_DETECTED) {
        this.skip()
      }

      const url = new URL(path, BASE_URL)
      const response = await fetch(url)
      const json = await response.json()

      assert.deepEqual(json, expected)
    })
  })
})
