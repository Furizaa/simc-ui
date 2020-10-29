export default function characterClassToColor(characterClassWowId: number): string {
  switch (characterClassWowId) {
    case 1:
      return 'classWarrior';
    case 2:
      return 'classPaladin';
    case 3:
      return 'classHunter';
    case 4:
      return 'classRogue';
    case 5:
      return 'classPriest';
    case 6:
      return 'classDeathknight';
    case 7:
      return 'classShaman';
    case 8:
      return 'classMage';
    case 9:
      return 'classWarlock';
    case 10:
      return 'classMonk';
    case 11:
      return 'classDruid';
    case 12:
      return 'classDemonhunter';
    default:
      return 'classWarrior';
  }
}
