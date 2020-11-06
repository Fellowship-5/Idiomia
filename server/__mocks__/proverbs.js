function generateProverb(overrideProverb) {
    return {
        proverb: 'Proverb test',
        translation: 'test',
        explanation: 'test explanation',
        ...overrideProverb
    }
}

exports.generateProverb = generateProverb;