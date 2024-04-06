
function filterFontPairings(fontPairings, validFonts) {
    return fontPairings.filter(pairing => {
        return validFonts.includes(pairing.primary) && validFonts.includes(pairing.secondary);
    });
}
