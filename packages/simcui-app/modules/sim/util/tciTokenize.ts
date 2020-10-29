// Converted from simc utils::tokenize

export default function tciTokenize(str: string) {
  return (
    str
      // Remove leading and Trailing `+` and `_`
      .replaceAll(/^[_+]/g, '')
      .replaceAll(/[_+]$/g, '')
      // Remove unsupported characters
      .replaceAll(/[\u0080-\uFFFF]/g, '')
      // Whitespace to underscore
      .replaceAll(/\s/g, '_')
      // Remove all non word digit _ + . %
      .replaceAll(/[^+.%\d\w]/g, '')
      .toLowerCase()
  );
}
