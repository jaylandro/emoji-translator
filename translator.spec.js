const translator = require('./translator')

test('test translator initialized', () => {
    expect(translator).toBeDefined()
    expect(translator.translate).toBeDefined()
})