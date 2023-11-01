import { Component } from '../../components/component';
import { Advisor } from '../model/advisor';
import { Category } from '../model/character';
import { Fighter } from '../model/fighter';
import { King } from '../model/king';
import { Squire } from '../model/squire';

export type AnyCharacter = King | Fighter | Advisor | Squire;

function makeExtraData(item: AnyCharacter) {
  let result = '';
  if (item instanceof King) {
    result = `<li>Años de reinado: ${item.kingdomYears}</li>`;
  } else if (item instanceof Fighter) {
    result = `
      <li>Arma: ${item.weapon}</li>
      <li>Destreza: ${item.skill}</li>`;
  } else if (item instanceof Advisor) {
    result = `
      <li>Sirve a: ${item.advisorBoss.name}</li>`;
  } else {
    result = `
        <li>Peloteo: ${item.servilityGrade}</li>
        <li>Asesora a: ${item.patron.name}</li>`;
  }

  return result;
}

function makEmoji(category: Category) {
  switch (category) {
    case 'King':
      return '👑';
    case 'Fighter':
      return '🗡';
    case 'Advisor':
      return '🎓';
    default:
      return '🛡';
  }
}

export class Card extends Component {
  character: AnyCharacter;
  refresh: () => void;
  constructor(selector: string, character: AnyCharacter, refresh: () => void) {
    super(selector);
    this.refresh = refresh;
    this.character = character;
    this.manageComponent();
  }

  manageComponent() {
    this.template = this.createTemplate();
    this.render();
  }

  handleTalk() {
    console.log(this.character.name);
    const talkElement = document.querySelector('.communications');
    talkElement!.firstElementChild!.textContent = this.character.talk();
    talkElement!.classList.add('on');
    setTimeout(() => {
      talkElement!.classList.remove('on');
    }, 2000);
  }

  handleDead() {
    // Alt this.character.isAlive = false!;
    this.character.dead();
    console.log(this.character);
    // Temp this.clear();
    // this.manageComponent();
    // this.element
    //   .querySelector('.card-img-top')
    //   ?.classList.add('.character__card_down');
    this.refresh();
  }

  render() {
    super.render();
    this.element
      .querySelector('.talk')
      ?.addEventListener('click', this.handleTalk.bind(this));
    this.element
      .querySelector('.dead')
      ?.addEventListener('click', this.handleDead.bind(this));
  }

  createTemplate() {
    return `
  <li class="character col">
    <div class="card character__card">
      <img src="/img/${this.character.name.toLowerCase()}.jpg" alt="${
      this.character.name
    } ${this.character.family}" class="character__picture 
      ${!this.character.isAlive && 'card-img-top'}" />
      <div class="card-body">
        <h2 class="character__name card-title h4">${this.character.name} ${
      this.character.family
    }</h2>
        <div class="character__info">
          <ul class="list-unstyled">
            <li>Edad: ${this.character.age} años</li>
            <li>
              Estado: ${
                this.character.isAlive
                  ? `<i class="fas fa-thumbs-up">`
                  : `<i class="fas fa-thumbs-down">`
              }
              </i>
              </i>
            </li>
          </ul>
        </div>
        <div class="character__overlay">
          <ul class="list-unstyled">
              ${makeExtraData(this.character)}
          </ul>
          <div class="character__actions">
            <button class="character__action btn talk">habla</button>
            <button class="character__action btn dead">muere</button>
          </div>
        </div>
      </div>
      <i class="emoji">${makEmoji(this.character.category)}</i>
    </div>
  </li>
`;
  }
}
