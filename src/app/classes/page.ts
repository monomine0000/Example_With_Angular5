import {PageInterface} from '../interfeces/page-interface';

export class Page implements PageInterface {
    pageId: '';
    title: '';
    content: '';
    slug: '';
    isDefault: false;
    createdAt: '';
    updatedAt: '';
    parentId: string;

    constructor(values: Object = {}) {
        if (values) {
            Object.assign(this, values);
        }
    }
}
