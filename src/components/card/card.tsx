import {
  Fighter,
  King,
  Squire,
  Adviser,
  Category,
} from '../../models/character';
import '../../main.scss';

export type AnyCharacter = King | Fighter | Adviser | Squire;

function makeExtraData(item: AnyCharacter) {
  if ('reignYears' in item) {
    return <li>Años de reinado: {item.reignYears}</li>;
  } else if ('weapon' in item) {
    return <li>Arma: {item.weapon}</li>;
    // } else if ('skillLevel' in item) {
    //   return <li>Destreza: {item.skillLevel}</li>
  } else if ('adviseTo' in item) {
    return <li>Sirve a: {item.adviseTo.name}</li>;
    // } else if  ('servilityGrade' in item) {
    //   return <li>Peloteo: {item.servilityGrade}</li>
  } else if ('servesTo' in item) {
    return <li>Asesora a: {item.servesTo.name}</li>;
  }
}

type Props = {
  character: AnyCharacter;
};

function makEmoji(category: Category) {
  switch (category) {
    case 'King':
      return '👑';
    case 'Fighter':
      return '🗡';
    case 'Adviser':
      return '🎓';
    default:
      return '🛡';
  }
}

export function Card({ character }: Props) {
  return (
    <li className="character col">
      <div className="card character__card">
        <img
          src={`${character.name.toLowerCase()}.jpg`}
          alt={character.name}
          className="character__picture 
      {!character.isAlive && 'card-img-top'}"
        />
        <div className="card-body">
          <h2 className="character__name card-title h4">
            {character.name} {character.family}
          </h2>
          <div className="character__info">
            <ul className="list-unstyled">
              <li>Edad: {character.age} años</li>
              <li>
                Estado:{' '}
                {character.isAlive ? (
                  <i className="fas fa-thumbs-up" />
                ) : (
                  <i className="fas fa-thumbs-down" />
                )}
              </li>
            </ul>
          </div>
          <div className="character__overlay">
            <ul className="list-unstyled">{makeExtraData(character)}</ul>
            <div className="character__actions">
              <button className="character__action btn talk">habla</button>
              <button className="character__action btn dead">muere</button>
            </div>
          </div>
        </div>
        <i className="emoji">{makEmoji(character.category)}</i>
      </div>
    </li>
  );
}
