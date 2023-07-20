import {ResponseInterface} from '../interfeces/response-interface';

export class Response implements ResponseInterface {
    message: string;
    success: boolean;
    data: any;
}
