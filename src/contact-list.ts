import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api';
import { ContactUpdated, ContactViewed } from './message';

@inject(WebAPI, EventAggregator)
export class ContactList {
    contacts;
    selectedId = 0;

    constructor(private api: WebAPI, private ea: EventAggregator) {
        this.ea.subscribe(ContactViewed, msg => this.select(msg.contact));
        this.ea.subscribe(ContactUpdated, msg => {
            let id = msg.contact.id;
            let found = this.contacts.find(x => x.id == id);
            Object.assign(found, msg.contact);
        });
    }

    created() {
        this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }
}