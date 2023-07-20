import {PageInterface} from './page-interface';

export interface AdminPageList {
    success: boolean;
    message: string;
    data: {
        total: number,
        items: [PageInterface]
    };
}
