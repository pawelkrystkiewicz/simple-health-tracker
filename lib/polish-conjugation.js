//Function for deriving polish nouns depending on amount
const conjugationPL = (value, nounSingular, nounPlurar, nounPluralGenitive) => {
  value = Math.abs(value); //consider only positive values
  if (value === 1) return nounSingular;
  let div10 = value % 10;
  let div100 = value % 100;
  if (div10 > 4 || div10 < 2 || (div100 < 15 && div100 > 11))
    return nounPluralGenitive;
  return nounPlurar;
};

export default conjugationPL;
