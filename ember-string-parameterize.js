var SPECIAL_CHAR_REGEXP      = (/[_|\/|\s]+/g),
    NON_ALPHA_NUMERIC_REGEXP = (/[^a-z0-9\-]+/gi),
    MULTI_SEPARATOR_REGEXP   = (/[\-]+/g),
    TRIM_SEPARATOR_REGEXP    = (/^-+|-+$/g),
    TRIM_WHITESPACE_REGEXP   = (/^(\s|\u00A0)+|(\s|\u00A0)+$/g),
    MULTI_WHITESPACE_REGEXP  = (/\s+/g),
    POLISH_CHARS             = [/[ąĄ]/g, /[ćĆ]/g, /[ęĘ]/g, /[łŁ]/g, /[ńŃ]/g, /[óÓ]/g, /[śŚ]/g, /[żŻ]/g, /[źŹ]/g],
    POLISH_CHAR_REPLACEMNETS = ['a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'],
    SEPARATOR = '-', SPACE = ' ', EMPTY = '',
    TYPE_UNDEFINED = 'undefined';

parameterize = function(string, wordLimit) {
  for (var i = 0; i < POLISH_CHARS.length; i++) {
    string = string.replace(POLISH_CHARS[i], POLISH_CHAR_REPLACEMNETS[i]);
  }

  if(wordLimit && typeof wordLimit === 'number') {
    string = string.replace(TRIM_WHITESPACE_REGEXP, EMPTY)
                   .replace(MULTI_WHITESPACE_REGEXP, SPACE)
                   .split(SPACE)
                   .join(SPACE);
  }

  return string.replace(SPECIAL_CHAR_REGEXP, SEPARATOR)    // replace underscores, slashes and spaces with separator
               // .replace(NON_ALPHA_NUMERIC_REGEXP, EMPTY)   // remove non-alphanumeric characters except the separator
               .replace(MULTI_SEPARATOR_REGEXP, SEPARATOR) // replace multiple occurring separators
               .replace(TRIM_SEPARATOR_REGEXP, EMPTY)      // trim leading and trailing separators 
               .replace('.', SEPARATOR)                    // replace dots with separator
               .toLowerCase();                             // convert to lowercase

}