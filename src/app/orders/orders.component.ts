import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-orders',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
 


dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'id', 'address', 'phone'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null = null;

  /** Checks whether an element is expanded. */
  isExpanded(element: PeriodicElement) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: PeriodicElement) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
}

export interface PeriodicElement {
  name: string;
  id: number;
  phone: number;
  address: string;
  products: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    name: 'Marina Nane',
    phone: 75353345,
    address: 'Aleea Margine aMamf nr 3 ap 23 et 4 sc 33',
    products: `ceai, plante, ceai, pant, sgnekdgn, vkdfvnk,sd vfdvnkdv v,s vs va, vd`,
  },
  {
    id: 2,
    name: 'Marina Nane',
    phone: 75353345,
    address: 'Aleea Margine aMamf nr 3 ap 23 et 4 sc 33',
    products: `ceai, plante, ceai, pant, sgnekdgn, vkdfvnk,sd vfdvnkdv v,s vs va, vd`,
  },
  {
    id: 3,
    name: 'Lithium BArin',
    phone: 75353345,
    address: 'Aleea Margine aMamf nr 3 ap 23 et 4 sc 33',
    products: `ceai, plante, ceai, pant, sgnekdgn, vkdfvnk,sd vfdvnkdv v,s vs va, vd`,
  },
  // {
  //   id: 4,
  //   name: 'Beryllium',
  //   phone: 75353345,
  //   address: 'Aleea Margine aMamf nr 3 ap 23 et 4 sc 33',
  //   products: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
  //       relatively rare element in the universe, usually occurring as a product of the spallation of
  //       larger atomic nuclei that have collided with cosmic rays.`,
  // },
  // {
  //   id: 5,
  //   name: 'Boron',
  //   phone: 10.811,
  //   address: 'B',
  //   products: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
  //       by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
  //       low-abundance element in the Solar system and in the Earth's crust.`,
  // },
  // {
  //   id: 6,
  //   name: 'Carbon',
  //   phone: 12.0107,
  //   address: 'C',
  //   products: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
  //       and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
  //       to group 14 of the periodic table.`,
  // },
  // {
  //   id: 7,
  //   name: 'Nitrogen',
  //   phone: 14.0067,
  //   address: 'N',
  //   products: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
  //       discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  // },
  // {
  //   id: 8,
  //   name: 'Oxygen',
  //   phone: 15.9994,
  //   address: 'O',
  //   products: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
  //        the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
  //        agent that readily forms oxides with most elements as well as with other compounds.`,
  // },
  // {
  //   id: 9,
  //   name: 'Fluorine',
  //   phone: 18.9984,
  //   address: 'F',
  //   products: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
  //       lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
  //       conditions.`,
  // },
  // {
  //   id: 10,
  //   name: 'Neon',
  //   phone: 20.1797,
  //   address: 'Ne',
  //   products: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
  //       Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
  //       two-thirds the density of air.`,
  // },
];

