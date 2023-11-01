import { Component } from '../../components/component';
import { AnyCharacter, Card } from './card';
import { repo } from '../data/repo';

export class List extends Component {
  constructor(selector: string) {
    super(selector);
    this.template = this.createTemplate();
    this.render();
  }

  refresh() {
    this.clear();
    this.render();
  }

  render() {
    super.render();
    const elements = repo().map(
      (item) => new Card('ul', item as AnyCharacter, this.refresh.bind(this))
    );
    console.log(elements);
  }

  createTemplate() {
    return '<ul class="characters-list row list-unstyled"></ul>';
  }
}
